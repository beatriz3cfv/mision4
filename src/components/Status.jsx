// Mensaje de estado
export function Status({ tipo, children }) {
    return (
        <p className={`status status-${tipo}` } role={tipo === "error" ? "alert" : "status"}>
            {children}
        </p>
    );
}
