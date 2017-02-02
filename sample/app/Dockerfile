#
# Application
#

FROM bandsintown/node:6.7

ENV DOCKERIZE_VERSION=v0.2.0

WORKDIR /app

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && npm install aws-sdk moment

ADD app.js /app

# Fake aws credentials
ADD .aws /root/.aws

CMD ["node", "app.js"]