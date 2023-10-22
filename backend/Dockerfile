# Use an official Node runtime as the parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy project files to the working directory
COPY . .

# Install dependencies
RUN npm install

# Define the environment variable for the app to run on
ENV PORT=3005

# Make port 3005 available outside the container
EXPOSE 3005

# Run the application
CMD [ "/bin/sh", "init.sh" ]
