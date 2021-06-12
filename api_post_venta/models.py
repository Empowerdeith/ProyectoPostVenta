from django.db import models
from django.contrib.auth.models import User
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



