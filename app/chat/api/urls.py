from django.urls import path

from .views import ProfileListAPIView, ChatCreateAPIView, ChatListAPIView, ProfileUpdateAPIView, UserListAPIView

urlpatterns = [
    path("profiles/", ProfileListAPIView.as_view(), name="profile-list"),
    path("profiles/<pk>",
         ProfileUpdateAPIView.as_view(), name="profile-update"),
    path("chat/", ChatCreateAPIView.as_view(), name="chat-create"),
    path("chats/", ChatListAPIView.as_view(), name="chat-list"),
    path("users/", UserListAPIView.as_view(), name="user-list"),

]
