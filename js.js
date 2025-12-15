

const tshirts = [
['Legacy T-Shirt','Red','£7.99','good-stock','images/tshirts/tshirt1.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
['Legacy T-Shirt','Green','£7.99','last-few','images/tshirts/tshirt2.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
['Legacy T-Shirt','Blue','£7.99','out-of-stock','images/tshirts/tshirt3.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
['Legacy T-Shirt','Cyan','£7.99','good-stock','images/tshirts/tshirt4.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
['Legacy T-Shirt','Magenta','£7.99','out-of-stock','images/tshirts/tshirt5.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
['Legacy T-Shirt','Yellow','£7.99','last-few','images/tshirts/tshirt6.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
['Legacy T-Shirt','Black','£7.99','out-of-stock','images/tshirts/tshirt7.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
['Legacy T-Shirt','Grey','£7.99','good-stock','images/tshirts/tshirt8.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
['Legacy T-Shirt','Burgundy','£7.99','last-few','images/tshirts/tshirt9.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
];


let discount = 0;

const container = document.getElementById("products");

 function renderProducts(stockFilter = "all") {
    const container = document.getElementById("products");
    container.innerHTML = "";

    tshirts
        .filter(tshirt => stockFilter === "all" || tshirt[3] === stockFilter)
        .forEach((tshirt, index) => {
            container.innerHTML += `
                <div class="product">
                    <img src="${tshirt[4]}" alt="${tshirt[0]}">
                    <p class="name">${tshirt[0]}</p>
                    <p class="stock">Stock: ${tshirt[3]}</p>
                    <p class="color">Color: ${tshirt[1]}</p>
                    <p class="description">${tshirt[5]}</p>
                    <p class="price">Price: ${tshirt[2]}</p>
                    <p class="View_more">
                       <a href="item.html" onclick="view_more(${index})">View more</a>
                    </p>
                    <button class="buy_btn" onclick='addToCart(${JSON.stringify(tshirt)})'>Buy</button>
                </div>
            `;
        });
}

if (container) {
	 renderProducts(); 
}


// let cart = JSON.parse(localStorage.getItem('cart'));
        
        // if(cart && cart.length > 0) {
            // let total = 0;
			// let item = 0;
            // cart.forEach(item => {
				// // console.log(item);
				
				// let price = parseFloat(item[2].replace("£", "").trim());
				// total += price;
				
				
                // document.getElementById('cartItems').innerHTML += 
                   // '<p>' + item[0] + ' - £' + price.toFixed(2) + '</p>';
                
            
			  // });
            // document.getElementById('cartItems').innerHTML += 
                // '<h3>Total: £' + total.toFixed(2) + '</h3>';
        // } else {
            // document.getElementById('cartItems').innerHTML = '<p>Cart is empty</p>';
        // }

function addToCart(product){
	
	
	let cart = JSON.parse(localStorage.getItem('cart'));
	if(!cart) {
		cart = [];
	}
	const existingItem = cart.find(item =>
        item.name === product[0] && item.color === product[1]
    );
	
	if (existingItem) {
        existingItem.quantity += 1;   
    } else {
        cart.push({
            name: product[0],
            color: product[1],
            price: product[2],
            stock: product[3],
            image: product[4],
            description: product[5],
            quantity: 1
        });
    }
	
	localStorage.setItem('cart', JSON.stringify(cart));
	
	alert('Added to cart!');
}

function openMenu(){
	// document.getElementById("menu").classList.toggle("responsive");
	  var x = document.getElementById("menu");
	  if (x.className === "menu") {
        x.className += " responsive";
      } else {
        x.className = "menu";
      }
}


const cartItemsEl = document.getElementById('cartItems');

if (cartItemsEl) {
	renderCart();
	
}
function changeQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // удалить товар
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function renderCart(){
	const cartItemsEl = document.getElementById('cartItems');
	cartItemsEl.innerHTML = '';
	
	let cart = JSON.parse(localStorage.getItem('cart'));
	
	if (cart && cart.length > 0) {
        let total = 0;

        cart.forEach((item , index) => {
            let price = parseFloat(item.price.replace("£", "").trim());
            let itemTotal = price * item.quantity;
            total += itemTotal;

            cartItemsEl.innerHTML +=
                `<div class="cart_item">
                    <div class="cart_image">
                        <img src="${item.image}" alt="${item.name}">
                        <span class="cart_color">${item.color}</span>
                    </div>

                    <div class="cart_name">
                         <a href="javascript:void(0)" onclick="Cart_Item(${index})">
                             ${item.name}
                         </a>
                    </div>
					
					<div class ="cart_Buttons">
					   <div class="cart_quantity">
                          <button onclick="changeQuantity(${index}, -1)">−</button>
                          <span>${item.quantity}</span>
                          <button onclick="changeQuantity(${index}, 1)">+</button>
                       </div>

                       <div class="cart_price">
                           £${itemTotal.toFixed(2)}	
                       </div>
					       <button class="remove" onclick="remove_Item(${index})">
                             Remove
                           </button>
				    </div>
					
                </div>
				`;
        });
		let total_with_discount = total;
        if (discount > 0) {
            total_with_discount = total - (total * discount / 100);
        }

        cartItemsEl.innerHTML +=
            `<div class="total_with_discount">
                <div class="coupon">
                    <input type="text" id="couponInput" placeholder="Coupon code">
                    <button onclick="coupon_discount()">Apply</button>
                </div>

                <div class="total">
                    <h3>Total:</h3>
                    <h3>£${total_with_discount.toFixed(2)}</h3>
                </div>
            </div>`;
    } else {
        cartItemsEl.innerHTML = '<p class ="empty">Cart is empty</p>';
    }
}




 document.querySelectorAll(".stock_filter").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelectorAll(".stock_filter").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        const stockType = this.dataset.stock;
        renderProducts(stockType);
    });
});

const clearCartBtn = document.getElementById('clearCart');

if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        
        localStorage.removeItem('cart');

        
        const cartItemsEl = document.getElementById('cartItems');
        if (cartItemsEl) {
            cartItemsEl.innerHTML = '<p class="empty">Cart is empty</p>';
        }

        alert('Cart cleared!');
    });
}

const topButton = document.getElementById('top');

if (topButton) {
    topButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function view_more(index) {
    sessionStorage.setItem('selectedProduct', JSON.stringify(tshirts[index]));
}

const item_more = document.getElementById("item");

if (item_more) {
    const product = JSON.parse(sessionStorage.getItem('selectedProduct'));

    if (product) {
        item_more.innerHTML = `
            <div class="product">
                <img src="${product[4]}" alt="${product[0]}">
                <p class="name">${product[0]}</p>
                <p class="stock">Stock: ${product[3]}</p>
                <p class="color">Color: ${product[1]}</p>
                <p class="description">Description: ${product[5]}</p>
                <p class="price">Price: ${product[2]}</p>
                <button class="buy_btn" onclick='addToCart(${JSON.stringify(product)})'>Buy</button>
            </div>
        `;
    } else {
        item_more.innerHTML = '<p>Product not found</p>';
    }
}

function Cart_Item(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    sessionStorage.setItem('selectedProduct', JSON.stringify([
        cart[index].name,
        cart[index].color,
        cart[index].price,
        cart[index].stock,
        cart[index].image,
        cart[index].description
    ]));
    window.location.href = "item.html";
}

function remove_Item(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function coupon_discount() {
    const input = document.getElementById("couponInput");
    const code = input.value.trim().toUpperCase();

    if (code === "STUDENTFEST10") {
        discount = 10;
        alert("Coupon applied: 10% discount");
    } else if (code === "UCLANDISCOUNT20") {
        discount = 20;
        alert("Coupon applied: 20% discount");
    } else {
        discount = 0;
        alert("Invalid coupon");
    }

    renderCart();
}