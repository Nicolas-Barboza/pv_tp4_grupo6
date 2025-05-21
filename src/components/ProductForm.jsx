import Titulo from "./Titulo";
import styles from "../styles/ProductForm.module.css"

function ProductForm({ productoActual, setProductoActual, onGuardar, modo }) {

    // Manejador para cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        // Convertir a número si el tipo es number, sino dejar como texto
        const val = type === 'number' ? parseFloat(value) || 0 : value;
        setProductoActual({
            ...productoActual,
            [name]: val,
        });
    };

    // Manejador para el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías agregar validaciones antes de guardar
        if (!productoActual.descripcion.trim()) {
            alert("La descripción no puede estar vacía.");
            return;
        }
        if (productoActual.precioUnitario <= 0) {
            alert("El precio unitario debe ser mayor que cero.");
            return;
        }
        if (productoActual.stock < 0) {
            alert("El stock no puede ser negativo.");
            return;
        }
        if (productoActual.descuento < 0 || productoActual.descuento > 100) {
            alert("El descuento debe estar entre 0 y 100.");
            return;
        }
        onGuardar(productoActual);
    };

    // El título del formulario cambia según el modo (nuevo o editar)
    const tituloForm = modo === "edit" ? "Editar Producto" : "Registrar Nuevo Producto";

    // El precio con descuento se calcula aquí, pero no se muestra en el input.
    const precioConDescuentoMostrado = productoActual.precioConDescuento !== undefined
        ? productoActual.precioConDescuento.toFixed(2)
        : (productoActual.precioUnitario * (1 - (productoActual.descuento || 0) / 100)).toFixed(2);


    return (
        <>
            <div className={styles["center-page"]}>
                <Titulo texto={tituloForm} />
                <div className={styles["form-container"]}>
                    <form onSubmit={handleSubmit} className={styles["submit-form"]}>
                        <div className={styles["input-group"]}>
                            <label>Descripción:</label>
                            <input type="text" id="descripcion" name="descripcion" value={productoActual.descripcion || ""} onChange={handleChange} required placeholder="descripcion"></input>

                            <label>Precio Unitario:</label>
                            <input type="number" id="precioUnitario" name="precioUnitario" value={productoActual.precioUnitario || 0} onChange={handleChange} step="0.01" min="0" required></input>

                            <label>Descuento (%):</label>
                            <input type="number" id="descuento" name="descuento" value={productoActual.descuento || 0} onChange={handleChange} min="0" max="100"></input>

                            <label>Precio con Descuento:</label>
                            <input type="text" id="precioConDescuento" name="precioConDescuento" value={`$${precioConDescuentoMostrado}`} readOnly></input>

                            <label>Stock:</label>
                            <input type="number" id="stock" name="stock" value={productoActual.stock || 0} onChange={handleChange} min="0" required></input>

                            <br />
                            <button type="submit" className={styles["submit-button"]}>Guardar Producto</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProductForm;