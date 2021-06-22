import { ButtonHTMLAttributes } from 'react' //importa todos os atributos que o button do html pode receber

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> //informa o tipo do button 

export function Button(props: ButtonProps) { //botao pode receber propriedades ButtonHTMLAttributes
    return (
        <button className="button" {...props}/> //operador rest que distribui todos os atributos
    )
}