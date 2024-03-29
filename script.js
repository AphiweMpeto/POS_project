let products = JSON.parse(localStorage.getItem("products"))
    ?JSON.parse(localStorage.getItem("products"))
    :[
    {
        title: "sun glasses",
        category: "accessories",
        price: 20.99,
        img:"https://i.postimg.cc/BvJZxRpL/59040487.jpg",
    },
    {
        title: "watch",
        category: "accessories",
        price: 39.99,
        img: "https://i.postimg.cc/hGjxBpx9/486x486-W.jpg",
    },
        
    {
        title: "sweatpants",
        category: "bottoms", 
        price: 13.99,
        img: "https://i.postimg.cc/9fPpkwyg/162807432750b234398e1fb79074240a778d65d3e6-thumbnail-600x.webp",
    },
    {
        title: "shirt",
        category: "tops",
        price: 9.99,
        img: "https://i.postimg.cc/7YZT7Ksj/shirt.jpg",
    },
    {
        title: "sneakers",
        category: "shoes",
        price: 129.99,
        img: "https://i.postimg.cc/xjw1jtrK/shoes.jpg",
    },
];

let cart = JSON.parse(localStorage.getItem("cart"))
   ? JSON.parse(localStorage.getItem("cart"))
  : [];

// READ 

function readProducts(products) {
    document.querySelector("#products").innerHTML = "";
    products.forEach((product, position) => {
        document.querySelector("#products").innerHTML += `
        <div class="card">
    <img src="${product.img}" class="card-img-top" alt="${product.title}">
    <div class="card-body p-2 mt-4">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">R${product.price}</p>
        <div class="d-flex mb-3">
        <input type="number" class="form-control" style="resize:horizontal; width:180px" value=1 min=1 id="addToCart${position}">
        <button type="button" class="btn btn-success w-40 ms-3" onclick="addToCart(${position})"><i class="bi bi-cart3"></i>Cart</button>
        </div>
    </div>
    <div class="d-flex justify-content-end card-footer">
        <button type="button" class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#editProduct${position}">Edit</button>
        <button type="button" class="btn btn-info w-50 ms-3" onclick="deleteProduct${position}">Delete</button>
    </div>
    </div>
    <div class="modal fade" id="editProduct${position}" tabindex="-1"aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> Edit ${product.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div class="mb-3"><label for="editTitle${position}" class="form-label">Title</label><input class="form-control" 
                    type="text" name="editTitle${position}" id="editTitle${position}" value="${product.title}"/>
            </div>
            <div class="mb-3"><label for="editCategory${position}" class="form-label">Category</label>
                <select class="form-select" name="editCategory${position}" id="editCategory${position}">
                    <option value="accessories">Accessories</option>
                    <option value="bottoms">Bottoms</option>
                    <option value="tops">Tops</option>
                    <option value="shoes">Shoes</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="editPrice${position}" class="form-label">Price</label>
                <input class="form-control" type="text" name="editPrice${position}" id="editPrice${position}" value="${product.price}"/>
            </div>
            <div class="mb-3"><label for="editImg${position}" class="form-label">Image URL</label>
                <input class="form-control" type="text" name="editImg${position}" id="editImg${position}"value="${product.img}"/>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="updateProduct(${position})">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    `;
    });
}

readProducts(products);
showCartBadge();


// CREATE

function addProduct() {
    let title = document.querySelector("#addTitle").value;
    let category = document.querySelector("#addCategory").value;
    let price = document.querySelector("#addPrice").value;
    let img = document.querySelector("#addImg").value;
    try {
        if (!title || !price || !img) throw new Error("Please fill in all fields");
        products.push({
            title,
            category,
            price,
            img,
        });
        localStorage.setItem("products", JSON.stringify(products));
        readProducts(products);
    }
    catch (err) {
        alert(err);
    }       
}


//DELETE

function deleteProduct(i) {
    let confirmation = confirm("Are you sure you want to delete this product?");
    if (confirmation) {
        products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products))
    readProducts(products);
    }
}


//UPDATE

function updateProduct(i) {
    let product = document.querySelector(`#update-input-${i}`).value;
    let title = document.querySelector(`#editTitle${i}`).value;
    try {
        if (!product) throw new Error("please fill in all fields  ");
        products[i] = {
            title,
            category,
            price,
            img,
        };
        localStorage.setItem("products", JSON.stringify(products));
        readProducts(products);
    }
    catch (err) {
        alert(err);
    }
}

// ADD TO CART
function addToCart(i) {
    let qty = document.querySelector(`#addToCart${i}`).value;
    let added = false;
    cart.forEach((product) => { 
        if(product.title == products[i].title) {
            alert(
                `You have succesfully added ${qty} ${products[i].title} to the cart`
            );
            product.qty = parseInt(product.qty) + parseInt(qty);
            added = true;
        }
    });
    if(!added) {
        cart.push({ ...products[i], qty});
        alert( `You have succesfully added ${qty} ${products[i].title} to the cart` );
    }
     localStorage.setItem("cart", JSON.stringify(cart));
}

// UPDATE CART BADGE
function showCartBadge() {
  document.querySelector("#badge").innerHTML = cart ? cart.length : "";
}

// SORT BY CATEGORY
function sortCategory() {
  let category = document.querySelector("#sortCategory").value;

  if (category == "All") {
    return readProducts(products);
  }

  let foundProducts = products.filter((product) => {
    return product.category == category;
  });

  readProducts(foundProducts);
  console.log(foundProducts);
}

// SORT BY NAME

function sortName() {
  let direction = document.querySelector("#sortName").value;

  let sortedProducts = products.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedProducts.reverse();
  console.log(sortedProducts);
  readProducts(products);
}

// SORT BY PRICE

function sortPrice() {
  let direction = document.querySelector("#sortPrice").value;

  let sortedProducts = products.sort((a, b) => a.price - b.price);

  console.log(sortedProducts);

  if (direction == "descending") sortedProducts.reverse();
  readProducts(sortedProducts);
}


