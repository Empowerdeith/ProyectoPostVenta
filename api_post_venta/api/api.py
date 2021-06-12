from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from api_post_venta.api.serializers import (
	BoletaSerializer,
	)
from api_post_venta.models import (
	Boleta,
	)

@api_view(['GET'])
def boleta_detail_view(request,pk=None):
	if request.method == 'GET':
		boleta = Boleta.objects.filter(numero_boleta=pk).first()
		if boleta == None:
			return Response("No existe la boleta ingresada.")
		else:
			boleta_serializer= BoletaSerializer(boleta)
			return Response(boleta_serializer.data)