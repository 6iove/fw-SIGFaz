from fastapi import APIRouter
from models.model import Semente, Fertilizante, Defensivo
from db import conectar


# sementes
router_sementes = APIRouter(
    prefix="/sementes",
    tags=["Sementes"]
)

@router_sementes.post('/')
def cadastrar_semente(semente: Semente):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    INSERT INTO Semente
    (nome, quantidade, unidade, cultura)
    VALUES (%s, %s, %s, %s)
    """

    valores = (
        semente.nome,
        semente.quantidade,
        semente.unidade,
        semente.cultura
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Semente cadastrada"}

@router_sementes.get('/')
def listar_sementes():

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM Semente")

    dados = cursor.fetchall()

    cursor.close()
    conn.close()

    return dados

@router_sementes.put('/{id}')
def atualizar_semente(id: int, semente: Semente):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    UPDATE Semente
    SET nome=%s,
        quantidade=%s,
        unidade=%s,
        cultura=%s
    WHERE id=%s
    """

    valores = (
        semente.nome,
        semente.quantidade,
        semente.unidade,
        semente.cultura,
        id
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Semente atualizada"}

@router_sementes.delete('/{id}')
def deletar_semente(id: int):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM Semente WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Semente deletada"}


# fertilizantes
router_fertilizantes = APIRouter(
    prefix="/fertilizantes",
    tags=["Fertilizantes"]
)


@router_fertilizantes.post('/')
def cadastrar_fertilizante(fertilizante: Fertilizante):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    INSERT INTO Fertilizante
    (nome, quantidade, unidade, tipo)
    VALUES (%s, %s, %s, %s)
    """

    valores = (
        fertilizante.nome,
        fertilizante.quantidade,
        fertilizante.unidade,
        fertilizante.tipo
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Fertilizante cadastrado"}

@router_fertilizantes.get('/')
def listar_fertilizantes():

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM Fertilizante")

    dados = cursor.fetchall()

    cursor.close()
    conn.close()

    return dados

@router_fertilizantes.put('/{id}')
def atualizar_fertilizante(id: int, fertilizante: Fertilizante):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    UPDATE Fertilizante
    SET nome=%s,
        quantidade=%s,
        unidade=%s,
        tipo=%s
    WHERE id=%s
    """

    valores = (
        fertilizante.nome,
        fertilizante.quantidade,
        fertilizante.unidade,
        fertilizante.tipo,
        id
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Fertilizante atualizado"}

@router_fertilizantes.delete('/{id}')
def deletar_fertilizante(id: int):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM Fertilizante WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Fertilizante deletado"}

# defensivos 
router_defensivos = APIRouter(
    prefix="/defensivos",
    tags=["Defensivos"]
)

@router_defensivos.post('/')
def cadastrar_defensivo(defensivo: Defensivo):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    INSERT INTO Defensivo
    (nome, quantidade, unidade, principioAtivo)
    VALUES (%s, %s, %s, %s)
    """

    valores = (
        defensivo.nome,
        defensivo.quantidade,
        defensivo.unidade,
        defensivo.principioAtivo
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Defensivo cadastrado"}

@router_defensivos.get('/')
def listar_defensivos():

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM Defensivo")

    dados = cursor.fetchall()

    cursor.close()
    conn.close()

    return dados

@router_defensivos.put('/{id}')
def atualizar_defensivo(id: int, defensivo: Defensivo):

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    UPDATE Defensivo
    SET nome=%s,
        quantidade=%s,
        unidade=%s,
        principioAtivo=%s
    WHERE id=%s
    """

    valores = (
        defensivo.nome,
        defensivo.quantidade,
        defensivo.unidade,
        defensivo.principioAtivo,
        id
    )

    cursor.execute(sql, valores)

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Defensivo atualizado"}

@router_defensivos.delete('/{id}')
def deletar_defensivo(id: int):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM Defensivo WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"mensagem": "Defensivo deletado"}