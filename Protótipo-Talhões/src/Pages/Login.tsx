
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    
    navigate('/dashboard');
  };

  return (
    <>
      
      <div className="bg-[#1dd05f] m-0 font-sans min-h-screen flex flex-col justify-center items-center">
       
        
        <div className="flex flex-col bg-white w-[90%] max-w-100 p-7.5 rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
            
           
            <div className="flex flex-col items-center justify-center text-center mb-5">
                {/* <img src="Sigfaz-Imagem.png" alt="ImagemSigFaz" className="max-w-[150px]" /> */}
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Acesse sua Fazenda</h2>
                <span className="text-[14px] text-[#555]">
                  Gestão integrada para produtores rurais que buscam eficiência e rentabilidade
                </span>
            </div>

            {/* Campo: E-mail */}
            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700">E-mail ou Usuário</label>
                <input 
                  type="text" 
                  placeholder="nome@exemplo.com"
                  className="w-full p-2.5 mt-1.25 mb-3.75 box-border border border-[#ccc] rounded-[5px] outline-none focus:border-[#1dd05f]"
                />
            </div>
            
            
            <div className="flex justify-between items-end">
                <label className="text-sm font-semibold text-gray-700">Senha</label>
                <span className="text-[12px] text-[#1dd05f] text-right mb-1.25 cursor-pointer hover:underline">
                  Esqueci minha senha
                </span> 
            </div>
            <div>
                <input 
                  type="password" 
                  placeholder="************"
                  className="w-full p-2.5 mt-1.25 mb-3.75 box-border border border-[#ccc] rounded-[5px] outline-none focus:border-[#1dd05f]"
                />
            </div>
            
            
            <div className="text-[14px] flex items-center text-gray-700">
                <input 
                  type="checkbox" 
                  id="lembrar" 
                  className="mr-1.25 cursor-pointer"
                />
                <label htmlFor="lembrar" className="cursor-pointer select-none">
                  Lembrar deste dispositivo
                </label>
            </div>
            
            
            <div>
                
                <button 
                  onClick={handleLogin} 
                  className="bg-[#1dd05f] hover:bg-[#15a94c] text-white border-none p-2.5 w-full text-[16px] rounded-[5px] cursor-pointer mt-3.75 transition-colors duration-200"
                >
                  Entrar no sistema
                </button>
            </div>
            
            
            <hr className="w-full border-t border-[#eee] my-5" />
            
           
            <div className="text-center text-[13px] mt-3.75 text-[#555]">
                Ainda não tem uma conta?{' '}
                <span className="text-[14px] text-[#1dd05f] font-semibold cursor-pointer hover:underline">
                  Solicite Acesso
                </span>
                <br className="my-2" />
                <span className="cursor-pointer hover:underline">Precisa de suporte técnico?</span>
            </div>
        </div>

        
        <div className="text-white mt-5 text-[12px] text-center">
            &copy; © 2026 SIGFaz - Sistema Integrado de Gestão Fazendária. Todos os direitos reservados.
        </div>
       
      </div>
    </>
  )
}

export default Login