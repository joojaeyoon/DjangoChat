from django.urls import path

from .views import ProfileDetailAPIView, ProfileListAPIView

urlpatterns = [
    path("profiles/", ProfileListAPIView.as_view(), name="profile-list"),
    path("profiles/<pk>", ProfileDetailAPIView.as_view(), name="profile-detail")
]
