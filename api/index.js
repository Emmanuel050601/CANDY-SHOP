const { Client } = require("pg");//La clase Client permite conectarse una vesz a la BD
const express = require('express')
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express()

const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post('/enviar-correo', (req, res) => {
    const formData = req.body;

    const config = {
        host: 'smtp.gmail.com', // SMTP para GMAIL
        port: 587,
        auth: {
            user: "dulceriavicky3@gmail.com",
            pass: "qavz aqjr pvym pqvf "
        }
    }

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport(config);

    // Configuración del correo electrónico
    const mailOptions = {
        from : 'dulceriavicky3@gmail.com',
        to : 'lopezrosamaria5691@gmail.com',
        subject: formData.asunto,
        text: `
            Nombre: ${formData.nombre}
            Teléfono: ${formData.telefono}
            Email: ${formData.email}
            Mensaje: ${formData.mensaje}
        `
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al enviar el correo electrónico' });
        } else {
            console.log('Correo enviado: ' + info.response);
            res.json({ success: true });
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/CProducts', async (req, res) => {

    const productos = await consultarTodosProductos();
    res.send(productos);
})

//Insercion con la api en tabla productos POST
app.post('/PProducts', (req, res) => {
    const productData = req.body
    guardarProductos(productData.product_id, productData.nombre,productData.marca, productData.contenido, productData.precio, productData.stock);
    console.log(req.body)
    res.send('Insertado')
  })

//Eliminacion con la api en la tabla productos DELETE
app.delete('/DelProducts', (req, res) => {
    eliminarProducto(req.body.id);
    res.send('Eliminar');
})

//Actualizar con la api en la tabla Productos PUT
app.put('/PuProducts', (req,res)=>{
    const product = req.body;
    actualizarProductos(product.product_id, product.nombre, product.marca, product.contenido, product.precio, product.stock);
    res.send('se Actualizo');

})

//Consulta con la appi GET para promociones
app.get('/CPromos', async (req, res) => {
    const promos = await consultarTodasPromos();
    res.send(promos);
})

//Insercion con la api en tabla promociones POST
app.post('/PPromos', (req, res) => {
    const promoData = req.body;
    guardarPromos(promoData.id_product, promoData.descripcion, promoData.fecha_inicio, promoData.fecha_final);
    res.send('Insertado');
})
//Consulta con la api con el nombre de un producto
app.post('/CSProducts', async (req, res)=>{
    const productos = await consultarUnProducto(req.body.nombre);
    res.send(productos);
})

//Consulta por producto
app.get("/CSPromos/:producto", async (req, res)=>{
    const product = req.params.producto;
    const promos = await consultarUnPromo(product);
    res.send(promos);
})

app.post('/CUsuario', async (req, res)=>{
    const user = await consultarUnUsuario(req.body.nombre);
    res.send(user);
})

//Eliminacion con la api en la tabla promociones DELETE
app.delete('/DelPromos', (req, res) => {
    
    eliminarPromos(req.body.promocion_id);
    res.send('Eliminado');
})

//Actualizar con la api en la tabla Promociones PUT idpromo, nameProdduct, descripcion, fecha_inicio, fecha_final
app.put('/PuPromos', (req,res)=>{
    const promoData = req.body;
    actualizarPromos(promoData.promocion_id,promoData.nombre, promoData.descripcion, promoData.fecha_inicio, promoData.fecha_final);
    res.send('Se actualizo');
})

app.get('/CUsers', async (req, res) => {
    const user = await consultarUsuarios();
    res.send(user);
})

app.get('/CUser/:id_user', async (req, res) =>{
    const userId = req.params.id_user;
    const user = await consultarUsuarioId(userId);
    res.send(user);
})

app.post('/PUsers', (req, res) => {
    const userData = req.body;
    insertarUsuarios(userData.nombre, userData.pass);
    res.send("Insertado");
})

app.put('/PuUser', async (req, res) => {
    const userData = req.body;
    actualizarUsuarios(userData.id_user, userData.nombre, userData.pass);
    res.json({message: "Usuario actualizado correctamente"});
})

app.delete('/DelUser/:id_user', async (req, res) => {
    const userId = req.params.id_user;
    eliminarUsuarios(userId);
    res.send("Eliminado");
})

//Se da de alta el puerto con el que se va a trabajar
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
////////////////////////////////////////////////////////////

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        cb(null, '/home/agl/Documentos/Semestre 9/Programacion Web/Proyecto final/CandyShop/Images/Productos'); // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        const nombreOriginal = file.originalname.split('.')[0];
        cb(null, nombreOriginal + '.png');
    }
});

