#
# Docker project to create kinesis stream
#

FROM bandsintown/node:6.7

ENV DOCKERIZE_VERSION=v0.2.0

WORKDIR /app
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && npm install aws-sdk

ADD create-stream.js /app

CMD ["node", "create-stream.sh"]