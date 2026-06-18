import { TrendingUp, Map, ChevronRight } from "lucide-react";
import type { TalhaoLista } from "./ListTalhoes";

interface DashboardCardsProps {
  talhoes?: TalhaoLista[];
}

const coresCultura: Record<string, string> = {
  Soja: "bg-emerald-500",
  Milho: "bg-orange-400",
  Algodão: "bg-blue-400",
  Feijão: "bg-yellow-500",
  Feijao: "bg-yellow-500",
};

function calcularDistribuicao(talhoes: TalhaoLista[]) {
  const porCultura: Record<string, number> = {};

  talhoes.forEach((t) => {
    const cultura = t.cultura || "Outros";
    porCultura[cultura] = (porCultura[cultura] || 0) + t.area;
  });

  const areaTotal = Object.values(porCultura).reduce((s, a) => s + a, 0);

  if (areaTotal === 0) return [];

  return Object.entries(porCultura)
    .map(([cultura, area]) => ({
      cultura,
      area,
      percentual: Math.round((area / areaTotal) * 100),
    }))
    .sort((a, b) => b.area - a.area);
}

export default function DashboardCards({ talhoes = [] }: DashboardCardsProps) {
  const distribuicao = calcularDistribuicao(talhoes);

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Distribuição de Culturas</h2>
          <p className="text-sm text-gray-500 mt-1">Percentual de área ocupada por tipo de plantio nesta safra.</p>
        </div>

        <div className="flex flex-col gap-5">
          {distribuicao.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">Nenhum talhão cadastrado para exibir.</p>
          ) : (
            distribuicao.map((item) => (
              <div key={item.cultura}>
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="font-medium text-gray-800">{item.cultura}</span>
                  <span className="font-medium text-gray-800">{item.percentual}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${coresCultura[item.cultura] || "bg-gray-400"}`}
                    style={{ width: `${item.percentual}%` }}
                  ></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Alertas Recentes</h2>
          <p className="text-sm text-gray-500 mt-1">Eventos que requerem atenção nos seus talhões.</p>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div className="flex gap-4 p-4 border border-gray-200 rounded-xl bg-white items-start">
            <div className="mt-0.5 text-gray-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Aumento de Custos</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                O custo médio por hectare no Talhão Sul 04 subiu 12% devido a insumos.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 border border-green-200 rounded-xl bg-green-50 items-start">
            <div className="bg-emerald-500 p-1.5 rounded-lg text-white mt-0.5">
              <Map size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 text-sm">Colheita Iniciada</h3>
              <p className="text-sm text-green-800/80 mt-1 leading-relaxed">
                Várzea Central atingiu maturação. Colheita foi disparada hoje.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button className="flex items-center gap-1 text-sm font-semibold text-emerald-500 hover:text-emerald-600 transition-colors">
            Ver todos os alertas
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
