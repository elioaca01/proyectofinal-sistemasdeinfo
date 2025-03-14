import React, { useState } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        // Definición de funciones antes del uso en actions
        const setUser = (user) => {
            setState((prevState) => ({
                ...prevState,
                store: { ...prevState.store, user },
            }));
            localStorage.setItem("user", JSON.stringify(user)); 
        };

        const clearUser = () => {
            setState((prevState) => ({
                ...prevState,
                store: { ...prevState.store, user: null },
            }));
            localStorage.removeItem("user"); 
        };

        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: {
                            ...state.actions,
                            setUser,     
                            clearUser,   
                        },
                    }),
            })
        );

        // Log para verificar si setUser es una función
        console.log("Context Actions:", state.actions);
        console.log("setUser es una función:", typeof state.actions.setUser === "function");

        return (
            <Context.Provider value={{ state, actions: state.actions }}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;
