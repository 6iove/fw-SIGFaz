import { Plus, Search, Eye, Edit3, Trash2, LayoutDashboard, Package, Sprout,} from 'lucide-react'; 
import Button from '../../Components/Button';
import { useState } from 'react';
import ModalNovoCadastro from '../../Components/componentsFazenda/ModalCadastroFazenda';

export default function FazendasPage() {

  const[isModalOpen, setIsModalOpen] = useState(false);

  // Dados fictícios baseados na sua tabela de fundo
  const fazendas = [
    { id: 1, nome: 'Fazenda Santa Maria', producao: '8,500' },
    { id: 2, nome: 'Estância Vale Verde', producao: '5,200' },
    { id: 3, nome: 'Sítio Novo Horizonte', producao: '-' },
    { id: 4, nome: 'Fazenda Progresso', producao: '14,200' },
    { id: 5, nome: 'Gleba Esperança', producao: '1,800' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-slate-700 font-sans">
      <main className="flex-1 flex flex-col">
        <div className="p-8  w-full mx-auto space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Fazendas</h1>
              <p className="text-sm text-slate-500">Gerencie suas unidades de produção cadastradas no sistema.</p>
            </div>
             <Button  onClick={() => setIsModalOpen(true)} icon={<Plus className="text-white" size={20} />}  text="Nova Fazenda" bgColor="bg-green-600" fontColor="text-white" bgHover="bg-green-400"/>

            {isModalOpen && <ModalNovoCadastro onClose={() => setIsModalOpen(false)} />}
              
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total de Áreas</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">12.450 <span className="text-xs text-slate-400 font-normal">ha</span></p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                <LayoutDashboard size={20} />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Produção Estimada</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">31.500 <span className="text-xs text-slate-400 font-normal">t</span></p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                <Sprout size={20} />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Responsáveis Ativos</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">08 <span className="text-xs text-slate-400 font-normal">colaboradores</span></p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                <Package size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            
            <div className="p-4 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between bg-slate-50/50">
              <div className="relative max-w-md w-full">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar por nome..." 
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
              <button className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition px-3 py-2 border border-slate-200 bg-white rounded-lg">
                Limpar
              </button>
            </div>

            {/* Tabela de Dados */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-medium text-xs uppercase tracking-wider">
                    <th className="py-3 px-6">Nome</th>
                    <th className="py-3 px-6 text-right">Produção Est. (t)</th>
                    <th className="py-3 px-6 text-center w-32">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {fazendas.map((fazenda) => (
                    <tr key={fazenda.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-6 font-medium text-slate-800">{fazenda.nome}</td>
                      <td className="py-3.5 px-6 text-right font-mono text-slate-600">{fazenda.producao}</td>
                      <td className="py-3.5 px-6">
                        <div className="flex items-center justify-center gap-2 text-slate-400">
                          <button className="p-1 hover:text-emerald-600 hover:bg-emerald-50 rounded transition" title="Visualizar">
                            <Eye size={16} />
                          </button>
                          <button className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded transition" title="Editar">
                            <Edit3 size={16} />
                          </button>
                          <button className="p-1 hover:text-rose-600 hover:bg-rose-50 rounded transition" title="Excluir">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-400 text-center">
              © 2026 SIGFaz. Todos os direitos reservados.
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}