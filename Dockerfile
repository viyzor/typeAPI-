# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV JWT_SECRET="g8i4gh049" \
    PORT=3000 \
    DATABASE_URL='postgres://postgres:rjpzdrf54@db:5432/psgdb'



# Run the application
CMD ["node", "./dist/server.js"]