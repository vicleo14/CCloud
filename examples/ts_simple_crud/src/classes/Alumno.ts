import fs from 'fs';
import {Grupo} from './Grupo';

export class Alumno {

    public id: string;
    public nombre: string;
    public pApellido: string;
    public sApellido: string;
    public urlFoto: string;
    public grupo: Grupo;

    constructor() {
        this.id = '0';
        this.nombre = '';
        this.pApellido = '';
        this.sApellido = '';
        this.urlFoto = '';
        this.grupo = new Grupo();
    }
}
