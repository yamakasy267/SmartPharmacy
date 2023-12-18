FROM python:3.11.5-alpine3.18 as builder

# RUN apt-get update \
#  && apt-get install -y --no-install-recommends \
#     libpq-dev gnupg lsb-release debconf-utils gcc g++ locales \
#     gir1.2-gobject-2.0 libpango-1.0-0 \
#     libharfbuzz-dev libpangoft2-1.0-0 \
#  && apt-get clean \
#  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
#  && truncate -s 0 /var/log/*log

ENV TZ Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

# RUN echo "ru_RU.UTF-8 UTF-8" >> /etc/locale.gen \
#  && locale-gen
RUN apk add --no-cache --update musl musl-utils musl-locales tzdata
RUN echo 'export LC_ALL=ru_RU.UTF-8' >> /etc/profile.d/locale.sh && \
  sed -i 's|LANG=C.UTF-8|LANG=ru_RU.UTF-8|' /etc/profile.d/locale.sh

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

RUN apk add --no-cache --update \
 musl-dev \
 postgresql-dev \
 capnproto-dev \
 linux-headers

RUN apk add --no-cache --update \
 git

# Docker API Access issue handling
ARG DOCKER_GID=121
# RUN groupadd -g ${DOCKER_GID} docker
RUN delgroup $(getent group ${DOCKER_GID} | cut -d: -f1) || echo Group with id ${DOCKER_GID} not found
RUN addgroup -g ${DOCKER_GID} docker
# Default group
# RUN groupadd -g 1000 web \
#  && useradd -m --no-log-init -r -g 1000 -u 1000 web \
#  && usermod -aG docker web
RUN adduser -D web
RUN addgroup web docker

USER web

ENV HOME=/home/web
ENV APP_HOME=$HOME/app
ENV PYTHONUSERBASE=$HOME/packages VIRTUAL_ENV=$HOME/.venv
ENV PATH=$PYTHONUSERBASE/bin:$VIRTUAL_ENV/bin:$PATH
RUN mkdir /home/web/app
WORKDIR $APP_HOME

RUN pip completion --bash >> /home/web/.bashrc
RUN python3 -m venv $VIRTUAL_ENV
RUN python -m pip install --upgrade pip
RUN pip install poetry==1.5.1
 
COPY --chown=web:web pyproject.toml poetry.lock ./
RUN poetry install

RUN mkdir -p /home/web/stash && cp ./poetry.lock /home/web/stash/poetry.lock
COPY --chown=web:web . ./
RUN cp /home/web/stash/*.* ./

# =================================================================================================
# COPY FROM BUILDER TO RUNTIME
# -------------------------------------------------------------------------------------------------
FROM python:3.11.5-alpine3.18 as runtime

ENV TZ Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timpoetry package supportpoetry package supportezone

# RUN echo "ru_RU.UTF-8 UTF-8" >> /etc/locale.gen \
#  && locale-gen
RUN apk add --no-cache --update musl musl-utils musl-locales tzdata
RUN echo 'export LC_ALL=ru_RU.UTF-8' >> /etc/profile.d/locale.sh && \
  sed -i 's|LANG=C.UTF-8|LANG=ru_RU.UTF-8|' /etc/profile.d/locale.sh

ENV LANGUAGE=ru_RU.UTF-8 LANG=ru_RU.UTF-8 LC_ALL=ru_RU.UTF-8

# Dependencies
RUN apk add --no-cache --update \
 postgresql14-client \
 glib \
 pango \
 bash \
 capnproto \
 curl

# Weasy-print runtime dependencies
# RUN apk add cairo-dev pango-dev gdk-pixbuf
RUN apk add font-vollkorn font-misc-cyrillic font-mutt-misc font-screen-cyrillic font-winitzki-cyrillic font-cronyx-cyrillic

# Docker API Access issue handling
ARG DOCKER_GID=123
RUN [ -n `getent group ${DOCKER_GID} | cut -d: -f1` ] || addgroup -g ${DOCKER_GID} docker
RUN adduser -D web

# ADD USER TO THE GROUP THAT MAPPED TO HOST docker GROUP
RUN addgroup web $(getent group ${DOCKER_GID} | cut -d: -f1)

USER web

ENV HOME=/home/web
ENV APP_HOME=$HOME/app
ENV PYTHONUSERBASE=$HOME/packages VIRTUAL_ENV=$HOME/.venv
ENV PATH=$PYTHONUSERBASE/bin:$VIRTUAL_ENV/bin:$PATH
RUN mkdir /home/web/app
WORKDIR $APP_HOME

COPY --chown=web:web --from=builder /home/web/app /home/web/app
#COPY --chown=web:web ./migration.py /home/web/app/
COPY --chown=web:web --from=builder /home/web/.venv /home/web/.venv