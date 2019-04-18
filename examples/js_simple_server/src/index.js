//Socket.io
const SocketIOFileUpload = require('socketio-file-upload'),
        socketio = require('socket.io');
// Express-adds
const bodyParser = require('body-parser');
const cors = require('cors')

// Express
const app = require('express')();
app.use(SocketIOFileUpload.router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Http
const http = require('http').Server(app);
// Files
const fs = require('file-system');
const rimraf = require("rimraf");
const rootdir = __dirname + "/../srv/"

const documents = {};

function getFilesizeInBytes(path) {
    const stats = fs.statSync(path)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}

// --------------- Files -------------------------

// Get
app.get('/file/', (req, res) => {
    console.log("Get");
    console.log(req.query)
    let filepath = "srv/" + req.query.path;
    let options = {
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
    }};
    res.download(filepath, filepath.slice(filepath.lastIndexOf("/") + 1), options);
});

// Rename
app.patch('/file/', (req, res) => {
    console.log("Patch");
    console.log(req.body)
    let filepath = req.body.path;
    let newname = req.body.newPath;
    fs.rename(rootdir + filepath, rootdir + newname, (err) => {
        if (err) {
            console.log('ERROR: ' + err);
            res.send(false);
        }
    });
    res.send(true);
});

// Delete
app.delete('/file/', (req, res) => {
    console.log("Delete");
    console.log(req.query);
    let filepath = req.query.path;
    rimraf(rootdir + filepath, (err) => {
        if (err) {
            console.log('ERROR: ' + err);
            res.send(false);
        }
    });
    res.send(true);
});

// --------------- Directories -------------------

// Get
app.get('/directory/', (req, res) => {
    console.log("Get");
    console.log(req.query)
    let dirpath = req.query.path;
    let r_dir = {
        name: "",
        path: "",
        files: [],
        directories: [],
        parent: ""
    };
    // Assign values
    if (dirpath.lastIndexOf("/") != -1) {
        r_dir.name = dirpath.slice(dirpath.lastIndexOf("/") + 1);
        let parent_path = dirpath.slice(0, dirpath.lastIndexOf("/"));
        r_dir.parent = parent_path;
    } else
        r_dir.name = dirpath;

    r_dir.path = dirpath;
    // Read all files and directories in dirpath
    fs.recurseSync(rootdir + dirpath, (filepath, relative, filename) => {
        if (filename && relative == filename) { // Its a file
            // Create an auxiliar object
            let aux_file = {
                name: "",
                path: "",
                size: ""
            };
            // Assign values
            aux_file.path = dirpath + "/" + relative;
            aux_file.name = filename;
            aux_file.size = getFilesizeInBytes(filepath);
            // Push auxiliar object in main directory
            r_dir.files.push(aux_file);
        } else if (!relative.includes("/")) { // Its a directory
            // Create an auxiliar object
            let aux_dir = {
                name: "",
                path: "",
                files: [],
                directories: [],
                parent: ""
            };
            // Assign path
            aux_dir.name = relative;
            aux_dir.path = dirpath + "/" + relative;
            aux_dir.parent = dirpath;
            // Push auxiliar object in main directory
            r_dir.directories.push(aux_dir);
        }
    });
    // Return json
    res.json(r_dir);
});

// Crear
app.post('/directory/', (req, res) => {
    console.log("Post");
    console.log(req.body)
    let dirpath = req.body.path;
    if (!fs.existsSync(rootdir + dirpath)) {
        fs.mkdir(rootdir + dirpath, (err) => {
            if (err) {
                console.log('ERROR: ' + err);
                res.send(false);
            }
        });
    } else {
        fs.mkdir(rootdir + dirpath + "(n)", (err) => {
            if (err) {
                console.log('ERROR: ' + err);
                res.send(false);
            }
        });
    }
    res.send(true);
});

// Rename
app.patch('/directory/', (req, res) => {
    console.log("Patch");
    console.log(req.body)
    let dirpath = req.body.path;
    let newname = req.body.newPath;
    fs.rename(rootdir + dirpath, rootdir + newname, (err) => {
        if (err) {
            console.log('ERROR: ' + err);
            res.send(false);
        }
    });
    res.send(true);
});

// Delete
app.delete('/directory/', (req, res) => {
    console.log("Delete");
    console.log(req.query);
    let dirpath = req.query.path;
    rimraf(rootdir + dirpath, (err) => {
        if (err) {
            console.log('ERROR: ' + err);
            res.send(false);
        }
    });
    res.send(true);
});

// Start up Socket.IO:
var io = socketio.listen(http);
io.sockets.on("connection", (socket) => {
    console.log("Conectado");
    // Make an instance of SocketIOFileUpload and listen on this socket:
    var uploader = new SocketIOFileUpload();
    uploader.dir = rootdir;
    uploader.listen(socket);

    // Do something when a file is saved:
    socket.on("chdir", (event) => {
        uploader.dir = rootdir + event;
        socket.emit("ok");
    });

    // Do something when a file is saved:
    uploader.on("saved", (event) => {
        console.log(event.file);
    });

    // Error handler:
    uploader.on("error", (event) => {
        console.log("Error from uploader", event);
    });

    // Disconnection message
    socket.on("disconnect", (socket) => {
        console.log("Desconectado");
    });
});

http.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
