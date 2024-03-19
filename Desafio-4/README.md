
## Entrega de desafíos del Curso de Programación Backend - CoderHouse :rocket:

¡Bienvenidos! :wave: Este repositorio está dedicado a la entrega de los desafíos del Curso de Programación Backend impartido por CoderHouse!


## Submission of Challenges for the Backend Programming Course - CoderHouse

Welcome! :wave: This repository is dedicated to the submission of challenges for the Backend Programming Course provided by CoderHouse!




## Última actualización: Desafío 4 

### Instalación y configuración del entorno de desarrollo.
***Installation and configuration of the development environment.***

Para instalar y ejecutar el proyecto en su máquina local, siga estos pasos:

*To install and run the project on your local machine, follow these steps:*

 1.  Clona este repositorio en tu máquina local:

	 *Clone the repository:*

	 ``` git clone https://github.com/naddiaml/BackendCoder-Desafios.git ```
		    
    
 2.  Navega a la carpeta correspondiente al desafío actual:

	  *Navigate to the project directory:*

		``` cd Desafio-3 ```
		    
 3.  Instala las dependencias correspondientes:

	 *Install dependencies:*

		``` npm install ```

		``` npm install express express-handlebars socket.io ```
    
4.  Ejecuta el servidor desde la terminal:

	*Run the server from the terminal:*
	
	  ``` node app.js ```
	    
	#### Prueba el servidor, haciendo uso de [Postman](https://www.postman.com/downloads/)
	-------------------------
	 - Para obtener todos los productos, visita, con un método GET, la ruta: 	

		 *To get all products, visit:*

		 `http://localhost:8080/api/products`
	 
	-  Para agregar algún producto, visita, con método POST, la ruta:

		*To obtain a specific product by its ID, visit:*

		`http://localhost:8080/api/products`
		***
		:exclamation: Envía como mensaje, un objeto con los siguientes campos, o de lo contrario recibirás un error y el producto no será agregado:

        `{ "title": "Producto A", "description": "Descripción del Producto A", "price": 150, "thumbnails": ["Imagen_A.jpg"], "code": "def456", "stock": 20, "category": "x"}`

  
  
## Autores · *Authors* ✒️

-  **Nadia Mlinarevic** - _Initial Work / Development_ - [naddiaml](https://github.com/naddiaml)


## Construido con · *Built With* 🛠️

-  [Node.js](https://nodejs.org/) 



## Agradecimientos · *Acknowledgments*

- Gracias por visitar este proyecto! 🚀 
	Thank you for visiting this project! 

----------

Made with ❤️ by Nadia 👩🏻‍💻