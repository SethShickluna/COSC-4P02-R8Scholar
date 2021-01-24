import './App.css';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/assets/Navigation'; 
import {Route, Link} from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <Route exact path='/'component={Home} />
      <Route exact path='/about' component={About} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
    </div>
  );
}

export default App;
