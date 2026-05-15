## Rodar o Backend

Siga o passo a passo abaixo para configurar e executar a API localmente:

### 1. Criar Ambiente Virtual

```bash
python3 -m venv .venv


# No Windows:
venv\Scripts\activate
# No Linux/macOS:
source venv/bin/activate

# instalae pacote e execute 
pip install fastapi uvicorn

uvicorn main:app --reload

## Documentação das Rotas
Com o servidor rodando, acesse a interface do Swagger para testar as rotas:
http://127.0.0.1:8000/docs