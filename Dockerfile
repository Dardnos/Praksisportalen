FROM imbios/bun-node:21-debian AS base
#For healthcheck
ENV NEXT_TELEMETRY_DISABLED 1
RUN apt-get update && apt-get install -y wget && apt-get clean
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=10 CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1
WORKDIR /app

FROM base AS dev
RUN apt-get install -y tar && apt-get clean
COPY package.json .
RUN bun install
COPY --chown=app:app . .
CMD ["/bin/bash","-c", "bun --bun knex migrate:latest && bun --bun knex seed:run && bun next dev"]

# Taken from https://bun.sh/guides/ecosystem/docker

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
WORKDIR /temp/dev
RUN bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
WORKDIR /temp/prod 
RUN bun install --frozen-lockfile --production

# copy node_modules from temp directoryb
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test
RUN bun --target=node run build 

# copy production dependencies and source code into final image
# Following: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM base AS release

RUN mkdir .next
COPY --from=prerelease /app/.next/standalone ./
COPY --from=prerelease /app/.next/static ./.next/static

# run the app
USER bun     
EXPOSE 3000
ENTRYPOINT [ "bun", "server.js" ]
