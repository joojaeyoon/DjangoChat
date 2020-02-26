from rest_framework import serializers
from django.contrib.auth.models import User

from chat.models import Profile, Chat


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class ChatSerializer(serializers.ModelSerializer):
    participants = serializers.StringRelatedField(many=True)

    class Meta:
        model = Chat
        exclude = ("messages",)


class ChatCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        exclude = ("messages",)


class ProfileSerializer(serializers.ModelSerializer):
    chats = ChatSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = "__all__"


class ProfileRetrieveSerializer(ProfileSerializer):
    user = serializers.StringRelatedField()
