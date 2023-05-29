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
        const id = this.contadorId; 
        const nuevoGasto = { nombre, monto };
        this.gastos.set(id, nuevoGasto);
        this.contadorId++;
        return this.gastos.get(id)
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
    actualizarGasto(id, nombre, nuevoMonto) {
        if (this.gastos.has(id)) {
            const gastoExistente = this.gastos.get(id);
            gastoExistente.nombre = nombre;
            gastoExistente.monto = nuevoMonto;
            return gastoExistente;
        }
        return null
    }   
    borrarGasto(id) {
        if (!this.gastos.has(id)) {
            throw new Error('El gasto con el ID especificado no existe.');
        }
        this.gastos.delete(id);
        return true;
    }
}