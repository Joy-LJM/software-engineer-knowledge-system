### Docker
- docker and virtual machine
- docker architecture
  - docker client(cli)
  - docker host(vm,physical server)
  - docker daemon
  - image(template used to build containers)
  - container (instance of image)
  - registries(store docker images;docker hub)
  - container: a running env for image
- Namespaces and Cgroups
  - Namespace: isolates resources(hard drive, networking, hostnames, users etc) for a particular process on a machine
  - Control group: limit, prioritize, and isolate resource usage(CPU, Disk, memory, I/O and network bandwidth) of a group of processes
- docker command
  - docker pull img:ver(pull image)
  - docker run [-d][-p 6000:6379][-e envVariable=value][--name renameContainer][--net networkName] img(pull images and start a container to run image;-d:detached mode, container runs in background; -p:publish or map a container's port to the specified host port;port binding, 6000 host port, 6379 container application port)
  - docker run imgName:Tag(if not specifying tag, it's `latest` by default)
  - docker images(list local images)
  - docker start containerId(start container)
  - docker stop containerId(stop container)
  - docker ps(list running containers)
  - docker exec -t my-container ls(-t: allocate a terminal to run interactive commands like bash within the container)
  - docker logs (log all)
  - docker ps -a(lists running and stopped containers)
  - docker logs containerId/containerName [-f](debug in a specific container; -f: keep logging)
  - docker exec -it containerId/containerName /bin/sh(or /bin/bash; create a terminal for a container to run linux command)
    - ![alt text](image.png)
  - docker rm containerName(remove container)
  - docker rmi imageName(remove image)
  - docker image inspect imageId(check meta data)
- docker compose(takes care of creating a common network for multi images; should start after changing compose file)
  - command: 
    - docker compose -f mongo.yaml up -d(specifies a different compose file, builds the images and starts the containers)
    - docker compose build
    - docker compose ps(list services created by compose yaml file)
    - docker compose run <service-name>(creates a specific service included in yml file)
    - docker compose up(builds the images if not located locally and starts containers)
    - docker compose down --volumes --remove-orphans(stops and removes all the containers, volumes created by 'docker compose up'; --remove-orphans:current and old containers that are no longer referenced by compose yaml file)
  ```
    version:'4.0'
    services:
      database:
        image:mongo
        container_name:cont1
        ports:
          -27017:27017(hostPort:containerPort)
        volumes:
          <!-- named volume -->
          <!-- - host-volume-name: path-inside-of-the-container -->
          - mongo-data: /data/db

          <!-- bind mount -->
          <!-- - hostPath:containerPath -->
         networks:
          - dbnet
        environment:
          -envVariable=value

      frontend:
      <!-- need docker compose to build the image from a file named Dockerfile available in the same directory as docker-compose.yaml file -->
        build:. 
        networks:
          - frontend
          - appnet(can only talk to backend service network)

      backend:
        build:
          <!-- define the path where the docker file is located -->
          context:/usr/project/app
          <!-- defines the file's name to use -->
          dockerfile:fileconfig
        networks:
          - appnet
          - dbnet
        depends_on:
          redis:
            condition: service_healthy
      redis:
        image:redis:alpine
        <!-- monitors whether a container is healthy,ensuring a service is ready before others depend on it -->
        healthcheck:
          test:["CMD","redis-cli","ping"]
          interval:10s
          timeout:5s
          retries:3
    volumes:
      mongo-data:
        driver:local
    networks:
      frontend:
      appnet:
      dbnet:
    
  ```
- Dockerfile- a blueprint for building images
  - command: docker build -t myApp:1.0 . (imageName:tag; using Dockerfile from current folder . to build)
  ```
  <!-- start by basing our built image on another image -->
  FROM node:13-alpine

  <!--optionally define env variables  -->
  ENV MONGO_DB_USERNAME=admin \
      MONGO_DB_PWD=password
  <!-- execute any linux command, create folder -->
    RUN mkdir -p /home/app
  <!-- copy current folder to; COPY <src> <dest> -->
    COPY ./app /home/app

   <!-- set default dir so that next commands executes in /home/app dir -->
  WORKDIR /home/app

   <!-- will execute npm install in /home/app because of WORKDIR -->
  RUN npm install

   <!--start the app from entry point: server.js; no need for /home/app/server.js because of WORKDIR -->
  CMD ["node", "server.js"]

  <!-- used to specify the starting command to be executed when the container is started; CMD can be the default parameters for ENTRYPOINT -->
    ENTRYPOINT ["echo"]
  <!-- expose port number 80 -->
    EXPOSE 80

  ```
- docker repository(one image one repo)
  - pushing our built Docker image to a private registry on AWS
    - AWS ECR
      - install AWS CLI 
      - authenticate docker client to AWS registry
      - ![image-20260807224719591](D:\ziliao\learn\software-engineer-knowledge-system\dockers.assets\image-20260807224719591.png)
- create ubuntu vm(EC2) on AWS to install docker
- deploy Docker image to server
- image tag
  - a mutable label that can point to different images over time
  - ex: python:3.11
- docker image digest
  - a unique, immutable hash that represents the exact image contents(all layers, metadata etc)
  - ex:python@sha256:xxx
  - benefits:
    - guarantees that the base image will not change even if the :tag gets updated
    - helps in security audits and build reproducibility
    - prevents accidental breaking changes from upstream images
- docker networking
  - types: bridge, host(shares the host's network namespace), none(container is completely isolated)
  - bridge
    - a data link-layer physical or virtual device that forwards traffic between two or more network segments.
    - in docker, a bridge network uses a software bridge to allow containers to communicate inside the docker host.
  - bridge driver
    - containers connected to the same bridge network can communicate
    - a bridge network(default bridge is docker0) isolates its containers from other containers on other bridges
    - bridge networks apply within the same docker host only
    - a container can connect to multiple bridge networks at the same time
  - bridge mode
    - in bridge network mode, when a container communicates outbound with external networks, the Docker host(maintains NAT entries in IPtables) performs Network Address Translation(NAT)
  - commands
    - ip a(display network interfaces and their associated ip addresses on a Linux-based system)
    - docker network ls(list all available networks)
    - docker network create --subnet 10.0.0.0/16 <network-name>(create a network with a custom subnet range)
    - docker network inspect <network-name or id>(inspect a docker network)
    - docker network create mongo_network(create shared network among multi images)
    - docker run --network <network-name, host> <container-name>
    - docker network connect <network-name> <container-name>
    - docker network disconnect <network-name> <container-name>
  - container port
    - static port binding: docker run -p 3001:80 nginx
    - dynamic port binding : docker run -P nginx(map container ports to random host ports)
    - check container port mappings: docker port <container-id>
  - customize network settings and connect to external network in docker compose file
- data persistent
  - type: volumes, bind mount
  - docker volumes:
    - stored in the host filesystem in the docker internal storage area which is managed by docker(path:/var/lib/docker/volumes/<vol name>/_data/)
    - benefits
      - is isolated from container layers
      - persists independently of containers
      - is mounted into containers at runtime
      - allows data to survive container restarts, deletion, and image rebuilds
      - better for production(safer as Docker manages them;portable as no hard-coded paths)
    - 3 types of volumes
      - **Named Volume**
        - named volume content can overwrite the content in the container
          - if the volume is empty, docker copies the content of the mount path to the volume only once. the volume content then takes over
          - if the volume has content, the volume content replaces what is in the mount path
      - anonymous Volume
      - host volume
  - different db path
    - mysql:var/lib/mysql
    - postgres: var/lib/postgresql/data
    - mongodb: /data/db  
    - commands:
      - docker volume create <name>
      - docker volume ls
      - docker volume inspect <name>
      - docker volume rm <name>
      - docker run -v [volume name]:[container directory] [image name]
  - bind mounting:
    - concepts:
      - links a host path or file to a container path or file
      - is used with docker run commands(not in a Dockerfile)
      - perfect for dev and test(container can directly access host files)
      - changes at host or container side will reflect on the other side
    - commands:
      - docker run -it --name cont -v /host/path/directory:/container/directory/path image bash(creates and starts a container, mounts a host directory into it, and gives me an interactive Bash shell inside the container.)
      - docker run -v $(pwd):/app my-dev-image(pwd: current workdir)