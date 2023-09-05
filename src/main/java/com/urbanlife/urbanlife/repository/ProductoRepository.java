package com.urbanlife.urbanlife.repository;

import com.urbanlife.urbanlife.models.Categorias;
import com.urbanlife.urbanlife.models.Dto.ProductoTestDto;
import com.urbanlife.urbanlife.models.Productos;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
@Repository
@Transactional
public interface ProductoRepository extends CrudRepository<Productos, Integer> {

    @Modifying
    @Query(value = "SELECT * FROM urbanlife.productos WHERE eliminar_producto <> 1 ORDER BY RAND() LIMIT 10", nativeQuery = true)
    Collection<Productos> listProductosAletorios();

    @Modifying
    @Query(value = "UPDATE productos SET eliminar_producto = :estado WHERE id_producto = :id", nativeQuery = true)
    void setEstadoEliminar(@Param("id") Integer id, @Param("estado") boolean estado);

    @Modifying
    @Query(value = "Insert into producto_medida (id_producto_medida, cantidad, id_medida, id_producto)\n" +
            "values (:id, :cantidad, :id_medida, :id_producto)", nativeQuery = true)
    void registrarTalleConProducto(@Param("cantidad") Integer cantidad,
                                  @Param("id_medida") Integer id_medida,
                                  @Param("id_producto") Integer id_producto);

    @Modifying
    @Query(value = "INSERT INTO imagenes (url_imagen, id_producto)\n" +
                    "VALUES (:URL_IMAGEN,:id_producto)", nativeQuery = true)
    void resgistrarImagenesConProducto(@Param("URL_IMAGEN") String URL_IMAGEN,
                                       @Param("id_producto") Integer id_producto);
    //Investigar ERROR
    @Modifying
    @Query(value = """
            SELECT id_producto, fecha_actual,nombre
            FROM productos
            ORDER BY fecha_actual DESC
            LIMIT 1
            """, nativeQuery = true)
    ProductoTestDto productoMasReciente();
}
