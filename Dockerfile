FROM harbordev.zlattice.top/library/ubuntu:22.04



RUN curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -

RUN apt update && \
    apt install nvm &&  \
    apt install git-all


WORKDIR /app

COPY ./docs /app/docs
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install

ENTRYPOINT ["npm run docs:dev"]

