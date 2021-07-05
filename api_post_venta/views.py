from django.shortcuts import render

# Create your views here.
def home(request):
	return render(request,"paginas_post_venta/base/main.html", {})
def devoluciones1(request):
	return render(request,"paginas_post_venta/Devolucion/devoluciones.html")
def despacho_stock(request):
	return render(request,"paginas_post_venta/Devolucion/despacho_stock.html")
def anexo_boleta(request):
	return render(request,"paginas_post_venta/Devolucion/anexo_boleta.html")
def cuenta(request):
	return render(request,"paginas_post_venta/login/cuenta.html")
