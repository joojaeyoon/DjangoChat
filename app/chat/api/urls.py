from django.urls import path

from .views import ProfileDetailAPIView, ProfileListAPIView, ChatListCreateAPIView

urlpatterns = [
    path("profiles/", ProfileListAPIView.as_view(), name="profile-list"),
    path("profiles/<pk>", ProfileDetailAPIView.as_view(), name="profile-detail"),
    path("chats/", ChatListCreateAPIView.as_view(), name="chat-list")
]
