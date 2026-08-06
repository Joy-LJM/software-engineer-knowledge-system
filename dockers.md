### Docker
- docker and virtual machine
- container vs image
  - container: a running env for image
- docker command
  - docker pull img:ver(pull image)
  - docker run [-d][-p 6000:6379][-e envVariable=value][--name renameContainer][--net networkName] img(pull images and start a container to run image;-d:detached mode; -p:port binding, 6000 host port, 6379 container application port)
  - docker run imgName:Tag(if not specifying tag, it's `latest` by default)
  - docker images(list local images)
  - docker start containerId(start container)
  - docker stop containerId(stop container)
  - docker ps(list running containers)
  - docker exec -t
  - docker logs (log all)
  - docker ps -a(lists running and stopped containers)
  - docker logs containerId/containerName [-f](debug in a specific container; -f: keep logging)
  - docker exec -it containerId/containerName /bin/sh(or /bin/bash)
    - ![alt text](image.png)
  - docker network create mongo_network(open the command line terminal of the container)
  - docker rm containerName
  - docker rmi imageName
  
- docker compose(takes care of creating a common network for multi images)
  - command: docker-compose -f mongo.yaml up[down] -d
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
- Dockerfile- a blueprint for building images
  - command: docker build -t myApp:1.0 . (imageName:tag; using Dockerfile from current folder . to build)
  `
  <!-- start by basing our built image on another image -->
  FROM node:13-alpine

  <!--optionally define env variables  -->
  ENV MONGO_DB_USERNAME=admin \
      MONGO_DB_PWD=password
<!-- execute any linux command, create folder -->
  RUN mkdir -p /home/app
<!-- copy current folder to -->
  COPY ./app /home/app

   <!-- set default dir so that next commands executes in /home/app dir -->
  WORKDIR /home/app

   <!-- will execute npm install in /home/app because of WORKDIR -->
  RUN npm install

   <!--start the app from entry point: server.js; no need for /home/app/server.js because of WORKDIR -->
  CMD ["node", "server.js"]

  `