# The Ring

El proyecto usa [The One API](https://the-one-api.dev/), API con temática sobre el Señor de los Anillos, para consumir datos que se mostrarán en una serie de tablas con determinados filtros o funciones.

Se estructura en 2 vistas (Home y Petitions). La vista Home contiene dos componentes y la vista Peticiones consta de un componente. Estos componentes son tablas con una serie de filtros.

### Tabla Characters
La primera tabla tiene la temática de personajes (Characters), en donde se muestra la información de cada uno de ellos. Esta tabla tiene una barra desplegable con una serie de filtros o funcionalidades:

* Filtro múltiple de columnas a mostrar/ocultar en la tabla
* Slider y seleccionador para cambiar anchura de columnas
* Filtro múltiple por razas
* Filtro por género
* Buscador por nombre del personaje

Además, pulsar una fila de la tabla activa funcionalidades en la siguiente tabla.

## Tabla Quotes
La segunda tabla tiene la temática de citas (Quotes), en donde además se muestra la película y el personaje. Permite ordenar por cita. Tiene dos filtros, y una serie de acciones por item:

* Filtro por película
* Filtro personaje, también activable mediante anterior tabla
* Acción editar inline
* Acción duplicar
* Acción borrar

Las acciones envían datos a la siguiente tabla que almacenan las peticiones hechas por el usuario. Tambien tienen unos alerts a modo de notificación.

## Tabla Petitions
Esta tabla almacena las peticiones del usuario, muestra la quote selecciona, el tipo de petición y la fecha de cada uno de ellos. Permite ordenar por fecha y por tipo.

## Características
El proyecto cuenta con notificaciones de las acciones del usuario tanto si son correcta o incorrectas. 
También, tiene persistencia de datos a través del local storage en la tabla Petitions y en los filtros de la tabla Quotes. 
Las paginaciones y filtrados y buscadores se realizan a través de la API.

### Dependencias
* Vue
* Vue-router
* Vuex
* Vuex-PersistedState
* Vuetify
* @kugatsu/VueNotification
* Gsap
* Axios

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm serve
```

### Compiles and minifies for production
```
npm build
```

### Lints and fixes files
```
npm lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
