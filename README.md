# Cannabis API  
[![pipeline status](https://gitlab.com/moph/phdb/cannabis-api/badges/develop/pipeline.svg)](https://gitlab.com/moph/phdb/cannabis-api/commits/develop)

## Installation essentail tools 
```
npm install pm2 nodemon -g
npm install typescript -g
npm install ts-node -g
```
## Linux installation (Ubuntu)

```
$ sudo apt-get install libpoppler-qt5-dev libcairo2-dev
```

## Linux installation (Debian)

```
$ sudo apt-get install libcairo2-dev libpoppler-qt5-dev 
```

## download or clone this project
```
git clone -b develop https://gitlab.com/moph/phdb/cannabis-api
cd cannabis-api
npm i
```

## Running
```
create config file
> 'cp config.txt config'
and edit config file

start with command
> 'nodemon'
```

open browser and go to http://localhost:3001

## start permanently with PM2

```
pm2 start --interpreter ts-node src/app.ts cannabis-api
or
tsc
pm2 start app/app.js -i 2 --name "cannabis-api"
```
