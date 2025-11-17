
const tshirts = [
['Legacy T-Shirt','Red','£7.99','good-stock','resources/images/tshirts/tshirt1.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
['Legacy T-Shirt','Green','£7.99','last-few','resources/images/tshirts/tshirt2.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
['Legacy T-Shirt','Blue','£7.99','out-of-stock','resources/images/tshirts/tshirt3.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
['Legacy T-Shirt','Cyan','£7.99','good-stock','resources/images/tshirts/tshirt4.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
['Legacy T-Shirt','Magenta','£7.99','out-of-stock','resources/images/tshirts/tshirt5.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
['Legacy T-Shirt','Yellow','£7.99','last-few','resources/images/tshirts/tshirt6.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
['Legacy T-Shirt','Black','£7.99','out-of-stock','resources/images/tshirts/tshirt7.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
['Legacy T-Shirt','Grey','£7.99','good-stock','resources/images/tshirts/tshirt8.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
['Legacy T-Shirt','Burgundy','£7.99','last-few','resources/images/tshirts/tshirt9.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
];

const container = document.getElementById("t_shirts");

tshirts.forEach(tshirt => {
		container.innerHTML += `
		   <div class ="product">
		      <img src = "${tshirt[4]}" alt="${tshirt[0]}">
		      <p class= "name">${tshirt[0]}</p>
		      <p class= "description">
			  Color: ${tshirt[1]} <br>
			  Stock: ${tshirt[3]} <br>
			  ${tshirt[5]}
			  </p>
			  <p class= "price">Price: ${tshirt[2]}</p>
			  
			  <button class="buy_btn">Buy</button>
		   </div>
		`;
});