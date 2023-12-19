# lol辞典(韓国語->日本語)
lolというゲームで使われる用語に対する韓国語->日本語訳を提供する辞書アプリです。
訳語の検索、登録、評価ができます。
使いやすさを意識して作りました。
![alt text](https://github.com/abichan99/loldict2/blob/deployment/readMeImg/main.png?raw=true)

# 使った言語、ライブラリなど
 - backend
      - Go v1.20
      - echo v4.11.2 (サーバーライブラリ)
      - testing (テストライブラリ)
 - frontend
      - typescript ^5.2.2
      - babel ^7.23 (tsからjsへのトランスパイル)
      - jest ^29 (テストライブラリ)
      - eslint ^8.53.0 (linter)
      - browserify ^17.0.0 (バンドラー)
 - database
      - mysql 8.0.35
 - AWS
      - ec2
      - VPC
 - container
      - docker 23.05
 - CI/CD
      - github actions
 - etc
      - tailwind css ^latest(css framework)
      - owasp zap (check vulnerability)
      - google fonts

# 作ったきっかけ
趣味でとあるゲームyoutuberの動画を翻訳していましたが、ゲーム内で使われる用語を翻訳するのに困っていました。lolというゲームで、日本語版、韓国語版とともにあるので自分で役を考える必要があったのですが、韓国語の用語に対する日本語訳を見つけるのにすごく時間がかかり、正確さにも多少欠けていました。ですので、ちょうどほかの方々とも一緒に翻訳していたので、このゲームの韓国語->日本語の辞書を作ると翻訳時間の短縮になるのではないかと思ってこの辞書アプリを作りました。

# インフラ構成図
![alt text](https://github.com/abichan99/loldict2/blob/deployment/readMeImg/infra.png?raw=true)

# 機能一覧
 - アプリ
   | トップ画面 |　訳語登録画面 |
   | ---- | ---- |
   | ![Top画面](https://github.com/abichan99/loldict2/blob/browserify/readMeImg/main.png?raw=true) | ![ログイン画面](https://github.com/abichan99/loldict2/blob/browserify/readMeImg/translations.png?raw=true) |
   | 使いやすいようシンプルに実装しました。検索履歴を表示し、押したら検索される機能も実装しました。また、ajaxを用い訳語検索機能を実装しました。 | ajaxを用い、訳語を登録する機能を用いました。基本的なvalidation機能も実装しました。 |

   | 訳語表示画面 |　ダークモード画面 |
   | ---- | ---- |
   | ![Top画面](https://github.com/abichan99/loldict2/blob/browserify/readMeImg/main.png?raw=true) | ![ログイン画面](https://github.com/abichan99/loldict2/blob/browserify/readMeImg/translations.png?raw=true) |
   | 評価ボタンを実装し訳語のクォリティーが分かるようにしました。 | 夜に作業する人のために実装しました。 |
 - CI/CD
   
   git repositoryのブランチごとに異なるCI/CDを実装しました。
      - 開発用ブランチにpush：docker container環境下での自動テスト
      - デプロイ用ブランチにpush：自動テスト、成功した場合ec2にデプロイ

# 脆弱性対策一覧
 owasp zapの自動脆弱性発見機能を用いて発見された脆弱性に対し対策を施しました。
 - クリックジャッキング対策
     - XFrameOptionsヘッダにDENY指定
 - csrfトークン付与
 - クライアント側でvalidation
 - 受け取ったデータのエスケープ処理

# テスト
 - ユニットテスト