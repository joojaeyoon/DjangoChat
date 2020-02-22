FROM python:3
MAINTAINER JAEYOON

ENV PYTHONUNVUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

RUN mkdir /app
WORKDIR /app
COPY ./app /app