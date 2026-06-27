// ======================================================
// BLACKFRAME v1.0
// ======================================================

// ======================================================
// ELEMENTS
// ======================================================

const transition = document.getElementById("transition");

const homeMenu = document.getElementById("homeMenu");

const video = document.getElementById("bg-video");

const bgm = document.getElementById("bgm");

const selectSfx = document.getElementById("select-sfx");

const exitSfx = document.getElementById("exit-sfx");

const cartCounter = document.getElementById("cartItems");

const pages = {

    shop: document.getElementById("shopPage"),

    product: document.getElementById("productPage"),

    collections: document.getElementById("collectionsPage"),

    cart: document.getElementById("cartPage"),

    about: document.getElementById("aboutPage")

};
// ======================================================
// PRODUCTS
// ======================================================

const products = [

    {

        id:"BF-001",

        name:"BLACKFRAME HOODIE",

        price:"$79.99",

        image:"assets/images/products/hoodie.png",

        category:"OUTERWEAR",

        status:"LIMITED",

        description:[
            "Heavyweight Cotton",
            "Oversized Fit",
            "Premium Stitching"
        ]

    },

    {

        id:"BF-002",

        name:"BLACKFRAME TEE",

        price:"$39.99",

        image:"assets/images/products/tee.png",

        category:"TOP",

        status:"AVAILABLE",

        description:[
            "240 GSM Cotton",
            "Screen Printed",
            "Relaxed Fit"
        ]

    },

    {

        id:"BF-003",

        name:"BLACKFRAME POSTER",

        price:"$19.99",

        image:"assets/images/products/poster.png",

        category:"ART",

        status:"COMING SOON",

        description:[
            "Gloss Finish",
            "Limited Print",
            "A2 Size"
        ]

    }

];

// ======================================================
// APP STATE
// ======================================================

let currentPage = "home";

let previousPage = "home";

let musicStarted = false;

let selectedSize = "M";

let cart = [];

// ======================================================
// VIDEO
// ======================================================

video.addEventListener("ended", () => {

    video.src = "assets/video/loop.mp4";

    video.loop = true;

    video.play();

});

// ======================================================
// START MUSIC
// ======================================================

document.addEventListener("click", () => {

    if(musicStarted) return;

    musicStarted = true;

    bgm.volume = 0.75;

    bgm.play().catch(()=>{});

},{

    once:true

});

// ======================================================
// AUDIO
// ======================================================

function playSelect(){

    selectSfx.currentTime = 0;

    selectSfx.play();

}

function playExit(){

    exitSfx.currentTime = 0;

    exitSfx.play();

}

// ======================================================
// PAGE HELPERS
// ======================================================

function closePages(){

    Object.values(pages).forEach(page=>{

        page.classList.remove("active");

    });

}

function transitionIn(callback){

    transition.classList.add("active");

    setTimeout(()=>{

        callback();

        transition.classList.remove("active");

    },400);

}
// ======================================================
// OPEN PAGE
// ======================================================

function openPage(pageName){

    if(!pages[pageName]) return;

    playSelect();

    previousPage = currentPage;

    currentPage = pageName;

    transitionIn(()=>{

        homeMenu.style.display = "none";

        closePages();

        pages[pageName].classList.add("active");

    });

}

// ======================================================
// BACK
// ======================================================

function goBack(){

    playExit();

    transitionIn(()=>{

        // PRODUCT -> SHOP

        if(currentPage === "product"){

            closePages();

            currentPage = "shop";

            previousPage = "home";

            pages.shop.classList.add("active");

            return;

        }

        // ALL OTHER PAGES -> HOME

        closePages();

        currentPage = "home";

        previousPage = "home";

        homeMenu.style.display = "flex";

    });

}

// ======================================================
// HOME MENU
// ======================================================

document.querySelectorAll(".menu-item").forEach(item=>{

    item.addEventListener("click",()=>{

        openPage(item.dataset.page);

    });

});

// ======================================================
// BACK BUTTONS
// ======================================================

document.querySelectorAll(".back-button").forEach(button=>{

    button.addEventListener("click",goBack);

});

// ======================================================
// ESC
// ======================================================

document.addEventListener("keydown",(event)=>{

    if(event.key !== "Escape") return;

    if(currentPage !== "home"){

        goBack();

    }

});

// ======================================================
// VIEW PRODUCT
// ======================================================

