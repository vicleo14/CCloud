import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as fs from 'fs';
import * as socketio from 'socket.io';
import * as httpLib from 'http';

import {Alumno} from './classes/Alumno';
import {Grupo} from './classes/Grupo';
import {HorarioMateria} from './classes/HorarioMateria';
import {Materia} from './classes/Materia';
import {Sz} from './classes/Sz';
import * as dirs from './values/strings';

// Express config
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Socket io config
const http = new httpLib.Server(app);
let io = socketio.listen(http);

io.sockets.on('connection', (socket) => {
    console.log("Conectado");

    // Crud Alumno
    socket.on('newAlumno', (data: Alumno) => {
        Sz.serialize(data, dirs.ALUMNO_FOLDER);
        socket.emit('newAlumno', 'ok');
    });

    socket.on('getAlumno', (id: string) => {
        let data = Sz.deserialize(id, dirs.ALUMNO_FOLDER);
        socket.emit('getAlumno', data);
    });

    socket.on('getAllAlumno', () => {
        let alumnos = new Array<Alumno>();
        fs.readdirSync(dirs.ALUMNO_FOLDER).forEach( file => {
            alumnos.push(Sz.deserialize(file, dirs.ALUMNO_FOLDER))
        });
        socket.emit('getAllAlumno', alumnos);
    });

    //Crud Grupo
    socket.on('newGrupo', (data: Grupo) => {
        Sz.serialize(data, dirs.GRUPO_FOLDER);
        socket.emit('newGrupo', 'ok');
    });

    socket.on('getGrupo', (id: string) => {
        let data = Sz.deserialize(id, dirs.GRUPO_FOLDER);
        socket.emit('getGrupo', data);
    });

    socket.on('getAllGrupo', () => {
        let groups = new Array<Grupo>();
        fs.readdirSync(dirs.GRUPO_FOLDER).forEach( file => {
            groups.push(Sz.deserialize(file, dirs.GRUPO_FOLDER))
        });
        socket.emit('getAllGrupo', groups);
    });

});

app.get('/', (req, res) => {
    res.send('Hello!');
});

http.listen(8080, () => {
    if (!fs.existsSync(dirs.STORAGE_FOLDER)) {
        fs.mkdirSync(dirs.STORAGE_FOLDER);
    }
    console.log('Listening on port 8080!');
});