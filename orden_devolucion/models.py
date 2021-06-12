from django.db import models
from django.utils import timezone

# Create your models here.

class Producto(models.Model):
    id=models.AutoField(primary_key=True)
    nombre_pro = models.CharField(max_length=100)
    precio = models.IntegerField()

    def __str__(self):
        return self.nombre_pro

class Boleta(models.Model):
    num_boleta = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    total = models.IntegerField()
    productos = models.ManyToManyField('Producto', related_name='boletas', blank=True)

class Cliente(models.Model):
    rut = models.CharField(max_length=100, primary_key=True)
    nombre_cl = models.CharField(max_length=100)
    direccion = models.CharField(max_length=100)
    boletas = models.ManyToManyField('Boleta', related_name='clientes', blank=True)

    def __str__(self):
        return self.rut