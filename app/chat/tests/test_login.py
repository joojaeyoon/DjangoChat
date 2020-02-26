from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.contrib.auth.models import User


class TestLogin(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="useruser", password="testpass")

    def test_create_account(self):
        payload = {
            "username": "testuser",
            "password1": "testpassword",
            "password2": "testpassword"
        }

        res = self.client.post("/rest-auth/registration/", payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(res.data["key"] is not None)

    def test_login(self):
        payload = {
            "username": "useruser",
            "password": "testpass"
        }
        res = self.client.post("/rest-auth/login/", payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(res.data["key"] is not None)
