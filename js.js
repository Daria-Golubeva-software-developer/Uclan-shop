

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



const container = document.getElementById("products");

// function renderProducts(stock_filter = "all") {
    // container.innerHTML = "";

    // tshirts
        // .stock_filter(t => stock_filter === "all" || t[3] === stock_filter)
        // .forEach(tshirt => {
            // container.innerHTML += `
               // <div class="product">
                  // <img src="${tshirt[4]}" alt="${tshirt[0]}">
                  // <p class="name">${tshirt[0]}</p>
                  // <p class="stock">Stock: ${tshirt[3]}</p>
                  // <p class="color">Color: ${tshirt[1]}</p>
                  // <p class="description">Description: ${tshirt[5]}</p>
                  // <p class="price">Price: ${tshirt[2]}</p>
                  // <p class="View_more">
                    // <a href="item.html">View more</a>
                  // </p>
                  // <button class="buy_btn" onclick='addToCart(${JSON.stringify(tshirt)})'>Buy</button>
               // </div>
            // `;
        // });
// }

if (container) {
	// renderProducts(); 

 tshirts.forEach(tshirt => {
		 container.innerHTML += `
		    <div class ="product">
		       <img src = "${tshirt[4]}" alt="${tshirt[0]}">
		       <p class= "name">${tshirt[0]}</p>
			   <p class="stock">
			   Stock: ${tshirt[3]}
			   </p>
		       <p class= "color">
			   Color: ${tshirt[1]} 
			   </p>
			   <p class="description">
			   Description: ${tshirt[5]} <br>
			   </p>
			   <p class= "price">Price: ${tshirt[2]}</p>
			   <p class="View_more">
			   <a href="item.html">View more</a>
			   </p>
			  
			   <button class="buy_btn" onclick='addToCart(${JSON.stringify(tshirt)})'>Buy</button>
		    </div>
		 `;
 });
}
// document.querySelectorAll(".filter").forEach(btn => {
    // btn.addEventListener("click", function(e) {
        // e.preventDefault();
        // const type = this.dataset.stock;
        // renderProducts(type);
    // });
// });

let cart = JSON.parse(localStorage.getItem('cart'));
        
        if(cart && cart.length > 0) {
            let total = 0;
			let item = 0;
            cart.forEach(item => {
				// console.log(item);
				
				let price = parseFloat(item[2].replace("£", "").trim());
				total += price;
				
				
                document.getElementById('cartItems').innerHTML += 
                    '<p>' + item[0] + ' - £' + price.toFixed(2) + '</p>';
                
            
			 });
            document.getElementById('cartItems').innerHTML += 
                '<h3>Total: £' + total.toFixed(2) + '</h3>';
        } else {
            document.getElementById('cartItems').innerHTML = '<p>Cart is empty</p>';
        }

function addToCart(product){
	
	
	let cart = JSON.parse(localStorage.getItem('cart'));
	if(!cart) {
		cart = [];
	}
	
	cart.push(product);
	
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

document.getElementById('clearCart').addEventListener('click',
function(){
	document.getElementById('cartItems').innerHTML = '';
});