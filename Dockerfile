FROM registry.wtf/adroit/node:base as build
COPY . /app
RUN npm install && ng build --configuration=$ENV --output-path=dist


# Production Image build
FROM registry.wtf/adroit/nginx

COPY --from=build /app/dist /var/www/

EXPOSE 80 443

CMD [ "nginx", "-g", "daemon off;" ]