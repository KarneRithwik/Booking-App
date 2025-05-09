"use client";
import { createContext, useContext, useState } from "react";

//create global context
const GlobalContext = createContext();

//create a provider component 
export function GlobalProvider({ children }) {
    const { unreadCount, setUnreadCount } = useState(0);

    return (
        <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
            {children}
        </GlobalContext.Provider>
    )
}

//create a custom hook to use the global context
export function useGlobalContext() {
    return useContext(GlobalContext);
}