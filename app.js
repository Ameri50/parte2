const { connectDB, client } = require("./database");

async function consultarClientesMayores30() {
  const db = await connectDB();
  const clientes = db.collection("clientes");
  const resultado = await clientes.find(
    { edad: { $gt: 30 } },
    { projection: { nombre: 1, correo: 1, _id: 0 } }
  ).toArray();
  console.log("📋 Clientes mayores de 30:", resultado);
}

async function actualizarCiudadCliente(nombre, nuevaCiudad) {
  const db = await connectDB();
  const clientes = db.collection("clientes");
  const res = await clientes.updateOne(
    { nombre },
    { $set: { ciudad: nuevaCiudad } }
  );
  console.log("✏️ Ciudad actualizada:", res.modifiedCount);
}

async function actualizarCiudadBogota() {
  const db = await connectDB();
  const clientes = db.collection("clientes");
  const res = await clientes.updateMany(
    { ciudad: "Bogotá" },
    { $set: { ciudad: "Cali" } }
  );
  console.log("✏️ Clientes actualizados:", res.modifiedCount);
}

async function eliminarCliente(nombre) {
  const db = await connectDB();
  const clientes = db.collection("clientes");
  const res = await clientes.deleteOne({ nombre });
  console.log("🗑️ Cliente eliminado:", res.deletedCount);
}

async function eliminarClientesPorCiudad(ciudad) {
  const db = await connectDB();
  const clientes = db.collection("clientes");
  const res = await clientes.deleteMany({ ciudad });
  console.log("🗑️ Clientes eliminados:", res.deletedCount);
}

async function main() {
  await consultarClientesMayores30();
  await actualizarCiudadCliente("Carlos", "Lima");
  await actualizarCiudadBogota();
  await eliminarCliente("Carlos");
  await eliminarClientesPorCiudad("Cali");
  await client.close();
}

main();
