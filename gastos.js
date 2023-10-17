import fs from "fs"
import * as commander from "commander"

// Crear una instancia de commander
const program = new commander.Command()

// Cargar gastos existentes desde el archivo JSON
let gastos = cargarGastos()

// Función para cargar gastos desde el archivo JSON
function cargarGastos() {
	try {
		const data = fs.readFileSync("gastos.json", "utf8")
		return JSON.parse(data)
	} catch (error) {
		return []
	}
}

// Definir la versión de la aplicación
program.version("1.0.0")

// Comando para agregar un gasto
program
	.command("add <Descripcion-Gato> <Monto>")
	.description("Agrega un gasto")
	.action((nombre, monto) => {
		const fechaHora = new Date()
		gastos.push({
			nombre,
			monto: parseFloat(monto),
			fecha: fechaHora.toISOString(),
		})
		guardarGastos()
		console.log("Gasto agregado con éxito.")
	})

// Comando para listar todos los gastos
program
	.command("list")
	.description("Lista todos los gastos")
	.action(() => {
		console.log("Lista de Gastos:")
		gastos.forEach((gasto, index) => {
			console.log(
				`${index + 1}. Nombre: ${gasto.nombre}, Monto: ${gasto.monto}`
			)
		})
	})

// Comando para guardar los gastos en un archivo JSON
function guardarGastos() {
	fs.writeFileSync("gastos.json", JSON.stringify(gastos, null, 2))
}

program.parse(process.argv)
