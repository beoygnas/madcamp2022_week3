import logo from './logo.svg';
import Bounce from './components/Sketch';
import './App.css';
import Main from './pages/Main';
import Member from './pages/Member';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element= {<Main/>}></Route>
          <Route path = "/member" element= {<Member/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
