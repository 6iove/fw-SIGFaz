from pydantic import BaseModel
from datetime import date, datetime, time

class Fazenda(BaseModel):
    nome: str
    localizacao: str
    areaTotal: float

class Talhao(BaseModel):
    area: float
    tipoCultura: str
    idade: int
    volumeEstimado: float
    idFazenda: int

class Safra(BaseModel):
    inicio: date
    fim: date

class Plantio(BaseModel):
    data: date
    idSafra: int 
    idTalhao: int
    
class Cultura(BaseModel):
    data: date
    quantidade: float

class Colheita(BaseModel):
    data: date
    quantidade: float
    idCultura: int
    
class Funcionario(BaseModel):
    nome: str
    funcao: str
    salario: float
    cpf: str
    telefone: str
    
    
class Atividade(BaseModel):
    tipo: str
    data: date
    horaInicio: datetime
    horaFim: datetime
    custoTotal: float
    descricao: str
    idFuncionario: int
    
class Insumo(BaseModel):
    nome: str
    tipo: str
    custo: float
    quantidade: float
    
class AtividadeInsumo(BaseModel):
    idAtividade: int
    idInsumo: int
    quantidade: float
    custo: float
    unidadeMedida: str
    
class Maquina(BaseModel):
    tipo: str
    modelo: str
    custoHora: float
    ano: int
    status: str
    
class UsoMaquina(BaseModel):
    idAtividade: int
    idMaquina: int
    horasUso: time

class Custo(BaseModel):
    descricao: str
    valor: float
    data: str
    categoria: str   
    idFazenda: int

class Producao(BaseModel):
    idTalhao: int
    isSafra: str
    quantidade_colhida: float
    unidade: str               
    data_registro: date
    
class Login(BaseModel):
    email: str
    senha: str