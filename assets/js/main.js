const nuevoPresupuesto = new Presupuesto();

window.onload = () =>{    
    
    const presupuestoFormulario = document.getElementById("presupuesto-form");
    const presupuestoMonto = presupuestoFormulario.querySelector("#presupuesto-monto");
    const presupuestoGuardar = presupuestoFormulario.querySelector("#presupuesto-boton");
    
    const gastosFormulario = document.getElementById("gastos-form");
    const gastosId = gastosFormulario.querySelector("#gastos-id");
    const gastosNombre = gastosFormulario.querySelector("#gastos-nombre");
    const gastosMonto = gastosFormulario.querySelector("#gastos-monto");
    const gastosGuardar = gastosFormulario.querySelector("#gastos-guardar");
    const gastosActualizar = gastosFormulario.querySelector("#gastos-actualizar");

    const presupuestoTotalTabla = document.getElementById("presupuesto-total");
    const gastosTotalTabla = document.getElementById("gastos-total");
    const diferenciaTotalTabla = document.getElementById("diferencia-total");
    
    const gastosTabla = document.getElementById("compras-listado");

    /*renderizarTotales
     * Suma los presupuestos, gastos y calcula la diferencia entre ellos.
     * Renderiza los totales en la tabla de totales.
     */
    function renderizarTotales(){
        const totalPresupuesto = nuevoPresupuesto.sumarPresupuesto();
        const totalGastos = nuevoPresupuesto.sumarGastos();
        const diferencia = nuevoPresupuesto.calcularDiferencia();
        presupuestoTotalTabla.textContent = totalPresupuesto 
        gastosTotalTabla.textContent = totalGastos;
        diferenciaTotalTabla.textContent = diferencia
        return console.log("renderizarTotales()::: OK")
    };
    /*renderizarCompra()
     * Lista todas las compras almacenadas en nuevoPresupuesto.listaGastos[]
     * Usando createElement:
     * - tr con id = gasto.id
     * - td's con nombre,monto, y acciones borrar y editar
     * botonBorrar()
     * - Busca el gasto dentro de nuevoPresupuesto.listaGastos[id]
     * - Borra el gasto dentro de listaGastos y el elemento tr del DOM
     * botonEditar()
     * - Captura el id del tr contenido, usando el metodo buscarGasto(id) compruebo que existe
     * - Si es encontrado, captura tales datos y los renderiza en los input de gastos, junto con el id
     */
    function renderizarCompras(){
        gastosTabla.innerHTML="";
        const listado = nuevoPresupuesto.listaGastos;
        listado.forEach( gasto => {
            let id = gasto.id;
            let nombre = gasto.nombre;
            let monto = gasto.monto;
            //row con id 
            const trFila = document.createElement("tr")
            trFila.setAttribute('id', id);
            //td nombre
            const tdNombre = document.createElement("td");
            tdNombre.textContent = nombre;
            trFila.appendChild(tdNombre);
            //td monto
            const tdMonto = document.createElement("td");
            tdMonto.textContent = monto;
            trFila.appendChild(tdMonto);
            //td acciones
            const tdAcciones = document.createElement("td");
            //botonBorrar
            const botonBorrar = document.createElement("button");
            botonBorrar.textContent = "Borrar";
            botonBorrar.setAttribute("id",`borrar-id-${id}`)
            botonBorrar.classList.add( "btn", "btn-danger", "btn-sm","m-1", "boton-borrar");
            //botonBorrar.addeventListener
            botonBorrar.addEventListener("click", (event) => {
                event.preventDefault();
                let respuesta = nuevoPresupuesto.eliminarGasto(id);
                if(respuesta !== -1){
                    trFila.remove();
                }else{
                    console.log("eliminarGasto()::: NO ENCONTRADO") 
                }
                renderizarTotales();
                return console.log("botonBorrar::: OK")
            });
            tdAcciones.appendChild(botonBorrar);
            //botonEditar
            const botonEditar = document.createElement("button");
            botonEditar.textContent = "Editar";
            botonEditar.classList.add("btn", "btn-success", "btn-sm","m-1","boton-editar");
            //botonEditar.addeventListener

            const manejadorEditar =(evento)=>{
                evento.preventDefault();
                let row = evento.target.closest("tr");
                let id = parseInt(row.id)
                let gastoEncontrado = nuevoPresupuesto.buscarGasto(id)
                if(gastoEncontrado == null){
                    return console.log("buscarGasto()::: NO ENCONTRADO")
                }
                
                console.log("buscarGasto()::: " + JSON.stringify(gastoEncontrado));
                
                let nombre = gastoEncontrado.nombre;
                let monto = gastoEncontrado.monto;
                gastosId.value = id;
                gastosNombre.value = nombre;
                gastosMonto.value = monto;
                mostrarOcultarActualizar(event);
                return console.log('botonEditar::: OK');
            }
            
            botonEditar.addEventListener("click",evento => manejadorEditar(evento) )

            /*
            botonEditar.addEventListener("click", (event) => {
                event.preventDefault();
                const tr = event.target.closest("tr");
                let id = parseInt(tr.getAttribute("id") );
                let gastoEncontrado = nuevoPresupuesto.buscarGasto(id)                
                if(gastoEncontrado == null){
                    return console.log("buscarGasto()::: NO ENCONTRADO")
                }

                console.log("buscarGasto()::: " + JSON.stringify(gastoEncontrado));
                
                let nombre = gastoEncontrado.nombre;
                let monto = gastoEncontrado.monto;
                gastosId.value = id;
                gastosNombre.value = nombre;
                gastosMonto.value = monto;
                mostrarOcultarActualizar(event);
                return console.log('botonEditar::: OK');
            });
            */

            // end botonEditar
            //agrego el botonEditar a tdAcciones
            tdAcciones.appendChild(botonEditar);

            trFila.appendChild(tdAcciones)
            gastosTabla.appendChild(trFila)
            console.log("renderizarCompra()::: OK")

        })
    };
    /*limpiarInput()
     * Captura todos los input del DOM y los inicializa en = ''
     */
    function limpiarInput(){
        const input = document.querySelectorAll('input')
        input.forEach( (elemento) => {
            elemento.value = "";
        })
        return console.log("limpiarInput()::: OK")
    };
    /*mostrarOcultarActualizar(event)
     * Evalua si está siendo invocada desde editar o no.
     * Si es asi, permite actualizar valores.
     * Si no, devuelve los input y botones por defecto.
     */
    function mostrarOcultarActualizar(event){
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
    /*presupuestoGuardar.addEventListener()
     * guarda los valores ingresados en el input de presupuesto
     */
    presupuestoGuardar.addEventListener("click", event => {
        event.preventDefault();
        let monto = presupuestoMonto.value
        monto = parseInt(monto)
        if( isNaN(monto) ){
            return console.log('monto en Gasto con valor erroneo::: ' + monto);
        }
        montoAgregado = nuevoPresupuesto.agregarPresupuesto(monto);
        totalPresupuesto = nuevoPresupuesto.sumarPresupuesto();
        nuevoPresupuesto.ultimoPresupuestoTotal = totalPresupuesto;
        renderizarTotales();
        limpiarInput();
        return console.log(`presupuestoGuardar::: OK`)
    });
    /*gastosGuardar.addEventListener()
     * guarda los valores ingresados en los input de gastos
     */
    gastosGuardar.addEventListener("click", event => {
        event.preventDefault();
        let nombre = gastosNombre
        let monto = gastosMonto;
        nombre = String(nombre.value);
        monto = parseInt(monto.value);
        if( isNaN(monto) || nombre.trim() == null) {
            return console.log('Nombre y/o Monto en Gasto con valor erroneo');
        }
        gastoAgregado = nuevoPresupuesto.agregarGasto(nombre,monto);
        limpiarInput()
        renderizarTotales();
        renderizarCompras();
        return console.log(`gastosGuardar::: OK`)
    });
    /*gastosActualizar.addEventListener()
     * guarda los valores de los input ingresados en gastos, cuando se van a editar los ya ingresados.
     */
    gastosActualizar.addEventListener("click", event => {
        event.preventDefault();
        let id = gastosId.value
        let nombre = gastosNombre.value
        let monto = gastosMonto.value;
        if ( isNaN(monto) || (nombre.trim() === "") ){
            return console.log('valores invalidos en input nombre y/o monto.')
        }
        const gasto = {
            id : id,
            nombre : nombre,
            monto : parseInt(monto)
        }
        let gastoActualizado = nuevoPresupuesto.actualizarGasto(gasto);
        if(gastoActualizado == null){
            return console.log("error no encontrado en actualizarGasto")
        }
        limpiarInput()
        renderizarCompras();
        renderizarTotales();
        mostrarOcultarActualizar(event)
        return console.log("gastoActualizado::: " + JSON.stringify(gastoActualizado))
    });
};
