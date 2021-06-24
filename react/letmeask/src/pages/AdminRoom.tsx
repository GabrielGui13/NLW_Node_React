import { useParams } from 'react-router'; //resgatar parametros passados na rota
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import '../styles/room.scss'
import { Question } from '../components/Question/Index';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    //const { user } = useAuth();
    const params = useParams<RoomParams>(); //tipagem
    const roomId = params.id;
    const { title, questions } = useRoom(roomId); 

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    {/* {user ? <Link to="/rooms/new"><img src={logoImg} alt="" /></Link> : <Link to="/"><img src={logoImg} alt="" /></Link>} */}
                    <img src={logoImg} alt="" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined> Encerrar sala</Button>
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
                            />
                        )
                    })}
                </div>
            </main>
        </div>
    )
};