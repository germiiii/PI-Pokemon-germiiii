import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Home, Landing, Detail, Form } from './views';
import { Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}
      <Route exact path='/' component={Landing} />
      <Route path='/home' component={Home} />
      <Route path='/detail' component={Detail} />
      <Route path='/create' component={Form} />
    </div>
  );
}

export default App;
