import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg' ;//forma correta de chamar a path da img com React
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss' //referencia ao css
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function NewRoom() { //Iniciar os componentes semppre com letra maiuscula

    const { user } = useAuth() //criou um hook em vez de useContext(AuthContext) e ter que fazer duas importacoes
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) { //event representa os atributos e caracteristicas do formulario
        event.preventDefault(); //previne o autoreload do form 

        if (newRoom.trim() === '') { //remove todos os espacos em branco e checa se vira ''
            return;
        }

        const roomRef = database.ref('rooms'); //referindo a uma entidade/categoria dentro da database

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        history.push(`/rooms/${firebaseRoom.key}`) //retorna o registro o unico de cada sala criada
    }

    return (
        <div id="page-auth">
            <aside> 
                <img src={illustrationImg} alt="Ilustracao simbolizando FAQ" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as duvidas da sua audiencia em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logotipo letmeask" />
                    <h2>Criar uma nova sala </h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                        <p>
                            Quer entrar em uma sala existente <Link to="/">clique aqui</Link>
                        </p>
                </div>
            </main>
        </div>
    )
    // o Link     <Link to="/">clique aqui</Link>    simula um    <a href="/">clique aqui</a>
}