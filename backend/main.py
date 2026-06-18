from fastapi import FastAPI

from controllers.fazendas import router_fazendas
from controllers.talhoes import router_talhoes
from controllers.maquinas import router_maquinas
from controllers.operadores import router_operadores
from controllers.culturas import router_culturas
from controllers.custos import router_custos
from controllers.dashboards import router_dashboard
from controllers.producao import router_producao
from controllers.relatorios import router_relatorios
from controllers.auth_routes import router_auth
from controllers.atividadesagricolas import router_atividades
from controllers.insumos import router_sementes
from controllers.insumos import router_fertilizantes
from controllers.insumos import router_defensivos

app = FastAPI()

app.include_router(router_fazendas)
app.include_router(router_talhoes)
app.include_router(router_maquinas)
app.include_router(router_operadores)
app.include_router(router_culturas)
app.include_router(router_custos)
app.include_router(router_dashboard)
app.include_router(router_producao)
app.include_router(router_relatorios)
app.include_router(router_auth)
app.include_router(router_atividades)
app.include_router(router_sementes)
app.include_router(router_fertilizantes)
app.include_router(router_defensivos)