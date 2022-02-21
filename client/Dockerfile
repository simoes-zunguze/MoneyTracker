FROM nginx:1.21.4-alpine
COPY ./build  /usr/share/nginx/html
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 3001
ENTRYPOINT ["nginx","-g","daemon off;"]
