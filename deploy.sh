set -e


PROJECT_NAME="eventos-ms-ms"
DOCKER_COMPOSE_FILE="docker-compose.yml"


check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "Error: Docker is not running. Please start Docker and try again."
        exit 1
    fi
}


deploy() {
    echo "Building and deploying $PROJECT_NAME..."

    cd /home/yohan_gomez/eventos-cm-app

    docker-compose -f $DOCKER_COMPOSE_FILE build
    docker-compose -f $DOCKER_COMPOSE_FILE down
    docker-compose -f $DOCKER_COMPOSE_FILE up -d

    echo "Deployment completed successfully!"
}

check_docker
deploy