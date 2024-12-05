FROM node:22.12

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]