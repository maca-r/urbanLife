package com.urbanlife.urbanlife.models;

public class Usuario {

    private String  Nombre,Correo,Contrasena;

    private RolUser rol;

    public Usuario(String nombre, String correo, String contrasena, RolUser rol) {
        Nombre = nombre;
        Correo = correo;
        Contrasena = contrasena;
        this.rol = rol;
    }

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String nombre) {
        Nombre = nombre;
    }

    public String getCorreo() {
        return Correo;
    }

    public void setCorreo(String correo) {
        Correo = correo;
    }

    public String getContrasena() {
        return Contrasena;
    }

    public void setContrasena(String contrasena) {
        Contrasena = contrasena;
    }

    public RolUser getRol() {
        return rol;
    }

    public void setRol(RolUser rol) {
        this.rol = rol;
    }

 /*   public void realizarAccionPublica() {
        // Acción pública disponible para todos los usuarios (tanto administradores como clientes)
        System.out.println("Acción pública realizada por " + Nombre);
    }

    public void realizarAccionAdmin() {
        // Acción específica para administradores
        if (rol == RolUser.ADMINISTRADOR) {
            System.out.println("Acción administrativa realizada por " + Nombre);
        } else {
            System.out.println("Acceso denegado. Esta acción solo está permitida para administradores.");
        }
    }

    public void realizarAccionCliente() {
        // Acción específica para clientes
        if (rol == RolUser.CLIENTE) {
            System.out.println("Acción para cliente realizada por " + Nombre);
        } else {
            System.out.println("Acceso denegado. Esta acción solo está permitida para clientes.");
        }
    }
*/
}
