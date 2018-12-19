FROM node:10.14.2-jessie

WORKDIR /home/node/app
ADD src/ /home/node/app
ADD package.json /home/node/app

RUN ls -l
RUN npm i

EXPOSE 1234
CMD npm start