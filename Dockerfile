FROM node:20.9.0-alpine3.17

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy all local files to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD [ "node", "app.js" ]
