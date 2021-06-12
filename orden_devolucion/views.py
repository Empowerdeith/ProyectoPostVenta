from rest_framework import routers, serializers, viewsets, status
from rest_framework.response import Response
from .serializers import ProductoSerializer, BoletaSerializer, ClienteSerializer
from .models import Producto, Cliente, Boleta
from rest_framework import filters

# ViewSets define the view behavior.

class ProductoApi(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class BoletaApi(viewsets.ModelViewSet):
    permission_classes = ()
    queryset = Boleta.objects.all()
    serializer_class = BoletaSerializer

class ClienteApi(viewsets.ModelViewSet):
    permission_classes = ()
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer