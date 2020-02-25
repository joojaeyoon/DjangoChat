from django.urls import path

from .views import ProfileListAPIView, ChatListCreateAPIView, ProfileUpdateAPIView

urlpatterns = [
    path("profiles/", ProfileListAPIView.as_view(), name="profile-list"),
    path("profiles/<pk>",
         ProfileUpdateAPIView.as_view(), name="profile-update"),
    path("chats/", ChatListCreateAPIView.as_view(), name="chat-list")
]
