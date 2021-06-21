import { useState } from "react"

export function Button() {
    //let counter = 0\
    const [counter, setCounter] = useState(0) //retorna um vetor, usa destructuring, o valor e depois uma funcao

    /* nao modifica informacoes, ele cria novas */

    function increment() {
        /* counter += 1 */
        // console.log(counter) //aumenta apenas no console mas nao no botao
        setCounter(counter + 1) //deve ser chamada com o novo valor pra entregar
    }

    return (
        <button onClick={increment}>
            {counter}
        </button>
    )
}