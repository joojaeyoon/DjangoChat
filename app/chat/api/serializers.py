from rest_framework import serializers

from chat.models import Profile, Chat


class ProfileSerializer(serializers.ModelSerializer):
    friends = serializers.StringRelatedField(many=True)
    user = serializers.StringRelatedField()

    class Meta:
        model = Profile
        fields = "__all__"


class ChatSerializer(serializers.ModelSerializer):
    participants = serializers.StringRelatedField(many=True)

    class Meta:
        model = Chat
        exclude = ("messages",)
