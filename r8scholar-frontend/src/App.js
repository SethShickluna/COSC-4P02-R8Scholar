import './App.css';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account'; 
import Settings from './components/Settings'; 
import Instructors from './components/Instructors'; 
import Courses from './components/Courses'; 
import Navigation from './components/assets/Navigation'; 
import Foot from './components/assets/Foot'; 
import {Route, Link} from 'react-router-dom'; 

//this will be an api call but is here for testing purposes
const courseInfo = {
  name: "COSC 2P03", 
  avgRating: "2.7",
}

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
        <Route exact path='/professors' component={Instructors} />
        <Route exact path='/courses' render={(props) => <Courses course={courseInfo}/>} />
      <Foot/>
    </div>
  );
}

export default App;
