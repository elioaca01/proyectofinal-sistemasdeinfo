import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { db, auth } from '../firebase';
import { addDoc, collection, getDocs, updateDoc, doc, orderBy, query, deleteDoc, getDoc } from "firebase/firestore";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Forum = () => {
    const { store } = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ text: '', image: null });
    const [user, setUser] = useState(null);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editedText, setEditedText] = useState('');

    // Imagen predeterminada si no hay foto de perfil
    const defaultProfilePhoto = "https://res.cloudinary.com/do9dtxrvh/image/upload/v1742413057/Untitled_design_1_hvuwau.png";

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const loadPosts = async () => {
            const postsQuery = query(collection(db, "posts"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(postsQuery);
            const postsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsData);
        };
        loadPosts();
    }, []);

    // Función para obtener el username y la foto de perfil desde Firestore
    const getUserInfo = async (uid) => {
        try {
            const userDocRef = doc(db, "users", uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                return {
                    username: userData.username || "Usuario sin nombre",
                    photo: userData.fotoPerfil || defaultProfilePhoto
                };
            } else {
                console.log("No se encontró el usuario en Firestore.");
                return {
                    username: "Usuario sin nombre",
                    photo: defaultProfilePhoto
                };
            }
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
            return {
                username: "Usuario sin nombre",
                photo: defaultProfilePhoto
            };
        }
    };

    const handlePostSubmit = async () => {
        if (!user) {
            alert("Debes iniciar sesión para publicar.");
            return;
        }

        if (newPost.text || newPost.image) {
            const currentDate = new Date().toLocaleString();
            let imageUrl = "";

            if (newPost.image) {
                const formData = new FormData();
                formData.append("file", newPost.image);
                formData.append("upload_preset", "mi_preset");

                await axios.post("https://api.cloudinary.com/v1_1/dhlyuaknz/image/upload", formData)
                    .then(response => {
                        imageUrl = response.data.secure_url;
                    }).catch(error => {
                        console.error("Error al subir la imagen a Cloudinary:", error);
                    });
            }

            const userInfo = await getUserInfo(user.uid); // Obtener username y foto

            const newPostData = {
                text: newPost.text,
                image: imageUrl,
                date: currentDate,
                user: userInfo.username, // Usar username
                userPhoto: userInfo.photo, // Guardar la foto de perfil
                userId: user.uid,
                comments: [],
                likes: 0,
                likedBy: []
            };

            await addDoc(collection(db, "posts"), newPostData);

            const postsQuery = query(collection(db, "posts"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(postsQuery);
            const postsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsData);

            setNewPost({ text: '', image: null });
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewPost({ ...newPost, image: file });
        }
    };

    const handleAddComment = async (index, comment) => {
        if (!user) {
            alert("Debes iniciar sesión para comentar.");
            return;
        }
        if (comment.trim() === '') return;

        const updatedPosts = [...posts];
        const post = updatedPosts[index];
        const userInfo = await getUserInfo(user.uid); // Obtener username (sin foto para comentarios por ahora)

        const newComment = {
            text: comment,
            user: userInfo.username, // Usar username
            userId: user.uid,
            date: new Date().toLocaleString()
        };
        post.comments.push(newComment);
        setPosts(updatedPosts);

        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
            comments: post.comments
        }).catch(error => {
            console.error("Error al actualizar los comentarios en Firestore:", error);
        });
    };

    const handleDeleteComment = async (postIndex, commentIndex) => {
        if (!user) {
            alert("Debes iniciar sesión para borrar un comentario.");
            return;
        }

        const updatedPosts = [...posts];
        const post = updatedPosts[postIndex];
        const comment = post.comments[commentIndex];

        if (comment.userId !== user.uid) {
            alert("Solo puedes borrar tus propios comentarios.");
            return;
        }

        post.comments.splice(commentIndex, 1);
        setPosts(updatedPosts);

        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
            comments: post.comments
        }).catch(error => {
            console.error("Error al borrar el comentario en Firestore:", error);
        });
    };

    const handleLike = async (index) => {
        if (!user) {
            alert("Debes iniciar sesión para dar like.");
            return;
        }

        const updatedPosts = [...posts];
        const post = updatedPosts[index];
        const userLiked = post.likedBy.includes(user.uid);

        if (userLiked) {
            post.likes -= 1;
            post.likedBy = post.likedBy.filter(uid => uid !== user.uid);
        } else {
            post.likes += 1;
            post.likedBy.push(user.uid);
        }

        setPosts(updatedPosts);

        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
            likes: post.likes,
            likedBy: post.likedBy
        }).catch(error => {
            console.error("Error al actualizar los likes en Firestore:", error);
        });
    };

    const handleShare = (index) => {
        const postUrl = `${window.location.href}#post-${index}`;
        navigator.clipboard.writeText(postUrl).then(() => {
            alert("¡Enlace copiado al portapapeles!");
        });
    };

    const handleDeletePost = async (postId) => {
        if (!user) {
            alert("Debes iniciar sesión para borrar una publicación.");
            return;
        }

        const post = posts.find(p => p.id === postId);
        if (!post.userId || post.userId !== user.uid) {
            alert("Solo puedes borrar tus propias publicaciones.");
            return;
        }

        if (window.confirm("¿Estás seguro de que quieres borrar esta publicación?")) {
            await deleteDoc(doc(db, "posts", postId)).catch(error => {
                console.error("Error al borrar la publicación en Firestore:", error);
            });

            setPosts(posts.filter(p => p.id !== postId));
        }
    };

    const handleEditPost = (postId, currentText) => {
        setEditingPostId(postId);
        setEditedText(currentText);
    };

    const handleSaveEdit = async (postId) => {
        if (!user) {
            alert("Debes iniciar sesión para editar una publicación.");
            return;
        }

        const post = posts.find(p => p.id === postId);
        if (!post.userId || post.userId !== user.uid) {
            alert("Solo puedes editar tus propias publicaciones.");
            return;
        }

        if (editedText.trim() === '') {
            alert("El texto no puede estar vacío.");
            return;
        }

        const updatedPosts = posts.map(p =>
            p.id === postId ? { ...p, text: editedText } : p
        );
        setPosts(updatedPosts);

        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
            text: editedText
        }).catch(error => {
            console.error("Error al actualizar la publicación en Firestore:", error);
        });

        setEditingPostId(null);
        setEditedText('');
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
        setEditedText('');
    };

    return (
        <div style={{ backgroundColor: '#fbfada', minHeight: '100vh', fontFamily: 'Montserrat, sans-serif', padding: '16px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '900px', width: '100%', display: 'flex' }}>
                <div style={{ flex: '3' }}>
                    <h1 style={{ textAlign: 'center', color: '#2e3b4e', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
                        Bienvenido al foro de AVILAMET
                    </h1>

                    <div style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: '#fbfada', padding: '16px', borderRadius: '8px', border: '2px solid #2e4e1e' }}>
                        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/685/685655.png" alt="Cámara" style={{ width: '40px', height: '40px' }} />
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        <textarea
                            placeholder="Comparte tu experiencia en la montaña..."
                            value={newPost.text}
                            onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
                            style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
                        />
                        {newPost.image && <img src={URL.createObjectURL(newPost.image)} alt="Vista previa" style={{ borderRadius: '8px', width: '100%' }} />}
                        <button onClick={handlePostSubmit} style={{ padding: '8px 16px', backgroundColor: '#2e4e1e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Publicar</button>
                    </div>

                    {posts.map((post, index) => (
                        <div key={index} id={`post-${index}`} style={{ maxWidth: '640px', margin: '16px auto', backgroundColor: '#fbfada', padding: '16px', borderRadius: '8px', border: '2px solid #2e4e1e' }}>
                            {post.image && <img src={post.image} alt="Imagen del post" style={{ borderRadius: '8px', width: '100%' }} />}
                            <p>
                                <img
                                    src={post.userPhoto || defaultProfilePhoto} // Mostrar la foto de perfil
                                    alt="Foto de perfil"
                                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px', verticalAlign: 'middle' }}
                                />
                                <strong>{post.user}</strong> publicó:
                            </p>
                            {editingPostId === post.id ? (
                                <div>
                                    <textarea
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
                                    />
                                    <button onClick={() => handleSaveEdit(post.id)} style={{ padding: '4px 8px', backgroundColor: '#2e4e1e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' }}>
                                        Guardar
                                    </button>
                                    <button onClick={handleCancelEdit} style={{ padding: '4px 8px', backgroundColor: '#888', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <p>{post.text}</p>
                            )}
                            <p style={{ fontSize: '12px', color: '#888' }}>Publicado el: {post.date}</p>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                                <button onClick={() => handleLike(index)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    ❤️ {post.likes}
                                </button>
                                <button onClick={() => handleShare(index)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    📤 Compartir
                                </button>
                                <span>🗨 {post.comments.length}</span>
                                {user && post.userId === user.uid && (
                                    <>
                                        <button
                                            onClick={() => handleEditPost(post.id, post.text)}
                                            style={{ background: 'none', border: 'none', color: '#2e4e1e', cursor: 'pointer', fontSize: '12px' }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeletePost(post.id)}
                                            style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '12px' }}
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </div>

                            {post.comments.length > 0 && <hr style={{ margin: '8px 0', border: '1px solid #2e4e1e' }} />}

                            <div style={{ marginTop: '8px' }}>
                                {post.comments.map((comment, idx) => (
                                    <div key={idx} style={{ fontSize: '14px', color: '#666', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>
                                            🗨 <strong>{comment.user}</strong>: {comment.text} <span style={{ fontSize: '12px' }}>({comment.date})</span>
                                        </span>
                                        {user && comment.userId === user.uid && (
                                            <button
                                                onClick={() => handleDeleteComment(index, idx)}
                                                style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '12px' }}
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <textarea
                                    placeholder="Agrega un comentario..."
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleAddComment(index, e.target.value);
                                            e.target.value = '';
                                        }
                                    }}
                                    style={{ width: '100%', padding: '8px', marginTop: '8px' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ flex: '1', padding: '16px' }}>
                    <h2 style={{ textAlign: 'center', color: '#2e3b4e', fontWeight: 'bold' }}>Promociones</h2>
                    <p style={{ textAlign: 'center' }}>¡Ofertas exclusivas para montañistas!</p>
                </div>
            </div>
        </div>
    );
};

export default Forum;