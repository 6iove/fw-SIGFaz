from fastapi import APIRouter, HTTPException
from models.model import Custo
from db import conectar

router_custos = APIRouter(
    prefix="/custos",
    tags=["Custos"]
)


#CREATE
@router_custos.post('/')
def cadastrar_custo(custo: Custo):

    conn = conectar()
    cursor = conn.cursor()

    try:
        sql = """
        INSERT INTO Custo
        (descricao, valor, data, categoria, idFazenda)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id
        """

        valores = (
            custo.descricao,
            custo.valor,
            custo.data,
            custo.categoria,
            custo.idFazenda
        )

        cursor.execute(sql, valores)
        novo_id = cursor.fetchone()[0]
        conn.commit()

        return {"mensagem": "Custo cadastrado", "id": novo_id}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


#READ - listagem geral
@router_custos.get('/')
def consultar_custos():

    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT c.id, c.descricao, c.valor, c.data, c.categoria,
                   c.idFazenda, f.nome AS fazenda_nome
            FROM Custo c
            LEFT JOIN Fazenda f ON f.id = c.idFazenda
            ORDER BY c.data DESC
        """)

        colunas = [desc[0] for desc in cursor.description]
        dados = [dict(zip(colunas, row)) for row in cursor.fetchall()]

        return dados

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


#READ - por ID
@router_custos.get('/{id}')
def buscar_custo(id: int):

    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT c.id, c.descricao, c.valor, c.data, c.categoria,
                   c.idFazenda, f.nome AS fazenda_nome
            FROM Custo c
            LEFT JOIN Fazenda f ON f.id = c.idFazenda
            WHERE c.id = %s
        """, (id,))

        row = cursor.fetchone()

        if row is None:
            raise HTTPException(status_code=404, detail="Custo não encontrado")

        colunas = [desc[0] for desc in cursor.description]
        return dict(zip(colunas, row))

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


#READ - custo por hectare (por fazenda)
@router_custos.get('/por-hectare')
def calcular_custo_por_hectare():

    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT f.id AS idFazenda,
                   f.nome AS fazenda_nome,
                   f.tamanho_hectares,
                   COALESCE(SUM(c.valor), 0) AS total_custos,
                   CASE
                       WHEN f.tamanho_hectares > 0
                       THEN ROUND(COALESCE(SUM(c.valor), 0) / f.tamanho_hectares, 2)
                       ELSE 0
                   END AS custo_por_hectare
            FROM Fazenda f
            LEFT JOIN Custo c ON c.idFazenda = f.id
            GROUP BY f.id, f.nome, f.tamanho_hectares
            ORDER BY custo_por_hectare DESC
        """)

        colunas = [desc[0] for desc in cursor.description]
        dados = [dict(zip(colunas, row)) for row in cursor.fetchall()]

        return dados

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


#READ - custo por safra
@router_custos.get('/por-safra')
def calcular_custo_por_safra():

    conn = conectar()
    cursor = conn.cursor()

    try:
        #agrupa custos pelo mês/ano (simula safra via data)
        #e cruza com a produção para calcular custo por unidade produzida
        cursor.execute("""
            SELECT
                TO_CHAR(c.data::date, 'YYYY') AS ano,
                c.categoria,
                ROUND(SUM(c.valor)::numeric, 2) AS total_por_categoria
            FROM Custo c
            GROUP BY TO_CHAR(c.data::date, 'YYYY'), c.categoria
            ORDER BY ano DESC, total_por_categoria DESC
        """)

        colunas_cat = [desc[0] for desc in cursor.description]
        por_categoria = [dict(zip(colunas_cat, row)) for row in cursor.fetchall()]

        #total geral por ano
        cursor.execute("""
            SELECT
                TO_CHAR(data::date, 'YYYY') AS ano,
                ROUND(SUM(valor)::numeric, 2) AS total_geral
            FROM Custo
            GROUP BY TO_CHAR(data::date, 'YYYY')
            ORDER BY ano DESC
        """)

        colunas_ano = [desc[0] for desc in cursor.description]
        por_ano = [dict(zip(colunas_ano, row)) for row in cursor.fetchall()]

        return {
            "total_por_ano": por_ano,
            "detalhamento_por_categoria": por_categoria
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


#UPDATE
@router_custos.put('/{id}')
def atualizar_custo(id: int, custo: Custo):

    conn = conectar()
    cursor = conn.cursor()

    try:
        sql = """
        UPDATE Custo
        SET descricao=%s,
            valor=%s,
            data=%s,
            categoria=%s,
            idFazenda=%s
        WHERE id=%s
        """

        valores = (
            custo.descricao,
            custo.valor,
            custo.data,
            custo.categoria,
            custo.idFazenda,
            id
        )

        cursor.execute(sql, valores)

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Custo não encontrado")

        conn.commit()
        return {"mensagem": "Custo atualizado"}

    except HTTPException:
        raise

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


#DELETE
@router_custos.delete('/{id}')
def deletar_custo(id: int):

    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM Custo WHERE id=%s", (id,))

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Custo não encontrado")

        conn.commit()
        return {"mensagem": "Custo deletado"}

    except HTTPException:
        raise

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()
