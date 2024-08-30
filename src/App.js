import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Display from './Display';
import User from './User'
import AllUser from './AllUsers'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Display displayed={0}></Display>}></Route>
        <Route path='/login' element={<Display displayed={0}></Display>}></Route>
        <Route path='/signup' element={<Display displayed={1}></Display>}></Route>
        <Route path='/user' element={<User></User>}></Route>
        <Route path='/alluser' element={<AllUser></AllUser>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
