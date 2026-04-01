from django.db import models


class ContactMessage(models.Model):
    STATUS = [('new', 'Nouveau'), ('read', 'Lu'), ('replied', 'Répondu'), ('closed', 'Fermé')]

    first_name = models.CharField(max_length=100)
    last_name  = models.CharField(max_length=100)
    email      = models.EmailField()
    phone      = models.CharField(max_length=30, blank=True)
    subject    = models.CharField(max_length=300)
    arrondissement = models.CharField(max_length=100, blank=True)
    message    = models.TextField()
    status     = models.CharField(max_length=10, choices=STATUS, default='new')
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    replied_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Message de contact"

    def __str__(self):
        return f"{self.first_name} {self.last_name} — {self.subject[:50]}"
