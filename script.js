// ======================================================
// BLACKFRAME v2.0
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

const cartCounter = document.getElementById("cart-count");

const pages = {

    shop:document.getElementById("shopPage"),

    product:document.getElementById("productPage"),

    collections:document.getElementById("collectionsPage"),

    cart:document.getElementById("cartPage"),

    about:document.getElementById("aboutPage")

};

// ======================================================
// PRODUCTS
// ======================================================

const products=[

{

    id:"BF-001",

    name:"BLACKFRAME HOODIE",

    category:"OUTERWEAR",

    status:"LIMITED",

    price:"PRICE TBA",

    image:"assets/images/products/hoodie.png",

    description:[

        "Heavyweight French Terry",

        "Oversized Fit",

        "Premium Construction"

    ]

},

{

    id:"BF-002",

    name:"BLACKFRAME TEE",

    category:"TOP",

    status:"AVAILABLE",

    price:"PRICE TBA",

    image:"assets/images/products/tee.png",

    description:[

        "240 GSM Cotton",

        "Relaxed Fit",

        "Premium Screen Print"

    ]

},

{

    id:"BF-003",

    name:"BLACKFRAME POSTER",

    category:"ART",

    status:"COMING SOON",

    price:"PRICE TBA",

    image:"assets/images/products/poster.png",

    description:[

        "Gloss Finish",

        "A2 Print",

        "Limited Edition"

    ]

}

];

// ======================================================
// APP STATE
// ======================================================

let currentPage="home";

let previousPage="home";

let currentProduct=products[0];

let selectedSize="M";

let musicStarted=false;

let cart=[];

// ======================================================
// VIDEO
// ======================================================

if(video){

    video.addEventListener("ended",()=>{

        video.src="assets/video/loop.mp4";

        video.loop=true;

        video.play();

    });

}

// ======================================================
// MUSIC
// ======================================================

document.addEventListener("click",()=>{

    if(musicStarted) return;

    musicStarted=true;

    if(bgm){

        bgm.volume=.75;

        bgm.play().catch(()=>{});

    }

},{once:true});

// ======================================================
// AUDIO
// ======================================================

function playSelect(){

    if(!selectSfx) return;

    selectSfx.currentTime=0;

    selectSfx.play().catch(()=>{});

}

function playExit(){

    if(!exitSfx) return;

    exitSfx.currentTime=0;

    exitSfx.play().catch(()=>{});

}

// ======================================================
// PAGE HELPERS
// ======================================================

