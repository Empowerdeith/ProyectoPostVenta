from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from api_post_venta.api.serializers import (
	BoletaSerializer,
	)
from api_post_venta.models import (
	Boleta,
	)

@api_view(['GET'])
def boleta_detail_view(request,pk=None):
	if request.method == 'GET':
		boleta = Boleta.objects.filter(numero_boleta=pk).first()
		if boleta == None:
			return Response("No existe la boleta ingresada.")
		else:
			boleta_serializer= BoletaSerializer(boleta)
			return Response(boleta_serializer.data)




#Test antiguos
"""from api_post_venta.api.serializers import (
	CustomerSerializer,
	ProductoSerializer,
	OrdenSerializer,
	OrdenItemSerializer,
	ShippingAddress,
	)
from api_post_venta.models import (
	Customer, 
	Producto,
	Orden,
	OrdenItem,
	ShippingAddress,
	)
@api_view(['GET'])
def CustomerApiView(request):
	if request.method == 'GET':
		customers = Customer.objects.all()
		customers_serializer = CustomerSerializer(customers, many=True)
		return Response(customers_serializer.data)
@api_view(['GET'])
def ProductoApiView(request):
	if request.method == 'GET':
		productos = Producto.objects.all()
		productos_serializer = ProductoSerializer(productos, many=True)
		return Response(productos_serializer.data)

@api_view(['GET'])
def orden_detail_view(request,pk=None):
	if request.method == 'GET':
		orden = Orden.objects.filter(transaction_id=pk).first()
		if orden == None:
			return Response("No existe la boleta ingresada.")
		else:
			orden_serializer= OrdenSerializer(orden)
			return Response(orden_serializer.data)


@api_view(['GET'])
def ordenitem_detail_view(request,pk=None):
	if request.method == 'GET':
		ordenitem = OrdenItem.objects.filter(order=pk).first()
		if ordenitem == None:
			return Response("No existe la boleta ingresada.")
		else:
			ordenitem_serializer= OrdenItemSerializer(ordenitem)
			return Response(ordenitem_serializer.data)"""
