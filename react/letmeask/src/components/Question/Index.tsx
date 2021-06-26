import { ReactNode } from 'react';
import cx from 'classnames';
import './styles.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode; //qualquer estrutura/conteudo tsx
    isAnswered?: boolean
    isHighlighted?: boolean
}

export function Question({
    content, author, children, isAnswered = false, isHighlighted = false
}: QuestionProps) {
    return (
        <div 
            className={cx(
                'question',
                { answered: isAnswered },
                { highlighted: isHighlighted && !isAnswered } //so se aplica se nao tiver respondida
            )} //cx from classnames que coloca as classes de forma dinamica, so eh inserida se for truue
        >
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}