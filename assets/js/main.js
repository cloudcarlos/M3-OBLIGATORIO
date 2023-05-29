const presupuesto = new Presupuesto();

window.onload = () =>{    
    
    // Saldos Formulario
    const saldosFormulario = document.getElementById("presupuesto-form");
    const saldosMonto = saldosFormulario.querySelector("#presupuesto-monto");
    const saldosGuardar = saldosFormulario.querySelector("#presupuesto-boton");
    
    // Gastos Formulario
    const gastosFormulario = document.getElementById("gastos-form");
    const gastosId = gastosFormulario.querySelector("#gastos-id");
    const gastosNombre = gastosFormulario.querySelector("#gastos-nombre");
    const gastosMonto = gastosFormulario.querySelector("#gastos-monto");
    const gastosGuardar = gastosFormulario.querySelector("#gastos-guardar");
    const gastosActualizar = gastosFormulario.querySelector("#gastos-actualizar");

    // Tabla Totales
    const saldosTotalTabla = document.getElementById("presupuesto-total");
    const gastosTotalTabla = document.getElementById("gastos-total");
    const diferenciaTotalTabla = document.getElementById("diferencia-total");
    
    // Tabla Gastos 
    const gastosTabla = document.getElementById("compras-listado");

    const renderizarTotales =()=> {
        const totalSaldos = presupuesto.calcularTotalSaldos();
        const totalGastos = presupuesto.calcularTotalGastos();
        const diferencia = presupuesto.calcularDiferencia();
        saldosTotalTabla.textContent = totalSaldos 
        gastosTotalTabla.textContent = totalGastos;
        diferenciaTotalTabla.textContent = diferencia
        return console.log("renderizarTotales()::: OK")
    };

    //contenedorBotones evalua si el click viene del botonBorrar o editar
    gastosTabla.addEventListener("click", event => {
        if (event.target.classList.contains("boton-borrar")) {
            event.preventDefault();
            const tr = event.target.closest("tr");
            const id = tr.id;

            let respuesta = presupuesto.borrarGasto(id);
            if (respuesta) {
                tr.remove();
                renderizarTotales();
                return console.log("botonBorrar::: OK");
            } else {
                return console.log("borrarBorrar()::: ERROR");
            }
        } else if (event.target.classList.contains("boton-editar")) {
            event.preventDefault();
            const tr = event.target.closest("tr");
            const id = tr.id;
            console.log(id)
            let gastoEncontrado = presupuesto.gastos.has(id);
            console.log(gastoEncontrado)
                try{    
                    let nombre = gastoEncontrado.nombre;
                    let monto = gastoEncontrado.monto;
                    limpiarInput()
                    gastosId.value = id;
                    gastosNombre.value = nombre;
                    gastosMonto.value = monto;
                    manejadorGuardarActualizar(event);
                    return console.log("botonEditar::: OK");
                }catch(event){
                    return console.error(error);
                }
            
        }
    });

    saldosGuardar.addEventListener("click", event => {
        event.preventDefault();
        let monto = saldosMonto.value
        monto = parseInt(monto)
        if( isNaN(monto) ){
            return console.log('El monto del saldo debe ser mayor a 0.');
        }
        let montoAgregado = presupuesto.agregarSaldos(monto);
        if (montoAgregado) {
            try{
                renderizarTotales();
                limpiarInput();
                return console.log(`saldoGuardar()::: OK`)
            } catch(error){
                return console.error(error)
            }
        }
    });

    gastosGuardar.addEventListener("click", event => {
        event.preventDefault();
        let nombre = gastosNombre.value
        let monto = parseInt(gastosMonto.value)
        if( isNaN(monto) || nombre.trim().length === 0) {
            return console.log('Nombre y/o Monto en Gasto con valor erroneo');
        }
        gastoAgregado = presupuesto.agregarGasto(nombre,monto);
        console.log(gastoAgregado)
        if (gastoAgregado){
            try{
                renderizarTotales();
                renderizarGasto(gastoAgregado);
                limpiarInput()
                return console.log(`gastosGuardar::: OK`)
            } catch(error){
                return console.error(error)
            }
        }
    });

    gastosActualizar.addEventListener("click", event =>{
        event.preventDefault();
        let id = gastosId.value
        let nombre = gastosNombre.value
        let monto = parseInt(gastosMonto.value)
        if( isNaN(monto) || nombre.trim().length === 0) {
            return console.log('Nombre y/o Monto en Gasto con valor erroneo');
        }
        let gastoActualizado = presupuesto.actualizarGasto(id,nombre,monto);
        if (gastoActualizado){
            try{
                renderizarTotales();
                renderizarGasto(gastoActualizado);
                limpiarInput();
                manejadorGuardarActualizar(event)
                return console.log(`gastosActualizar::: OK`)
            } catch(error){
                return console.error(error);
            }
        }    
    })

    const renderizarGasto =(gasto)=> {

        const id = gasto.id
        const nombre = gasto.nombre
        const monto = gasto.monto
        
        //row con id 
        const tr = document.createElement("tr")
        tr.setAttribute('id', id);
        
        //td nombre
        const tdNombre = document.createElement("td");
        tdNombre.textContent = nombre;
        tr.appendChild(tdNombre);
        
        //td monto
        const tdMonto = document.createElement("td");
        tdMonto.textContent = monto;
        tr.appendChild(tdMonto);
        
        //td acciones
        const tdAcciones = document.createElement("td");
        
        //botonBorrar
        const borrar = document.createElement("button");
        borrar.textContent = "Borrar";
        borrar.classList.add(
            "btn","btn-danger","btn-sm",
            "m-1", "boton-borrar"
        );    
        tdAcciones.appendChild(borrar);
        
        //botonEditar
        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.classList.add(
            "btn", "btn-success", "btn-sm",
            "m-1","boton-editar"
        );
        tdAcciones.appendChild(editar);

        tr.appendChild(tdAcciones)
        gastosTabla.appendChild(tr)
        console.log("renderizarGasto()::: OK")

    };

    const limpiarInput =()=> {
        const input = document.querySelectorAll('input')
        input.forEach( (elemento) => {
            elemento.value = "";
        })
        return console.log("limpiarInput()::: OK")
    };

    const manejadorGuardarActualizar =(event)=> {
        if(event.target.classList.contains("boton-editar")){
            gastosId.parentElement.classList.remove("d-none")
            gastosGuardar.parentElement.classList.add("d-none");
            gastosGuardar.disabled = true;
            gastosActualizar.parentElement.classList.remove("d-none")
            gastosActualizar.disabled = false;
        }
        else{
            gastosId.parentElement.classList.add("d-none")
            gastosGuardar.parentElement.classList.remove("d-none");
            gastosGuardar.disabled = false;
            gastosActualizar.parentElement.classList.add("d-none")
            gastosActualizar.disabled = true;
        }
        
    };

}