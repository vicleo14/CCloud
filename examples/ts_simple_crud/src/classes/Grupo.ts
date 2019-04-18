import {Materia} from './Materia';

export class Grupo {

    public id: string;
    public materias: Materia[];
    
    constructor() {
        this.id = '';
        this.materias = new Array<Materia>();
    }
}
