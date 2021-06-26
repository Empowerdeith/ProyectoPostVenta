from django.db import models
from django.utils import timezone
from django.db.models import Sum, Count

# Create your models here.

class Producto(models.Model):
    id_prod = models.IntegerField(primary_key=True)
    nombre_pro = models.CharField(max_length=100)
    precio = models.IntegerField()
    
    def __str__(self):
        return self.nombre_pro    

class Boleta(models.Model):
    num_boleta = models.IntegerField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    total = models.IntegerField()
    ItemProductos = models.ManyToManyField('ItemProducto', related_name='ItemProductos', blank=True)

class ItemProducto(models.Model):
    id_item = models.IntegerField(primary_key=True)
    cantidad = models.IntegerField(default=0,null=True, blank=True)
    productos = models.ForeignKey(Producto, on_delete=models.CASCADE)

class Cliente(models.Model):
    rut = models.CharField(max_length=100, primary_key=True)
    nombre_cl = models.CharField(max_length=100)
    num_telf = models.CharField(max_length=100)
    email = models.EmailField()
    direccion = models.CharField(max_length=100)
    boletas = models.ManyToManyField('Boleta', related_name='clientes', blank=True)

    def __str__(self):
        return self.rut