const upload = multer({ storage });

//subir arch
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Archivo subido correctamente');
});

async function consultarUnProducto(nombre){
    let cliente;
    try{
        const pool = await require('./ConexionDB');

        // Adquiere una conexión del pool
        cliente = await pool.connect();
        //Para realizar una consulta SQL
        const res = await cliente.query("SELECT * FROM productos WHERE nombre LIKE '"+nombre+"%'");
        const result = res.rows;
        console.log(res.rows);
        return result;
    } catch (error) {
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        console.log("Terminé");
        // Siempre devuelve la conexión al pool, incluso en caso de error
        if (cliente) { cliente.release();}
    }    
};

///////////////////////////////// - usuarios
async function consultarUnUsuario(user){
    let cliente;
    console.log(user);
    try{
        const pool = await require('./ConexionDB');
        // Adquiere una conexión del pool
        cliente = await pool.connect();
        //Para realizar una consulta SQL
        const res = await cliente.query(
            `SELECT pass FROM usuarios WHERE nombre = '${user}'`);
        const result = res.rows;
        console.log(res.rows);
        return result;
    } catch (error) {
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        console.log("Terminé");
        // Siempre devuelve la conexión al pool, incluso en caso de error
        if (cliente) { cliente.release();}
    }    
};

async function consultarUsuarioId(id_user){
    let cliente;
    try{
        const pool = await require('./ConexionDB');
        // Adquiere una conexión del pool
        cliente = await pool.connect();
        //Para realizar una consulta SQL
        const executeQuery = `SELECT * FROM usuarios WHERE id_user = '${id_user}'`;
        const res = await cliente.query(executeQuery);
        const result = res.rows;
        return result;
    }catch (error){
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        if (cliente) { cliente.release(); }
    }

}

async function eliminarUsuarios(id_user){
    let cliente;
    try{
        const pool = await require('./ConexionDB');
        // Adquiere una conexión del pool
        cliente = await pool.connect();
        //Para realizar una consulta SQL
        const executeQuery = `DELETE FROM usuarios WHERE id_user = ${id_user}`;
        const res = await cliente.query(executeQuery);
        const result = res.rows;
        return result;
    }catch (error){
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        if (cliente) { cliente.release(); }
    }
}

async function insertarUsuarios(nombre, pass){
    let cliente;
    try{
        const pool = await require('./ConexionDB');
        // Adquiere una conexión del pool
        cliente = await pool.connect();
        //Para realizar una consulta SQL
        const executeQuery = `INSERT INTO usuarios (nombre, pass) VALUES ('${nombre}', '${pass}')`;
        await cliente.query(executeQuery);
    }catch (error){
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        if (cliente) { cliente.release(); }
    }
}

async function actualizarUsuarios (id_user, nombre, pass){
    let cliente;
    try{
        const pool = await require('./ConexionDB');
        // Adquiere una conexión del pool
        cliente = await pool.connect();
        //Para realizar una consulta SQL
        const executeQuery = `UPDATE usuarios 
                              SET nombre = '${nombre}', pass = '${pass}'
                              WHERE id_user = ${id_user}`;
        await cliente.query(executeQuery);
    }catch (error){
        console.log("Error en la consulta: ", error);
        throw error;
    } finally {
        if (cliente) { cliente.release(); }
    }
}

