$(document).ready(function(){

  $("#pitza").fadeIn(3000);

  $(function(){

    $('#categorias').hide();

    $(window).scroll(function(){

      if($(this).scrollTop() > 300){
        
        $('#categorias').slideDown("slow");

      }
    })

  })
  
  $(function(){

    $(window).scroll(function(){

        if($(this).scrollTop() > 700){
  
          $('.aparecer1').css({
            'opacity':'1',
            "transition": "all 1s",
            'delay': "2s"
          })
  
        }
    })
  })
  $(function(){

    $(window).scroll(function(){

        if($(this).scrollTop() > 1100){
  
          $('.aparecer2').css({
            'opacity':'1',
            "transition": "all 1s",
            'delay': "2s"
          })
  
        }
    })
  })
  $(function(){

    $(window).scroll(function(){

        if($(this).scrollTop() > 1600){
  
          $('.aparecer3').css({
            'opacity':'1',
            "transition": "all 1s",
            'delay': "2s"
          })
  
        }
    })
  })

  // ===========MENU===================
  $("#bloque_menu").css({

    'heigth':'auto',
    'margin':'auto',
    'padding':'1vw 0 1vw 0',
    'border-radius':'20px',
    
  })
  
  $(".bloque_menu_pizzas").css('margin-bottom', '20px')

  $(".bloque_menu_pizzas, .bloque_menu_empanadas").css({

    'margin':'0vw',
    'font-size':'2rem',
    'margin-bottom': '0vw'

  })

  $(".btn_menu_mas").css({

    "border-top-left-radius": "20px",
    "border-bottom-left-radius": "20px",
    
  })
  $(".btn_menu_menos").css({

    "border-bottom-right-radius": "20px",
    "border-top-right-radius": "20px",
    
  })

  $(".btn_menu_mas,.btn_menu_menos").css({

    "border" : "none",
    "font-size" : "2vw",
    'background-color' : 'rgba(211, 122, 21, 0.615)',
    "height":"100%",

    "display":"flex",
    "flex-direction": "row",
    "align-items":"center",
    "justify-content": "center"

  })

  let boton_incremento = $(".inc");
  let boton_decremento = $(".dec");

  for(let i=0; i<boton_incremento.length;i++){

    let boton = boton_incremento[i];

    $(boton).on("click", function(e){

      let boton_apretado = e.target;
      let input = boton_apretado.parentElement.children[1];
      let valor_input = input.value;
      let valor_nuevo = parseInt(valor_input) + 1;

      input.value = valor_nuevo
    })
  }

  for(let i=0; i<boton_decremento.length;i++){

    let boton = boton_decremento[i];

    $(boton).on("click", function(e){

      let boton_apretado = e.target;
      let input = boton_apretado.parentElement.children[1];
      let valor_input = input.value;
      let valor_nuevo = parseInt(valor_input) - 1;
      
      if(valor_nuevo >= 0){

        input.value = valor_nuevo
        
      }else{

        input.value = 0
        
      }
    })
  }

  let input_nombre = document.querySelector('#input_nombre');
  let input_direccion = document.querySelector('#input_direccion');
  let input_celular = document.querySelector('#input_celular');
  let input_pago_e = document.querySelector('#efectivo');
  let input_pago_m = document.querySelector('#mercadoPago');

  if (localStorage.getItem('pedido') == null){
    localStorage.setItem('pedido','[]');
  }

  $("#button_confirmado").on("click",function(){

    if(input_nombre.value !== "" & input_celular.value !== "" & input_direccion.value !== "" & (input_pago_e.checked || input_pago_m.checked)){
  
      // GUARDO LOS PEDIDOS EN LOCALSTORAGE y ENVIO A BASE DE DATOS

      const APIURL2 = 'https://my-json-server.typicode.com/Boni92/demoServerDos/pedidos' ; 

      if(input_pago_e.checked){
        let pago = input_pago_e.id

        let pedido_nuevo = new Pedido (input_nombre.value, input_celular.value, input_direccion.value, pago);
  
        //ENVÍO A LOCAL STORAGE
        let lista_pedidosJSON = JSON.parse(localStorage.getItem('pedido'));

        lista_pedidosJSON.push(pedido_nuevo)

        localStorage.setItem('pedido',JSON.stringify(lista_pedidosJSON))

        // ENVÍO A BASE DE DATOS
        
        $.ajax({
          type: 'POST',
          url: APIURL2,
          data: pedido_nuevo,
          success: function(){
            
              console.log("Nuevo pedido Subido");
          
          },
          error: function(){
            console.log('error al subir los datos')
          }
        })

         

      }else if(input_pago_m.checked){
        let pago = input_pago_m.id

        let pedido_nuevo = new Pedido (input_nombre.value, input_celular.value, input_direccion.value, pago);
  
        let lista_pedidosJSON = JSON.parse(localStorage.getItem('pedido'));

        lista_pedidosJSON.push(pedido_nuevo)

        localStorage.setItem('pedido',JSON.stringify(lista_pedidosJSON))

        // ENVÍO A BASE DE DATOS
        
        $.ajax({
          type: 'POST',
          url: APIURL2,
          data: pedido_nuevo,
          success: function(){
            
              console.log("Nuevo pedido Subido");
          
          },
          error: function(){
            console.log('error al subir los datos')
          }
        })

      }

       
      

      // ALERTA DE CONFIRMACION
      swal({
        title: `${input_nombre.value}`+ ", tu pedido está confirmado!",
        text: "A continuación volverá a la pagina principal.",
        icon: "success",
        buttons: {
          cancel: false,
          confirm: true,
          // cancel: {
          //   text: "Cancelar",
          //   value: null,
          //   visible: true,
          //   className: "cancelarPedido",
          //   closeModal: true,
          // },
          confirm: {
            text: "Continuar",
            value: true,
            visible: true,
            className: "continuarPedido",
            closeModal: true
          }
        },
        closeOnConfirm: false,
        // closeOnCancel: true,
        closeOnClickOutside: false,
      }).then(function(confirmar) {

          if (confirmar) {
            window.location= "index.html"
          }
      });

    }else{
      alert("Debes completar los campos para efectuar la compra.")
    }
  })

  
    
  $("#boton_menu_esconder").on("click",function(){
    
    $('.bloque_menu_pizzas, .bloque_menu_empanadas').fadeOut(500);
    $('#bloque_menu').slideUp(1000);
    


  })

  $("#boton_menu_ver").on("click",function(){
    
    $('.bloque_menu_pizzas, .bloque_menu_empanadas').fadeIn(3000);
    $('#bloque_menu').slideDown(1000)
    

  })
  
  $("#boton_dato").on("click",function(){

    $('#datos').append(`
      <div id="pizza_de_la_semana"> 
        <p id="nombre_pizza"> La Fugazzeta es la pizza de la semana!<p>
        <img id="imagen_pizza" src="https://cloudfront-us-east-1.images.arcpublishing.com/radiomitre/WBWOW64C2VCHZM7IDHWIH5UBQE.jpg">
      </div>`
    ),
    $("#imagen_pizza").animate({ "width": '40vw',
                                'height': '28vw',
                                'border-radius': '25px',},
                                "slow",
                                function(){
                                $("#boton_dato").hide("slow");
                                }
                              )
                      .delay(4000)
                      .animate({"width": '5vw',
                                'height': '1vw',
                                'border-radius': '45px',},
                                "slow",
                                function(){
                                $("#boton_dato").show();
                                $("#pizza_de_la_semana").fadeOut(500);
                                $("#pizza_de_la_semana").remove()
                                }

                      )
  })


  // ==========PATROCINADORES==============

  $(".cartel").on('dblclick', function(){

    $("#mano").css('display','none');
    $("#cartel_p").css('display','none');
    
    setTimeout(() => {
      $(this).css({

        "background": "black",
        "background-size": "contain",
        "background-position": "center",
        "background-repeat": "no-repeat",
      })
    }, 0);

    setTimeout(() => {
      $(this).css({

        "background": "url('../public/imgs/patrocinadores/rappi.png')",
        "background-size": "contain",
        "background-position": "center",
        "background-repeat": "no-repeat",
      })
    }, 2000);

    setTimeout(() => {
      $(this).css({

        "background": "url('../public/imgs/patrocinadores/glovo.jpg')",
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat",
      })
    }, 4000);

    setTimeout(() => {
      $(this).trigger("dblclick")
    }, 6000);
  })


  $(function(){
    $(".cartel").hover(function(){

      $(this).css({"transform":'scale(1.1)'})}, 

    function(){

      $(this).css({"transform":'scale(0.9)'})}
    )
  })


// ==========COMUNIDAD - AJAX===============

  const APIURL1 = 'https://my-json-server.typicode.com/Boni92/demoServer/datos' ; 


    $(function(){

      let $lista_usuarios = $('#lista_usuarios')

      let $nombre = $('#nombre_ser_parte');
      let $profesion = $('#profesion_ser_parte');

      function agregar_usuario(user){
        $lista_usuarios.append('<li>'+user.nombre+' - '+user.profesion+'</li>')
      }
      // Ver usuarios antiguos
      $("#btn_usuarios").click(() => {

        $.ajax({
          type: 'GET',
          url: APIURL1,
          success: function(usuario_x){
            $.each(usuario_x,function(i,dato){
              agregar_usuario(dato)
              
            })
          },
          error: function(){
            alert('error al cargar los datos')
          }
        })
      
        $("#btn_usuarios").hide()
        
      })

      // agregar nuevos usuarios


      $("#btn_ser_parte").click(() => {

          let order = { nombre: $nombre.val(),
                        profesion: $profesion.val(),
                      }
          if (document.getElementById('nombre_ser_parte').value == "" || document.getElementById('profesion_ser_parte').value == ""){
            
            alert("Debes completar los datos requeridos.");

          }else {

            $.ajax({
              type: 'POST',
              url: APIURL1,
              data: order,
              success: function(nuevoUsuario){
                
                  agregar_usuario(nuevoUsuario);
              
              },
              error: function(){
                alert('error al subir los datos')
              }
            })

          }
          function limpiar(){
            usuarios_nuevos.reset()
          }
          limpiar()

          

      })
    })
  
// ========MEDIAQUERY

  $(window).resize(function() {
    var width = $(window).width();
    if (width < 500){

      $('#categorias').show();
      $(function(){

        $(window).scroll(function(){
    
            if($(this).scrollTop() > 1){
      
              $('.aparecer1').css({
                'opacity':'1',
                "transition": "all 1s",
              })
      
            }
        })
      })
      $(function(){

        $(window).scroll(function(){
    
            if($(this).scrollTop() > 1){
      
              $('.aparecer2').css({
                'opacity':'1',
                "transition": "all 1s",
              })
      
            }
        })
      })
      $(function(){

        $(window).scroll(function(){
    
            if($(this).scrollTop() > 1){
      
              $('.aparecer3').css({
                'opacity':'1',
                "transition": "all 1s",
              })
      
            }
        })
      })
    }
  });

});

