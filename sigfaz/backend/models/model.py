from pydantic import BaseModel

class Fazenda(BaseModel):
    nome: str
    localizacao: str
    tamanho_hectares: float

class Talhao(BaseModel):
    area: float
    tipoCultura: str
    idade: int
    volumeEstimado: float
    idFazenda: int

class Maquina(BaseModel):
    nome: str
    tipo: str
    status: str

class Operador(BaseModel):
    nome: str
    cpf: str
    funcao: str

class Cultura(BaseModel):
    nome: str
    safra: str

class Insumo(BaseModel):
    nome: str
    quantidade: int

class Semente(BaseModel):
    nome: str
    quantidade: int
    unidade: str
    cultura: str

class Fertilizante(BaseModel):
    nome: str
    quantidade: int
    unidade: str
    tipo: str

class Defensivo(BaseModel):
    nome: str
    quantidade: int
    unidade: str
    principioAtivo: str

class Plantio(BaseModel):
    idTalhao: int
    cultura: str
    data_plantio: str
    area: float

class Colheita(BaseModel):
    idPlantio: int
    cultura: str
    data_colheita: str
    quantidade: float

class Custo(BaseModel):
    descricao: str
    valor: float
    data: str
    categoria: str   
    idFazenda: int

class Producao(BaseModel):
    idTalhao: int
    cultura: str
    safra: str
    quantidade_colhida: float
    unidade: str               
    data_registro: str