async function consultarUsuarios(){
    let cliente;
    try{
        const pool = await require('./ConexionDB');
        // Adquiere una conexión del pool
        cliente = await pool.connect();
        //Para realizar una consulta SQL
        const executeQuery = `SELECT * FROM usuarios`;
        const result = await cliente.query(executeQuery);
        return result.rows;
    }catch (error){
        console.log("Error en la consulta: ", error);
        throw error;
    } finally {
        if (cliente) { cliente.release(); }
    }
}
///////////////////////////////// - promociones
async function consultarUnPromo(product){
    let cliente;
    try{
        const pool = await require('./ConexionDB');

        // Adquiere una conexión del pool
        cliente = await pool.connect();
        const res = await cliente.query( 
        `
            SELECT promocion_id, nombre, descripcion, 
            to_char(fecha_inicio, 'DD-MM-YYYY') AS fecha_inicio, 
            to_char(fecha_final, 'DD-MM-YYYY') AS fecha_final,
            marca, contenido, precio, stock
            FROM promociones as PO
            JOIN productos as PD ON PO.id_product = PD.product_id
            WHERE PD.nombre LIKE '${product}%';
        `
        );
        const result = res.rows;
        console.log(res.rows);
        return result;
    } catch (error) {
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        console.log("Terminé");
        // Siempre devuelve la conexión al pool, incluso en caso de error
        if (cliente) { cliente.release();}
    }

    //Para realizar una consulta SQL
    
};

//Funcion que actualizar las promociones
async function actualizarPromos(idpromo, nameProdduct, descripcion, fecha_inicio, fecha_final){
    
    let cliente;
    try{
        const pool = await require('./ConexionDB');

        // Adquiere una conexión del pool
        cliente = await pool.connect();
        const executeQuery = 
        //UPDATE promociones SET id_product= productos.product_id, descripcion = '2x1', fecha_inicio = '2023/11/10', fecha_final = '2023/11/10'FROM productos WHERE productos.nombre = 'Cachetada' AND promocion_id =1;
        "UPDATE promociones SET id_product= productos.product_id, descripcion = '"+descripcion+"', fecha_inicio = '"+fecha_inicio+"', fecha_final = '"+fecha_final+"'  FROM productos WHERE productos.nombre = '"+nameProdduct+"' AND promocion_id = "+idpromo;
        debugger;
        await cliente.query(executeQuery);        
    } catch (error) {
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        console.log("Terminé");
        // Siempre devuelve la conexión al pool, incluso en caso de error
        if (cliente) { cliente.release();}
    }
}

//Falta agrega el stock se guarda en la base de datos
async function guardarProductos(product_id, nombre, marca, contenido, precio, stock){
    let cliente;
    try{
        const pool = await require('./ConexionDB');

        // Adquiere una conexión del pool
        cliente = await pool.connect();
        const comand = 
            "INSERT INTO productos (product_id, nombre, marca, contenido, precio, stock) VALUES ('"+product_id+"','"+nombre+"','"+marca+"','"+contenido+"',"+precio+", '"+stock+"')";
        await cliente.query(comand);
        console.log("Consulta exitosa");
    } catch (error) {
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        console.log("Terminé");
        // Siempre devuelve la conexión al pool, incluso en caso de error
        if (cliente) { cliente.release();}
    }
}

//Funcion que consulta todo los producto de la base de datos
async function consultarTodosProductos(){
    let cliente;
    try {
        const pool = await require('./ConexionDB');

        // Adquiere una conexión del pool
        cliente = await pool.connect();

        // Realiza la consulta SQL
        const res = await cliente.query('SELECT * FROM productos');
        const result = res.rows;

        console.log("Consulta exitosa");
        return result;
    } catch (error) {
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        console.log("Terminé");
        // Siempre devuelve la conexión al pool, incluso en caso de error
        if (cliente) { cliente.release(); }
    }
}

