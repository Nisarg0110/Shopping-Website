// add to cart

// alert('ok');

let ok=JSON.parse(localStorage.getItem('data')) || [];

let add_to_cart = (id,img,name,price) => {
    console.log(id,name,price,img);
 
    ok.push({
      id: id,
      item: 1,
      name: name,
      price: price,
      img:img
      });
  
    localStorage.setItem('data',JSON.stringify(ok));
    calculate();
}

let calculate = () => {
    let cart_icon = document.getElementById('total_number_cart');
    let cart_amount = ok.length;
  
    cart_icon.innerHTML = cart_amount;
}

calculate();

// trend enimation 

let trendCard = document.querySelectorAll(".trendCard");
let shopCard = document.querySelectorAll(".shopCard");

let count = 0;

trendCard.forEach(function(card, index){
    card.style.left=`${index * 100}%`
})

function myFun(){
    trendCard.forEach(function(curCard){
        curCard.style.transform=`translateX(-${count * 100}%)`
    })
}

setInterval(function(){
    count++;
    if(trendCard.length == count){
        count=0
    }
    myFun()
}, 3000)


document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.auth-form.login');
    const signupForm = document.querySelector('.auth-form.signup');

    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = signupForm.querySelector('#username').value;
            const email = signupForm.querySelector('#email').value;
            const password = signupForm.querySelector('#password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                alert('User already exists!');
            } else {
                users.push({ username, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Signup successful!');
                window.location.href = 'login.html';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = loginForm.querySelector('#email').value;
            const password = loginForm.querySelector('#password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                alert('Login successful!');
                // Set user session or token here
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password!');
            }
        });
    }
});


//