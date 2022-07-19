import logo from './logo.svg';
import Bounce from './components/Bounce';
import './App.css';
import Main from './pages/Main';
import Member from './pages/Member';
import Three from './pages/Three';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Project from './pages/Project';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
  }
`

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path = "/" element= {<Main/>}></Route>
          <Route path = "/member" element= {<Member/>}></Route>
          <Route path = "/project" element= {<Project/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
