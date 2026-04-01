from django.contrib import admin
from .models import ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['first_name','last_name','email','subject','status','created_at']
    list_filter = ['status']
    search_fields = ['first_name','last_name','email','subject']
    list_editable = ['status']
    readonly_fields = ['ip_address','created_at']
    date_hierarchy = 'created_at'
