FROM node:12-alpine

WORKDIR /app

COPY . .

ENV TZ="Asia/Shanghai"

RUN npm install --loglevel verbose --registry=https://registry.npm.taobao.org/

EXPOSE 3000

CMD ["npm", "run", "start"]