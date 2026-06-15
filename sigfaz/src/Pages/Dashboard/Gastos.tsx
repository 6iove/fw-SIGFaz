import Button from "../../Components/Button";
import Panel from "../../Components/Panel";
import grafico from '../../assets/grafico.jpg';
import grafico_rosca from "../../assets/grafico_rosca.jpg"
import { useNavigate } from "react-router-dom";
import { Download, Plus, Calendar, Filter, Search, ChevronDown, DollarSign, ChartColumn, TrendingUp, Eye, Edit2, Trash2, Lightbulb } from "lucide-react";

export default function Gastos() {
  const navigate = useNavigate()

  const lancamentos = [
    { id: 1, data: "12/05/2024", desc: "Fertilizante NPK 04-14-08", subDesc: "Soja Safra 24", cat: "Insumos", fazenda: "Fazenda Sol Nascente", valor: "R$ 12.500,00" },
    { id: 2, data: "10/05/2024", desc: "Manutenção Trator JD 6125", subDesc: "Máquina #TR-04", cat: "Manutenção", fazenda: "Fazenda Boa Vista", valor: "R$ 3.200,50" },
    { id: 3, data: "08/05/2024", desc: "Óleo Diesel S10 - 500L", subDesc: "Operacional", cat: "Combustível", fazenda: "Fazenda Sol Nascente", valor: "R$ 4.150,00" },
    { id: 4, data: "05/05/2024", desc: "Pagamento Diaristas - Colheita", subDesc: "Milho Safrinha", cat: "Mão de Obra", fazenda: "Fazenda Boa Vista", valor: "R$ 2.800,00" },
    { id: 5, data: "02/05/2024", desc: "Sementes de Milho Pioneer", subDesc: "Insumo #SM-22", cat: "Insumos", fazenda: "Fazenda Alvorada", valor: "R$ 18.900,00" },
  ];

  return (
    <div className="flex flex-col text-left m-10 g-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Gastos</h1>

        <div className="flex flex-row justify-center items-center gap-4">
          <Button icon={<Download className="text-gray-600" size={20} />}  text="Exportar" bgColor="bg-gray-200" fontColor="text-gray-600" bgHover="bg-gray-100"/>
          <Button onClick={() => navigate("/dashboard/CadTalhoes")} icon={<Plus className="text-white" size={20} />}  text="Novo Talhão" bgColor="bg-green-600" fontColor="text-white" bgHover="bg-green-400"/>
        </div>
      </div>
      <p className="mt-4 text-gray-600">Controle e análise dos fluxos financeiros operacionais</p>

      <div className="mt-6 flex flex-row items-center justify-between boder-gray-100 rounded-xl p-3 bg-white shadow-sm gap-4">

        <div className="flex items-center gap-4">

          <label className="flex items-center gap-2 px-3 py-2 bg-transparent hover:bg-gray-50 rounded-md cursor-pointer transition-colors w-48 border border-transparent focus-within:border-gray-200 relative">
            <div className="flex items-center gap-2 w-full min-w-0">
              <Calendar className="text-gray-500 shrink-0" size={18} />
              <select className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer w-full appearance-none pr-6 truncate">
                <option value="este-mes">Este Mês</option>
                <option value="ultimos-60">Últimos 60 dias</option>
                <option value="ultimos-90">Últimos 90 dias</option>
                <option value="este-ano">Este Ano</option>
              </select>
            </div>
            <ChevronDown className="text-gray-500 shrink-0 absolute right-3 pointer-events-none" size={16} />    
          </label>

          <label className="flex items-center gap-2 px-3 py-2 bg-transparent hover:bg-gray-50 rounded-md cursor-pointer transition-colors w-48 border border-transparent focus-within:border-gray-200 relative">
            <div className="flex items-center gap-2 w-full min-w-0">
              <Filter className="text-gray-500 shrink-0" size={18} />
              <select className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer w-full appearance-none pr-6 truncate">
                <option value="todas">Todas as Fazendas</option>
                <option value="fazenda-a">Fazenda Alvorada</option>
                <option value="fazenda-b">Fazenda Progresso</option>
                <option value="fazenda-c">Fazenda Santa Maria</option>
              </select>
            </div>
            <ChevronDown className="text-gray-500 shrink-0 absolute right-3 pointer-events-none" size={16} />
          </label>

        </div>

        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 w-72">
          <Search className="text-gray-400 shrink-0" size={18} />
          <input type="text" placeholder="Buscar lançamentos..." className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400" />
        </div>
      </div>

      <div className="w-full p-1 gap-3 flex flex-row items-center justify-center">
        <Panel bgColor="bg-white" title="Gasto Total (Mês)" subtitleColor="text-red-600" icon={<DollarSign className="text-gray-700" size={20} />} value="R$142.500,00" subtitle="+8.2% em relação ao mês anterior" />
        <Panel bgColor="bg-white" title="Custo Médio por Ha" icon={<ChartColumn className="text-gray-700" size={20} />} value="R$2.450,00" subtitle="-3.1% abaixo da média anual" />
        <Panel bgColor="bg-white" title="Insumo Mais Utilizado" icon={<TrendingUp className="text-green-700" size={20} />} value="Ferilizante NPK" subtitle="Responsável por 32% dos custos" />
      </div>

      <div className="flex flex-row w-full gap-6 items-stretch mt-4">

          <div className="flex flex-col justify-between items-start flex-1 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-col gap-1 text-left">
              <h3 className="text-lg font-bold text-gray-800">Evolução Mensal de Gastos</h3>
              <p className="text-sm text-gray-500 mt-1">Gastos totais consolidados no primeiro semestre de 2025</p>
            </div>

            <div className="w-[450px] max-w-full h-auto overflow-hidden flex items-center justify-center">
              <img src={grafico} alt="Gráfico de Produção" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="flex flex-col w-96 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm justify-between">
            <div className="flex flex-col gap-1 text-left">
              <h3 className="text-lg font-bold text-gray-800">Gastos por Categoria</h3>
              <p className="text-sm text-gray-500 mt-1">Distribuição percentual mensal</p>
            </div>

            <div className="flex justify-center items-center my-4">
              <img src={grafico_rosca} alt="Grafico de Gastos" className="w-full h-full object-contain" />
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm font-medium text-gray-600">
              
              {/*insumos*/}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <span>Insumos</span>
                </div>
                <span className="font-bold text-gray-800">45%</span>
              </div>
              
              {/*mao de obra*/}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span>Mão de Obra</span>
                </div>
                <span className="font-bold text-gray-800">25%</span>
              </div>

              {/*manutencao*/}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                  <span>Manutenção</span>
                </div>
                <span className="font-bold text-gray-800">15%</span>
              </div>

              {/*combustivel*/}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>Combustível</span>
                </div>
                <span className="font-bold text-gray-800">15%</span>
              </div>

            </div>
          </div>

        </div>    
        
        <div className="flex flex-row w-full gap-6 items-start mt-2">

          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Últimos Lançamentos</h3>
                <p className="text-sm text-gray-500 mt-1">Lista detalhada de despesas recentes</p>
              </div>
              <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">Ver histórico completo</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-sm font-semibold text-gray-500 bg-gray-50/50">
                    <th className="py-3 px-4">Data</th>
                    <th className="py-3 px-4">Descrição</th>
                    <th className="py-3 px-4">Categoria</th>
                    <th className="py-3 px-4">Fazenda / Talhões</th>
                    <th className="py-3 px-4 text-right">Valor (R$)</th>
                    <th className="py-3 px-4 text=center">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {lancamentos.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4 text-gray-500 whitespace-nowrap">{item.data}</td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-800">{item.desc}</div>
                        <div className="text-xs text-gray-400 italic">{item.subDesc}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 border border-gray-200/50">
                          {item.cat}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{item.fazenda}</td>
                      <td className="py-4 px-4 font-bold text-gray-800 text-right whitespace-nowrap">{item.valor}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-3 text-gray-400">
                          <button className="hover:text-gray-600"><Eye size={16} /></button>
                          <button className="hover:text-gray-600"><Edit2 size={16} /></button>
                          <button className="hover:text-gray-600"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-96 flex flex-col gap-6">
            <div className="bg-emerald-50/40 rounded-2xl border border-emerald-100/50 p-6 flex flex-col gap-4">
              <div>
                <Lightbulb size={18} />
                <span>Insights do Gestor</span>
                </div> 
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">Otimização de Insumos</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Seus gastos com Fertilizantes na Fazenda Sol Nascente está 12% acima da média da região. Considere revisar a regulagem das semeadoras.</p>
                  </div>  
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-sm text-gray-800">Alerta de Manutenção</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">O custo de manutenção preventiva subiu este mês, mas reduziu em 30% as paradas não programadas no Talhão 04</p>
                  </div>   
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Metas Financeiras</h3>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs font-semibold text-gray-700">
                      <span>Orçamento Insumos</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs font-semibold text-gray-700">
                      <span>Mão de Obra Safra</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <button className="w-full mt-2 py-2 text-center text-xs font-bold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Configurar Alertas</button>
                </div>
              <div>
            </div>    
          </div>
        </div>

    </div>
  );
}