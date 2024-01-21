# Voting App

this is the voting app project using Docker and Kubernetes Deployment and Services running across multiple Docker containers.

## Description

This containerized web app, orchestrated by Docker, Compose, Swarm, and Kubernetes, invites users to cast votes for dogs or cats on one page. The application dynamically visualizes real-time voting results on another page, ensuring an engaging and scalable experience. With Docker Swarm and Kubernetes, it achieves high availability and can seamlessly scale based on demand. The deployment is flexible, adapting to local environments with Docker Compose and scaling to enterprise levels with Kubernetes. Overall, it offers a versatile, interactive, and containerized solution for dynamic user engagement.

This solution uses Python, Node.js, .NET, with Redis for messaging and Postgres for storage.

## Run the app in Kubernetes

The folder voting-app contains the YAML specifications of the Voting App's services.

Run the following command to create the deployments and services. Note it will create these resources in your current namespace (`default` if you haven't changed it.)

```shell
kubectl create -f app\voting-app-deploy.yaml
kubectl create -f app\voting-app-service.yaml
kubectl create -f app\result-app-deploy.yaml
kubectl create -f app\result-app-service.yaml
kubectl create -f app\worker-app-deploy.yaml
kubectl create -f app\postgres-deploy.yaml
kubectl create -f app\postgres-service.yaml
kubectl create -f app\redis-deploy.yaml
kubectl create -f app\redis-service.yaml
```

The `vote` app will be running at [http://localhost:30004](http://localhost:30004), and the `results` will be at [http://localhost:30005](http://localhost:30005).

Or use the following commands to get the URL for `vote` and `results` Web pages

The `vote` web app is then available on port 30004 on each host of the cluster, the `result` web app is available on port 30005.

```shell
minikube service voting-service --url
minikube service result-service --url
```

To retrieve information about deployments (deploy), pods (pod), and services (svc) within the Kubernetes cluster.

```shell
kubectl get deploy,pod,svc
```

Eash Deployment has 1 pod only.
To scale the number of replicas for a deployment in a Kubernetes cluster to 3 for example.

```shell
kubectl scale deploy result-app-deploy --replicas=3
```

To retrieve information specifically about the deployment named "result-app-deploy" that you gust scaled within the Kubernetes cluster.

```shell
kubectl get deploy result-app-deploy
```

## Architecture

![Architecture diagram](architecture.excalidraw.png)

- A front-end web app in [Python](/vote) which lets you vote between two options
- A [Redis](https://hub.docker.com/_/redis/) which collects new votes
- A [.NET](/worker/) worker which consumes votes and stores them in…
- A [Postgres](https://hub.docker.com/_/postgres/) database backed by a Docker volume
- A [Node.js](/result) web app which shows the results of the voting in real time

## Notes

The voting application only accepts one vote per client browser. It does not register additional votes if a vote has already been submitted from a client.

This isn't an example of a properly architected perfectly designed distributed app... it's just a simple
example of the various types of pieces and languages you might see (queues, persistent data, etc), and how to
deal with them in Docker at a basic level.
