<?php

// VARIABLES (3 tipos)
$name = "GlimmungUser"; // string
$age = 18; // integer
$isLoggedIn = true; // boolean

// ARRAY
$hobbies = ["anime", "music", "art"];

// FUNCTION
function greetUser($name){
    return "Welcome to Glimmung, " . $name . " 💖";
}

// DECISION (if)
if($isLoggedIn){
    echo greetUser($name);
} else {
    echo "Please log in ✨";
}

// OUTPUT DATA
echo "<br>Age: " . $age;

echo "<br>Hobbies:";
foreach($hobbies as $hobby){
    echo "<br>- " . $hobby;
}

?>