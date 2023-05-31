echo "INFO: file: docker_clean_container.sh"

containers=$(sudo docker ps -a -q)
if [ -z $containers ]; then
    echo "INFO: there is no container running"
else
    docker stop $containers
    docker rm $containers
    echo "INFO: stopped and removed docker containers ${containers}"
fi
