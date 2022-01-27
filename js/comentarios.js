$(document).ready(function(){
  //CREO BOTON QUE SUBA LO ESCRITO
  let papa = document.getElementById('bloque_comentarios')

  let boton_submit = document.getElementById("boton_button");

  boton_submit.addEventListener("click",crear_array)

  if (localStorage.getItem('coleccion_comentarios') == null){
    localStorage.setItem('coleccion_comentarios','[]');
  }

  let comentarios_viejos = JSON.parse(localStorage.getItem('coleccion_comentarios'));

  function crear_array() {
    
    //NUEVOS COMENTARIOS
    if(document.getElementById('comentario_ind').value == ""){

      alert("Debes escribir un comentario para poder publicarlo.");

    }else{
      
      let comentarios_ind = document.getElementById ('comentario_ind').value;  

      let comentario1 = new Comentario(comentarios_ind);

      //vieja data
      comentarios_viejos.push(comentario1);

      localStorage.setItem('coleccion_comentarios',JSON.stringify(comentarios_viejos));

      //Borrar input ya publicado
      bloque_formulario.reset()

      //obtengo el ultimo comentario del array
      let commit_nuevo = comentarios_viejos[comentarios_viejos.length-1]

      let commit_viejos = comentarios_viejos

      //creo nuevos elementos del DOM
      if(commit_nuevo.texto != ""){
        
        let hijo_comentario = document.createElement('div');

        hijo_comentario.innerHTML = '<p>'+commit_nuevo.texto;

        papa.appendChild(hijo_comentario);

        hijo_comentario.className = "parrafo_comentario";

      }
    }
  }

  // VIEJOS COMENTARIOS
  for(const coment of comentarios_viejos){

    let hijo_viejo_comentario = document.createElement('div');

    hijo_viejo_comentario.innerHTML = '<p>'+coment.texto;

    papa.appendChild(hijo_viejo_comentario);

    hijo_viejo_comentario.className = "parrafo_comentario";

  }

  //TECLA ENTER DESACTIVADA

  $('DOMContentLoaded', () => {
    
    document.querySelectorAll('input[type=text]').forEach( node => node.addEventListener('keypress', e => {

      if(e.keyCode == 13) {

        e.preventDefault();

      }

    }))

  });

})