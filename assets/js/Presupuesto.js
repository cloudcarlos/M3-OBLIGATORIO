/**
 * Clase Presupuesto
 * - almacena los valores ingresados a PRESUPUESTO APP
 * - cada ingreso de saldo o gasto queda almacenado en un objeto map
 * - metodos similares a un CRUD
 * - 
 */

class Presupuesto{
    constructor(){
        this.saldos = new Map();
        this.gastos = new Map();
        this.contadorGastos = 1
    }
    agregarSaldos(monto) {
        if (typeof monto !== 'number' || monto <= 0) {
            throw new Error('El monto del saldo debe ser mayor a 0.');
        }
        let id = this.saldos.size + 1
        this.saldos.set(id, { monto });
        return true
    }

    agregarGasto(nombre, monto) {
        if (typeof monto !== 'number' || monto <= 0) {
            throw new Error('El monto del gasto debe ser MAYOR A ');
        }
        if (typeof nombre !== 'string' || nombre.trim().length === 0) {
            throw new Error('El nombre del gasto NO PUEDE ESTAR VACIO.');
        }
        const id = this.contadorGastos; 
        const nuevoGasto = { nombre, monto };
        this.gastos.set(id, nuevoGasto);
        let gastoARenderizar = this.buscarGasto(id)
        this.contadorGastos++;
        return gastoARenderizar
    }
    
    calcularTotalSaldos() {
        let totalSaldos = 0;
        for (const saldos of this.saldos.values()) {
            totalSaldos += saldos.monto;
        }
        return totalSaldos;
    }
    calcularTotalGastos() {
        let totalGastos = 0;
        for (const gasto of this.gastos.values()) {
            totalGastos += gasto.monto;
        }
        return totalGastos;
    }
    calcularDiferencia() {
        const totalSaldos = this.calcularTotalSaldos();
        const totalGastos = this.calcularTotalGastos();
        return totalSaldos - totalGastos;
    }
    buscarGasto(id){
        for (let [clave,valor] of this.gastos.entries()){
            if (clave == id) {
                console.log(`buscarGasto => clave ${clave} // valor ${valor}`)
                return [clave,valor]
            }
        }
        return false
    }
    actualizarGasto(id, nombre, nuevoMonto) {
        console.log("actualizarGasto ID: "+ id)
        id = parseInt(id);
        console.log(this.gastos) 

        if (!this.gastos.has(id)) {
            throw new Error('El gasto con el ID especificado no existe.');
        }
        const gastoExistente = this.gastos.get(id);
        gastoExistente.nombre = nombre;
        gastoExistente.monto = nuevoMonto;
        let gastoARenderizar = this.buscarGasto(id)
        return gastoARenderizar;
    }
    borrarGasto(id) {
        console.log("borrarGasto ID: "+id)
        if (!this.gastos.has(id)) {
            throw new Error('El gasto con el ID especificado no existe.');
        }
        this.gastos.delete(id);
        return true;
    }
}