// src/auth.js
export const isAuthenticated = () => {
    const user = localStorage.getItem("user");
    return user ? true : false;
};

export const logout = () => {
    localStorage.removeItem("user");
};
