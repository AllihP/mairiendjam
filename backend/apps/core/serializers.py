from rest_framework import serializers
from .models import (
    Arrondissement, ServiceCategory, Service,
    News, AgendaEvent, Ticker, AdministrationUnit
)


class ArrondissementListSerializer(serializers.ModelSerializer):
    ordinal = serializers.SerializerMethodField()

    class Meta:
        model = Arrondissement
        fields = ['id', 'number', 'ordinal', 'name_fr', 'name_en', 'name_ar',
                  'population', 'area_km2', 'color', 'image', 'is_active']

    def get_ordinal(self, obj):
        return f"{obj.number}{'er' if obj.number == 1 else 'ème'}"


class ArrondissementDetailSerializer(serializers.ModelSerializer):
    ordinal = serializers.SerializerMethodField()

    class Meta:
        model = Arrondissement
        fields = '__all__'

    def get_ordinal(self, obj):
        return f"{obj.number}{'er' if obj.number == 1 else 'ème'}"


class ServiceSerializer(serializers.ModelSerializer):
    requirements_list = serializers.SerializerMethodField()
    steps_list = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = '__all__'

    def get_requirements_list(self, obj):
        return [r.strip() for r in obj.requirements_fr.splitlines() if r.strip()]

    def get_steps_list(self, obj):
        return [s.strip() for s in obj.steps_fr.splitlines() if s.strip()]


class ServiceCategorySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = ServiceCategory
        fields = '__all__'


class NewsSerializer(serializers.ModelSerializer):
    arrondissement_name = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = '__all__'

    def get_arrondissement_name(self, obj):
        return str(obj.arrondissement) if obj.arrondissement else None


class AgendaEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgendaEvent
        fields = '__all__'


class TickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticker
        fields = '__all__'


class AdministrationUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdministrationUnit
        fields = '__all__'
