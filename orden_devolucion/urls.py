from django.contrib import admin
from django.urls import path, re_path, include
from . import views
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register("Boleta",views.BoletaApi, basename="boleta")
router.register("Producto",views.ProductoApi, basename="producto")
router.register("Cliente",views.ClienteApi, basename="cliente")

urlpatterns = [
    path('',include(router.urls)),
]
