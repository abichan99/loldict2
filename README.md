# lol-dict
lol dictionary app code

# 使った言語及びライブラリ
 - backend
      - Go v1.20
      - echo v4.11.2 (サーバーライブラリ)
      - testing (テストライブラリ)
 - frontend
      - typescript ^5.2.2
      - babel ^7.23 (tsからjsへのトラン   スパイル)
      - jest ^29 (テストライブラリ)
      - eslint(本体) ^8.53.0 (linter)
      - browserify ^17.0.0 (バンドラー)

# 作ったきっかけ
 

# （重要）本番切り替え時に修正すること：
 - main.tsのHOMEPAGE_URL変数の値(サーバーの住所)切り替えとバンドル
 - application.goのmode変数の修正

# コマンドについて
 - backend
      - サーバー稼働：air または go run . (./backendフォルダ内で実行)
      - テスト： ./backend> go test -v
 - frontend
      - テスト： ./frontend> npm test
      - tsからjsへのトランスパイル(babel)： babel foo.ts -o (app/ts/dist/jsまでの相対経路)/(jsフォルダ下はtsフォル 　ダ下とほぼ同じなので、それを参考に経路を指定)/foo.js
    トランスパイル対象のファイルのあるフォルダから実行する。
      - tsからjsへのトランスパイル(typescript)： babelの時と同じ要領で実行する。