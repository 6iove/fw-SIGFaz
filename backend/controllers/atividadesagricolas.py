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


#Colheita
@router_atividades.post('/colheita')
def criar_colheita(colheita: Colheita):

    conn = conectar()
    cursor = conn.cursor()

    try:
        sql = """
        INSERT INTO Colheita
        (idPlantio, cultura, data_colheita, quantidade)
        VALUES (%s, %s, %s, %s)
        RETURNING id
        """

        valores = (
            colheita.idPlantio,
            colheita.cultura,
            colheita.data_colheita,
            colheita.quantidade
        )

        cursor.execute(sql, valores)
        novo_id = cursor.fetchone()[0]
        conn.commit()

        return {"mensagem": "Colheita registrada", "id": novo_id}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@router_atividades.get('/colheita')
def listar_colheitas():

    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT c.id, c.idPlantio, c.cultura, c.data_colheita, c.quantidade,
                   p.data_plantio, p.area AS area_plantio
            FROM Colheita c
            LEFT JOIN Plantio p ON p.id = c.idPlantio
            ORDER BY c.data_colheita DESC
        """)

        colunas = [desc[0] for desc in cursor.description]
        dados = [dict(zip(colunas, row)) for row in cursor.fetchall()]

        return dados

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@router_atividades.get('/colheita/{id}')
def buscar_colheita(id: int):

    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT c.id, c.idPlantio, c.cultura, c.data_colheita, c.quantidade,
                   p.data_plantio, p.area AS area_plantio
            FROM Colheita c
            LEFT JOIN Plantio p ON p.id = c.idPlantio
            WHERE c.id = %s
        """, (id,))

        row = cursor.fetchone()

        if row is None:
            raise HTTPException(status_code=404, detail="Colheita não encontrada")

        colunas = [desc[0] for desc in cursor.description]
        return dict(zip(colunas, row))

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@router_atividades.put('/colheita/{id}')
def atualizar_colheita(id: int, colheita: Colheita):

    conn = conectar()
    cursor = conn.cursor()

    try:
        sql = """
        UPDATE Colheita
        SET idPlantio=%s,
            cultura=%s,
            data_colheita=%s,
            quantidade=%s
        WHERE id=%s
        """

        valores = (
            colheita.idPlantio,
            colheita.cultura,
            colheita.data_colheita,
            colheita.quantidade,
            id
        )

        cursor.execute(sql, valores)

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Colheita não encontrada")

        conn.commit()
        return {"mensagem": "Colheita atualizada"}

    except HTTPException:
        raise

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@router_atividades.delete('/colheita/{id}')
def deletar_colheita(id: int):

    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM Colheita WHERE id=%s", (id,))

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Colheita não encontrada")

        conn.commit()
        return {"mensagem": "Colheita deletada"}

    except HTTPException:
        raise

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()
