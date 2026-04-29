console.log("Glimmung loaded 💜✨");

const SITE_NAME = "Glimmung";

const savedImages = [];

const favorites = document.getElementById("favorites");
const likeButtons = document.getElementsByClassName("like-btn");
const allImages = document.getElementsByTagName("img");

// 🟣 HEADER ON LOAD
window.onload = function () {

    console.log(SITE_NAME + " page loaded!");

    const header = document.querySelector("header");

    header.style.color = "#ff9aff";
    header.setAttribute("data-loaded", "true");
};


// 💜 FAVORITES SYSTEM
for (let i = 0; i < likeButtons.length; i++) {

    likeButtons[i].onclick = function () {

        const image = this.parentElement.querySelector("img");
        const clone = image.cloneNode(true);

        if (favorites.children.length === 1) {
            favorites.innerHTML = "";
        }

        favorites.appendChild(clone);
        savedImages.push(image.src);
    };
}


// ✨ IMAGE HOVER EFFECT
for (let i = 0; i < allImages.length; i++) {

    allImages[i].onmouseover = function () {
        this.style.transform = "scale(1.1)";
        this.style.transition = "0.3s";
    };

    allImages[i].onmouseout = function () {
        this.style.transform = "scale(1)";
    };
}


// 💜 FAVORITES MESSAGE
function checkFavorites(amount, limit) {

    if (amount > limit) {
        return "You saved MANY ideas ✨";
    } else if (amount > 0) {
        return "Cute collection 💜";
    } else {
        return "Start saving ideas 🌸";
    }
}

let timer = setTimeout(showSuggestion, 6000);

function showSuggestion() {

    const message = checkFavorites(savedImages.length, 5);

    let msg = document.createElement("p");
    msg.textContent = message;
    msg.style.color = "#ff9aff";

    favorites.appendChild(msg);

    clearTimeout(timer);
}


// 💰 DYNAMIC PRICES
const prices = document.getElementsByClassName("item-price");

for (let i = 0; i < prices.length; i++) {

    let basePrice = parseFloat(prices[i].textContent.replace("$", ""));
    let newPrice = (basePrice + Math.random() * 3).toFixed(2);

    prices[i].textContent = "$" + newPrice;
}


// 🛒 CART SYSTEM (CLEAN + FIXED)
document.addEventListener("DOMContentLoaded", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const items = document.getElementsByClassName("gallery-item");

    for (let i = 0; i < items.length; i++) {

        let btn = document.createElement("button");
        btn.textContent = "🛒 Add to Cart";
        btn.className = "cart-btn";

        items[i].appendChild(btn);

        btn.onclick = function () {

            let title = items[i].querySelector(".item-title").textContent;
            let price = items[i].querySelector(".item-price").textContent;
            let img = items[i].querySelector("img").src;

            const existingItem = cart.find(item => item.title === title);

            if (existingItem) {
                existingItem.qty += 1;
            } else {
                cart.push({
                    title,
                    price: parseFloat(price.replace("$","")),
                    image: img,
                    qty: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            btn.textContent = "Added ✓";
            btn.style.background = "#8c7bbf";

            setTimeout(() => {
                btn.textContent = "🛒 Add to Cart";
                btn.style.background = "";
            }, 1200);

            console.log("Cart:", cart);
        };
    }

});


// 🎵 MUSIC PLAYER (BASIC SAFE VERSION)
function searchSong() {


   let query = document.getElementById("searchInput").value;


   if (query.trim() === "") return;


   let embedURL = "https://www.youtube.com/embed?listType=search&list="
       + encodeURIComponent(query) + "&autoplay=1";


   let player = document.getElementById("player");


   player.src = "";


   setTimeout(() => {
       player.src = embedURL;
   }, 300);


   document.getElementById("current-song").textContent =
       "🎵 Playing: " + query;
}

// ENTER KEY SEARCH
document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("searchInput");

    if (input) {
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                searchSong();
            }
        });
    }
});
const audio = document.getElementById("audio");
const playlist = document.querySelectorAll("#playlist li");
const currentSong = document.getElementById("current-song");

playlist.forEach(song => {

song.addEventListener("click", function(){

// quitar active
playlist.forEach(s => s.classList.remove("active"));

this.classList.add("active");

const file = this.getAttribute("data-src");

audio.src = file;
audio.play();

currentSong.textContent = "🎶 Now playing: " + this.textContent;

});

});
