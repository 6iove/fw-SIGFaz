from fastapi import APIRouter, HTTPException 
from models.model import Producao
from db import conectar

router_producao = APIRouter(prefix="/producao", tags=["Produção"])

@router_producao.get('/')  

def consultar_producao():
    conn = conectar()
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            SELECT p.id, p.idTalhao, p.cultura, p.safra, p.quantidade_colhida, p.unidade, p.data_registro, t.tipoCultura, t.area
            FROM Producao p
            LEFT JOIN Talhao t ON t.id = p.idTalhao
            ORDER BY p.data_registro DESC
        """)
        colunas = [desc[0] for desc in cursor.description]
        return [dict(zip(colunas, row)) for row in cursor.fetchall()]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        cursor.close()
        conn.close()


@router_producao.post('/')  

def cadastrar_producao(producao: Producao):
    conn = conectar()
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            INSERT INTO Producao (idTalhao, cultura, safra, quantidade_colhida, unidade, data_registro)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            producao.idTalhao,
            producao.cultura,
            producao.safra,
            producao.quantidade_colhida,
            producao.unidade,
            producao.data_registro
        ))
        novo_id = cursor.fetchone()[0]
        conn.commit()
        return {"mensagem" : "Produção cadastrada", "id" : novo_id}
    
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code = 500, detail=str(e))
    
    finally:
        cursor.close()
        conn.close()

@router_producao.get('/{id}')

def buscar_producao(id: int):
    conn = conectar()
    cursor = conn.cursor()
    try:
        cursor.execute("""
                SELECT p.id, p.idTalhao, p.cultura, p.safra, p.quantidade_colhida, p.unidade, p.data_registro, t.tipoCultura, t.area
                FROM Producao p
                LEFT JOIN Talhao t ON t.id = p.idTalhao
                WHERE p.id=%s
            """, (id,))
        row=cursor.fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="Producão não encontrada")
        colunas = [desc[0] for desc in cursor.description]
        return dict(zip(colunas, row))
    except HTTPException: 
        raise
    except Exception as e: 
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        cursor.close()
        conn.close()


@router_producao.put('/{id}')
def atualizar_producao(id: int, producao: Producao):
    
    conn = conectar()
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            UPDATE Producao
            SET idTalhao=%s, cultura=%s, safra=%s, quantidade_colhida=%s, unidade=%s, data_registro=%s
            WHERE id=%s
        """,(
            producao.idTalhao, producao.cultura, producao.safra, producao.quantidade_colhida, producao.unidade, producao.data_registro, id
            
        ))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Produção não encontrada")
        conn.commit()
        return {"mensagem": "Produção atualizada"}
    except HTTPException:
        raise
    
    except HTTPException as e: 
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
    finally: 
        cursor.close()
        conn.close()

