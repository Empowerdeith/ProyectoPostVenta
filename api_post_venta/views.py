from django.shortcuts import render

# Create your views here.
def home(request):
	return render(request,"paginas_post_venta/base/main.html", {})
def devoluciones1(request):
	return render(request,"paginas_post_venta/Devolucion/devoluciones.html")