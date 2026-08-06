### Docker
- docker and virtual machine
- container vs image
  - container: a running env for image
- docker command
  - docker pull img:ver(pull image)
  - docker run [-d][-p 6000:6379][-e envVariable=value][--name renameContainer][--net networkName] img(pull images and start a container to run image;-d:detached mode; -p:port binding, 6000 host port, 6379 container application port)
  - docker images(list local images)
  - docker start containerId(start container)
  - docker stop containerId(stop container)
  - docker ps(list running containers)
  - docker exec -t
  - docker logs
  - docker ps -a(lists running and stopped containers)
  - docker run -p6000:6379
  - docker logs containerId/containerName [-f](debug in container; -f: keep logging)
  - docker exec -it containerId/containerName
  - docker network create mongo_network
  - docker-compose -f mongo.yaml up[down] -d
- docker compose(takes care of creating a common network)
  `
    version:'4.0'
    services:
      mongodb:(container name)
        image:mongo
        ports:
          -27017:27017(hostPort:containerPort)
        environment:
          -envVariable=value
      mongo-express:
        image:mongo-express
  `
