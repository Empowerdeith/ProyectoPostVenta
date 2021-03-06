from rest_framework import serializers
from django.db.models import Sum, Avg
from .models import Producto, Cliente, Boleta, ItemProducto

# Serializers define the API representation.

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('rut','nombre_cl','num_telf','email','direccion','boletas')

class BoletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boleta
        fields = ('num_boleta','created_at','fecha_devolucion','total','total_dev','monto_dev','ItemProductos')

class ItemProductoSerializer(serializers.ModelSerializer):
    boletas = BoletaSerializer(many=True, read_only=True)
    class Meta:
        model = ItemProducto
        fields = ("id_item",'cantidad','productos','boletas')

class ProductoSerializer(serializers.ModelSerializer):
    items = ItemProductoSerializer(many=True, read_only=True)
    class Meta:
        model = Producto
        fields = ("id_prod",'nombre_pro','precio','items')

'''
serializers con depth

'''

class ClienteSerializerDepth(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('rut','nombre_cl','num_telf','email','direccion','boletas')
        depth = 4

class BoletaSerializerDepth(serializers.ModelSerializer):
    class Meta:
        model = Boleta
        fields = ('num_boleta','created_at','fecha_devolucion','total','total_dev','monto_dev','ItemProductos')
        depth = 4

class ItemProductoSerializerDepth(serializers.ModelSerializer):
    boletas = BoletaSerializer(many=True, read_only=True)
    class Meta:
        model = ItemProducto
        fields = ('id_item','cantidad','productos','boletas')
        depth = 4

class ProductoSerializerDepth(serializers.ModelSerializer):
    items = ItemProductoSerializerDepth(many=True, read_only=True)
    class Meta:
        model = Producto
        fields = ("id_prod",'nombre_pro','precio','items')