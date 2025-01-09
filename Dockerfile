FROM harbordev.zlattice.top/library/node:22-alpine

WORKDIR /app

COPY ./docs /app/docs
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./vite.config.js /app/vite.config.js


RUN npm install