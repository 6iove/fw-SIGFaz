import Button from "../../Components/Button";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Download, Plus, Map, TrendingUp, DollarSign, Search, Filter } from "lucide-react";
import Panel from "../../Components/Panel";
import ListaTalhoes from "../../Components/ListTalhoes";
import type { TalhaoLista } from "../../Components/ListTalhoes";
import DashboardCards from "../../Components/DashboardCards";
import api from "../../services/api";

const POR_PAGINA = 3;

function formatarArea(valor: number) {
  return `${valor.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ha`;
}

function formatarProducao(valor: number) {
  if (valor >= 1000) {
    const mil = valor / 1000;
    return `${mil.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}k scs`;
  }
  return `${valor.toLocaleString("pt-BR")} scs`;
}

function pegarStatus(idade: number) {
  if (idade <= 2) return "Plantio";
  if (idade <= 5) return "Desenvolvimento";
  return "Colheita";
}

function converterTalhao(item: unknown): TalhaoLista {
  if (Array.isArray(item)) {
    const id = Number(item[0]);
    const area = Number(item[1]) || 0;
    const cultura = String(item[2] ?? "");
    const idade = Number(item[3]) || 0;
    const volume = Number(item[4]) || 0;

    return {
      id,
      nome: `Talhão ${id}`,
      cultura,
      area,
      produtividade: volume,
      valor: area * 48,
      status: pegarStatus(idade),
    };
  }

  const t = item as Record<string, unknown>;
  const id = Number(t.id);
  const area = Number(t.area) || 0;
  const cultura = String(t.tipocultura ?? t.tipoCultura ?? "");
  const idade = Number(t.idade) || 0;
  const volume = Number(t.volumeestimado ?? t.volumeEstimado) || 0;

  return {
    id,
    nome: t.nome ? String(t.nome) : `Talhão ${id}`,
    cultura,
    area,
    produtividade: volume,
    valor: area * 48,
    status: pegarStatus(idade),
  };
}

