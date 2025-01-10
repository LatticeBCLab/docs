FROM harbordev.zlattice.top/library/node:22.13.0

RUN apt update && \
    apt install -y git-all

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json


