FROM keymetrics/pm2:10-alpine

RUN apk add --update openssl && rm -rf /var/cache/apk/*

ENV NODE_ENV production

# making sure we run the commands from the proper folder
WORKDIR /home/node/app

## Copy with --chown sets the owner only to the new folders and files it creates
RUN chown -R node:node /home/node

# copying over the files for installing dependencies & running application

COPY --chown=node:node ./ /home/node/app/

# running the server as the 'node' user in the 'node' group
USER node

# pm2 is installed as root in pm2-docker-alpine so we need to redefine our global mobule directory and do a reinstall
RUN mkdir -p /home/node/.npm-global/bin \
  && npm config set prefix '/home/node/.npm-global' \
  && npm install -g pm2

# add new global binary directory to path
ENV PATH=/home/node/.npm-global/bin:${PATH}

# adding the build information (generated by Jenkins); this changes on every build, invalidating the cache!
COPY ./build_version.json /home/node/app/build_version.json

# start the server
# CMD ["pm2-docker", "process.yaml", "--json", "--web", "9001"]
CMD ["pm2-docker", "./process.yaml", "--json"]