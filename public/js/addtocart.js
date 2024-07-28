// alert('ok');

let ok=JSON.parse(localStorage.getItem('data')) || [];
let ShoppingCart = document.getElementById("shopping_cart");
let label = document.getElementById("label");


let calculate = () => {
    let cartIcon = document.getElementById("cart_amount");
    cartIcon.innerHTML = ok.map((x) => x.item).reduce((x, y) => x + y, 0);
  };

// calculate();

let generateCartItems = () => {
    if (ok.length !== 0) {
      return (ShoppingCart.innerHTML = ok
        .map((x) => {
          let { id,name,price,item,img } = x;
          return `
        <div class="cart_item" id=prodcut-id-${id}>
                  <p>${name}</p>
           <div class='cart_item_img'>
             <img width="100" src=${img} alt="" />
           </div>
                  <p >$ ${price}</p>
        
          <button  class='rmv_btn'  onclick="removeItem(${id})">Remove</button>
        </div>
        `;
        }).join(""));
    }else {
      ShoppingCart.innerHTML = `<h3>Shopping cart is empty</h3>`;
    }
};


generateCartItems();


let removeItem = (idx) => {
    // alert(id);
    ok = ok.filter((x) => x.id != idx);
    localStorage.setItem("data", JSON.stringify(ok));
    window.location.reload();
    calculate();
    generateCartItems();
  };
  
  
  let Total_amount = () => {
    let total_amount = 0;
    ok.map((item) => {
      total_amount += item.item * item.price;
    });
    label.innerHTML = `
      <div class='checkout_area'>
         <h2>Total Price : $ ${total_amount} </h2>
         <button class='update' onClick=window.location.reload()>
           Update cart
         </button>
         <button class='checkout'>Checkout</button>
      </div>
    `
  };
  
  Total_amount();