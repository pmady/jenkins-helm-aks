FROM node:lts-alpine3.9

COPY src/*.js /app/
RUN cd /app/
RUN npm install os 
EXPOSE 3000
CMD [ "node","/app/index.js" ]
