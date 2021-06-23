import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

import illustrationImg from '../assets/images/illustration.svg' //forma correta de chamar a path da img com React
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'

import '../styles/auth.scss' //referencia ao css
import { useAuth } from '../hooks/useAuth'

export function NewRoom() { //Iniciar os componentes semppre com letra maiuscula

    const { user } = useAuth() //criou um hook em vez de useContext(AuthContext) e ter que fazer duas importacoes

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
                    <form>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
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