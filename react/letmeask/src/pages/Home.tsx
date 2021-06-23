import { useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg' //forma correta de chamar a path da img com React
import logoImg from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'

import '../styles/auth.scss' //referencia ao css
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

export function Home() { //Iniciar os componentes sempre com letra maiuscula
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth() //criou um hook em vez de useContext(AuthContext) e ter que fazer duas importacoes
    const [ roomCode, setRoomCode ] = useState(''); //lembrar sempre de passar o valor inicial

    async function handleCreateRoom() { //funcao para enviar para nova rota, primeira alternativa
        if (!user) { //checa se o usuario esta autenticado
            await signInWithGoogle() //esperar a autenticacao para redirecionar
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();
        
        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get() //acessar a categoria rooms

        if (!roomRef.exists()) {
            alert ('Room does not exist')
            return;
        }

        history.push(`/rooms/${roomCode}`)
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIcon} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o codigo da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}