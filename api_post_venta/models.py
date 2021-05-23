from django.db import models
from django.contrib.auth.models import User
# Comprador.
"""
class Customer(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
	name = models.CharField(max_length=200, null=True)
	email = models.CharField(max_length=200, null=True)
	def __str__(self):
		return self.name
#Producto
class Producto(models.Model):
	nombre = models.CharField(max_length=200, null=True)
	precio = models.FloatField()
	digital = models.BooleanField(default=False, null=True, blank=False)

	def __str__(self):
		return self.nombre

#Modelo Pedido, Orden 1 orden puede tener muchos items.
class Orden(models.Model):
	customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, blank=True, null=True)
	date_ordered = models.DateTimeField(auto_now_add=True)
	complete = models.BooleanField(default=False, null=True, blank=False)
	transaction_id = models.CharField(max_length=200, null=True)

	def __str__(self):
		return str(self.id)


# Objetos de Pedido
class OrdenItem(models.Model):
	product = models.ForeignKey(Producto, on_delete=models.SET_NULL, blank=True, null=True)
	order = models.ForeignKey(Orden, on_delete=models.SET_NULL, blank=True, null=True)
	cantidad = models.IntegerField(default=0, null=True, blank=True)
	date_added = models.DateTimeField(auto_now_add=True)


#Direccion
class ShippingAddress(models.Model):
	customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, blank=True, null=True)
	order = models.ForeignKey(Orden, on_delete=models.SET_NULL, blank=True, null=True)
	address = models.CharField(max_length=200, null=True)
	city = models.CharField(max_length=200, null=True)
	state = models.CharField(max_length=200, null=True)
	zipcode = models.CharField(max_length=200, null=True)
	date_added = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.address
"""

#Modelo boleta provisorio

class Boleta(models.Model):
	numero_boleta = models.CharField(max_length=200, null=True)
	Comprador = models.CharField(max_length=200, null=True)
	email = models.CharField(max_length=200, null=True)
	date_ordered = models.DateTimeField(auto_now_add=True)
	producto = models.CharField(max_length=200, null=True)
	cantidad = models.IntegerField(default=0, null=True, blank=True)
	precio_unitario = models.FloatField(default=0)
	total = models.FloatField()
	region = models.CharField(max_length=200, null=True)
	ciudad = models.CharField(max_length=200, null=True)
	codigo_postal= models.CharField(max_length=200, null=True)
	direccion = models.CharField(max_length=200, null=True)

	def __str__(self):
		return self.numero_boleta



