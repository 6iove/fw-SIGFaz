import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importando as páginas
import Login from './Login';
import Dashboard from './Dashboard'; 


import DashboardHome from './DashboardHome';
import Talhoes from './Talhoes';


function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Login />} />
        
        
        <Route path="/dashboard" element={<Dashboard />}>
          
          
          <Route index element={<DashboardHome />} />
          
          
          <Route path="talhoes" element={<Talhoes />} />
          
          
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;