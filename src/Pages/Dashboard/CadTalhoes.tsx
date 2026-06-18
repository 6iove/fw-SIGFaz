import { useState } from "react";
import { Leaf, Calendar, Droplet, User, Save } from "lucide-react";

import Button from "../../Components/componentsCadTalhoes/Button";
import SectionCard from "../../Components/SectionCard";

interface TalhaoFormData {
  id: number;
  nome: string;
  area_hectares: string;
  cultura_id: string;
  data_plantio: string;
  insumo: string;
  maquina_id: string;
  operador: string;
}

// Dados mockados 
const dadosMockados: TalhaoFormData = {
  id: 0,
  nome: "Talhão Experimental Vale do Sol",
  area_hectares: "145.5",
  cultura_id: "2",
  data_plantio: "2026-10-15",
  insumo: "Adubo",
  maquina_id: "1",
  operador: "Carlos Alberto Silveira",
};

export default function CadTalhoes() {
  const [formData, setFormData] = useState(dadosMockados);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  function salvarTalhao() {
    console.log("Dados enviados:", formData);

    alert(
      "Talhão cadastrado com sucesso!"
    );
  }

  return (
    <div className="min-h-screen px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl p-10">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900"> Novo Cadastro de Talhão</h1>
            <p className="mt-3 text-gray-600 max-w-2xl">
              Preencha as informações abaixo para registrar uma nova
              área produtiva.
            </p>
          </div>

          <div className="space-y-10">
            <SectionCard
              bgIcon="bg-green-100"
              icon={<Leaf size={22} className="text-green-600" />}
              title="Informações Gerais"
              subtitle="Identifique o local e a extensão da área.">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Nome do Talhão</label>

                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Ex: Talhão Norte 01"
                    className="w-full rounded-lg border px-4 py-3"/>
                </div>

                <div>
                  <label className="text-sm font-medium">Área Total (ha)</label>

                  <input
                    type="number"
                    name="area_hectares"
                    value={formData.area_hectares}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-3"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              bgIcon="bg-blue-100"
              icon={<Calendar size={22} className="text-blue-600" />}
              title="Planejamento de Safra"
              subtitle="Defina a cultura e a data de plantio.">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Cultura Plantada</label>

                  <select
                    name="cultura_id"
                    value={formData.cultura_id}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-3"
                  >
                    <option value="">Selecione</option>
                    <option value="1">Soja</option>
                    <option value="2">Milho</option>
                    <option value="3">Feijão</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Data de Plantio</label>

                  <input
                    type="date"
                    name="data_plantio"
                    value={formData.data_plantio}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-3"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              bgIcon="bg-yellow-100"
              icon={<Droplet size={22} className="text-yellow-600" />}
              title="Recursos e Operação"
              subtitle="Insumos, máquinas e operador."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Insumo Principal</label>

                  <select
                    name="insumo"
                    value={formData.insumo}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-3"
                  >
                    <option value="">Selecione</option>
                    <option value="Adubo">Adubo</option>
                    <option value="Herbicida">Herbicida</option>
                    <option value="Sementes">Sementes</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Máquina Utilizada</label>

                  <select
                    name="maquina_id"
                    value={formData.maquina_id}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-3"
                  >
                    <option value="">Selecione</option>
                    <option value="1">Trator</option>
                    <option value="2">Plantadeira</option>
                    <option value="3">Pulverizador</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-medium">Operador Responsável</label>

                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>

                  <input
                    type="text"
                    name="operador"
                    value={formData.operador}
                    onChange={handleChange}
                    className="w-full rounded-lg border pl-10 pr-4 py-3"
                  />
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="mt-10 flex justify-end">
            <div onClick={salvarTalhao}>
              <Button icon={<Save size={15} color="white" />}
                bgColor="bg-green-600"
                fontColor="text-white"
                text="Cadastrar"
                bgHover="hover:bg-green-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}