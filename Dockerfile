# syntax=docker/dockerfile:1

FROM golang:1.20 AS backend

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
# バックエンドでのレンダリングに必要なフロントエンドのファイル
COPY --from=backend /lol_dict/frontend/app ./frontend/app
# サーバーのバイナリファイル
WORKDIR /lol_dict/backend
COPY --from=backend /lol_dict/backend ./
COPY --from=backend /lolDict/ ./

# サーバーのバイナリファイル実行
CMD ["/lol_dict/backend/lolDict"]