export default function Talhoes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [talhoes, setTalhoes] = useState<TalhaoLista[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [filtro, setFiltro] = useState("");

  async function buscarTalhoes() {
    try {
      setLoading(true);
      const response = await api.get("/talhoes/");
      if (!Array.isArray(response.data)) {
        setTalhoes([]);
        return;
      }
      const lista = response.data.map((item: unknown) => converterTalhao(item));
      setTalhoes(lista);
    } catch (error) {
      console.error("Erro ao buscar talhões:", error);
      setTalhoes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarTalhoes();
  }, [location.pathname]);

  
  async function deletarTalhao(id: number | string) {
    if (!window.confirm("Tem certeza que deseja apagar este talhão?")) return;

    try {
      await api.delete(`/talhoes/${id}`);
      buscarTalhoes();
    } catch (error) {
      console.error("Erro ao deletar talhão:", error);
      alert("Erro ao deletar o talhão. Verifique o console.");
    }
  }

  function editarTalhao(id: number | string) {
    navigate(`/dashboard/CadTalhoes/${id}`);
  }
  

  const filtrados = talhoes.filter((t) => {
    const busca = filtro.toLowerCase();
    return (t.nome || "").toLowerCase().includes(busca) || (t.cultura || "").toLowerCase().includes(busca);
  });

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  
  // Garantimos que a página atual nunca exceda o limite novo após filtrar ou apagar algo
  const paginaAtual = Math.min(pagina, totalPaginas); 
  const inicio = (paginaAtual - 1) * POR_PAGINA;
  const talhoesPagina = filtrados.slice(inicio, inicio + POR_PAGINA);

  const areaTotal = talhoes.reduce((s, t) => s + t.area, 0);
  const producaoTotal = talhoes.reduce((s, t) => s + t.produtividade, 0);
  const custoMedio = talhoes.length ? talhoes.reduce((s, t) => s + t.valor, 0) / talhoes.length : 0;

  function irPagina(nova: number) {
    if (nova >= 1 && nova <= totalPaginas) {
      setPagina(nova);
    }
  }

  return (
    <div className="flex flex-col text-left m-10 gap-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Gestão de Talhões</h1>
        <div className="flex flex-row justify-center items-center gap-4">
          <Button icon={<Download className="text-gray-600" size={20} />} text="Exportar" bgColor="bg-gray-200" fontColor="text-gray-600" bgHover="bg-gray-100"/>
          <Button onClick={() => navigate("/dashboard/CadTalhoes")} icon={<Plus className="text-white" size={20} />} text="Novo Talhão" bgColor="bg-green-600" fontColor="text-white" bgHover="bg-green-400"/>
        </div>
      </div>
      <p className="mt-4 text-gray-600">Visualize e gerencie a produtividade de suas áreas produtivas.</p>
      <div className="w-full p-1 gap-3 flex flex-row items-center justify-center">
        <Panel bgColor="bg-green-100" title="ÁREA TOTAL GERENCIADA" icon={<Map className="text-gray-700" size={20} />} value={formatarArea(areaTotal)} subtitle="Total dos talhões cadastrados"/>
        <Panel bgColor="bg-white" title="PRODUÇÃO ESTIMADA" icon={<TrendingUp className="text-green-700" size={20} />} value={formatarProducao(producaoTotal)} subtitle="Soma do volume estimado em sacas"/>
        <Panel bgColor="bg-blue-100" title="CUSTO MÉDIO OPERACIONAL" icon={<DollarSign className="text-gray-700" size={20} />} value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(custoMedio)} subtitle="Inclui insumos e maquinário"/>
      </div>

      <div className="w-full mx-auto bg-white rounded-t-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="w-full bg-white flex justify-between items-center p-4">
          <div className="flex flex-row items-center justify-center gap-2">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              value={filtro}
              onChange={(e) => {
                setFiltro(e.target.value);
                setPagina(1);
              }}
              placeholder="Filtrar por nome ou cultura..."
              className="w-64 outline-none bg-transparent text-gray-700 placeholder-gray-400 p-2"
            />
          </div>

          <div className="flex flex-row items-center justify-center gap-2">
            <Filter className="text-gray-500 hover:text-gray-800 cursor-pointer transition-colors" size={20} />
            <p className="text-gray-500 hover:text-gray-800 cursor-pointer transition-colors text-sm font-medium">
              Filtros Avançados
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 border-y border-gray-200 text-sm font-semibold text-gray-700">
          <div className="flex items-center gap-2 w-40">
            <span>Nome do Talhão</span>
          </div>
          <div className="w-24">Cultura</div>
          <div className="w-20">Área (ha)</div>
          <div className="w-24">Prod. Estimada</div>
          <div className="w-32">Custo/ha</div>
          <div className="w-32">Status</div>
          <div className="w-21">Ações</div>
        </div>

       {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Carregando talhões...</div>
        ) : (
          <ListaTalhoes 
            talhoes={talhoesPagina} 
            onDelete={deletarTalhao} 
            onEdit={editarTalhao} 
          />
        )}

        <div className="flex items-center justify-between p-4 bg-white border-t border-gray-200 text-sm rounded-b-xl">
          <div className="text-gray-500">
            Exibindo <span className="font-bold text-gray-700">{talhoesPagina.length}</span> de{" "}
            <span className="font-bold text-gray-700">{filtrados.length}</span> talhões cadastrados
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => irPagina(paginaAtual - 1)}
              disabled={paginaAtual <= 1}
              className={`px-4 py-1.5 rounded-lg border font-medium ${
                paginaAtual <= 1
                  ? "border-gray-100 text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Anterior
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => irPagina(num)}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
                  num === paginaAtual
                    ? "bg-green-500 text-white shadow-sm hover:bg-green-600"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => irPagina(paginaAtual + 1)}
              disabled={paginaAtual >= totalPaginas}
              className={`px-4 py-1.5 rounded-lg border font-medium ${
                paginaAtual >= totalPaginas
                  ? "border-gray-100 text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>

      <DashboardCards talhoes={talhoes} />
    </div>
  );
}