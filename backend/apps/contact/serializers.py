# serializers.py
from rest_framework import serializers
from .models import ContactMessage
import re

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id','first_name','last_name','email','phone','subject','arrondissement','message']

    def validate_email(self, value):
        if not re.match(r'^[\w.+-]+@[\w-]+\.[a-z]{2,}$', value, re.I):
            raise serializers.ValidationError("Adresse email invalide.")
        return value

    def validate_message(self, value):
        if len(value.strip()) < 15:
            raise serializers.ValidationError("Message trop court (15 caractères minimum).")
        return value
