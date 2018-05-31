<?php

/**
 * @function: xxxxxx(xxxxxxx)
 * @desc: xxxxxxxxx
 * @param args object: xxxxxxxxxxx
 * @param obj object: xxxxxxx
 * @param strict boolean: xxxxxxxxxx
 * @return: xxxxxxxxxxx
 * @alias: xxxxxxxxxxxxxx
 * @link: https://codepen.io/AllForTheCode/pen/xxxxxxx
 */



 /**
 * @function: xxxxxx(xxxxxxx)
 * @desc: xxxxxxxxx
 * @param args object: xxxxxxxxxxx
 * @return: xxxxxxxxxxx
 * @alias: xxxxxxxxxxxxxx
 * @link: https://codepen.io/AllForTheCode/pen/xxxxxxx
 */




$response = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once("./includes/functions.php");
    require_once("./includes/parse_comment.php");
    require_once("./includes/vos.php");

    $file = "../dist/aftc.js";
    // $file = "../src/AFTC/AFTC.Color.js";

    $anchors = getAnchors($file);
    file_put_contents("./anchros.md",$anchors);
    // print_r($anchors);
    // die();
    
    $comments = getComments($file);
    
    function cmp($a, $b){
        //return strcmp($a->name, $b->name); // Case sensitive sorting 
        return strcasecmp($a->name, $b->name); // Binary safe case-insensitive string comparison 
    }
    usort($comments, "cmp"); // this works
    //usort($comments, array($comments, "cmp"));


    $response .= "<h4><b>No of comments to be generatd: </b> " . count($comments) . "</h4>";
    //trace("No of comments processed = " . count($comments));
    // $comments = getComments("./aftc.js");
    //print_r($comments);
    //die();
    
    $header = file_get_contents("./header.md");
    $footer = file_get_contents("./footer.md");
    $out = generateReadme($comments);
    
    $readme = $header . $anchors . $out . $footer;
    file_put_contents("../readme.md",$readme);
    $response .= "<h4><b>Generation complete...</b>";
    // trace("Complete...");
    //echo($out);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>darcey@aftc.io - github readme.md generator</title>
</head>
<body>
    <h3>darcey@aftc.io - github readme.md generator</h3>
    <form method="post">
        <button>CLICK TO GENERATE README.MD</button>
    </form>
    <?php

    if ($response != ""){
        echo("<hr>".$response);
    }
    ?>

</body>
</html>

