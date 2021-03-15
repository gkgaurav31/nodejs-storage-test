FROM appsvc/node:14-lts_20200522.6
WORKDIR /home/site/wwwroot
COPY . /home/site/wwwroot
RUN npm i /home/site/wwwroot/