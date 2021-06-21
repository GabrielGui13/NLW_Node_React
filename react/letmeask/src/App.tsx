//web components tudo em react sao components, todas as coisas ficam dentro do App() 

import { Button } from './components/Button' 

function App() { //deve ter apenas um unico elemento de html global, como uma div container ou body, se importar html direto
  return (
    <div>
      <h1>Hello World! oi</h1>
      <Button/> 
      <Button/>
    </div>
  );
}

export default App;
