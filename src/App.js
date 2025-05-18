// import './App.css';
import { Routes, Route } from 'react-router-dom';
// import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
// import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path='/Login'element= {<LoginPage/>}/>
        <Route path="/HomePage" element={<HomePage/>}/>
      </Routes>
    </>
  );
}

export default App;
