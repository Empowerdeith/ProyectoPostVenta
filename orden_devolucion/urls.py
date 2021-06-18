from django.contrib import admin
from django.urls import path, re_path, include
from . import views
from rest_framework.routers import DefaultRouter
from orden_devolucion.views import (
    cliente_detail_view, boleta_detail_view,cliente_detail_viewDepth, boleta_detail_viewDepth,
)

router=DefaultRouter()
router.register("Boleta",views.BoletaApi, basename="boleta")
router.register("Producto",views.ProductoApi, basename="producto")
router.register("Cliente",views.ClienteApi, basename="cliente")
router.register("Boleta2",views.BoletaApiDepth, basename="boleta2")
router.register("Producto2",views.ProductoApiDepth, basename="producto2")
router.register("Cliente2",views.ClienteApiDepth, basename="cliente2")

urlpatterns = [
    path('devolucion/',include(router.urls)),
    path('cl/<int:pk>/', cliente_detail_view, name= "cliente_api"),
    path('bol/<int:pk>/', boleta_detail_view, name= "boleta_api"),
    path('cl2/<int:pk>/', cliente_detail_viewDepth, name= "cliente_api"),
    path('bol2/<int:pk>/', boleta_detail_viewDepth, name= "boleta_api"),
]
