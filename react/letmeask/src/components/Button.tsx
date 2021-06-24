import { ButtonHTMLAttributes } from 'react' //importa todos os atributos que o button do html pode receber

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
}; //informa o tipo do button 

export function Button({ isOutlined = false, ...props}: ButtonProps) { //botao pode receber propriedades ButtonHTMLAttributes
    return (
        <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props}/> //operador rest que distribui todos os atributos, caso outlined = true, add outra classe
    )
}