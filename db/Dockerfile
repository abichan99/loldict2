# apt-get出来る様にdebian版を使う。
FROM mysql:8.0.35-debian
# コンテナ内で日本語が打てるようにlocalを変更といらないファイル削除
USER root
# TODO: apt-get updateに、"--allow-insecure-repositories"を応急措置として付与。安全ではないので後で治す
RUN apt-get update --allow-insecure-repositories \
    && apt-get install -y locales \
    && sed -i -E 's/# (ja_JP.UTF-8)/\1/' /etc/locale.gen \
    && locale-gen \
    && update-locale LANG=ja_JP.UTF-8 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
ENV MYSQL_ROOT_PASSWORD=abichan99
ENV LC_ALL ja_JP.UTF-8

EXPOSE 3306