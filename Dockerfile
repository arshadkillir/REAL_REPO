FROM nginx:1.28
COPY ./nginx/default.conf.validated /etc/nginx/conf.d/default.conf
