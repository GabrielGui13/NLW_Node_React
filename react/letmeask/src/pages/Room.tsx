import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router'; //resgatar parametros passados na rota
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { Link } from 'react-router-dom';
import '../styles/room.scss'

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}> //Record eh um objeto

type RoomParams = {
    id: string;
}

type Question = {
    id: string;
    author: {
        name: string,
        avatar: string
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>(); //tipagem
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]) //tipo do estado eh um array de Question
    const [title, setTitle] = useState('') //tipo do estado eh um array de Question
    const roomId = params.id;

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
                    isAnswered: value.isAnswered
                }
            })

            setTitle(databaseRoom.title) //titulo da sala 
            setQuestions(parsedQuestions) //questoes
        });
    }, [roomId]) //toda vez que o id da sala mudar, useEffect eh executado de novo, sem isso o usuario pode navegar entre salas com os dados carregados

    async function handleSendQuestion(event: FormEvent): Promise<void> {
        event.preventDefault();
        
        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name, 
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question); //cria uma nova inforamcao na sala chamada question e insere

        setNewQuestion(''); //zera a questao apos enviar, e sai no textarea
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    {/* {user ? <Link to="/rooms/new"><img src={logoImg} alt="" /></Link> : <Link to="/"><img src={logoImg} alt="" /></Link>} */}
                    <img src={logoImg} alt="" />
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que voce quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta <button>faca seu login</button> </span>
                        ) }
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
};