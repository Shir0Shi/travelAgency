<?php
function fail($message)
{
    return die(json_encode(array("status"=>"fail", "message"=>$message)));
}
function success($message)
{
    return die(json_encode(array("status"=>"success", "message"=>$message)));
}
function db_connect($query)
{
    $dbc = mysqli_connect("localhost", "root", "root", "interviewjson") or fail("Server error");
    return mysqli_query($dbc, $query);
}
if(isset($_POST['mode'], $_POST['name']) && !empty($_POST['name']) && $_POST['mode'] == "country")
{
    $query = "INSERT INTO countrys (name) VALUE ('{$_POST['name']}')";
    $result = db_connect($query);
    if(!$result)
    {
        fail("Request error");
    }
    success("Successfully added");
    exit;
}
if(isset($_POST['mode'], $_POST['name'], $_POST['ctCi']) && !empty($_POST['name']) && $_POST['mode'] == "city" && $_POST['ctCi'] != 0)
{
    $query = "INSERT INTO city (name, idct) VALUES ('{$_POST['name']}', '{$_POST['ctCi']}')";
    $result = db_connect($query);
    if(!$result)
    {
        fail("Request error");
    }
    success("Successfully added");
    exit;
}
if(isset($_POST['mode'], $_POST['name'], $_POST['ciH'], $_POST['stH']) && !empty($_POST['name']) && $_POST['mode'] == "hotel" && $_POST['ctH'] != 0 && $_POST['ciH'] != 0)
{
    $query = "INSERT INTO hotel (name, stars, idcity) VALUES ('{$_POST['name']}', '{$_POST['stH']}', '{$_POST['ciH']}')";
    $result = db_connect($query);
    if(!$result)
    {
        fail("Request error");
    }
    success("Successfully added");
    exit;
}
if(isset($_GET['mode'])&& $_GET['mode']== "outct")
{
    $query = "SELECT id, name FROM countrys";
    $result = db_connect($query);
    if(!$result)
    {
        fail("Request error");
    }
    $ct = [];
    while($row=mysqli_fetch_array($result))
    {
        $ct[] = array("id"=>$row['id'], "name"=>$row['name']);
    }
    echo json_encode(array("ct"=>$ct));
    exit;
}
if(isset($_GET['mode'], $_GET['id'])&& $_GET['mode']== "outci" && !empty($_GET['id']))
{
    $query = "SELECT id, name FROM city WHERE idct = ".$_GET['id'];
    $result = db_connect($query);
    if(!$result)
    {
        fail("Request error");
    }
    $ci = [];
    while($row = mysqli_fetch_array($result))
    {
        $ci[] = array("id"=>$row['id'], "name" => $row['name']);
    }
    echo json_encode(array("ci"=>$ci));
    exit;

}
if(isset($_GET['mode'], $_GET['id'])&& $_GET['mode']== "outh" && !empty($_GET['id']))
{
    $query = "SELECT id, name, stars FROM hotel WHERE idcity =".$_GET['id'];
    $result = db_connect($query);
    if(!$result)
    {
        fail("Request error");
    }
    $h = [];
    while($row = mysqli_fetch_array($result))
    {
        switch ($row['stars'])
        {
            case 1: $row['stars'] = "*";
            break;
            case 2: $row['stars'] = "**";
                break;
            case 3: $row['stars'] = "***";
                break;
            case 4: $row['stars'] = "****";
                break;
            case 5: $row['stars'] = "*****";
                break;
        }
        $h[] = array("id"=>$row['id'], "name" => $row['name'], "stars" => $row['stars']);
    }
    echo json_encode(array("h"=>$h));
    exit;
}
if(isset($_POST['name'], $_POST['phone'], $_POST['selH'])
    && !empty($_POST['name']) && !empty($_POST['phone']) && $_POST['selH'] > 0)
{
    $query = "INSERT INTO user (name, phone, id_hotel)
                VALUES ('{$_POST['name']}', '{$_POST['phone']}', '{$_POST['selH']}')";
    $result = db_connect($query);
    if(!$result)
        fail("Request error");
    success("Order complete");
}
if(isset($_GET['mode'])&& $_GET['mode']=="outtb")
{
 // SELECT countrys.name, COUNT(user.id) AS count_user FROM `countrys` LEFT JOIN city ON countrys.id = city.idct INNER JOIN hotel ON city.id = hotel.idcity INNER JOIN user ON hotel.id = user.id_hotel GROUP BY countrys.name
    $query = "SELECT countrys.id, countrys.name, COUNT(user.id) AS count_user FROM `countrys` LEFT JOIN city ON countrys.id = city.idct INNER JOIN hotel ON city.id = hotel.idcity INNER JOIN user ON hotel.id = user.id_hotel GROUP BY countrys.name";
    $result = db_connect($query);
    if(!$result)
        fail("Request error");
    $cl = [];
    while($row = mysqli_fetch_array($result))
    {
        $cl[] = array("id"=>$row['id'], "name"=>$row['name'], "amount"=>$row['count_user']);
    }
    echo json_encode(array("cl"=>$cl));
    exit;
}
if(isset($_GET['country'])&& !empty($_GET['country']))
{
    $query = "SELECT user.id, user.name, phone, hotel.name AS hotel_name, city.name AS city_name, countrys.name AS ct_name 
              FROM user 
              INNER JOIN hotel ON id_hotel = hotel.id 
              INNER JOIN city ON hotel.idcity = city.id 
              INNER JOIN countrys ON city.idct = countrys.id 
              WHERE countrys.id = ".$_GET['country'];
    $result = db_connect($query);
    if(!$result)
        fail("Request error");
    $cl = [];
    while ($row = mysqli_fetch_array($result))
    {
        $cl[] = array("id"=>$row['id'], "name"=>$row['name'], "phone"=>$row['phone'], "hotel"=>$row['hotel_name'], "city"=>$row['city_name'], "country"=>$row['ct_name']);
    }
    echo json_encode(array("cl"=>$cl));
    exit;
}