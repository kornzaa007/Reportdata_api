clear
echo ">>> build tsc"
tsc

echo '>>> delete map file'
find ./app/ -name '*.map' -type f -delete

serverList=("pck@203.157.3.75:/var/www/API/cannabis" "web@203.157.104.128:/var/www/cannabis/api")
for server in "${serverList[@]}"
do
    echo "copy to server => $server"
    scp -r app/* $server/app
    scp -r src/* $server/src
    # scp -r public/* $server/public
    scp *.json $server
    # scp config $server
    # scp config.txt $server
done
