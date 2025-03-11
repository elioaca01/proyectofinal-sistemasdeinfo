const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: JSON.parse(localStorage.getItem("token")) || null,
            user: JSON.parse(localStorage.getItem("user")) || null 
        },
        actions: {
            addToken: (tk) => {
                setStore({ token: tk });
                localStorage.setItem("token", JSON.stringify(tk));
            },
            close: () => {
                setStore({
                    token: null,
                    user: null  
                });
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            },
            setUser: (user) => { 
                setStore({ user });
                localStorage.setItem("user", JSON.stringify(user));
            },
            clearUser: () => {  
                setStore({ user: null });
                localStorage.removeItem("user");
            }
        }
    };
};

export default getState;
