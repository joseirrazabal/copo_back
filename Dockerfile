FROM node:8.11.0-slim

ADD ./dist/ /srv/
WORKDIR /srv
EXPOSE 9009
ENTRYPOINT [ "node", "server.js" ]
