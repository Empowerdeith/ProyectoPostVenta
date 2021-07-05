from django.contrib import admin
from django.urls import path, re_path, include
from api_post_venta.views import(
    home,
	devoluciones1,
	cuenta,
    despacho_stock,
    anexo_boleta,
	)
from orden_devolucion.views import(revision)
    
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name="home"),
    path('devolucion/', devoluciones1, name="devolucion"),
    path('despacho_stock/', despacho_stock, name="despacho_stock"),
    path('anexo_boleta/', anexo_boleta, name="anexo_boleta"),
    path('revision/', revision,  name="revision"),
    path('api/', include('api_post_venta.api.urls'), name= "api_web"),
    path('cuenta/', cuenta, name="cuenta"),
    re_path('api/', include('orden_devolucion.urls')),
]
