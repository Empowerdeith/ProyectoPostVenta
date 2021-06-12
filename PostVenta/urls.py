from django.contrib import admin
from django.urls import path, re_path, include
from api_post_venta.views import(
    home,
	devoluciones1,
	cuenta,
	)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name="home"),
    path('devolucion/', devoluciones1, name="devolucion"),
    path('api/', include('api_post_venta.api.urls'), name= "api_web"),
    path('cuenta/', cuenta, name="cuenta"),
    re_path('', include('orden_devolucion.urls')),
]