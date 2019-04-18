import {HorarioMateria} from './HorarioMateria';

export class Materia {
    
    public nombre: string;
    public profesor: string;
    public horario: HorarioMateria;

    constructor() {
        this.nombre = '';
        this.profesor = '';
        this.horario = new HorarioMateria();
    }
}
