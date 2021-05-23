from django.contrib import admin
from django.urls import path, include
from api_post_venta.views import(
    home,
	devoluciones1,
	)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name="home"),
    path('devolucion/', devoluciones1, name="devolucion"),
    path('api/', include('api_post_venta.api.urls'), name= "api_web"),
]

