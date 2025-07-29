# Use the official Nginx image as the base
FROM nginx:alpine

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy app files to nginx HTML directory
COPY . /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
