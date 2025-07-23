FROM harbordev.zlattice.top/library/node:22.13.0

RUN apt update && \
    apt install -y git-all

WORKDIR /app

# 设置环境变量，可在docker-compose或docker run时覆盖
ENV KNOWLEDGE_SERVICE_URL=http://localhost:8080

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

ENTRYPOINT ["npm","run","dev"]

