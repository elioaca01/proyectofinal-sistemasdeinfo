import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { db, auth } from '../firebase';
import { addDoc, collection, getDocs, updateDoc, doc, orderBy, query } from "firebase/firestore";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Forum = () => {
    const { store } = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ text: '', image: null });
    const [user, setUser] = useState(null);

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

            const newPostData = {
                text: newPost.text,
                image: imageUrl,
                date: currentDate,
                user: user.displayName || user.email,
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
        const newComment = {
            text: comment,
            user: user.displayName || user.email,
            userId: user.uid, // Guardamos el ID del usuario para identificar al autor
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

        // Verificar si el usuario es el autor del comentario
        if (comment.userId !== user.uid) {
            alert("Solo puedes borrar tus propios comentarios.");
            return;
        }

        // Eliminar el comentario
        post.comments.splice(commentIndex, 1);
        setPosts(updatedPosts);

        // Actualizar en Firestore
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
                            <p><strong>{post.user}</strong> publicó:</p>
                            <p>{post.text}</p>
                            <p style={{ fontSize: '12px', color: '#888' }}>Publicado el: {post.date}</p>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                                <button onClick={() => handleLike(index)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    ❤️ {post.likes}
                                </button>
                                <button onClick={() => handleShare(index)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    📤 Compartir
                                </button>
                                <span>🗨 {post.comments.length}</span>
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