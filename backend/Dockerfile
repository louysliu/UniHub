# Use an official Node runtime as the parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy project files to the working directory
COPY . .

# Install dependencies
RUN npm install

# Make port 3005 available outside the container
EXPOSE 3005

# set this environment variable to enable debugging
ENV DEBUG=express:*

# Run the application
CMD [ "/bin/sh", "init.sh" ]
