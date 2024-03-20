import './App.css';
import { Routes,Route } from 'react-router';
import Home from './Pages/Home';
import AddEmployee from './Pages/AddEmployee';
import Login from './Pages/Login';
function App() {
  return (
    <div className="App">
          <Routes>
            <Route path='/' element={<Home/>}/>
             <Route path='/addEmployee' element={<AddEmployee/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        
    </div>
  );
}

export default App;
