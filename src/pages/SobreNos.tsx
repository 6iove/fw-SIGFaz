import { Navbar } from "../components/componentsSobreNos/Navbar";
import { InicialPage } from "../components/componentsSobreNos/InicialPage";
import { ProblemaSolucao } from "../components/componentsSobreNos/ProblemaSolucao";
import { Tecnologia } from "../components/componentsSobreNos/Tecnologias";
import { Equipe } from "../components/componentsSobreNos/Membros";
import { CTAIFMS } from "../components/componentsSobreNos/Banner";
import { Footer } from "../components/componentsSobreNos/Footer";

function SobreNos() {
  return (
    <div>
      {/*cada seção da pagina sobre nos é um componente diferente */}
      <Navbar />
      <InicialPage />
      <ProblemaSolucao />
      <Tecnologia />
      <Equipe />
      <CTAIFMS />
      <Footer />
    </div>
  );
}
export default SobreNos;
