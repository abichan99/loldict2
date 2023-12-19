# lol辞典(韓国語->日本語)
lolというゲームの用語に対する韓国語->日本語訳を提供する辞書アプリです。  
訳語の検索、登録、評価ができます。  
使いやすさを意識して作りました。
![alt text](https://github.com/abichan99/loldict2/blob/browserify/readMeImg/main.png?raw=true)
![alt text](https://github.com/abichan99/loldict2/blob/browserify/readMeImg/translations.png?raw=true)

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
      - elastic beanstalk
      - RDS
      - VPC
 - etc
      - tailwind css ^latest(css framework)
      - owasp zap (check vulnerability)
      - google fonts
 - container
      - docker 23.05
 - CI/CD
      - github actions

# 作ったきっかけ
 趣味でとあるゲームyoutuberの動画を翻訳していましたが、ゲーム内で使われる用語を翻訳するのに困っていました。lolというゲームで、日本語版、韓国語版ともにあるので自分で役を考える必要はなかったのですが、韓国語の用語に対する日本語訳を見つけるのにすごく時間がかかり、正確さにも多少欠けていたのです。なので、ちょうどほかの方々とも一緒に翻訳していたので、このゲームの韓国語->日本語の辞書を作ると翻訳時間の短縮になるのではないかと思ってこの辞書アプリを作りました。

# インフラ構成図

# 機能一覧
 - アプリ
   | トップ画面 |　ログイン画面 |
   | ---- | ---- |
   | ![Top画面](https://github.com/abichan99/loldict2/blob/browserify/readMeImg/main.png?raw=true) | ![ログイン画面](https://github.com/abichan99/loldict2/blob/browserify/readMeImg/translations.png?raw=true) |
   | 登録せずにサービスをお試しいただくためのトライアル機能を実装しました。 | ログインIDとパスワードでの認証機能を実装しました。 |

# 機能一覧
 - アプリ
      - ダークモード(tailwind css)
      - 訳語登録機能(ajax)
      - 訳語検索機能
      - 訳語評価機能(ajax)
      - 検索履歴
      - 検索可能な訳語の一覧表示機能
 - CI/CD
      - push時にdocker container環境下での自動テスト

# 脆弱性対策一覧
 - クリックジャッキング対策
     - XFrameOptionsヘッダにDENY指定
 - csrfトークン付与
 - クライアント側でvalidation
 - 受け取ったデータのエスケープ処理

# テスト
 - ユニットテスト