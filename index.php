<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>4eachblog 掲示板</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
  <?php
  mb_internal_encoding("utf8"); //エンコード
  $pdo = new PDO("mysql:dbname=lesson01;host=localhost;", "root", ""); //DBへの接続
  $stmt = $pdo->query("select*from 4each_keijiban");

  /*
  foreach($stmt as $row){
    echo $row['handlename'];
    echo $row['title'];
    echo $row['comments'];
  }
  */
  ?>


  <img src="4eachblog_logo.jpg" alt="300px" class="logo">

  <header>
    <ul>
      <li>トップ</li>
      <li>プロフィール</li>
      <li>4eachについて</li>
      <li>登録フォーム</li>
      <li>問い合わせ</li>
      <li>その他</li>
    </ul>
  </header>

  <div class="main-box">
    <div class="leftside">
      <h1>プログラミングに役立つ掲示板</h1>

      <div class="nyuryoku">

        <h3>入力フォーム</h3>

        <form method="post" action="insert.php">
          <p>
            <label>ハンドルネーム</label>
            <br>
            <input type="text" size="35" name="handlename" />
          </p>
          <p>
            <label>タイトル</label>
            <br>
            <input type="text" class="text" size="35" class="text" name="title" />
          </p>
          <p>
            <label>コメント</label>
            <br>
            <textarea cols="65" rows="7" name="comments"></textarea>
          </p>
          <p>
            <input type="submit" class="submit" value="投稿する" />
          </p>
        </form>
      </div>

      <?php
      while ($row = $stmt->fetch()) {
        echo "<div class='kiji'>";
        echo "<h3>" . $row['title'] . "</h3>";
        echo "<div class='contents'>";
        echo $row['comments'];
        echo "<div class='handlename'>posted by" . $row['handlename'] . "</div>";
        echo "</div>";
        echo "</div>";
      }


      ?>

    </div>

    <div class="rightside">
      <h3>人気の記事</h3>
      <ul>
        <li>PHPのオススメ本</li>
        <li>PHP MyAdminの使い方</li>
        <li>いま人気のエディタTop5</li>
        <li>HTMLの基礎</li>
      </ul>

      <h3>オススメリンク</h3>
      <ul>
        <li>インターノウス株式会社</li>
        <li>XAMPPのダウンロード</li>
        <li>Eclipseのダウンロード
        </li>
        <li>Braketsのダウンロード</li>
      </ul>

      <h3>カテゴリ</h3>
      <ul>
        <li>HTML</li>
        <li>PHP</li>
        <li>MySqL</li>
        <li>JavaScript</li>
      </ul>
    </div>
  </div>

  <footer>
    copyright © internous | 4each blog is the one which provides A to Z about programing.
  </footer>



</body>

</html>