FROM node:8.12.0
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 3000
CMD npm start
