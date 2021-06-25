import { useEffect } from "react"
import { useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}> //Record eh um objeto

type Question = {
    id: string;
    author: {
        name: string,
        avatar: string
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<Question[]>([]) //tipo do estado eh um array de Question
    const [title, setTitle] = useState('') //tipo do estado eh um array de Question

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`); //referencia da sala na database

        //escuta o value que traz os valores de roomRef
        roomRef.on('value', room => { //once unica vez, on varias vez
            const databaseRoom = room.val() //val() => api do firebase pra buscar os dados de roomRef
            const firebaseQuestions = databaseRoom.questions as FirebaseQuestions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => { //retorna a key da pergunta e os atributos como um objeto
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length, //pode vir vazio
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0] //se nao retornar nada, nao tem como acessar [0], por isso o ?, se retornar pega o [0]
                }
            })

            setTitle(databaseRoom.title) //titulo da sala 
            setQuestions(parsedQuestions) //questoes
        });

        return () => {
            roomRef.off('value'); //remove todos os event listeners
        }
    }, [roomId, user?.id]) //toda vez que o id da sala mudar, useEffect eh executado de novo, sem isso o usuario pode navegar entre salas com os dados carregados

    return { questions, title }
}