function closePages(){

    Object.values(pages).forEach(page=>{

        if(page){

            page.classList.remove("active");

        }

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

    history.pushState({ page: pageName }, "", "#" + pageName);

    transitionIn(()=>{

        homeMenu.style.display="none";

        closePages();

        pages[pageName].classList.add("active");

    });

}

// ======================================================
// BACK
// ======================================================

function goBack(){

    playExit();

    history.back();

}

// ======================================================
// MENU BUTTONS
// ======================================================

document.querySelectorAll(".menu-item")

.forEach(button=>{

    button.addEventListener("click",()=>{

        openPage(button.dataset.page);

    });

});

// ======================================================
// BACK BUTTONS
// ======================================================

document.querySelectorAll(".back-button")

.forEach(button=>{

    button.addEventListener("click",goBack);

});

// ======================================================
// ESC
// ======================================================

document.addEventListener("keydown",(event)=>{

    if(event.key!=="Escape") return;

    if(currentPage!=="home"){

        goBack();

    }

});
// ======================================================
// PRODUCT PAGE ELEMENTS
// ======================================================

const productTitle =
document.querySelector(".product-details h1");

const productCode =
document.querySelector(".product-code");

const productPrice =
document.querySelector(".price-large");

const productDescription =
document.querySelector(".product-description");

const metaValues =
document.querySelectorAll(".product-meta strong");

const productCategory = metaValues[2];

const productStatus = metaValues[1];

const previewImage =
document.querySelector(".product-preview-image");

// ======================================================
// LOAD PRODUCT
// ======================================================

function loadProduct(index){

    currentProduct = products[index];

    if(!currentProduct) return;

    if(productTitle){

        productTitle.innerHTML =
        currentProduct.name.replace(" ","<br>");

    }

    if(productCode){

        productCode.textContent =
        "★ " + currentProduct.id;

    }

    if(productPrice){

        productPrice.textContent =
        currentProduct.price;

    }

    if(productCategory){

        productCategory.textContent =
        currentProduct.category;

    }

    if(productStatus){

        productStatus.textContent =
        currentProduct.status;

    }

    if(productDescription){

        productDescription.innerHTML = "";

        currentProduct.description.forEach(line=>{

            productDescription.innerHTML +=

            `<p>${line}</p>`;

        });

    }

    if(previewImage){

        previewImage.innerHTML =

        `<img src="${currentProduct.image}" alt="${currentProduct.name}">`;

    }

}

// ======================================================
// SHOP PRODUCT CARDS
// ======================================================

const productCards =
document.querySelectorAll(".product-card");

productCards.forEach((card,index)=>{

    card.addEventListener("click",()=>{

        playSelect();

        loadProduct(index);

        openPage("product");

    });

});

// ======================================================
// VIEW BUTTONS
// ======================================================

document.querySelectorAll(".view-button")

.forEach((button,index)=>{

    button.addEventListener("click",(event)=>{

        event.stopPropagation();

        playSelect();

        loadProduct(index);

        openPage("product");

    });

});

// ======================================================
// PRODUCT THUMBNAILS
// ======================================================

document.querySelectorAll(".thumb")

.forEach(thumb=>{

    thumb.addEventListener("click",()=>{

        playSelect();

        document.querySelectorAll(".thumb")

        .forEach(item=>{

            item.classList.remove("active");

        });

        thumb.classList.add("active");

    });

});
// ======================================================
// SIZE SELECTOR
// ======================================================

document.querySelectorAll(".size")

.forEach(size=>{

    size.addEventListener("click",()=>{

        playSelect();

        document.querySelectorAll(".size")

        .forEach(item=>{

            item.classList.remove("active");

        });

        size.classList.add("active");

        selectedSize=size.textContent.trim();

    });

});

// ======================================================
// CART STORAGE
// ======================================================

function saveCart(){

    localStorage.setItem(

        "blackframe-cart",

        JSON.stringify(cart)

    );

}

function loadCart(){

    const saved=

    localStorage.getItem(

        "blackframe-cart"

    );

    if(saved){

        cart=JSON.parse(saved);

    }

}

// ======================================================
// ADD PRODUCT
// ======================================================

function addProduct(){

    const existing=

    cart.find(item=>{

        return item.id===currentProduct.id &&

               item.size===selectedSize;

    });

    if(existing){

        existing.qty++;

    }

    else{

        cart.push({

            id:currentProduct.id,

            name:currentProduct.name,

            image:currentProduct.image,

            price:currentProduct.price,

            size:selectedSize,

            qty:1

        });

    }

    updateCart();

}

// ======================================================
// ADD BUTTON
// ======================================================

const addButton=

document.querySelector(".cart-button");

if(addButton){

    addButton.addEventListener("click",()=>{

        playSelect();

        addProduct();

    });

}

// ======================================================
// REMOVE PRODUCT
// ======================================================

function removeProduct(index){

    playExit();

    cart.splice(index,1);

    updateCart();

}

window.removeProduct=removeProduct;

// ======================================================
// CART COUNTER
// ======================================================

function updateCounter(){

    let total=0;

    cart.forEach(item=>{

        total+=item.qty;

    });

    if(cartCounter){

        cartCounter.textContent=total;

    }

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

                <h3>YOUR CART IS EMPTY</h3>

            </div>

        </div>

        `;

        return;

    }

    cart.forEach((item,index)=>{

        container.innerHTML+=`

        <div class="cart-item">

            <div class="cart-thumb">

                <img src="${item.image}" alt="${item.name}">

            </div>

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>SIZE ${item.size}</p>

                <p>QTY ${item.qty}</p>

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
// UPDATE CART
// ======================================================

function updateCart(){

    updateCounter();

    renderCart();

    saveCart();

}

// ======================================================
// CHECKOUT
// ======================================================

const checkout=

document.querySelector(".checkout-button");

if(checkout){

    checkout.addEventListener("click",()=>{

        playSelect();

        alert("CHECKOUT COMING SOON");

    });

}

// ======================================================
// LOAD FIRST PRODUCT
// ======================================================

if(products.length){

    loadProduct(0);

}
// ======================================================
// MOBILE / BROWSER BACK SUPPORT
// ======================================================

// Initial history state
history.replaceState({ page: "home" }, "");

// Push a history entry whenever a page opens


// Handle Android/browser back button
window.addEventListener("popstate", () => {

    transitionIn(() => {

        if(currentPage === "product"){

            currentPage = "shop";

            closePages();

            pages.shop.classList.add("active");

            return;

        }

        if(currentPage !== "home"){

            currentPage = "home";

            closePages();

            homeMenu.style.display = "flex";

            return;

        }

    });

});
// ======================================================
// LOAD SAVED CART
// ======================================================

loadCart();

updateCart();

// ======================================================
// READY
// ======================================================

console.log("BLACKFRAME READY");