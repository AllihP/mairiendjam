from rest_framework import status
from rest_framework.decorators import (
    api_view, throttle_classes,
    authentication_classes, permission_classes
)
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.permissions import AllowAny
from .serializers import ContactMessageSerializer


class ContactThrottle(AnonRateThrottle):
    rate = '10/hour'


@api_view(['POST'])
@authentication_classes([])   # ← supprime la vérification CSRF (SessionAuthentication)
@permission_classes([AllowAny])
@throttle_classes([ContactThrottle])
def send_message(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        msg = serializer.save(
            ip_address=request.META.get('REMOTE_ADDR')
        )
        return Response(
            {
                'detail': 'Message envoyé avec succès. Nous vous répondrons sous 48h.',
                'id': msg.id
            },
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
