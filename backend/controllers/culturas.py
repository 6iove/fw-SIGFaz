from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router_culturas = APIRouter(prefix="/culturas", tags=["Culturas"])


# Modelo de entrada de dados
class CulturaInput(BaseModel):
    nome: str
    tipo: str
    ciclo_dias: int


# Banco de dados em memória (Mock) com dados iniciais
banco_culturas = [
    {"id": 1, "nome": "Soja", "tipo": "Grão", "ciclo_dias": 120},
    {"id": 2, "nome": "Milho", "tipo": "Cereal", "ciclo_dias": 150},
    {"id": 3, "nome": "Algodão", "tipo": "Fibra", "ciclo_dias": 160},
]


@router_culturas.get("/")
def consultar_culturas():
    return banco_culturas


@router_culturas.get("/{id}")
def consultar_cultura(id: int):
    for cultura in banco_culturas:
        if cultura["id"] == id:
            return cultura
    raise HTTPException(status_code=404, detail="Cultura não encontrada")


@router_culturas.post("/")
def cadastrar_culturas(dados: CulturaInput):
    # Gera um novo ID baseado no maior ID existente
    novo_id = max([c["id"] for c in banco_culturas], default=0) + 1

    nova_cultura = {
        "id": novo_id,
        "nome": dados.nome,
        "tipo": dados.tipo,
        "ciclo_dias": dados.ciclo_dias,
    }
    banco_culturas.append(nova_cultura)
    return {"mensagem": "Cultura cadastrada com sucesso", "dados": nova_cultura}


@router_culturas.put("/{id}")
def alterar_cultura(id: int, dados: CulturaInput):
    for cultura in banco_culturas:
        if cultura["id"] == id:
            cultura["nome"] = dados.nome
            cultura["tipo"] = dados.tipo
            cultura["ciclo_dias"] = dados.ciclo_dias
            return {"mensagem": "Cultura atualizada", "dados": cultura}
    raise HTTPException(status_code=404, detail="Cultura não encontrada")


@router_culturas.delete("/{id}")
def deletar_cultura(id: int):
    for cultura in banco_culturas:
        if cultura["id"] == id:
            banco_culturas.remove(cultura)
            return {"mensagem": "Cultura removida"}
    raise HTTPException(status_code=404, detail="Cultura não encontrada")
