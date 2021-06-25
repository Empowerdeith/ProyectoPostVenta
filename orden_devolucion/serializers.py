from rest_framework import serializers
from .models import Producto, Cliente, Boleta

# Serializers define the API representation.

class BoletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boleta
        fields = ('num_boleta','created_at','total','productos')
        
class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('rut','nombre_cl','direccion','boletas')

class ProductoSerializer(serializers.ModelSerializer):
    boletas = BoletaSerializer(many=True, read_only=True)
    class Meta:
        model = Producto
        fields = ("id",'nombre_pro','precio','boletas')

'''
serializers con depth

'''

class BoletaSerializerDepth(serializers.ModelSerializer):
    class Meta:
        model = Boleta
        fields = ('num_boleta','created_at','total','productos')
        depth = 1

class ClienteSerializerDepth(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('rut','nombre_cl','direccion','boletas')
        depth = 2

class ProductoSerializerDepth(serializers.ModelSerializer):
    boletas = BoletaSerializer(many=True, read_only=True)
    class Meta:
        model = Producto
        fields = ("id",'nombre_pro','precio','boletas')


def saludar:
    return print("hola")