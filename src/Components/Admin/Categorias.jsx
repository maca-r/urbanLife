import { useState } from "react";
import { AddCategorias } from "./AddCategorias";
import { ImgCategoria } from "./ImgCategoria";
import { ListarCategorias } from "./ListarCategorias";
import { PapeleraCategoria } from "./PapeleraCategoria";
import styles from "./Categorias.module.css";

export function Categorias() {
  const [panelSection, setPanelSection] = useState("");
  const [showTitle, setShowTitle] = useState(true);

  const handlePanelSection = (targetSection) => {
    setPanelSection(targetSection);
    setShowTitle(false);
  };

  return (
    <section className={styles.panel}>
      <div className={styles.buttonPanel}>
        <button onClick={() => handlePanelSection("añadirCategorias")}>
          Agregar Categorias
        </button>

        <button onClick={() => handlePanelSection("imgCategoria")}>
          Agregar Imagen
        </button>

        <button onClick={() => handlePanelSection("listarCategorias")}>
          Listar Categorias
        </button>

        <button onClick={() => handlePanelSection("papeleraCategoria")}>
          Papelera
        </button>
      </div>

      <div className={styles.showPanelSection}>
        {panelSection == "" && (
              <h4 style={{margin: "2%"}}>Elija una acción del panel superior</h4>
              
        )}
        {panelSection === "añadirCategorias" && <AddCategorias />}
        {panelSection === "imgCategoria" && <ImgCategoria />}
        {panelSection === "listarCategorias" && <ListarCategorias />}
        {panelSection === "papeleraCategoria" && <PapeleraCategoria />}
      </div>
      

      
    </section>
  );
}
