from rest_framework import routers, serializers, viewsets, status
from rest_framework.response import Response
from .serializers import ProductoSerializer, BoletaSerializer, ClienteSerializer,ProductoSerializerDepth, BoletaSerializerDepth, ClienteSerializerDepth
from .models import Producto, Cliente, Boleta
from rest_framework import filters
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.shortcuts import render
import requests
from django.views.generic import ListView, TemplateView

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

def revision(request):
    lista_clientes = Cliente.objects.all()
    return render(request, 'paginas_post_venta/Devolucion/revision_postventa.html',
        {'lista_clientes': lista_clientes})

@api_view(['GET'])
def cliente_detail_view(request,pk=None):
    if request.method == 'GET':
        cliente = Cliente.objects.filter(rut=pk).first()
        if cliente == None:
            return Response("No existe cliente.")
        else:
            cliente_serializer= ClienteSerializer(cliente)
            return Response(cliente_serializer.data)

@api_view(['GET'])
def boleta_detail_view(request,pk=None):
	if request.method == 'GET':
		boleta = Boleta.objects.filter(num_boleta=pk).first()
		if boleta == None:
			return Response("No existe la boleta ingresada.")
		else:
			boleta_serializer= BoletaSerializer(boleta)
			return Response(boleta_serializer.data)

'''
views con depth

'''

class ProductoApiDepth(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializerDepth

class BoletaApiDepth(viewsets.ModelViewSet):
    permission_classes = ()
    queryset = Boleta.objects.all()
    serializer_class = BoletaSerializerDepth

class ClienteApiDepth(viewsets.ModelViewSet):
    permission_classes = ()
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializerDepth

@api_view(['GET'])
def cliente_detail_viewDepth(request,pk=None):
    if request.method == 'GET':
        cliente = Cliente.objects.filter(rut=pk).first()
        if cliente == None:
            return Response("No existe cliente.")
        else:
            cliente_serializer= ClienteSerializerDepth(cliente)
            return Response(cliente_serializer.data)

@api_view(['GET'])
def boleta_detail_viewDepth(request,pk=None):
	if request.method == 'GET':
		boleta = Boleta.objects.filter(num_boleta=pk).first()
		if boleta == None:
			return Response("No existe la boleta ingresada.")
		else:
			boleta_serializer= BoletaSerializerDepth(boleta)
			return Response(boleta_serializer.data)
