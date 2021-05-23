from django.urls import path
from api_post_venta.api.api import (
	boleta_detail_view,
	)

urlpatterns = [
	path('boleta/<int:pk>/', boleta_detail_view, name= "boleta_api"),
	]















#Test

"""
from api_post_venta.api.api import (
	CustomerApiView,
	ProductoApiView,
	orden_detail_view,
	ordenitem_detail_view,
	)

urlpatterns = [
	path('consumidores/', CustomerApiView, name= "customer_api"),
	path('productos/', ProductoApiView, name= "productos_api"),
	path('orden/<int:pk>/', orden_detail_view, name='detail_orden_view'),
	path('ordenitem/<int:pk>/', ordenitem_detail_view, name='plz_work'),

]"""