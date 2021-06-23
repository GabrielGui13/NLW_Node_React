//web components tudo em react sao components, todas as coisas ficam dentro do App() 
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';


import { AuthContextProvider } from './contexts/AuthContext';

function App() { //deve ter apenas um unico elemento de html global, como uma div container ou body, se importar html direto
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
} //AuthContext envia o contexto para todas as aplicacoes atraves do export la em cima

//exact eh importante para ser a rota exata, se nao ele leria o / do NewRoom e mostraria duas paginas 
//Switch impede que duas rotas sejam contempladas se um ja for satisfeita

export default App;
