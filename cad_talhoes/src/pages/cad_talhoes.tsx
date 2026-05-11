import Button from '../components/Button'
import SectionCard from '../components/SectionCard'
import { Leaf, Calendar, Droplet, User, X, Save } from 'lucide-react'

export default function CadTalhoes() {
  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Card principal */}
        <div className="rounded-2xl p-10">
          
          {/* Cabeçalho */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mb-12">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-gray-900"> Novo Cadastro de Talhão</h1>
              <p className="max-w-1xl text-gray-600"> Preencha as informações abaixo para registrar uma nova área produtiva ou atualizar uma cultura existente.</p>
            </div>
          </div>

          {/* Seções */}
          <div className="space-y-10">
            
            {/* Informações Gerais */}
            <SectionCard
              bgIcon="bg-green-100"
              icon={<Leaf size={22} className="text-green-600" />}title="Informações Gerais" subtitle="Identifique o local e a extensão da área.">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nome do Talhão</label>
                  <input type="text" placeholder="Ex: Talhão Norte 01" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Área Total (Hectares)</label>
                  <input type="number" placeholder="0.00" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200" />
                </div>
              </div>
            </SectionCard>

            {/* Planejamento de Safra */}
            <SectionCard
              bgIcon="bg-blue-100"
              icon={<Calendar size={22} className="text-blue-600" />}
              title="Planejamento de Safra"
              subtitle="Defina a cultura e o cronograma de plantio."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Cultura Plantada</label>
                  <select className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200">
                    <option>Selecione a cultura</option>
                    <option>Soja</option>
                    <option>Milho</option>
                    <option>Feijão</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Data de Plantio</label>
                  <input type="date" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"/>
                </div>
              </div>
            </SectionCard>

            {/* Recursos e Operação */}
            <SectionCard bgIcon="bg-yellow-100" icon={<Droplet size={22} className="text-yellow-600" />} title="Recursos e Operação" subtitle="Insumos, maquinário e pessoal responsável.">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Insumos Utilizados</label>
                  <select className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200">
                    <option>Selecione o insumo principal</option>
                    <option>Adubo</option>
                    <option>Herbicida</option>
                    <option>Sementes</option>
                  </select>
                  <p className="text-gray-500 text-sm">Estoque atual: 1000 kg</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Máquina Utilizada</label>
                  <select className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200">
                    <option>Selecione a máquina</option>
                    <option>Trator</option>
                    <option>Plantadeira</option>
                    <option>Pulverizador</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Operador Responsável
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nome completo do operador"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Botão final */}
          <div className="mt-12 flex justify-end gap-2.5">
            <Button icon={<X size={15} />} bgColor="bg-gray-200" fontColor="text-black" text="Cancelar" bgHover="hover:bg-gray-600"/>
            <Button icon={<Save size={15} color='white'/>} bgColor="bg-green-600" fontColor="text-white" text="Salvar Cadastro" bgHover="hover:bg-green-700"/>
          </div>
        </div>
      </div>
    </div>
  )
}
