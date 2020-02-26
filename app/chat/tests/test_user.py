from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.contrib.auth.models import User


class TestUser(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="useruser", password="testpass")

        self.client.force_authenticate(user=self.user)

    def test_get_user_list(self):

        res = self.client.get("/api/users/")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)

    def test_search_user_list(self):

        User.objects.create_user(
            username="testtest", password="testpass")

        res = self.client.get("/api/users/?search=test")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
