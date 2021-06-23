import { createContext, ReactNode, useState, useEffect } from "react";
import { auth, firebase } from '../services/firebase';

type User = {
    id: string, 
    name: string,
    avatar: string
}
  
type AuthContextType = {
    user: User | undefined, //User ou undefined, quando nao ha usuario logado
    signInWithGoogle: () => Promise<void> //promise sem retornar nada, eh so uma promise
}

type AuthContextProviderType = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType) // criacao do contexto do usuario

export function AuthContextProvider(props: AuthContextProviderType) {
    const [user, setUser] = useState<User>() //definicao do usuario como state do tipo <User>
 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => { //event listener para ouvir um event, detecta que um usuario jma tinha logado
        if (user) { //se o usuario tem informacoes dentro dele
            const { displayName, photoURL, uid } = user

            if (!displayName || !photoURL) {
                throw new Error("Missing information from google account")
            }

            setUser({
                id: uid, 
                name: displayName,
                avatar: photoURL
            })
        }
    })

        return () => {
            unsubscribe(); //boas praticas com react, descadastra de todos os event listeners de um useEffect, ele continuaria rodando mas daria erro
        }
    }, []) //params(function a fazer, array de monitoramento), colcoaria user dentro e a funcao dispararia sempre que o usur mudasse, para a function disparar 1 vez usa []

    async function signInWithGoogle() { //funcao para fazer login que seta o usuario (context) e eh compartilhado para toda a aplicacao
        const provider = new firebase.auth.GoogleAuthProvider()

        const result = await auth.signInWithPopup(provider)

        if (result.user) {
            const { displayName, photoURL, uid } = result.user

            if (!displayName || !photoURL) {
                throw new Error("Missing information from google account")
            }

            setUser({
                id: uid, 
                name: displayName,
                avatar: photoURL
            })
        }
    }
  
    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}