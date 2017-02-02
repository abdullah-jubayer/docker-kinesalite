#
# Lambda local
#

FROM bandsintown/node:6.7

WORKDIR /app

RUN npm install aws-sdk lambda-local moment

ADD trigger-lambda.js /app
ADD lambda.js /app

# Fake aws credentials
ADD .aws /root/.aws