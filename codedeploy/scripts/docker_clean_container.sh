containers=$(docker ps -a -q)
if [ -z $containers ]; then
    docker stop $containers
    docker rm $containers
else
    echo "there is no container running"
fi
