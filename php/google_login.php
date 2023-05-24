<?php

include("Conn.php");

// =========請求==========
// 設定CORS標頭，允許 'content-type' 標頭欄位。
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// OPTIONS 请求方法是 CORS 的预检请求，用于确定是否可以发送实际的 POST 请求。在某些情况下，浏览器会发送 OPTIONS 请求以检查服务器是否允许跨域访问。
// 对于 OPTIONS 请求，只发送 CORS 头信息，不做其他处理
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}


// =========接收資料==========

// 確保 Content-Type 是 application/json
header('Content-Type: application/json');

// 解析 JSON 資料
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$name =  $data['name'];


// =========資料庫比對==========

// 1 先透過php找$_SESSION看裡面有沒有這個EMAIL存在(看登入狀態)
session_start();

if (isset($_SESSION['email']) && $_SESSION['email'] === $email) {
    // echo '該 EMAIL 存在於 $_SESSION 中。';
    header('Location: http://localhost:3000/index.html');

} else {
    // echo '該 EMAIL 不存在於 $_SESSION 中。';
    // 2 php把會員帳號撈出
    $sql = "SELECT * FROM MEMBER_DATA WHERE MEMBER_ACCOUNT = ? ";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(1,$email);
    $statement->execute();
    $data = $statement->fetchAll();
    // 建立最終的 JSON 格式陣列
    $jsonArray = null;

    if(count($data)>0){
        $jsonArray = array(
            'redirect' => 'http://localhost:3000/index.html'
        );    
    }else{
        $sql = "INSERT INTO MEMBER_DATA (USERNAME, MEMBER_ACCOUNT) 
        VALUES (? , ? )";  
        $statement = $pdo->prepare($sql);
        $statement->bindValue(1, $name);
        $statement->bindValue(2, $email);
        $statement->execute();

        $jsonArray = array(
            'redirect' => 'http://localhost:3000/member_center.html'
        );   
    }
    
        // 關閉資料庫連線
        unset($pdo);
        // 轉換成 JSON 格式
        $jsonString = json_encode($jsonArray);
        // 輸出 JSON
        echo $jsonString;
   
}
?>
