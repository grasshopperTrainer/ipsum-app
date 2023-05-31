# start container and remove unused(old image)
echo "INFO: file: docker_start_container.sh"
echo "INFO: compose file is: compose.${DEPLOYMENT_GROUP_NAME}.yml"

docker compose -f /deploy/compose.${DEPLOYMENT_GROUP_NAME}.yml up -d
# --force: do not ask for confirmation
# --all: remove unused images in adition to dangling ones
docker image prune --force --all
