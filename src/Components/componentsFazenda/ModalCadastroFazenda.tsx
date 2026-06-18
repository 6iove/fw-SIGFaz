import { X } from "lucide-react";

//definicindo o tpo das props para o componente de modal
type ModalNovoCadastroProps = {
  onClose: () => void;
};

export default function ModalNovoCadastro({ onClose }: ModalNovoCadastroProps) {
  const cadastrarFazenda = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Fazenda cadastrada com sucesso!");
    onClose(); 
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl">
        <div className="bg-green-500 p-6 flex justify-between items-start text-white rounded-t-xl">
          <div>
            <h2 className="text-3xl font-bold">Nova Fazenda</h2>
            <p>
              Preencha as informações básicas para cadastrar uma nova unidade de
              produção no sistema SIGFaz.
            </p>
          </div>

          <button onClick={onClose}><X /></button>
        </div>

          <form onSubmit={cadastrarFazenda} className="p-6 space-y-6" >
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Dados Basicos</h3>
              <div className="grid grid-cols-1 ">
                <div>
                  <label>Nome da Fazenda</label>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Fazenda Santa Maria"
                  />
                </div>
                <div>
                  <label>Area total (ha)</label>
                  <input type="number" name="area" placeholder="1000" />
                </div>
                <div>
                  <label>Localização/ UF</label>
                  <input
                    type="text"
                    name="localizacao"
                    placeholder="Ex: São Paulo/SP"
                  />
                </div>
                <div>
                  <label>Status Inicial</label>
                  <select name="Status">
                    <option value="ativa">Ativa</option>
                    <option value="manutencao">Em manutenção</option>
                    <option value="inativa">Inativa</option>
                  </select>
                </div>
              </div>
            </section>
            <section>
              <div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Responsável</h3>
                  <input
                    type="text"
                    name="responsavel"
                    placeholder="Nome do responsável"
                  />
                </div>
                <div>
                  <label>Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="exemplo@dominio.com"
                  />
                </div>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Endereço</h3>
              <div>
                <div>
                  <label>CEP</label>
                  <input type="text" name="CEP" placeholder="00000-000" />
                </div>
                <div>
                  <label>Cidade</label>
                  <input type="text" name="cidade" placeholder="São Paulo" />
                </div>
                <div>
                  <label>Estado</label>
                  <input type="text" name="estado" placeholder="São Paulo" />
                </div>
                <div>
                  <label>Pais</label>
                  <input type="text" name="pais" defaultValue="Brasil" />
                </div>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Observação</h3>
              <textarea
                name="observacao"
                rows={4}
                placeholder="Informações adicionais sobre a fazenda..."
              ></textarea>
            </section>
            <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition">Cancelar
            </button>
            <button 
              type="submit"
              className="px-6 py-2 rounded-lg text-sm font-medium bg-[#22c55e] text-white hover:bg-emerald-600 shadow-md transition">
              Salvar Fazenda
            </button>
          </div>
          </form>
        </div>
      </div>
  );
}
