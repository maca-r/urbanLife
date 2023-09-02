import { useState } from "react";
import { AddCategorias } from "./AddCategorias";
import { ImgCategoria } from "./ImgCategoria";
import { ListarCategorias } from "./ListarCategorias";
import { PapeleraCategoria } from "./PapeleraCategoria";

export function Categorias() {
  const [panelSection, setPanelSection] = useState(null);
  const [showTitle, setShowTitle] = useState(true);

  const handlePanelSection = (targetSection) => {
    setPanelSection(targetSection);
    setShowTitle(false);
  };

  return (
    <section>
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

      {showTitle && <h2>Elija una categoría</h2>}

      {panelSection === "añadirCategorias" && <AddCategorias />}
      {panelSection === "imgCategoria" && <ImgCategoria />}
      {panelSection === "listarCategorias" && <ListarCategorias />}
      {panelSection === "papeleraCategoria" && <PapeleraCategoria />}
    </section>
  );
}
