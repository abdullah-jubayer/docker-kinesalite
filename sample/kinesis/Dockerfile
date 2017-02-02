#
# Kinesalite
#

FROM bandsintown/node:6.7

WORKDIR /app

VOLUME /db

RUN apk-install python make g++ \
    && npm install -g kinesalite leveldown minimist \
    && apk del python make g++ \
    && echo -ne "- with Kinesalite\n" >> /root/.built

ADD kinesalite.js /app

ENV NODE_PATH=/usr/local/lib/node_modules

EXPOSE 4567

CMD ["node", "kinesalite.js", "--port", "4567"]