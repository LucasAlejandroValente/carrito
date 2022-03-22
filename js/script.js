/* menu (estuve mirando funciones anonimas autoejecutables) */
((d) => {
    const btnMenu = d.querySelector(".menu-btn"),
      menu = d.querySelector(".menu");
  
    btnMenu.addEventListener("click", (e) => {
      btnMenu.firstElementChild.classList.toggle("none");
      btnMenu.lastElementChild.classList.toggle("none");
      menu.classList.toggle("is-active");
    });
  
    d.addEventListener("click", (e) => {
      if (!e.target.matches(".menu a")) return false;
  
      btnMenu.firstElementChild.classList.remove("none");
      btnMenu.lastElementChild.classList.add("none");
      menu.classList.remove("is-active");
    });
})(document);

/* ventana modal */
window.onload = function(){
  const cartBtn = document.querySelector('#cart-btn');
  const cartContainer = document.querySelector(".cart-container");
  const cartBtnClose = document.querySelector('#cart-btn-close');

  cartBtn.addEventListener("click", function() {
    cartContainer.classList.add('active');
  });

  cartBtnClose.addEventListener("click", function() {
    cartContainer.classList.remove('active');
  })
};

/* cart */

/*
const CART = {
  KEY: 'carrito123',
  contents: [],
  init(){

    let _contenido = localStorage.getItem(CART.KEY);
    
    //storage de prueba

    if(_contenido){
      CART.contents = JSON.parse(_contenido);
    } else {
      CART.contents = [
        {id:1, nombre:'Titulo 1', stock:7, precio:100},
        {id:2, nombre:'Titulo 2', stock:3, precio:500}
      ];
      CART.sync();
    };
  },

  async sync(){
    let _cart = JSON.stringify(CART.contents);
    await localStorage.setItem(CART.KEY, _cart);
  },
};

document.addEventListener('DOMContentLoaded', ()=>{
  CART.init();
}); 
*/

/* fetch -- carrito */
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
        <img src="../img/${producto.img}" alt="">
      </div>
      <div class="card-text">
          <h5 class="item-name">${producto.nombre}</h5>
          <p class="price">$${producto.precio}</p>
      </div>
      <div class="card-btn" onclick="showAlert()"><button class="addToCart" id="btn-${producto.id}" type="button"><p>Add to cart</p></button></div>
    </div>
    `
  }))
})