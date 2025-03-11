// src/auth.js
export const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? true : false;
};

export const logout = () => {
    localStorage.removeItem("user");
    window.location.reload(); // Recarga para actualizar el contexto
};
