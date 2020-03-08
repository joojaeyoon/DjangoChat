## DjangoChat

Chat application using Django, React

<a href="http://34.230.193.35/">DjangoChat Webapge</a>

<div align="center">

<h2>Login Page</h2>
<img src="./github/login.png" width="250"/>
<img src="./github/register.png" width="250"/>

<h2> Chat</h2>
<img src="./github/chat.jpg"/>
</div>

#### ToUse

```
~# cd frontend
~/frontend# yarn
~/frontend# yarn build
~/frontend# mv build ../app/

~# docker-compose build
~# docker-compose run app sh -c "python manage.py collectstatic"
~# docker-compose up
```

#### Environment

- Python3
- Django / Django-REST-Framework / Django-Channels
- Docker / Docker-Compose 
- React
- Redis
- PostgresQL
