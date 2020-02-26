from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.contrib.auth.models import User

from chat.models import Profile


class TestProfile(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="useruser", password="testpass")

        self.client.force_authenticate(user=self.user)

    def test_get_profiles(self):

        res = self.client.get("/api/profiles/")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
