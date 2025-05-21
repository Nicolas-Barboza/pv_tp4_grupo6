import Titulo from "./Titulo";
import HeaderTabla from "./HeaderTabla"; 
import ProductItem from "./ProductItem"; 

function ProductList({ productos, onEditar, onEliminar }) {
    const columnas = ["ID", "Descripción", "Precio Unit.", "Desc. (%)", "Precio Final", "Stock", "Acciones"];

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "10px",
    };

    if (!productos || productos.length === 0) {
        return (
            <div>
                <Titulo texto={"Lista de Productos"} />
                <p>No hay productos para mostrar.</p>
            </div>
        );
    }

    return (
        <div>
            <Titulo texto={"Lista de Productos"} />
            <table style={tableStyle}>
                <HeaderTabla columnas={columnas} />
                <tbody>
                    {productos.map((producto) => (
                        <ProductItem
                            key={producto.id} // Key única para cada item en la lista
                            producto={producto}
                            onEditar={onEditar}
                            onEliminar={onEliminar}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;