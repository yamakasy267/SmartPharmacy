FROM python:3.12-alpine


ENV TZ Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone



ENV LANGUAGE=ru_RU.UTF-8 LANG=ru_RU.UTF-8 LC_ALL=ru_RU.UTF-8

# poetry package support
RUN apk add --no-cache --update \
 musl-dev \
 gcc \
 postgresql-dev \
 capnproto-dev \
 g++ \
 cmake \
 make \
 linux-headers

RUN echo OK123456


RUN addgroup -g 1000 docker
RUN adduser -D web
RUN addgroup web docker
USER web

ENV HOME=/home/web
ENV APP_HOME=$HOME/app
ENV PYTHONUSERBASE=$HOME/packages VIRTUAL_ENV=$HOME/.venv
ENV PATH=$PYTHONUSERBASE/bin:$VIRTUAL_ENV/bin:$PATH
RUN mkdir /home/web/app
WORKDIR $APP_HOME

RUN pip completion --bash >> /home/web/.bashrc \
 && python3 -m venv $VIRTUAL_ENV \
 && pip install --user poetry==1.7.0

COPY --chown=web:web pyproject.toml poetry.lock ./
RUN poetry install

COPY --chown=web:web . .
