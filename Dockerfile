# syntax=docker/dockerfile:1

FROM golang:1.20 AS backend

# dbServerLocation.txt: the text file that includes the location of database server
WORKDIR /lol_dict
COPY dbServerLocation.txt ./

# バックエンドでのレンダリングに必要なフロントエンドのファイルをコピー
WORKDIR /lol_dict/frontend/app
COPY ./frontend/app ./

# download go modules
WORKDIR /lol_dict/backend
COPY ./backend/go.mod ./backend/go.sum ./
RUN go mod download
# Copy all files in ./backend and its sub directory
COPY ./backend/ ./
# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o /lolDict

################# fianl image #################
FROM alpine:3.19
WORKDIR /lol_dict
# データベースサーバーの書かれたファイル
COPY --from=backend /lol_dict/dbServerLocation.txt ./
# バックエンドでのレンダリングに必要なフロントエンドのファイル
COPY --from=backend /lol_dict/frontend/app ./frontend/app
# サーバーのバイナリファイル
WORKDIR /lol_dict/backend
COPY --from=backend /lol_dict/backend ./
COPY --from=backend /lolDict/ ./

# サーバーのバイナリファイル実行
CMD ["/lol_dict/backend/lolDict"]
# #################  #################
# FROM node:18 
# WORKDIR /lol_dict
# COPY --from=frontend /lol_dict/frontend ./frontend
# WORKDIR /lol_dict/frontend
# RUN rm -rf node_modules
# RUN npm install
# WORKDIR /lol_dict
# COPY --from=backend /lol_dict/backend ./backend
# COPY --from=backend /usr/local/go /usr/local/go

# # goコマンド使えるようにする
# ENV PATH="/usr/local/go/bin:${PATH}"
# # Run
# WORKDIR /lol_dict/backend