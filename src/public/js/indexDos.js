const socketClient = io();

// ------------------------ REALTIMEPRODUCTS INICIO -------------------------

// formulario de actualizar o eliminar productos
const listProducts = document.getElementById("listProducts");
const btnUpdate = document.getElementById("btnUpdate");
const btnDelete = document.getElementById("btnDelete");
const btnSubmit = document.getElementById("submit");
const idProduct = document.getElementById("idProduct");
const idProductForm = document.getElementById("idProductForm");
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const status = document.getElementById("status");
const code = document.getElementById("code");
const stock = document.getElementById("stock");
const category = document.getElementById("category");

// identificar id
btnUpdate.addEventListener("click", (e) => {
  e.preventDefault();
  socketClient.emit("idUpdateProducts", idProduct.value);
});

// eliminar producto
btnDelete.addEventListener("click", (e) => {
  e.preventDefault();
  socketClient.emit("idDeleteProducts", idProduct.value);
  socketClient.on("loadListProducts", (data) => {
    console.log(data);
  });
  location.reload();
});

// Actualizar productos
socketClient.on("loadListProducts", (data) => {
  idProductForm.value = data._id;
  title.value = data.title;
  description.value = data.description;
  price.value = data.price;
  status.value = data.status;
  code.value = data.code;
  stock.value = data.stock;
  category.value = data.category;

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    updateList(
      idProductForm.value,
      title.value,
      description.value,
      price.value,
      status.value,
      code.value,
      stock.value,
      category.value
    );

    location.reload();
  });
});

const updateList = (
  idProductForm,
  title,
  description,
  price,
  status,
  code,
  stock,
  category
) => {
  socketClient.emit("updateListProducts", {
    idProductForm,
    title,
    description,
    price,
    status,
    code,
    stock,
    category,
  });
};

// ------------------------ REALTIMEPRODUCTS FIN -------------------------
