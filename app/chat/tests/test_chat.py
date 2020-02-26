from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.contrib.auth.models import User

from chat.models import Chat


class TestProfile(APITestCase):

    def setUp(self):
        self.user1 = User.objects.create_user(
            username="user1", password="testpass")
        self.user2 = User.objects.create_user(
            username="user2", password="testpass")

        self.client.force_authenticate(user=self.user1)
