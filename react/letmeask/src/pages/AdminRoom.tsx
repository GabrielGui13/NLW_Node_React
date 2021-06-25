import { useParams } from 'react-router'; //resgatar parametros passados na rota
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg'; 
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss'
import { Question } from '../components/Question/Index';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import { useHistory } from 'react-router-dom';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    //const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>(); //tipagem
    const roomId = params.id;

    const { title, questions } = useRoom(roomId); 

    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date() //cria um novo atributo de finalizacao
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir essa pergunta')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    {/* {user ? <Link to="/rooms/new"><img src={logoImg} alt="" /></Link> : <Link to="/"><img src={logoImg} alt="" /></Link>} */}
                    <img src={logoImg} alt="" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}> Encerrar sala </Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id} //nao pode ter coisas repetidas, é assim que o react diferencia as perguntas
                                content={question.content}
                                author={question.author}
                            >   
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
};