function Titulo({ texto }) {
    const style = {
        fontFamily: "Arial",
        fontSize: "30px",
        margin: "2px",
        textAlign: "center",
    };
    return (
        <h3 style={style}>{texto}</h3>
    );
}
export default Titulo;