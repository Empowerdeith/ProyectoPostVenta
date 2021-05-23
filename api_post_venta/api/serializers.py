from rest_framework import serializers
from api_post_venta.models import (
	Boleta
	)

class BoletaSerializer(serializers.ModelSerializer):
	class Meta:
		model = Boleta
		fields = '__all__'


"""from api_post_venta.models import (
	Customer, 
	Producto,
	Orden,
	OrdenItem,
	ShippingAddress,
	)

class CustomerSerializer(serializers.ModelSerializer):
	class Meta:
		model = Customer
		fields = '__all__'
class ProductoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Producto
		fields = '__all__'
class OrdenSerializer(serializers.ModelSerializer):
	class Meta:
		model = Orden
		fields = '__all__'
class OrdenItemSerializer(serializers.ModelSerializer):
	product = ProductoSerializer()
	order = OrdenSerializer()
	class Meta:
		model = OrdenItem
		fields = '__all__'
class ShippingAddress(serializers.ModelSerializer):
	class Meta:
		model = ShippingAddress
		fields = '__all__'
"""


