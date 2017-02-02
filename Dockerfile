#
# Kinesalite
#

FROM bandsintown/node:6.7

ENV KINESALITE_VERSION=1.11.5 KINESALITE_DB_PATH=/db

WORKDIR /app

VOLUME ["$KINESALITE_DB_PATH"]

RUN apk-install python make g++ \
    && npm install -g kinesalite@${KINESALITE_VERSION} leveldown minimist \
    && apk del python make g++ \
    && echo -ne "- with Kinesalite\n" >> /root/.built

ADD kinesalite.js /app

ENV NODE_PATH=/usr/local/lib/node_modules

EXPOSE 4567

CMD ["node", "kinesalite.js", "--port", "4567"]