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

        username = self.request.query_params.get("username")
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
