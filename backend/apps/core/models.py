from django.db import models
from django.utils.translation import gettext_lazy as _


class Arrondissement(models.Model):
    number = models.PositiveSmallIntegerField(unique=True, verbose_name=_("Numéro"))
    name_fr = models.CharField(max_length=200, verbose_name=_("Nom (FR)"))
    name_en = models.CharField(max_length=200, verbose_name=_("Nom (EN)"), blank=True)
    name_ar = models.CharField(max_length=200, verbose_name=_("Nom (AR)"), blank=True)
    description_fr = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    description_ar = models.TextField(blank=True)
    population = models.PositiveIntegerField(default=0)
    area_km2 = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    mayor_name = models.CharField(max_length=200, blank=True)
    address = models.CharField(max_length=300, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    image = models.ImageField(upload_to='arrondissements/', null=True, blank=True)
    color = models.CharField(max_length=7, default='#003580')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['number']
        verbose_name = _("Arrondissement")
        verbose_name_plural = _("Arrondissements")

    def __str__(self):
        return f"{self.number}{'er' if self.number == 1 else 'ème'} Arrondissement"


class ServiceCategory(models.Model):
    CATEGORIES = [
        ('etat_civil', 'État Civil'),
        ('urbanisme', 'Urbanisme'),
        ('eau', 'Eau & Assainissement'),
        ('voirie', 'Voirie & Mobilité'),
        ('sante', 'Santé Publique'),
        ('education', 'Éducation'),
        ('environnement', 'Environnement'),
        ('fiscalite', 'Fiscalité'),
    ]
    slug = models.SlugField(unique=True)
    name_fr = models.CharField(max_length=200)
    name_en = models.CharField(max_length=200, blank=True)
    name_ar = models.CharField(max_length=200, blank=True)
    description_fr = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    description_ar = models.TextField(blank=True)
    icon = models.CharField(max_length=50, default='fas fa-cog')
    color = models.CharField(max_length=7, default='#003580')
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name = _("Catégorie de service")

    def __str__(self):
        return self.name_fr


class Service(models.Model):
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name='services')
    title_fr = models.CharField(max_length=300)
    title_en = models.CharField(max_length=300, blank=True)
    title_ar = models.CharField(max_length=300, blank=True)
    description_fr = models.TextField()
    description_en = models.TextField(blank=True)
    description_ar = models.TextField(blank=True)
    requirements_fr = models.TextField(blank=True, help_text="Liste des pièces, une par ligne")
    steps_fr = models.TextField(blank=True, help_text="Étapes, une par ligne")
    duration = models.CharField(max_length=100, blank=True)
    fees = models.CharField(max_length=100, blank=True)
    office = models.CharField(max_length=200, blank=True)
    is_online = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title_fr


class News(models.Model):
    STATUS = [('draft', 'Brouillon'), ('published', 'Publié')]
    title_fr = models.CharField(max_length=400)
    title_en = models.CharField(max_length=400, blank=True)
    title_ar = models.CharField(max_length=400, blank=True)
    excerpt_fr = models.TextField(max_length=500)
    excerpt_en = models.TextField(max_length=500, blank=True)
    excerpt_ar = models.TextField(max_length=500, blank=True)
    content_fr = models.TextField()
    content_en = models.TextField(blank=True)
    content_ar = models.TextField(blank=True)
    category = models.CharField(max_length=100, default='Général')
    image = models.ImageField(upload_to='news/', null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    status = models.CharField(max_length=10, choices=STATUS, default='draft')
    published_at = models.DateTimeField(null=True, blank=True)
    arrondissement = models.ForeignKey(Arrondissement, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at', '-created_at']
        verbose_name_plural = "Actualités"

    def __str__(self):
        return self.title_fr


class AgendaEvent(models.Model):
    title_fr = models.CharField(max_length=300)
    title_en = models.CharField(max_length=300, blank=True)
    title_ar = models.CharField(max_length=300, blank=True)
    description_fr = models.TextField(blank=True)
    date_start = models.DateTimeField()
    date_end = models.DateTimeField(null=True, blank=True)
    location = models.CharField(max_length=300)
    category = models.CharField(max_length=100, default='Général')
    arrondissement = models.ForeignKey(Arrondissement, null=True, blank=True, on_delete=models.SET_NULL)
    is_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['date_start']
        verbose_name = "Événement"

    def __str__(self):
        return self.title_fr


class Ticker(models.Model):
    message_fr = models.CharField(max_length=400)
    message_en = models.CharField(max_length=400, blank=True)
    message_ar = models.CharField(max_length=400, blank=True)
    icon = models.CharField(max_length=10, default='📢')
    is_active = models.BooleanField(default=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.message_fr[:60]


class AdministrationUnit(models.Model):
    slug = models.SlugField(unique=True)
    name_fr = models.CharField(max_length=200)
    name_en = models.CharField(max_length=200, blank=True)
    name_ar = models.CharField(max_length=200, blank=True)
    description_fr = models.TextField()
    description_en = models.TextField(blank=True)
    description_ar = models.TextField(blank=True)
    head_name = models.CharField(max_length=200, blank=True)
    head_title_fr = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    office = models.CharField(max_length=100, blank=True)
    icon = models.CharField(max_length=50, default='fas fa-building')
    color = models.CharField(max_length=7, default='#2d1b69')
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name = "Unité Administrative"

    def __str__(self):
        return self.name_fr
