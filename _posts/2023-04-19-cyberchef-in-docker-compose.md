---
layout: post
title: Cyberchef through Docker Compose
date: 2023-04-19 18:51 +0200
categories: Homelab Docker
tags: cyberchef homelab docker docker-compose synology nas
image:
  path: /assets/img/headers/cyberchef.png
---

CyberChef is the Cyber Swiss Army Knife web app for encryption, encoding, compression and data analysis. That's what the Github page from the makers tells us. It's an awesome tool to use but it's more awesome to have your own instance of it in Docker. I just added Traefik to my homelab setup so was looking for other tools I use to add the the setup. So I will also show some Traefik-labels which you can use in the docker-compose.yaml to add the service to Traefik.

Before we can start, there are some things you need to have in place to set this up. I will make comments in the docker-compose.yaml for optional stuff which is only for use with Traefik.

# Setup
>- You need Docker on your system (with docker-compose installed)
>- Some knowledge about Docker and Docker Compose
>- A machine, server or NAS
{: .prompt-tip }

For deployment I use Portainer, which is very handy for doing stuff like this. I use a Synology NAS with Docker and Portainer which is a great combo.
Now I will show two examples of a docker-compose.yaml, one for use with Traefik and one without.

# Examples 
If you don't have a reverse proxy like Traefik you can use this example. It's really all there is to it. Just the latest image and a container name.

```yaml
version: "3.3"

services:
  cyberchef:
    image: mpepping/cyberchef:latest # Using the latest image
    container_name: cyberchef # It's always smart to name your containers
```
For use with Traefik, the example will be a bit bigger but not too much. I will explain everything in comments in the file. You can remove them if you want.

```yaml
version: "3.3"

services:
  cyberchef:
    image: mpepping/cyberchef:latest # Using the latest image
    container_name: cyberchef # It's always smart to name your containers
    labels: # Labels are only for use with Traefik
      - "traefik.enable=true" # This is needed to activate this container for Traefik v2
      - "traefik.http.routers.cyberchef.rule=Host(`cyberchef.yourdomain.com`)" # This is the domain or subdomain you use to reach your service
      - "traefik.http.routers.cyberchef.entrypoints=websecure" # This is the entrypoint, in my setup I use websecure for port 443
      - "traefik.http.routers.cyberchef.tls=true" # To activate TLS on the entrypoint, for use with certificates
      - "traefik.http.services.cyberchef-service.loadbalancer.server.port=8000" # The port which Traefik needs to route you to the service
    networks:
      traefik_default: # The network to use for this service

networks:
  traefik_default:
    external: true # Because I created this network manually, I need to import it here before use.
```
# Traefik and macvlan
In my setup I have Traefik on it's own IP-adress with the use of macvlan. That also means that if I want Traefik to talk to my other services which I deployed they also need to be in the same network. So Traefik has it's own IP, but it also needs to be in a second network, where all the other services live in.

This is a short example for running Cyberchef in your own Docker-environment. If you have any questions, please leave them below in the comments.