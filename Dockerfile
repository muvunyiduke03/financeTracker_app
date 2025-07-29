# Use Nginx to serve static content
FROM nginx:alpine

# Copy your static files to nginx's default public folder
WORKDIR /usr/share/nginx/html

COPY . .

# Expose port 8080
EXPOSE 8080

# Override default nginx port to 8080
CMD ["nginx", "-g", "daemon off;"]
