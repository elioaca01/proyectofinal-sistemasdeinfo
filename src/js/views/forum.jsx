import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext'; // Importa el contexto
import { db, auth } from '../firebase'; // Asegúrate de que Firebase esté bien configurado
import { addDoc, collection, getDocs } from "firebase/firestore";
import axios from "axios"; // Necesitamos Axios para hacer la petición a Cloudinary
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Importa correctamente `onAuthStateChanged` de Firebase

const Forum = () => {
    const { store } = useContext(Context); // Obtén el estado del contexto
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ text: '', image: null });
    const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado

    // Verificar el estado de autenticación del usuario
    useEffect(() => {
        const auth = getAuth(); // Obtener la instancia de Firebase Auth
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Actualiza el estado del usuario
        });

        return () => unsubscribe(); // Limpiar el suscriptor al desmontar el componente
    }, []);

    // Cargar las publicaciones desde Firestore cuando se monta el componente
    useEffect(() => {
        const loadPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "posts"));
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

            // Si hay una imagen, subirla a Cloudinary
            if (newPost.image) {
                const formData = new FormData();
                formData.append("file", newPost.image);
                formData.append("upload_preset", "mi_preset"); // Reemplaza con tu preset de Cloudinary

                // Subir la imagen a Cloudinary
                await axios.post("https://api.cloudinary.com/v1_1/dhlyuaknz/image/upload", formData)
                    .then(response => {
                        imageUrl = response.data.secure_url; // Obtener la URL de la imagen subida
                    }).catch(error => {
                        console.error("Error al subir la imagen a Cloudinary:", error);
                    });
            }

            const newPostData = {
                text: newPost.text,
                image: imageUrl, // Guardamos la URL de la imagen de Cloudinary
                date: currentDate,
                user: user.displayName || user.email, // Mostrar el nombre o email del usuario
                comments: [],
                likes: 0,
                likedBy: [] // Array para almacenar los IDs de los usuarios que han dado like
            };

            // Guardar el post en Firestore
            await addDoc(collection(db, "posts"), newPostData);

            // Luego de agregar el nuevo post, recargar los posts para que se muestren
            const querySnapshot = await getDocs(collection(db, "posts"));
            const postsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsData);

            setNewPost({ text: '', image: null }); // Resetear el post
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewPost({ ...newPost, image: file }); // Guardar el archivo en el estado
        }
    };

    const handleAddComment = (index, comment) => {
        if (!user) {
            alert("Debes iniciar sesión para comentar.");
            return;
        }
        if (comment.trim() === '') return;
        const updatedPosts = [...posts];
        updatedPosts[index].comments.push(comment);
        setPosts(updatedPosts);
    };

    const handleLike = (index) => {
        if (!user) {
            alert("Debes iniciar sesión para dar like.");
            return;
        }
        const updatedPosts = [...posts];
        const post = updatedPosts[index];

        // Verificar si el usuario ya ha dado like
        if (post.likedBy.includes(user.uid)) {
            alert("Ya has dado like a esta publicación.");
            return;
        }

        post.likes += 1;
        post.likedBy.push(user.uid);
        setPosts(updatedPosts);
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
                                    <div key={idx} style={{ fontSize: '14px', color: '#666' }}>🗨 {comment}</div>
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
