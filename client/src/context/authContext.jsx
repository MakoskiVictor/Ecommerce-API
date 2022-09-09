import { useContext } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const authContext = createContext();

const useAuth = () => {
    const context = useContext(authContext)
    if(!context) throw new Error("There is not auth provider")
    return context;
};

export default function AuthProvider ({children}) {
    const singup = (email, password) => {
        createUserWithEmailAndPassword()
    }

    return (
        <authContext.Provider value={{ singup }}>
            {children}
        </authContext.Provider>
    )
};