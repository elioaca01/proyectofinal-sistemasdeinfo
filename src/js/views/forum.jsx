import React, { useState } from 'react';

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ text: '', image: null });

    const handlePostSubmit = () => {
        if (newPost.text || newPost.image) {
            const currentDate = new Date().toLocaleString();
            const newPostData = { ...newPost, date: currentDate, comments: [], likes: 0 };
            setPosts([newPostData, ...posts]); // Agregar nuevo post al inicio
            setNewPost({ text: '', image: null });
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setNewPost({ ...newPost, image: event.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddComment = (index, comment) => {
        if (comment.trim() === '') return;
        const updatedPosts = [...posts];
        updatedPosts[index].comments.push(comment);
        setPosts(updatedPosts);
    };

    const handleLike = (index) => {
        const updatedPosts = [...posts];
        updatedPosts[index].likes += 1;
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
                        {newPost.image && <img src={newPost.image} alt="Vista previa" style={{ borderRadius: '8px', width: '100%' }} />}
                        <button onClick={handlePostSubmit} style={{ padding: '8px 16px', backgroundColor: '#2e4e1e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Publicar</button>
                    </div>

                    {posts.map((post, index) => (
                        <div key={index} id={`post-${index}`} style={{ maxWidth: '640px', margin: '16px auto', backgroundColor: '#fbfada', padding: '16px', borderRadius: '8px', border: '2px solid #2e4e1e' }}>
                            {post.image && <img src={post.image} alt="Imagen del post" style={{ borderRadius: '8px', width: '100%' }} />}
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