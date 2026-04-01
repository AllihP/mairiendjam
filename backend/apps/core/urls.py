from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ArrondissementViewSet, ServiceCategoryViewSet,
    NewsViewSet, AgendaEventViewSet, TickerViewSet,
    AdministrationUnitViewSet, stats
)

router = DefaultRouter()
router.register('arrondissements', ArrondissementViewSet, basename='arrondissement')
router.register('services', ServiceCategoryViewSet, basename='service')
router.register('news', NewsViewSet, basename='news')
router.register('agenda', AgendaEventViewSet, basename='agenda')
router.register('tickers', TickerViewSet, basename='ticker')
router.register('administration', AdministrationUnitViewSet, basename='administration')

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', stats, name='stats'),
]
