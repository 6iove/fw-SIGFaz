
import { Outlet, useNavigate, Link } from 'react-router-dom'; 
import MenuItem from '../../Components/MenuItem';

function Dashboard() {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
  };

  


  return (
    <>
      
      <div className="flex h-screen bg-gray-50">
        
        {/* Menu lateral */}
        
        <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col justify-between p-4 shadow-sm">
          
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center">SIGFaz</h2>
            </div>
            
            
            <div className="flex flex-col gap-2 text-gray-600 font-medium">
              <MenuItem direction="/dashboard" text="Dashboard" />
              <MenuItem direction="/dashboard/talhoes" text="Talhões" />
              <MenuItem direction="/dashboard/maquinas" text="Máquinas" />
              <MenuItem direction="/dashboard/culturas" text="Culturas" />
              <MenuItem direction="/dashboard/insumos" text="Insumos" />
              <MenuItem direction="/dashboard/atividades" text="Atividades" />
              <MenuItem direction="/dashboard/lucro" text="Lucro" />
              <MenuItem direction="/dashboard/gastos" text="Gastos" />
            </div>
          </div>

          
          <div className="mt-auto pt-4 border-t border-gray-100">
            <Link to="/dashboard/configuracoes" className="block p-2 text-gray-600 font-medium hover:bg-gray-100 rounded cursor-pointer mb-3 transition-colors">
              Configurações
            </Link>
            <button 
              onClick={handleExit}
              className="bg-[#1dd05f] hover:bg-[#15a94c] text-white border-none p-2.5 w-full text-[16px] font-bold rounded-[5px] cursor-pointer transition-colors duration-200"
            >
              Sair
            </button>
          </div>
          
        </div>

        
        <div className="flex-1 p-8 overflow-y-auto flex flex-col">
          <header>
            {/* Principal */}
            <div className="flex items-center justify-between mb-8">
                  {/* Esquerda */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1><h2>GESTÃO AGRÍCOLA</h2>
                </div>
                {/* Direita */}
                <div>

                </div>

            </div>
            {/* Foto */}
            <div>

            </div>
            
            
          </header>

          <main className='flex-1'><Outlet /></main>
          
          

          <footer className="mt-8 pt-4 text-center text-sm text-gray-500 border-t border-gray-300">
            &copy; 2026 SIGFaz - Sistema Integrado de Gestão Fazendária. Todos os direitos reservados.
          </footer>
        </div>
        
      </div>
    </>
  )
}

export default Dashboard;