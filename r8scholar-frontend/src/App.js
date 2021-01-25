import './App.css';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account'; 
import Settings from './components/Settings'; 
import Professors from './components/Professors'; 
import Courses from './components/Courses'; 
import Navigation from './components/assets/Navigation'; 
import {Route, Link} from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Route exact path='/'component={Home} />
      <Route exact path='/about' component={About} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/settings' component={Settings} />
      <Route exact path='/account' component={Account} />
      <Route exact path='/professors' component={Professors} />
      <Route exact path='/courses' component={Courses} />
    </div>
  );
}

export default App;
