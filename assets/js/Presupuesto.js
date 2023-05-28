/**
 * Clase Presupuesto
 * - almacena los valores ingresados a PRESUPUESTO APP
 * - metodos similares a un CRUD
 * - propiedad ultimoIdGasto permite manipular cada gasto por si ID
 */

class Presupuesto{
    constructor(){
        this.presupuestoTotal = [];
        this.listaGastos = [];
        this.ultimoPresupuestoTotal = 0;
        this.ultimoGastoTotal = 0
        this.ultimaDiferenciaTotal = 0
        this.ultimoIdGasto = 0
    }
    agregarPresupuesto(monto){
        if (monto >= 0){
            this.presupuestoTotal.push(monto);
            return monto;
        }
        return NaN;
    }
    sumarPresupuesto(arr = this.presupuestoTotal) {
        const sumaPresupuesto = arr.reduce((total, monto) => total + monto, 0);
        this.ultimoPresupuestoTotal = parseInt(sumaPresupuesto);
        return parseInt(sumaPresupuesto);
    }
    agregarGasto(nombre,monto){
        if(nombre.length > 0 && monto >= 0){
            const gasto = {
                id: this.ultimoIdGasto,
                nombre: nombre,
                monto: monto
            }
            this.ultimoIdGasto++;
            this.listaGastos.push(gasto);
            return gasto;
        }
        return null;
    }
    sumarGastos(arr = this.listaGastos){
        const sumaMontos = arr.reduce((total, gasto) => total + gasto.monto, 0);
        this.ultimoGastoTotal = parseInt(sumaMontos)
        return parseInt(sumaMontos)
    }
    calcularDiferencia(presupuesto = this.ultimoPresupuestoTotal, gastos = this.ultimoGastoTotal ){
        const diferencia = presupuesto - gastos;
        this.ultimaDiferenciaTotal = diferencia
        return parseInt(diferencia)
    }
    buscarGasto(id) {
        const gastoEncontrado = this.listaGastos.find(gasto => gasto.id === id);
        if (gastoEncontrado) {
            return gastoEncontrado;
        } else {
            return null;
        }
    }
    actualizarGasto(gasto){
        let id= parseInt(gasto.id)
        const gastoEncontrado = this.buscarGasto(id);
        if (gasto.id == gastoEncontrado.id ) {
            let id = gastoEncontrado.id
            this.listaGastos[id] = gasto
            return gasto;
        }
        return null;  
    }
    eliminarGasto(id) {
        let indiceGasto = this.buscarGasto(id);
        if (indiceGasto.id !== -1) {
            this.listaGastos.splice(indiceGasto, 1);
            return indiceGasto;
        } 
        return -1;
    }
}

