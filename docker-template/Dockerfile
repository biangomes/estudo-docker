# selecting our base image to start with
FROM node:14-alpine3.12
COPY . /app

# Create app directory
# this is the location where you will be inside the container
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where avaliable (npm@5+)
# copying packages first helps takes advantage of docker layers
COPY package*.json ./

RUN npm Install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Make this port accessible from outside the container
# Necessary for your browser to send HTTP requests to your Node app
EXPOSE 8080

# Command to rum when the container is ready
# Separate arguments as separate values in the array
CMD ["npm", "run", "start"]