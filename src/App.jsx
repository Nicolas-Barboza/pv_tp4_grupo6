import { useEffect, useState, useCallback } from 'react';
import NavBar from './components/NavBar';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

let initialNextId = 0;
const initialProductsData = [
    { id: initialNextId++, descripcion: "Monitor LED 24 pulgadas", precioUnitario: 150, descuento: 5, stock: 20 },
    { id: initialNextId++, descripcion: "Teclado Mecánico RGB", precioUnitario: 75, descuento: 10, stock: 35 },
    { id: initialNextId++, descripcion: "Mouse Gamer Pro", precioUnitario: 40, descuento: 0, stock: 50 },
    { id: initialNextId++, descripcion: "Laptop Gaming 15.6\"", precioUnitario: 1200, descuento: 15, stock: 10 },
    { id: initialNextId++, descripcion: "Auriculares Inalámbricos", precioUnitario: 60, descuento: 20, stock: 25 },
    { id: initialNextId++, descripcion: "Smartphone 6.5\"", precioUnitario: 800, descuento: 10, stock: 15 }
];

function App() {
  const [productos, setProductos] = useState(initialProductsData);
  const [productoActual, setProductoActual] = useState({
    id: null,
    descripcion: "",
    precioUnitario: 0,
    descuento: 0,
    stock: 0,
    precioConDescuento: 0
  });
  const [modo, setModo] = useState("list"); // list, new, edit
  const [nextId, setNextId] = useState(initialNextId);

  // Nuevo estado para los productos que se mostrarán en la lista (filtrados o todos)
  const [productosParaMostrar, setProductosParaMostrar] = useState(productos);

  // Término de búsqueda activo en SearchBar (SearchBar reiniciará el filtro si productos cambia)
  useEffect(() => {
    setProductosParaMostrar(productos);
  }, [productos]);

  // Efecto para calcular el precio con descuento al cambiar el precio unitario o el descuento
  useEffect(() => {
    if (modo === "new" || modo === "edit") {
      const precio = parseFloat(productoActual.precioUnitario) || 0;
      const desc = parseFloat(productoActual.descuento) || 0;
      const precioConDesc = precio * (1 - desc / 100);
      setProductoActual(p => ({ ...p, precioConDescuento: parseFloat(precioConDesc.toFixed(2)) }));
    }
  }, [productoActual.precioUnitario, productoActual.descuento, modo]);

  // Efecto para mostrar la lista de productos base al cargar la aplicación
  useEffect(() => {
    console.log("Lista de productos base actualizada:", productos);
  }, [productos]);

  // Esta función se pasará a SearchBar para recibir los productos filtrados.
  const handleProductosFiltradosDesdeSearchBar = useCallback((productosFiltrados) => {
    setProductosParaMostrar(productosFiltrados);
    if (productosFiltrados.length < productos.length && modo !== "new" && modo !== "edit") {
        setModo("search"); 
    } else if (productosFiltrados.length === productos.length && modo !== "new" && modo !== "edit") {
        setModo("list");
    }
  }, [productos, modo]);

  const handleGuardarProducto = useCallback((productoAGuardar) => {
    const precio = parseFloat(productoAGuardar.precioUnitario) || 0;
    const desc = parseFloat(productoAGuardar.descuento) || 0;
    const precioFinalCalculado = parseFloat((precio * (1 - desc / 100)).toFixed(2));
    const productoConPrecioFinal = { ...productoAGuardar, precioConDescuento: precioFinalCalculado };

    if (modo === "edit") {
      setProductos(prevProductos =>
        prevProductos.map(p => (p.id === productoConPrecioFinal.id ? productoConPrecioFinal : p))
      );
    } else {
      setProductos(prevProductos => [
        ...prevProductos,
        { ...productoConPrecioFinal, id: nextId}
      ]);
       setNextId(prev => prev + 1);
    }
    setModo("list");
    setProductoActual({ id: null, descripcion: "", precioUnitario: 0, descuento: 0, stock: 0, precioConDescuento: 0 });
  }, [modo]);

  const handleClickEditar = useCallback((productoParaEditar) => {
    setProductoActual(productoParaEditar);
    setModo("edit");
  }, []);

  const handleClickEliminar = useCallback((idProductoAEliminar) => {
    setProductos(prevProductos =>
      prevProductos.filter(p => p.id !== idProductoAEliminar)
    );
    if (modo === "edit" && productoActual.id === idProductoAEliminar) {
      setModo("list");
      setProductoActual({ id: null, descripcion: "", precioUnitario: 0, descuento: 0, stock: 0, precioConDescuento: 0 });
    }
  }, [modo, productoActual.id]);

  const handleIrInicio = useCallback(() => {
    setModo("list");
    setProductosParaMostrar(productos);
  }, [productos]);

  const handleIrAgregar = useCallback(() => {
    setModo("new");
    setProductoActual({ id: null, descripcion: "", precioUnitario: 0, descuento: 0, stock: 0, precioConDescuento: 0 });
  }, []);


  const renderContent = () => {
    switch (modo) {
      case "list": 
      case "search": return <ProductList productos={productosParaMostrar} onEditar={handleClickEditar} onEliminar={handleClickEliminar} />;
      case "new":
      case "edit": return <ProductForm productoActual={productoActual} setProductoActual={setProductoActual} onGuardar={handleGuardarProducto} modo={modo} />;
      default:
        return <ProductList productos={productosParaMostrar} onEditar={handleClickEditar} onEliminar={handleClickEliminar} />;
    }
  };

  return (
    <>
      <div>
         <NavBar
            modo={modo}
            productos={productos} 
            onProductosFiltradosApp={handleProductosFiltradosDesdeSearchBar} // Callback para SearchBar
            onIrInicio={handleIrInicio}
            onIrAgregar={handleIrAgregar}
        />
        <div style={{ paddingTop: "80px", padding: "20px" }}>
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default App;