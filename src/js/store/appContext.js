import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Inicializa el contexto
export const Context = React.createContext(null);

// Función para inyectar el contexto
const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        // Estado que se pasará como valor del contexto
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions },
                    }),
            })
        );

        // Función para establecer el usuario en el estado
        const setUser  = (user) => {
            setState((prevState) => ({
                ...prevState,
                store: { ...prevState.store, user }, // Actualiza el estado del usuario en el contexto
            }));
        };

        // Función para limpiar el usuario (por ejemplo, al cerrar sesión)
        const clearUser  = () => {
            setState((prevState) => ({
                ...prevState,
                store: { ...prevState.store, user: null }, // Limpia el usuario
            }));
        };


        // Proporciona el estado y las acciones al contexto
        return (
            <Context.Provider value={{ state, setUser , clearUser  }}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;
