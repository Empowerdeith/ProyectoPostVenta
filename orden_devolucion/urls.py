from django.contrib import admin
from django.urls import path, re_path, include
from . import views
from rest_framework.routers import DefaultRouter
from orden_devolucion.views import (
    cliente_detail_view, boleta_detail_view, listar_clientes,
)

router=DefaultRouter()
router.register("Boleta",views.BoletaApi, basename="boleta")
router.register("Producto",views.ProductoApi, basename="producto")
router.register("Cliente",views.ClienteApi, basename="cliente")

urlpatterns = [
    path('devolucion/',include(router.urls)),
    path('cl/<int:pk>/', cliente_detail_view, name= "cliente_api"),
    path('bol/<int:pk>/', boleta_detail_view, name= "boleta_api"),
    path('listar_clientes/', listar_clientes, name="listar_clientes"),
]
