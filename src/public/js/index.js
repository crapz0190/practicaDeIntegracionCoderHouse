const socketClient = io();

// ------------------------ CHAT INICIO -------------------------

// formulario de actualizar o eliminar mensajes
const idMessage = document.getElementById("idMessage");
const btnUpdate = document.getElementById("btnUpdate");
const btnDelete = document.getElementById("btnDelete");
const btnSubmit = document.getElementById("submit");
const idMessageForm = document.getElementById("idMessageForm");
const email = document.getElementById("email");
const description = document.getElementById("description");

// identificar id
btnUpdate.addEventListener("click", (e) => {
  e.preventDefault();
  socketClient.emit("idUpdate", idMessage.value);
});

// eliminar producto
btnDelete.addEventListener("click", (e) => {
  e.preventDefault();
  socketClient.emit("idDelete", idMessage.value);
  socketClient.on("loadlist", (data) => {
    console.log(data);
  });
  location.reload();
});

// Actualizar productos
socketClient.on("loadlist", (data) => {
  idMessageForm.value = data._id;
  email.value = data.email;
  description.value = data.description;

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    updateList(idMessageForm.value, email.value, description.value);

    location.reload();
  });
});

const updateList = (idMessageForm, email, description) => {
  socketClient.emit("updatelist", {
    idMessageForm,
    email,
    description,
  });
};

// ------------------------ CHAT FIN -------------------------
