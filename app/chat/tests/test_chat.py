from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.contrib.auth.models import User

from chat.models import Chat


class TestProfile(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user1 = User.objects.create_user(
            username="user1", password="testpass")
        self.user2 = User.objects.create_user(
            username="user2", password="testpass")

        self.client.force_authenticate(user=self.user1)

    def test_craete_chat(self):
        payload = {
            "participants": [
                self.user1.id,
                self.user2.id
            ]
        }

        res = self.client.post("/api/chat/", payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data["participants"], [
                         self.user1.id, self.user2.id])
