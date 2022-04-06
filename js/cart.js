/* ventana modal */
window.onload = function(){
    const cartBtn = document.querySelector('#cart-btn');
    const cartContainer = document.querySelector(".cart-container");
    const cartBtnClose = document.querySelector('#cart-btn-close');
  
    cartBtn.addEventListener("click", function() {
      cartContainer.classList.toggle('active');
    });
  
    cartBtnClose.addEventListener("click", function() {
      cartContainer.classList.remove('active');
    })
  };
 
 

/* cart */
/* fetch */
const cartDisplay = document.querySelector(".cartDisplay")

let divProductos = document.getElementById('products');
  
async function getProducts(){
    const response = await fetch('../json/products.json')
    return response.json()
  };
  
  getProducts().then(products => {
      
    products.forEach((producto => {
      divProductos.innerHTML += `
      <div class="card">
        <div class="card-image">
          <img src="../img/${producto.img}" alt="${producto.nombre}">
        </div>
        <div class="card-text">
            <h5 class="item-name">${producto.nombre}</h5>
            <p class="price">$<span>${producto.precio}</span></p>      
            <div class="card-btn" onclick="showAlert()"><button class="addToCart" data-id="${producto.id}" type="button"><p>Add to cart</p></button></div>
        </div>
      </div>
      `
    }))
    const btnAdd = document.querySelectorAll(".addToCart");
    btnAdd.forEach((e => 
      e.addEventListener("click",(e) => {
        let cardParent = e.target.parentElement.parentElement.parentElement.parentElement; /* jaja */
        console.log(cardParent);
        addToCart(cardParent);
      })
    ));  
})

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const addToCart = (cardParent) => {
    let product = {
        nombre: cardParent.querySelector(".item-name").textContent,
        precio: Number(cardParent.querySelector(".price span").textContent),
        cantidad: 1,
        img: cardParent.querySelector("img").src,
        id: Number(cardParent.querySelector("button").getAttribute("data-id"))
    };

    let productoEncontrado = carrito.find(e=>e.id === product.id)
    if(productoEncontrado){
        productoEncontrado.cantidad++;
    } else {carrito.push(product)}


    showCart();
    

};



const showCart = () => {
    cartDisplay.innerHTML= ""
    carrito.forEach((element) => {
        let { img, nombre, precio, cantidad, id} = element;
        cartDisplay.innerHTML += `
        <div class="cartItem--container">
            <div><img class="responsive" src="${img}" alt=""></div>
            <div class="cartItem--info">
                <h3>${nombre}</h3>
                <p>$${precio}</p>
                <p>Cantidad: ${cantidad}</p>
                <p>Subtotal: $${precio * cantidad}</p>
                <div class="buttons">
                    <button class="btn-restar" data-id="${id}">-</button>
                    <button class="btn-remover" data-id="${id}">Borrar</button>
                </div>
            </div>
        </div>
        `
    })

    localStorage.setItem("carrito", JSON.stringify(carrito));

};

const substract = (restar) => {
    let productoEncontrado = carrito.find(
      (element) => element.id === Number(restar)
    );
    if (productoEncontrado) {
      productoEncontrado.cantidad--;
      if (productoEncontrado.cantidad === 0) {
        productoEncontrado.cantidad = 1;
      };
    };
    showCart();
};
  
const remove = (remover) => {
    carrito = carrito.filter((element) => element.id !== Number(remover));
    showCart();
};


const cartButtons = () => {
    cartDisplay.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-restar")) {
        substract(e.target.getAttribute("data-id"));
      }
      if (e.target.classList.contains("btn-remover")) {
        remove(e.target.getAttribute("data-id"));
      }
    });
  };

  cartButtons()