from rest_framework import viewsets, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Arrondissement, ServiceCategory, News,
    AgendaEvent, Ticker, AdministrationUnit
)
from .serializers import (
    ArrondissementListSerializer, ArrondissementDetailSerializer,
    ServiceCategorySerializer, NewsSerializer,
    AgendaEventSerializer, TickerSerializer, AdministrationUnitSerializer
)


class ArrondissementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Arrondissement.objects.filter(is_active=True)
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['name_fr', 'name_en']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ArrondissementDetailSerializer
        return ArrondissementListSerializer

    def get_object(self):
        queryset = self.get_queryset()
        # Allow lookup by number OR pk
        lookup = self.kwargs.get(self.lookup_field)
        try:
            return queryset.get(number=int(lookup))
        except (ValueError, Arrondissement.DoesNotExist):
            return super().get_object()


class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.filter(is_active=True).prefetch_related('services')
    serializer_class = ServiceCategorySerializer
    lookup_field = 'slug'


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = News.objects.filter(status='published')
    serializer_class = NewsSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_featured', 'arrondissement']
    search_fields = ['title_fr', 'title_en', 'excerpt_fr']
    ordering_fields = ['published_at', 'created_at']


class AgendaEventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AgendaEvent.objects.filter(is_public=True)
    serializer_class = AgendaEventSerializer
    filterset_fields = ['category', 'arrondissement']


class TickerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Ticker.objects.filter(is_active=True)
    serializer_class = TickerSerializer


class AdministrationUnitViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AdministrationUnit.objects.filter(is_active=True)
    serializer_class = AdministrationUnitSerializer
    lookup_field = 'slug'


@api_view(['GET'])
def stats(request):
    """Global statistics for the homepage."""
    return Response({
        'habitants': '1.5M',
        'arrondissements': Arrondissement.objects.filter(is_active=True).count() or 10,
        'actes_par_an': '87k',
        'agents': 245,
        'services_actifs': 42,
    })
