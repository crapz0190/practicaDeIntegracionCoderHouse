# desafioProductManager

------- Getting Started with NodeJS ------

In the project directory, you can run:

npm start

---------------- ACCESO A DB ----------------

URI = "mongodb+srv://crapz0190:nDL34FvHs5UmP07@codercluster.vojlqwl.mongodb.net/ecommerce?retryWrites=true&w=majority";

---------------- productos ----------------

ir a: http://localhost:8080/realtimeproducts

---------------- mensajes ----------------

ir a: http://localhost:8080/home

---------------- carrito ----------------

realizar carga manual por postman u otro

--> buscar ID carrito: GET >>> http://localhost:8080/api/carts/:cid
--> agregar carrito: POST >>> http://localhost:8080/api/carts
--> agregar productos al carrito: POST >>> http://localhost:8080/api/carts/:cid/product/:pid
--> eliminar unidad del producto del carrito: DELETE >>> http://localhost:8080/api/carts/:cid/product/:pid
--> eliminar carrito: DELETE >>> http://localhost:8080/api/carts/:cid

