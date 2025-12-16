// javascript file for the website

// Product Array that contains name, color, price, stock status, image, and description
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

// discount percentage for coupon codes
let discount = 0;

// Container for product
const container = document.getElementById("products");

// This function render products on the product page
 function renderProducts(stockFilter = "all") {
    const container = document.getElementById("products");
    container.innerHTML = "";

    tshirts
        .filter(tshirt => stockFilter === "all" || tshirt[3] === stockFilter) // Filter by stock
        .forEach((tshirt, index) => {
			// Add each product card to the container
            container.innerHTML += `
                <article class="product">
                  <img src="${tshirt[4]}" alt="${tshirt[0]}">
                  <h2 class="name">${tshirt[0]}</h2>
                  <p class="stock">Stock: ${tshirt[3]}</p>
                  <p class="color">Color: ${tshirt[1]}</p>
                  <p class="description">${tshirt[5]}</p>
                  <p class="price">Price: ${tshirt[2]}</p>
                  <p class="View_more">
                     <a href="item.html" onclick='view_more(${JSON.stringify(tshirt)})'>View more</a>
                  </p>
                  <button class="buy_btn" onclick='addToCart(${JSON.stringify(tshirt)})'>Buy</button>
                </article>
            `;
        });
}

// check if container exists
if (container) {
	 renderProducts(); 
}

// Function that adds a product to the shopping cart in localStorage
function addToCart(product){
	
	// Checking the product status
	if (product[3] === 'out-of-stock') {
        alert('This product is out of stock and cannot be added to the shopping cart.');
        return; 
    }
	
	let cart = JSON.parse(localStorage.getItem('cart'));
	if(!cart) {
		cart = [];
	}
	// Check if product exists in cart
	const existingItem = cart.find(item =>
        item.name === product[0] && item.color === product[1]
    );
	
	if (existingItem) {
		// Increase quantity if product exists
        existingItem.quantity += 1;   
    } else {
		// Add new product to cart
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
	// Save updated cart to localStorage
	localStorage.setItem('cart', JSON.stringify(cart));
	
	alert('Added to cart!');
}

// This function toggles responsive mobile menu
function openMenu(){
	// document.getElementById("menu").classList.toggle("responsive");
	  var x = document.getElementById("menu");
	  if (x.className === "menu") {
        x.className += " responsive";
      } else {
        x.className = "menu";
      }
}

// Cart rendering 
const cartItemsEl = document.getElementById('cartItems');

if (cartItemsEl) {
	renderCart();
	
}

// This function changes quantity of a cart item
function changeQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    cart[index].quantity += change;
	
	// Remove item if quantity is 0
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); 
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Function that render the products that was added to the cart and calculate the total  
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

            // Render each cart item
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
		
		// check the coupon codes for discount
		let total_with_discount = total;
        if (discount > 0) {
            total_with_discount = total - (total * discount / 100);
        }

        // Render total and coupon input
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

// Stock filter 
 document.querySelectorAll(".stock_filter").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
		// Remove the active class from all buttons
        document.querySelectorAll(".stock_filter").forEach(b => b.classList.remove("active"));
		// Add an active class to the pressed button
        this.classList.add("active");
        const stockType = this.dataset.stock;
		// Filter products by stock
        renderProducts(stockType);
    });
});

// Clear cart button
const clearCartBtn = document.getElementById('clearCart');

if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
		
        // Remove cart from localStorage
        localStorage.removeItem('cart');

        
        const cartItemsEl = document.getElementById('cartItems');
        if (cartItemsEl) {
            cartItemsEl.innerHTML = '<p class="empty">Cart is empty</p>';
        }

        alert('Cart cleared!');
    });
}

// Top button
const topButton = document.getElementById('top');

if (topButton) {
    topButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Function that stores selected product in sessionStorage
function view_more(product) {
    sessionStorage.setItem('selectedProduct', JSON.stringify(product));
}

// Display the product on item page
const item_more = document.getElementById("item");

if (item_more) {
    const product = JSON.parse(sessionStorage.getItem('selectedProduct'));

    if (product) {
        item_more.innerHTML = `
            <article class="product">
              <img src="${product[4]}" alt="${product[0]}">
              <h2 class="name">${product[0]}</h2>
              <p class="stock">Stock: ${product[3]}</p>
              <p class="color">Color: ${product[1]}</p>
              <p class="description">Description: ${product[5]}</p>
              <p class="price">Price: ${product[2]}</p>
              <button class="buy_btn" onclick='addToCart(${JSON.stringify(product)})'>Buy</button>
            </article>
        `;
    } else {
        item_more.innerHTML = '<p>Product not found</p>';
    }
}

// Function that allows to view item from cart in item page
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
	// Redirect to the item page
    window.location.href = "item.html";
}

// This function removes an item from the cart
function remove_Item(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Function that applies coupon code
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
	// Recalculate the total amount after applying the coupon
    renderCart();
}