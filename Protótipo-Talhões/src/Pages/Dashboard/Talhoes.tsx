import Button from "../../Components/Button";
// import SectionCard from "../../Components/SectionCard";
import { Download, Plus, Map, TrendingUp, DollarSign } from "lucide-react";
import Panel from "../../Components/Panel";

export default function Talhoes() {
  return (
    <div className="flex flex-col text-left m-10 g-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Gestão de Talhões</h1>
        <div className="flex flex-row justify-center items-center gap-4">
          <Button icon={<Download className="text-gray-600" size={20} />}  text="Exportar" bgColor="bg-gray-200" fontColor="text-gray-600" bgHover="bg-gray-100"/>
          <Button icon={<Plus className="text-white" size={20} />}  text="Novo Talhão" bgColor="bg-green-600" fontColor="text-white" bgHover="bg-green-400"/>
        </div>
      </div>
      <p className="mt-4 text-gray-600">Visualize e gerencie a produtividade de suas áreas produtivas.</p>
      <div className="w-full p-1 gap-3 flex flex-row items-center justify-center">
        <Panel bgColor="bg-green-100" title="ÁREA TOTAL GERENCIADA" icon={<Map className="text-gray-700" size={20} />} value="616.0 ha" subtitle="+12.5% em relação à última safra"/>
        <Panel bgColor="bg-white" title="PRODUÇÃO ESTIMADA" icon={<TrendingUp className="text-green-700" size={20} />} value="89.9k Scs" subtitle="Estimativa baseada no histórico local"/>
        <Panel bgColor="bg-blue-100" title="CUSTO MÉDIO OPERACIONAL" icon={<DollarSign className="text-gray-700" size={20} />} value="R$3.750,00" subtitle="Inclui insumos a maquinário"/>
      </div>


    </div>
  );
}