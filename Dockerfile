# syntax=docker/dockerfile:1

FROM golang:1.20

# dbServerLocation.txt: the text file that includes the location of database server
WORKDIR /lol_dict
COPY dbServerLocation.txt ./

################# frontend #################

ENV DIRPATH=/lol_dict/frontend/app
WORKDIR /lol_dict/frontend
COPY ./frontend/ ./
# # copy html file
# WORKDIR ${DIRPATH}/templates
# COPY ./frontend/app/templates/index.html ./
# # image files
# WORKDIR ${DIRPATH}/static/imgs
# COPY ./frontend/app/static/imgs/* ./
# # css file
# WORKDIR ${DIRPATH}/static
# COPY ./frontend/app/static/style.css ./
# # file to be imported in index.html
# WORKDIR ${DIRPATH}/static/ts/dist/js/src/importOnly/importOnly
# COPY ./frontend/app/static/ts/dist/js/src/importOnly/importOnly/*.js ./
# WORKDIR ${DIRPATH}/static/ts/dist/js/src/importOnly/utils
# COPY ./frontend/app/static/ts/dist/js/src/importOnly/utils/*.js ./
# WORKDIR ${DIRPATH}/static/bundle
# COPY ./frontend/app/static/bundle/*.js ./


################# backend #################

# download go modules into go vendor
WORKDIR /lol_dict/backend
COPY ./backend/go.mod ./backend/go.sum ./
RUN go mod download
# Copy all files in ./backend and its sub directory
COPY ./backend/ ./
# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o /lolDict

EXPOSE 8080

# Run
CMD ["/lolDict"]