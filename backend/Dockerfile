# Use an official Node runtime as the parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy project files to the working directory
COPY . .

# Install dependencies
RUN npm install

# the port the application will listen on
EXPOSE 3005
# the port the Node.js debugger will listen on
EXPOSE 9229

# set this environment variable to enable debugging
ENV DEBUG=express:*

# Run the application
CMD [ "/bin/sh", "init.sh" ]
