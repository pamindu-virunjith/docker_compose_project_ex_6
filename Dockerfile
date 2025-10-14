FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]


# docker image
# docker build -t server-1 .

# docker container
# docker run --name test-container --rm -p 3000:5000 -v /app/node_modules -v ${PWD}:/app server-1

# (in this phase the mongodb is not connected to the container, so there arises an error)
# to solve this error we have to connect the mongodb to the container, for this we have to use the docker compose