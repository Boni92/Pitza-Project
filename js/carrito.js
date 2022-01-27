$(document).ready(function(){

  // VARIABLES DEL MENU ESTABLECIDO
  const carrito = document.querySelector("#carrito");
  const contenedorCarrito = document.querySelector('#lista_carrito tbody')
  const listaPromos = document.querySelector("#lista_promos");
  const vaciarCarritBtn = document.querySelector('#vaciar_carrito');
  let productosCarrito = []; // array con las compras


  // VARIABLES DEL MENU PERSONALIZADO
  const listaPersonal = document.querySelector("#listaPersonal");
  let platoIndividual = [];


  window.onload = function(){
    vaciarCarritBtn.click()
  }
  
  // LLAMADOS POR CLICK
  cargarEventListeners()
  function cargarEventListeners(){
    // Cuando agregas aprentando "agregar carrito"
    $(listaPromos).on('click', agregarPedido);

    // Eliminar seleccion del carrito
    $(carrito).on('click', eliminarPedido);
    
    
    //Vaciar carrito
    $(vaciarCarritBtn).on('click', () => {

      productosCarrito = [] //reseteo el arreglo establecido

      platoIndividual = [] //reseteo el arreglo personalizado

      limpiarHTML()// limpio html

      sumarTotal()
    });


    // CUANDO AGREGO APRETANDO EL BOTON "AGREGAR AL PEDIDO"
    $(listaPersonal).on('click', agregarPedido);

    
  }

  // FUNCIONES 


  function agregarPedido(e){

    e.preventDefault();

    if(e.target.classList.contains('boton_agregar')){

      const seleccionado = e.target.parentElement.parentElement.parentElement

      leer_datos(seleccionado)
      sumarTotal()

    }else if(e.target.classList.contains('btn_menu_mas')){

      const seleccionado = e.target.parentElement.parentElement

      leer_datos_personal(seleccionado);
      sumarTotal()

    }else if(e.target.classList.contains('btn_menu_menos')){

      const seleccionado = e.target.parentElement.parentElement

      leer_datos_personal_menos(seleccionado);
      sumarTotal()

    }
    
  }

  // SUMO TODOS LOS PEDIDOS EN EL CARRITO
  function sumarTotal(){

    let total1 = 0
    for (const objeto of productosCarrito){

      p = objeto.precio 
      c = objeto.cantidad
      
      total1 += (parseInt(p)*c)

    }

    let total2 = 0
    for (const objeto of platoIndividual){

      p = objeto.costo 
      c = objeto.cantidad

      total2 += (parseInt(p)*c)

    }

    let totalCompra = total1+total2

    const row = document.createElement('tr');
      row.innerHTML=`
          <td class="fila_total">
            <hr>
            TOTAL:
          </td>
          <td class="fila_total" id="fila_total">
            <hr>
            $ ${totalCompra}
          </td>
          
          <td class="cruz">
            <div>
              <a href='#' class="borrar_seleccion" data-id=""> </a>
            </div>
          </td>
          `;
      // agregar en tbody
      contenedorCarrito.append(row);


      // agrego costo al modal
      const costoTotal = document.createElement('p');
      costoTotal.innerHTML= `${totalCompra}`
      $('#total_costo_numero').append(costoTotal) 

      costoTotal.className = "lista_costos"

      ultimo_costo()
      function ultimo_costo(){
        let padre = document.querySelector('#total_costo_numero');
        
        while (padre.childNodes.length > 1){
          padre.removeChild(padre.childNodes[0])
        }

      }

      // deshabilito boton si no hay costo total
      deshabilitar()

      function deshabilitar(){

        let boton_aceptar_pedido = document.getElementById('boton_aceptar')
        let padre_carrito = document.querySelector('#carrito table tbody')
        
        if(totalCompra == 0 || padre_carrito.innerHTML == ""){

          boton_aceptar_pedido.disabled = true

        }else{
          boton_aceptar_pedido.disabled = false
        }

      }

  }



  //ELIMINAR SELECCIONADOS DEL CARRITO
  function eliminarPedido(e){

    e.preventDefault();

    if(e.target.classList.contains('borrar_seleccion')){
      const idSeleccion = e.target.getAttribute('data-id');
      
      //elimina del arreglo productosCarrito por el data-id
      productosCarrito = productosCarrito.filter(seleccion => seleccion.id !== idSeleccion)

      carritoHTML() //vuelvo a iterar sobre el carrito y coloco en HTML

      sumarTotal()

    }
    if(e.target.classList.contains('borrar_seleccion2')){
      const idPersonal = e.target.getAttribute('id')

      platoIndividual = platoIndividual.filter(seleccion => seleccion.id !== idPersonal)

      carritoHTML() //vuelvo a iterar sobre el carrito y coloco en HTML

      sumarTotal()


      let valor = e.target.id
      let input = document.querySelector(`#${valor}`).parentElement
      let valorInput = input.querySelector('input')

      borrarInput()

      function borrarInput(){

        valorInput.value = 0

      }
    }
  }


  // LEE EL CONTENIDO DEL HTML CLICKEANDO Y EXTRAE LA INFORMACION
  function leer_datos(seleccion){

    // creo objeto con el contenido del item seleccionado

    const infoSeleccionado = {
      titulo: seleccion.querySelector('h3').textContent,
      precio: seleccion.querySelector('.boton_precio .precio p span').textContent,
      id: seleccion.querySelector('button').getAttribute('id'),
      cantidad: 1

    }

    // verifica cantidades repetidas
    const existe = productosCarrito.some( seleccion => seleccion.id === infoSeleccionado.id); //itero sobre el array para verificar duplicados
    
    if(existe){
      //actualizo cantidad
      const productos = productosCarrito.map( seleccion => {   //armo nuevo arreglo

          if(seleccion.id === infoSeleccionado.id ){

            seleccion.cantidad++;
            return seleccion; //retorno objeto actualizado

          }else{
            return seleccion; //retorna los objetos NO duplicados
          }
      })
      productosCarrito = [...productos];
    }else{
      // agregar elementos al array de carrito
      productosCarrito = [...productosCarrito, infoSeleccionado];
    }

    carritoHTML()
  }

  function leer_datos_personal(seleccion){

      const infoPizzas = {
        titulo: seleccion.getAttribute('id'),
        costo: seleccion.querySelector('p span').textContent,
        id: seleccion.querySelector('p').getAttribute('id'),
        cantidad: seleccion.querySelector('div input').value
      }
    
      // verifica cantidades repetidas
    const existe = platoIndividual.some( seleccion => seleccion.id === infoPizzas.id); //itero sobre el array para verificar duplicados
    
    if(existe){
      //actualizo cantidad
      const productos = platoIndividual.map( seleccion => {   //armo nuevo arreglo

          if(seleccion.id === infoPizzas.id ){

            seleccion.cantidad++;
            return seleccion; //retorno objeto actualizado

          }else{
            return seleccion; //retorna los objetos NO duplicados
          }
      })
      platoIndividual = [...productos];
    }else{
      // agregar elementos al array de carrito
      platoIndividual = [...platoIndividual, infoPizzas];
    }

    carritoHTML()

  }

  function leer_datos_personal_menos(seleccion){

    const infoPizzas = {
      titulo: seleccion.getAttribute('id'),
      costo: seleccion.querySelector('p span').textContent,
      id: seleccion.querySelector('p').getAttribute('id'),
      cantidad: seleccion.querySelector('div input').value
    }


    // verifica cantidades repetidas
    const existe = platoIndividual.some( seleccion => seleccion.id === infoPizzas.id); //itero sobre el array para verificar duplicados

    if(existe){
      //actualizo cantidad
      const productos = platoIndividual.map( seleccion => {   //armo nuevo arreglo

          if(seleccion.id === infoPizzas.id ){

            seleccion.cantidad--;
            return seleccion; //retorno objeto actualizado

          }else{
            return seleccion; //retorna los objetos NO duplicados
          }
      })
      platoIndividual = [...productos];
    }else{
      // agregar elementos al array de carrito
      platoIndividual = [...platoIndividual, infoPizzas];
    }


    carritoHTML()

  }
  // muestro carrito en HTML
  function carritoHTML(){

    // limpiar html

    limpiarHTML();


    // RECORRO EL CARRITO Y GENERO HTML EN MENU ESTABLECIDO
    productosCarrito.forEach(seleccion => {

      const row = document.createElement('tr');
      row.innerHTML=`

          <td>
            ${seleccion.titulo}
          </td>
          <td>
            ${seleccion.precio}
          </td>
          <td>
            ${seleccion.cantidad}
          </td>
          <td class="cruz">
            <div class="div_cruz">
              <a href='#' class="borrar_seleccion" data-id="${seleccion.id}"> X </a>
            </div>
          </td>
          `;
      // agregar en tbody

      contenedorCarrito.append(row);

    })


    // RECORRO EL CARRITO Y GENERO HTML EN MENU PERSONALIZADO

    platoIndividual.forEach(seleccion => {
      const fila = document.createElement('tr');
      fila.innerHTML=`
          <td>
            ${seleccion.titulo}
          </td>
          <td>
            ${seleccion.costo}
          </td>
          <td class="cantidad">
            ${seleccion.cantidad}
          </td>
          <td class="cruz">
            <div class="div_cruz">
              <a href='#' class="borrar_seleccion2" id="${seleccion.id}"> X </a>
            </div>
          </td>
      `;

      // agregar en tbody
      contenedorCarrito.append(fila);
    
      // ELIMINAR FILA CON CANTIDAD = 0

        let a = document.querySelector(`#${seleccion.id}`)

        let b = a.parentElement.parentElement.parentElement

        let c = b.querySelector('tr .div_cruz .borrar_seleccion2')

        if(seleccion.cantidad == 0){

          // remuevo del arreglo

          b.remove()

          const idPersonal = c.getAttribute('id');

          platoIndividual = platoIndividual.filter(seleccion => seleccion.id !== idPersonal)

        }
      
    })
    
  }

  // ELIMINAR PRODUCTOS REPETIDOS DEL TBODY
  function limpiarHTML(){

    while(contenedorCarrito.firstChild){

      contenedorCarrito.removeChild(contenedorCarrito.firstChild);

    }

  }

})