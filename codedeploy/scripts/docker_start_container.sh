# start container and remove unused(old image)
docker-compose -d -f compose.${DEPLOYMENT_GROUP_NAME}.yml up
# --force: do not ask for confirmation
# --all: remove unused images in adition to dangling ones
docker image prune --force --all
