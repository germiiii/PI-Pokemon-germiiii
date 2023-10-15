import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Home, Landing, Detail, Form } from './views';
import { Route, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}
      <Route exact path='/' render={()=><Landing/>} />
      <Route path='/home' render={()=><Home/>} />
      <Route path='/detail' render={()=><Detail/>} />
      <Route path='/create' render={()=><Form/>} />

    </div>
  );
}

export default App;
