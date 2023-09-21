import { createContext, useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { fireDb } from '../firebase';
import { Navigate, useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(fireDb);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadStoreAuth = () => {
            const sessionUser = sessionStorage.getItem("@AuthFirebase.user");
            const sessionToken = sessionStorage.getItem("@AuthFirebase.token");
            if (sessionToken && sessionUser) {
                setUser(sessionUser);
            }
        };
        loadStoreAuth();
    }, []);

    const signInGoogle = () => {
        const auth = getAuth(fireDb);
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                setUser(user);
                sessionStorage.setItem("@AuthFirebase.user", JSON.stringify(user));
                sessionStorage.setItem("@AuthFirebase.token", token);
                setTimeout(function() {
                    window.location.reload(1);
                  }, 10);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
 

    };

    function signOut() {
        sessionStorage.clear();
        setUser(null);

    };


    return (
        <AuthGoogleContext.Provider
            value={{ signInGoogle, signed: !!user, user, signOut }}>
            {children}
        </AuthGoogleContext.Provider>
    );
};