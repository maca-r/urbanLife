package com.urbanlife.urbanlife.models;

public class Cliente extends Usuario{

    private String Historial,Ubicacion;

    public Cliente(String nombre, String correo, String contrasena, RolUser rol, String historial, String ubicacion) {
        super(nombre, correo, contrasena, rol);
        Historial = historial;
        Ubicacion = ubicacion;
    }

    public String getHistorial() {
        return Historial;
    }

    public void setHistorial(String historial) {
        Historial = historial;
    }

    public String getUbicacion() {
        return Ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        Ubicacion = ubicacion;
    }
}
