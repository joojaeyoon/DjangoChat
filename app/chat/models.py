from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="profile")
    avater = models.ImageField(blank=True, null=True)
    friends = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.user.username


class Message(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="message")
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content


class Chat(models.Model):
    participants = models.ManyToManyField(Profile, related_name="chats")
    messages = models.ManyToManyField(Message, blank=True, related_name="chat")

    def last_10_messages(self):
        return self.messages.order_by('-timestamp').all()[:10]

    def __str__(self):
        return "{}".format(self.pk)
