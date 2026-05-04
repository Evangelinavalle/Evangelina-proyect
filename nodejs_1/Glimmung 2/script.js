console.log("Glimmung loaded 💜✨");

const SITE_NAME = "Glimmung";

const savedImages = [];

document.addEventListener("DOMContentLoaded", () => {

    console.log(SITE_NAME + " page loaded!");

    // 🟣 HEADER
    const header = document.querySelector("header");
    if (header) {
        header.style.color = "#ff9aff";
        header.setAttribute("data-loaded", "true");
    }

    // 💜 ELEMENTS
    const favorites = document.getElementById("favorites");
    const likeButtons = document.getElementsByClassName("like-btn");
    const allImages = document.getElementsByTagName("img");

    // 💜 FAVORITES SYSTEM
    for (let i = 0; i < likeButtons.length; i++) {

        likeButtons[i].onclick = function () {

            const image = this.parentElement.querySelector("img");
            if (!image || !favorites) return;

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

    // 💰 DYNAMIC PRICES
    const prices = document.getElementsByClassName("item-price");

    for (let i = 0; i < prices.length; i++) {

        let basePrice = parseFloat(prices[i].textContent.replace("$", ""));
        let newPrice = (basePrice + Math.random() * 3).toFixed(2);

        prices[i].textContent = "$" + newPrice;
    }

    // 🛒 CART SYSTEM
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const items = document.getElementsByClassName("gallery-item");

    for (let i = 0; i < items.length; i++) {

        let btn = document.createElement("button");
        btn.textContent = "🛒 Add to Cart";
        btn.className = "cart-btn";

        items[i].appendChild(btn);

        btn.onclick = function () {

            let title = items[i].querySelector(".item-title")?.textContent;
            let price = items[i].querySelector(".item-price")?.textContent;
            let img = items[i].querySelector("img")?.src;

            if (!title || !price || !img) return;

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

    // 🎵 ENTER KEY SEARCH
    const input = document.getElementById("searchInput");

    if (input) {
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                searchSong();
            }
        });
    }

    // 🎵 PLAYLIST
    const audio = document.getElementById("audio");
    const playlist = document.querySelectorAll("#playlist li");
    const currentSong = document.getElementById("current-song");

    if (audio && playlist.length > 0 && currentSong) {

        playlist.forEach(song => {

            song.addEventListener("click", function(){

                playlist.forEach(s => s.classList.remove("active"));

                this.classList.add("active");

                const file = this.getAttribute("data-src");

                audio.src = file;
                audio.play();

                currentSong.textContent = "🎶 Now playing: " + this.textContent;

            });

        });
    }

    // ⏱ FAVORITES MESSAGE TIMER
    setTimeout(showSuggestion, 6000);

});


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

function showSuggestion() {

    const favorites = document.getElementById("favorites");
    if (!favorites) return;

    const message = checkFavorites(savedImages.length, 5);

    let msg = document.createElement("p");
    msg.textContent = message;
    msg.style.color = "#ff9aff";

    favorites.appendChild(msg);
}


// 🎵 MUSIC SEARCH
function searchSong() {

    let input = document.getElementById("searchInput");
    let player = document.getElementById("player");
    let current = document.getElementById("current-song");

    if (!input || !player || !current) return;

    let query = input.value;

    if (query.trim() === "") return;

    let embedURL = "https://www.youtube.com/embed?listType=search&list="
        + encodeURIComponent(query) + "&autoplay=1";

    player.src = "";

    setTimeout(() => {
        player.src = embedURL;
    }, 300);

    current.textContent = "🎵 Playing: " + query;
}