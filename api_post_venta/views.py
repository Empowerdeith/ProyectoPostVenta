from django.shortcuts import render

# Create your views here.
def home(request):
	return render(request,"paginas_post_venta/base/main.html", {})
def devoluciones1(request):
	return render(request,"paginas_post_venta/Devolucion/devoluciones.html")
def cuenta(request):
	return render(request,"paginas_post_venta/login/cuenta.html")
def revision(request):
	return render(request,"paginas_post_venta/Devolucion/revision_postventa.html")