FROM node:8

LABEL author ="Carlos"

RUN mkdir -p /docker

WORKDIR /docker

COPY package.json /docker/

RUN npm i

COPY . /docker

EXPOSE 5000

CMD ["node","./src/app","#btc","10","15"]