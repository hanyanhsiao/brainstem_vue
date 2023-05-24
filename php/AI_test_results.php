<?php

header('Access-Control-Allow-Origin: http://localhost:3000');

include("Conn.php");

// 撰寫 SQL 查詢
$sql = "SELECT  O.CATEGORY_DESCRIPTION, C.CATEGORY_NAME, G.GAME_ID, G.GAME_NAME,GI.IMG_PATH
FROM `CATEGORY`  AS C
JOIN `G_C_RELATION` AS GC ON C.category_id = GC.category_id
JOIN `GAME_DATA` AS G ON GC.game_id = G.game_id
join `GAME_IMG` AS GI on  G.game_id = GI.game_id
join (select distinct CATEGORY_DESCRIPTION,CATEGORY_ID   from `option`
) as O on O.CATEGORY_ID =  C.CATEGORY_ID 
WHERE C.CATEGORY_ID = ? limit 3";

// 執行查詢
$statement = $pdo->prepare($sql);
$statement->bindValue(1,$_GET['gameTypeNum']);
$statement->execute();
$testResult  = $statement->fetchAll();

// 建立最終的 JSON 格式陣列
$jsonArray = null;

if (count($testResult) > 0) {
    $gameType = "";
    $gameTypeContent = "";
    $game=array();

    // 逐筆取得 綜合遊戲資料表 的結果
    foreach($testResult as $index => $gameRow){

        $gameType = $gameRow["CATEGORY_NAME"];
        $gameTypeContent = $gameRow["CATEGORY_DESCRIPTION"];
        

        // 建立 game 內容陣列
        $gameArray = array(
            "id" => $gameRow["GAME_ID"],
            "name" => $gameRow["GAME_NAME"],
            "image" => $gameRow["IMG_PATH"],
            "url" => "",
        );

        // 將 game 內容陣列加入 game 陣列
        $game[] = $gameArray;
    }

    // 建立最終的 JSON 格式陣列
    $jsonArray = array(
    "gameType" => $gameType,
    "gameTypeContent" => $gameTypeContent,
    "game" => $game
    );
}

// 關閉資料庫連線
unset($pdo);

// 轉換成 JSON 格式
$jsonString = json_encode($jsonArray);

// 輸出 JSON
echo $jsonString;
?>
