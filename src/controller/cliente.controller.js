<<<<<<< HEAD
const clienteCtl = {}
const orm =require('../database/dataBase.orm')
const sql =require('../database/dataBase.sql')

clienteCtl.mostrar=(req,res)=>{
    res.render('cliente/agregar');
}
//mandar
clienteCtl.mandar=async(req,res)=>{
    const id =req.user.id_cliente
    const {nombre_cliente,apellido_cliente,direccion_cliente,correo_cliente,celular_cliente,cedula_cliente}=req.body
    const nuevoEnvio={
        nombre_cliente,
        apellido_cliente,
        direccion_cliente,
        correo_cliente,
        celular_cliente,
        cedula_cliente
    }
  await orm.cliente.create(nuevoEnvio)
  req.flash('success','Guardado exitosamente')
  res.redirect('/cliente/listar/'+id)
}
clienteCtl.listar=async(req,res)=>{
 const lista=await sql.query('select * from clientes')
res.render('cliente/listar',{lista})
}
//Extracion de datos
clienteCtl.traer=async(req,res)=>{
    const ids=req.params.id
    const lista =await sql.query('select * from clientes where id_cliente = ?'[ids])
    res.render('cliente/editar',{lista})
}
//Actualizar
clienteCtl.actualizar=async(req,res)=>{
 const ids =req.params.id
 const {nombre_cliente,apellido_cliente,direccion_cliente,correo_cliente,celular_cliente,cedula_cliente}=req.body
 const nuevoEnvio={
        nombre_cliente,
        apellido_cliente,
        direccion_cliente,
        correo_cliente,
        celular_cliente,
        cedula_cliente
 }
await orm.cliente.findOne({where:{id__cliente:ids}}).then(actualizar=>{
    actualizar.update(nuevoEnvio)})
    req.flash ('success','Actualizado exitosamente')
    res.redirect('/cliente/listar/'+id)

}
//Eliminar
clienteCtl.eliminar= async(req,res)=>{
  await orm.cliente.destroy({where:{id__cliente:ids}}).then(()=>{
  req.flash('success','Elimindado exitosamente')
  res.redirect('/cliente/listar/'+id)
})

}
module.exports=clienteCtl
=======
const objetivoCtl ={}
>>>>>>> 9e4af19272f5ce64e27ccaa3cd76eac25a62688a
