FROM node:10.14.2-jessie

ADD src /home/node/app

WORKDIR /home/node/app
RUN npm i

EXPOSE 1234
CMD npm start