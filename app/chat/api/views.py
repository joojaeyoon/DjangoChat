from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .serializers import ProfileSerializer, ChatSerializer
from chat.models import Profile, Chat

from .permissions import IsOwnerOrReadOnly


class ProfileListAPIView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        queryset = Profile.objects.all()

        username = self.request.query_params.get("username", None)
        if username is None:
            return queryset

        profile = Profile.objects.filter(user__username=username)

        return profile


class ProfileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly, ]


class ChatListCreateAPIView(generics.ListCreateAPIView):
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