document.querySelectorAll(".view-button").forEach(button=>{

    button.addEventListener("click",()=>{

        playSelect();

        previousPage = currentPage;

        currentPage = "product";

        transitionIn(()=>{

            closePages();

            pages.product.classList.add("active");

        });

    });

});
// ======================================================
// SIZE SELECTOR
// ======================================================

document.querySelectorAll(".size").forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelectorAll(".size").forEach(size=>{

            size.classList.remove("active");

        });

        button.classList.add("active");

        selectedSize = button.textContent.trim();

        playSelect();

    });

});

// Default

document.querySelector(".size")?.classList.add("active");

// ======================================================
// ADD TO CART
// ======================================================

const addButton = document.querySelector(".cart-button");

if(addButton){

    addButton.addEventListener("click",()=>{

        playSelect();

        const product={

            id:"BF-001",

            name:"BLACKFRAME HOODIE",

            size:selectedSize,

            price:"PRICE TBA"

        };

        cart.push(product);

        updateCart();

    });

}

// ======================================================
// UPDATE CART
// ======================================================

function updateCart(){

    cartCounter.textContent = cart.length;

    renderCart();

}

// ======================================================
// RENDER CART
// ======================================================

function renderCart(){

    const container=document.querySelector(".cart-items");

    if(!container) return;

    container.innerHTML="";

    cart.forEach(item=>{

        container.innerHTML+=`

        <div class="cart-item">

            <div class="cart-thumb">

                IMG

            </div>

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>SIZE ${item.size}</p>

            </div>

            <div class="cart-price">

                ${item.price}

            </div>

        </div>

        `;

    });

    if(cart.length===0){

        container.innerHTML=`

        <div class="cart-item">

            <div class="cart-info">

                <h3>

                    YOUR CART IS EMPTY

                </h3>

            </div>

        </div>

        `;

    }

}

// ======================================================
// CHECKOUT
// ======================================================

const checkout=document.querySelector(".checkout-button");

if(checkout){

    checkout.addEventListener("click",()=>{

        playSelect();

        alert(

            "CHECKOUT COMING IN VERSION 2.0"

        );

    });

}
// ======================================================
// SAVE CART
// ======================================================

function saveCart(){

    localStorage.setItem(

        "blackframe-cart",

        JSON.stringify(cart)

    );

}

// ======================================================
// LOAD CART
// ======================================================

function loadCart(){

    const saved = localStorage.getItem(

        "blackframe-cart"

    );

    if(saved){

        cart = JSON.parse(saved);

    }

    updateCart();

}

loadCart();

// ======================================================
// UPDATE CART
// ======================================================

function updateCart(){

    cartCounter.textContent = cart.length;

    renderCart();

    saveCart();

}

// ======================================================
// ADD PRODUCT
// ======================================================

function addProduct(product){

    const existing = cart.find(item=>{

        return item.id===product.id &&

               item.size===product.size;

    });

    if(existing){

        existing.qty++;

    }

    else{

        product.qty=1;

        cart.push(product);

    }

    updateCart();

}

// ======================================================
// REMOVE PRODUCT
// ======================================================

function removeProduct(index){

    cart.splice(index,1);

    updateCart();

}

// ======================================================
// RENDER CART
// ======================================================

function renderCart(){

    const container=document.querySelector(".cart-items");

    if(!container) return;

    container.innerHTML="";

    if(cart.length===0){

        container.innerHTML=`

        <div class="cart-item">

            <div class="cart-info">

                <h3>

                    YOUR CART IS EMPTY

                </h3>

            </div>

        </div>

        `;

        return;

    }

    cart.forEach((item,index)=>{

        container.innerHTML+=`

        <div class="cart-item">

            <div class="cart-thumb">

                IMG

            </div>

            <div class="cart-info">

                <h3>

                    ${item.name}

                </h3>

                <p>

                    SIZE ${item.size}

                </p>

                <p>

                    QTY ${item.qty}

                </p>

            </div>

            <div class="cart-price">

                ${item.price}

            </div>

            <button

                class="remove-item"

                onclick="removeProduct(${index})">

                ✕

            </button>

        </div>

        `;

    });

}


// ======================================================
// ADD TO CART
// ======================================================

if(addButton){

    addButton.addEventListener("click",()=>{

        addProduct({

            id:"BF-001",

            name:"BLACKFRAME HOODIE",

            size:selectedSize,

            price:"PRICE TBA"

        });

    });

}

// ======================================================
// START
// ======================================================

updateCart();

console.log(

    "BLACKFRAME v1.0 READY"

);