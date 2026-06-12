from fastapi import APIRouter, HTTPException
from models.model import Plantio, Colheita
from db import conectar

router_atividades = APIRouter(
    prefix="/atividades",
    tags=["Atividades Agrícolas"]
)


#Plantio
@router_atividades.post('/plantio')
def criar_plantio(plantio: Plantio):

    conn = conectar()
    cursor = conn.cursor()

    try:
        sql = """
        INSERT INTO Plantio
        (idTalhao, cultura, data_plantio, area)
        VALUES (%s, %s, %s, %s)
        RETURNING id
        """

        valores = (
            plantio.idTalhao,
            plantio.cultura,
            plantio.data_plantio,
            plantio.area
        )

        cursor.execute(sql, valores)
        novo_id = cursor.fetchone()[0]
        conn.commit()

        return {"mensagem": "Plantio registrado", "id": novo_id}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@router_atividades.get('/plantio')
def listar_plantios():

    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT p.id, p.idTalhao, p.cultura, p.data_plantio, p.area,
                   t.tipoCultura AS tipo_talhao
            FROM Plantio p
            LEFT JOIN Talhao t ON t.id = p.idTalhao
            ORDER BY p.data_plantio DESC
        """)

        colunas = [desc[0] for desc in cursor.description]
        dados = [dict(zip(colunas, row)) for row in cursor.fetchall()]

        return dados

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@router_atividades.get('/plantio/{id}')
def buscar_plantio(id: int):

    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT p.id, p.idTalhao, p.cultura, p.data_plantio, p.area,
                   t.tipoCultura AS tipo_talhao
            FROM Plantio p
            LEFT JOIN Talhao t ON t.id = p.idTalhao
            WHERE p.id = %s
        """, (id,))

        row = cursor.fetchone()

        if row is None:
            raise HTTPException(status_code=404, detail="Plantio não encontrado")

        colunas = [desc[0] for desc in cursor.description]
        return dict(zip(colunas, row))

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@router_atividades.put('/plantio/{id}')
def atualizar_plantio(id: int, plantio: Plantio):

    conn = conectar()
    cursor = conn.cursor()

    try:
        sql = """
        UPDATE Plantio
        SET idTalhao=%s,
            cultura=%s,
            data_plantio=%s,
            area=%s
        WHERE id=%s
        """

        valores = (
            plantio.idTalhao,
            plantio.cultura,
            plantio.data_plantio,
            plantio.area,
            id
        )

        cursor.execute(sql, valores)

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Plantio não encontrado")

        conn.commit()
        return {"mensagem": "Plantio atualizado"}

    except HTTPException:
        raise

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@router_atividades.delete('/plantio/{id}')
def deletar_plantio(id: int):

    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM Plantio WHERE id=%s", (id,))

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Plantio não encontrado")

        conn.commit()
        return {"mensagem": "Plantio deletado"}

    except HTTPException:
        raise

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()