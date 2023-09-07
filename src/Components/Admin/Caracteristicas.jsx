import { useState } from "react";
import styles from "./Categorias.module.css";
import { ListaCaracteristicas } from "./ListaCaracteristicas";
import { RegistrarCaracteristicas } from "./RegistrarCaracteristicas";

export function Caracteristicas() {
  const [panelSection, setPanelSection] = useState("");
  const [showTitle, setShowTitle] = useState(true);

  const handlePanelSection = (targetSection) => {
    setPanelSection(targetSection);
    setShowTitle(false);
  };

  return (
    <section>
      <div className={styles.buttonPanel}>
        <button onClick={() => handlePanelSection("registrarCaracteristicas")}>
          Registrar Caracteristicas
        </button>

        <button onClick={() => handlePanelSection("imgCategoria")}>
          Añadir Caracteristicas
        </button>

        <button onClick={() => handlePanelSection("listadoCaracteristicas")}>
          Listar Caracteristicas
        </button>
      </div>

      <div className={styles.showPanelSection}>
      {panelSection == "" && (
              <h4 style={{margin: "2%"}}>
                Elija una acción del panel superior
              </h4>
      )}
      {panelSection === "registrarCaracteristicas" && (
        <RegistrarCaracteristicas />
      )}
      {panelSection === "listadoCaracteristicas" && <ListaCaracteristicas />}
      </div>
      

      {/* {showTitle && <h4>Elija una acción del panel superior</h4>} */}

      
    </section>
  );
}
