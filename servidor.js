const express = require('express')
const { Router } = express

const app = express()
const router = Router();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos', router)

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor connectado. Puerto: ${server.address().port}.`)
})
server.on("error", error => console.log(`Error en servidor: ${error}.`))


const listaProductos = []

const validarDatos = (req, res, next) => {
    const {title, price, thumbnail} = req.body

    if (!title || !price || !thumbnail) 
    res.status(400).send('Falta la info o está incompleta.')
    
    next()
}


//OBTENER TODOS LOS PRODUCTOS
router.get('/', (req, res) => {
    res.send(listaProductos)
})

//OBTENER PRODUCTO POR ID
router.get('/:id', (req, res) => {
    const {id} = req.params
    const productoSeleccionado = listaProductos.filter(producto => producto.id == id);

    if(productoSeleccionado.length == 0)
    res.status(400).send(`Producto con el id ${id} no encontrado.`)

    res.send(productoSeleccionado)
})

//AGREGAR PRODUCTO
router.post('/', validarDatos, (req, res) => {
    if (listaProductos.length == 0) {
        newId = 1;
    }
    else {
        const lastId = listaProductos[listaProductos.length -1].id
        newId = lastId + 1;
    }
    listaProductos.push({...req.body, id: newId})
    res.send(`¡Producto agregado correctamente! El id es: ${newId}.`)
})

//ACTUALIZAR PRODUCTO POR ID
router.put('/:id', (req, res) => {
    const {id} = req.params
    const productosActualizados = listaProductos.map((producto) => {
        if(producto.id != id)
        return producto
        else if (producto.id == id)
        return {...req.body, id}
    })
    res.send(productosActualizados)
})

//ELIMINAR PRODUCTO POR IR
router.delete('/:id', (req, res) => {
    const {id} = req.params
    const productosActualizados = listaProductos.filter(producto => producto.id != id)
    res.send(productosActualizados)
})