//Funcion que elimina un producto de la base de datos
async function eliminarProducto(id){
    let cliente;
    try {
        const pool = await require('./ConexionDB');
        // Adquiere una conexión del pool
        cliente = await pool.connect();
        // Realiza la consulta SQL
        await cliente.query("DELETE FROM productos WHERE product_id = '"+id+"'");
        console.log("Consulta exitosa");
    } catch (error) {
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        console.log("Terminé");
        // Siempre devuelve la conexión al pool, incluso en caso de error
        if (cliente) { 
            cliente.release(); 
        }
    }
}

//Funcion que actualiza un registro de la base de datos
async function actualizarProductos(product_id, nombre, marca, contenido, precio, stock){
    let cliente;
    try {
        const pool = await require('./ConexionDB');
        // Adquiere una conexión del pool
        cliente = await pool.connect();
        // Realiza la consulta SQL
        const executeQuery = 
        "UPDATE productos SET nombre ='"+nombre+"', marca = '"+marca+"', contenido = '"+contenido+"', precio = "+precio+", stock = "+stock+" WHERE product_id = '"+product_id+"'";
        debugger;
        await cliente.query(executeQuery);
        console.log("Consulta exitosa");
    } catch (error) {
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        console.log("Terminé");
        // Siempre devuelve la conexión al pool, incluso en caso de error
        if (cliente) { cliente.release(); }
    }
}

//funcion que consulta todas las promociones en la base de datos
async function consultarTodasPromos(){
    let cliente;
    try {
        const pool = await require('./ConexionDB');
        // Adquiere una conexión del pool
        cliente = await pool.connect();
        // Realiza la consulta SQL
        const res = await cliente.query(`
            SELECT promocion_id, nombre, descripcion, 
            to_char(fecha_inicio, 'DD-MM-YYYY') AS fecha_inicio, 
            to_char(fecha_final, 'DD-MM-YYYY') AS fecha_final,
            marca, contenido, precio, stock
            FROM promociones as PO
            JOIN productos as PD ON PO.id_product = PD.product_id;
        `);
        const result = res.rows;
        console.log("Consulta exitosa");
        return result;
    } catch (error) {
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        console.log("Terminé");
        // Siempre devuelve la conexión al pool, incluso en caso de error
        if (cliente) { cliente.release(); }
    }
}

//Funcion que inserta nuevas promociones
async function guardarPromos(id_product,descripcion, fecha_inicio, fecha_final){
    let cliente;
    try {
        const pool = await require('./ConexionDB');
        // Adquiere una conexión del pool
        cliente = await pool.connect();
        // Realiza la consulta SQL
        const comand = 
            "INSERT INTO promociones (id_product, descripcion, fecha_inicio, fecha_final) VALUES ('"+id_product+"','"+descripcion+"','"+fecha_inicio+"','"+fecha_final+"')";
        await cliente.query(comand);
        console.log("Consulta exitosa");
    } catch (error) {
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        console.log("Terminé");
        // Siempre devuelve la conexión al pool, incluso en caso de error
        if (cliente) { 
            cliente.release(); 
        }
    }
}

//Funcion que eliminar promociones
async function eliminarPromos(id_product){
    let cliente;
    debugger;
    try {
        const pool = await require('./ConexionDB');
        // Adquiere una conexión del pool
        cliente = await pool.connect();
        // Realiza la consulta SQL
        await cliente.query("DELETE FROM promociones WHERE promocion_id = '"+id_product+"'");
        console.log("Consulta exitosa");
    } catch (error) {
        console.error("Error en la consulta: ", error);
        throw error;
    } finally {
        console.log("Terminé");
        // Siempre devuelve la conexión al pool, incluso en caso de error
        if (cliente) { 
            cliente.release(); 
        }
    }
}