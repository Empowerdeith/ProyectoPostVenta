from rest_framework import serializers
from django.db.models import Sum, Avg
from .models import Producto, Cliente, Boleta, ItemProducto

# Serializers define the API representation.

class BoletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boleta
        fields = ('num_boleta','created_at','total','total_dev','monto_dev','ItemProductos')

class ItemProductoSerializer(serializers.ModelSerializer):
    Boletas = BoletaSerializer(many=True, read_only=True)
    class Meta:
        model = ItemProducto
        fields = ("id_item",'cantidad','boletas')

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('rut','nombre_cl','num_telf','email','direccion','boletas')

class ProductoSerializer(serializers.ModelSerializer):
    Items = ItemProductoSerializer(many=True, read_only=True)
    class Meta:
        model = Producto
        fields = ("id_prod",'nombre_pro','precio','Items')

'''
serializers con depth

'''

class BoletaSerializerDepth(serializers.ModelSerializer):
    class Meta:
        model = Boleta
        fields = ('num_boleta','created_at','total','total_dev','monto_dev','ItemProductos')
        depth = 3

class ItemProductoSerializerDepth(serializers.ModelSerializer):
    Boletas = BoletaSerializerDepth(many=True, read_only=True)
    class Meta:
        model = ItemProducto
        fields = ("id_item",'cantidad','boletas')
        depth = 2
        
class ClienteSerializerDepth(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('rut','nombre_cl','num_telf','email','direccion','boletas')
        depth = 4

class ProductoSerializerDepth(serializers.ModelSerializer):
    Items = ItemProductoSerializerDepth(many=True, read_only=True)
    class Meta:
        model = Producto
        fields = ("id_prod",'nombre_pro','precio','Items')