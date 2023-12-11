# syntax=docker/dockerfile:1

################# frontend #################
FROM node:18 AS frontend

# dbServerLocation.txt: the text file that includes the location of database server
WORKDIR /lol_dict
COPY dbServerLocation.txt ./

WORKDIR /lol_dict/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .

WORKDIR /lol_dict/frontend
COPY ./frontend/ ./

################# backend #################
FROM golang:1.20 AS backend

# download go modules
WORKDIR /lol_dict/backend
COPY ./backend/go.mod ./backend/go.sum ./
RUN go mod download
# Copy all files in ./backend and its sub directory
COPY ./backend/ ./
# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o /lolDict

#################  #################
FROM node:18 
WORKDIR /lol_dict
COPY --from=frontend /lol_dict/frontend ./frontend
WORKDIR /lol_dict/frontend
RUN rm -rf node_modules
RUN npm install
WORKDIR /lol_dict
COPY --from=frontend /lol_dict/dbServerLocation.txt ./
COPY --from=backend /lol_dict/backend ./backend
COPY --from=backend /lolDict/ ./backend
COPY --from=backend /usr/local/go /usr/local/go

# goコマンド使えるようにする
ENV PATH="/usr/local/go/bin:${PATH}"
# Run
WORKDIR /lol_dict/backend
CMD ["/lol_dict/backend/lolDict"]