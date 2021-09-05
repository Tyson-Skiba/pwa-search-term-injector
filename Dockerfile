FROM node:14

LABEL authors="Tyson Skiba"

WORKDIR /usr/src/svc

# Beter for caching to copy earlier then the rest of the assets
COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY core.js ./core.js
COPY app.js ./app.js

RUN addgroup -S pwagroup && adduser -S pwauser -G pwagroup
USER pwauser

EXPOSE 8080
CMD [ "node", "app.js" ]
