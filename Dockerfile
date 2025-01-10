FROM harborbaas.zkjg.com:4443/library/ubuntu:22.04


RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
RUN nvm install 22

RUN apt update && \
    apt install git-all

WORKDIR /app

COPY ./docs /app/docs
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install

ENTRYPOINT ["npm run docs:dev"]

