import os
import django
from channels.routing import get_default_application
from whitenoise.django import DjangoWhiteNoise

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")
django.setup()
application = DjangoWhiteNoise(get_default_application())
