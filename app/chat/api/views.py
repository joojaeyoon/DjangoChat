from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter
from django.contrib.auth.models import User


from .serializers import ProfileSerializer, ChatSerializer, ProfileRetrieveSerializer, ChatCreateSerializer, UserSerializer
from chat.models import Profile, Chat

from .permissions import IsOwnerOrReadOnly


class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, ]
    filter_backends = [SearchFilter]
    search_fields = ["username"]


class ProfileListAPIView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileRetrieveSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        queryset = Profile.objects.all()

        username = self.request.query_params.get("username", None)
        if username is None:
            return queryset

        profile = Profile.objects.filter(user__username=username)

        return profile


class ProfileUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly, ]


class ChatListAPIView(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        queryset = Chat.objects.all()
        username = self.request.query_params.get("username", None)
        if username is not None:
            queryset = Chat.objects.filter(
                participants__user__username=username)

        return queryset


class ChatCreateAPIView(generics.CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatCreateSerializer
    permission_classes = [IsAuthenticated, ]
