from django.contrib import admin
from .models import (
    Arrondissement, ServiceCategory, Service,
    News, AgendaEvent, Ticker, AdministrationUnit
)


@admin.register(Arrondissement)
class ArrondissementAdmin(admin.ModelAdmin):
    list_display = ['number', 'name_fr', 'population', 'mayor_name', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name_fr', 'mayor_name']
    ordering = ['number']


class ServiceInline(admin.TabularInline):
    model = Service
    extra = 1
    fields = ['title_fr', 'fees', 'is_online', 'is_active', 'order']


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ['name_fr', 'slug', 'icon', 'order', 'is_active']
    prepopulated_fields = {'slug': ('name_fr',)}
    inlines = [ServiceInline]


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title_fr', 'category', 'is_featured', 'status', 'published_at']
    list_filter = ['status', 'is_featured', 'category']
    search_fields = ['title_fr', 'title_en']
    list_editable = ['status', 'is_featured']
    date_hierarchy = 'published_at'


@admin.register(AgendaEvent)
class AgendaEventAdmin(admin.ModelAdmin):
    list_display = ['title_fr', 'date_start', 'location', 'category']
    list_filter = ['category', 'is_public']
    date_hierarchy = 'date_start'


@admin.register(Ticker)
class TickerAdmin(admin.ModelAdmin):
    list_display = ['message_fr', 'icon', 'order', 'is_active']
    list_editable = ['order', 'is_active']


@admin.register(AdministrationUnit)
class AdministrationUnitAdmin(admin.ModelAdmin):
    list_display = ['name_fr', 'slug', 'head_name', 'order', 'is_active']
    prepopulated_fields = {'slug': ('name_fr',)}
