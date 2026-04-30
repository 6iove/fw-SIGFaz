import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importando as páginas
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard/Dashboard'; 
import DashboardHome from './Pages/Dashboard/DashboardHome';
import Talhoes from './Pages/Dashboard/Talhoes';


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