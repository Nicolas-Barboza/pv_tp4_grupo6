# Trabajo Práctico N°4 - React: Gestión de Productos 🛍️
_Programación Visual - Facultad de Ingeniería, UNJu_

## Descripción del Proyecto 📖

Este proyecto es una aplicación web interactiva desarrollada para la cátedra de Programación Visual, enfocada en la gestión eficiente de una lista de productos. Utilizando **React y Vite** como tecnologías principales, la aplicación proporciona una interfaz de usuario moderna e intuitiva para administrar un catálogo de productos de forma dinámica.

Los usuarios pueden realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos:
* **Agregar** nuevos artículos mediante un formulario dedicado.
* **Buscar y filtrar** productos existentes por su ID o descripción para un acceso rápido.
* **Modificar** la información detallada de los productos seleccionados.
* **Eliminar** productos del catálogo.

La arquitectura del software se centra en componentes reutilizables y una clara separación de responsabilidades, asegurando un código mantenible y escalable.

## Funcionalidades Implementadas 📌

* Formulario para alta y edición de productos.
* Listado detallado de productos con información relevante (ID, descripción, precios, stock).
* Cálculo automático del `precioConDescuento`.
* Barra de búsqueda funcional por ID o descripción.
* Acciones para editar y eliminar cada producto directamente desde la lista.
* Navegación fluida entre las vistas de listado y formulario.

## Especificaciones y Tecnologías 🛠️

* **Entorno de Desarrollo:** Vite (v6.3.5)
* **Librería Principal:** React (v19.1.0)
* **Lenguaje:** JavaScript (ES6+) con sintaxis JSX.
* **Hooks de React:**
    * `useState`: Para la gestión de estados como `productos`, `productoActual`, `modo`, `nextId`, y `productosParaMostrar`.
    * `useEffect`: Para observar cambios en `productos` (logging en consola) y para recalcular `precioConDescuento` en `productoActual`.
    * `useMemo`: Para optimizar el filtrado de la lista de productos en `SearchBar`.
    * `useCallback`: Para memorizar funciones de callback (CRUD, navegación) y mejorar el rendimiento.
* **Eventos del DOM:** `onClick`, `onChange`, `onSubmit` para la interacción del usuario.
* **Estilización:** Combinación de CSS Modules para componentes específicos y estilos globales en `index.css`.
* **Componentes Reutilizables:** `ProductForm`, `ProductList`, `ProductItem`, `SearchBar`, `NavBar`, `Logo`, `Titulo`, `HeaderTabla`, `SearchIcon`.

## Estructura de Datos del Producto 📝

Cada producto se gestiona con las siguientes propiedades:

* **`id`**: Identificador único (Number).
* **`descripcion`**: Detalle textual del producto (String).
* **`precioUnitario`**: Costo base sin descuentos (Number).
* **`descuento`**: Porcentaje de descuento a aplicar, ej: 25 para 25% (Number).
* **`precioConDescuento`**: Precio final calculado: `precioUnitario * (1 - descuento / 100)` (Number).
* **`stock`**: Unidades disponibles en inventario (Number).

## Integrantes del Equipo 🧑‍💻👩‍💻

* **[Gonzalo Nicolas Barboza]** ➡ GitHub: `[Nicolas-Barboza]`
* **[Nombre del Integrante 2]** ➡ GitHub: `[UsuarioGitHub2]`

## Instalación y Ejecución Local 🚀

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Nicolas-Barboza/pv_tp4_grupo6.git
    cd pv_tp4_grupo6
    ```
2.  **Instala las dependencias del proyecto:**
    ```bash
    npm install
    ```
3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).


## Estrategia de Control de Versiones (Git) 🌿

El desarrollo sigue un flujo basado en ramas:
* **`main`**: Contiene el código de producción estable.
* **`develop`**: Rama de integración principal para nuevas funcionalidades.
* **`feature/<nombre-feature>`**: Ramas individuales para cada desarrollo específico, partiendo de `develop` y fusionándose nuevamente a `develop` mediante Pull Requests.

---