from fastapi import APIRouter, HTTPException

router_talhoes = APIRouter(prefix="/talhoes")
talhoes_mock = [
    {
        "id": 1,
        "nome": "Talhão Norte",
        "area_hectares": 25.5,
        "cultura_id": 1,
        "data_plantio": "2026-03-10",
        "insumo": "Fertilizante NPK",
        "maquina_id": 101,
        "operador": "João Silva",
        "fazenda_id": 1
    },
    {
        "id": 2,
        "nome": "Talhão Sul",
        "area_hectares": 18.0,
        "cultura_id": 2,
        "data_plantio": "2026-04-02",
        "insumo": "Herbicida",
        "maquina_id": 102,
        "operador": "Maria Souza",
        "fazenda_id": 1
    },
    {
        "id": 3,
        "nome": "Talhão Leste",
        "area_hectares": 30.2,
        "cultura_id": 3,
        "data_plantio": "2026-02-15",
        "insumo": "Calcário",
        "maquina_id": 103,
        "operador": "Carlos Lima",
        "fazenda_id": 2
    }
]
@router_talhoes.get('/')  

def consultar_talhoes():
     return talhoes_mock


@router_talhoes.get('/{id}')  

def consultar_talhao(id: int):
     return {
        "id": id
    }


@router_talhoes.post('/')  

def cadastrar_talhoes():
   return {
        "msg": "Talhão cadastrado"
    }

@router_talhoes.put('/{id}')  

def alterar_talhao(id: int):
     return {
        "msg": f"Talhão {id} atualizado"
    }


@router_talhoes.delete('/{id}')  

def deletar_talhao(id: int):
    return {
        "msg": f"Talhão {id} deletado"
    }
@router_talhoes.get('/fazenda/{id}')
def listar_por_fazenda(id: int):
    return {"msg": f"talhões da fazenda {id}"}
