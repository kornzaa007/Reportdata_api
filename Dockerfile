FROM registry.gitlab.com/moph/phdb/cannabis-ubuntu

LABEL maintainer="Satit Rianpit <rianpit@gmail.com>"

WORKDIR /home/cannabis

COPY nginx.conf /etc/nginx/

COPY . .

RUN ls -l

RUN npm i && npm run build

RUN ls -la

CMD /usr/sbin/nginx && /usr/bin/pm2-runtime process.json

EXPOSE 80
