$(document).ready(()=>{

    $("#login").click(()=>{
            swal({
                title: "<h2>Inicia sesión</h2>",
                type: "info",
                html: `
                <form>
                    <div class="form-group">
                        <label for="inputEmail1">Usuario</label>
                        <input type="username" class="form-control" id="username" aria-describedby="username" placeholder="Usuario">
                        <small id="emailHelp" class="form-text text-muted">No compartiremos tu correo con nadie </small>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword">Contraseña</label>
                        <input type="password" class="form-control" id="inputPassword" placeholder="Contraseña">
                    </div>
                </form> `,
                showCancelButton: false,
                confirmButtonText: "Inicia sesión"  
            }).then((result)=>{
                if(result.value){
                    let username = document.getElementById('username').value;
                    let password = document.getElementById('inputPassword').value;
                    $.post('/api/login', {
                        username: username, 
                        password: password
                    }).done((isInDB)=>{
                        if(isInDB){ 
                            swal(
                                'Exito!',
                                'iniciarás sesión en un segundo',
                                'success'
                            )
                        }
                        else{
                            swal({
                                type: 'error',
                                title: 'Oops...',
                                text: '¡Algo salió mal!',
                              })
                        }
                    })
                        
                }
                else{
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: '¡Algo salió mal!',
                      })
                }
            });
    });

    $("#register").click(()=>{
        swal({
            title: "<h2>Regístrate</h2>",
            type: "info",
            html: `
            <form>
                <div class="form-group">
                    <label for="name">Nombre</label>    
                    <input type="name" class="form-control" id="name" aria-describedby="name" placeholder="Nombre">
                    
                    <br>

                    <label for="lastName">Apellido</label>
                    <input type="lastName" class="form-control" id="lastName" aria-describedby="lastName" placeholder="Apellido">
                    
                    <br>

                    <label for="email">Correo electrónico</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Correo">
                    <small id="emailHelp" class="form-text text-muted">No compartiremos tu correo con nadie </small>

                    <br>

                    <label for="inputPassword">Contraseña</label>
                    <input type="password" class="form-control" id="inputPassword" placeholder="Contraseña">
                </div>
            </form> `,
            showCancelButton: false,
            confirmButtonText: "Inicia sesión"
        }).then((result)=>{
            if(result.value){
                let username = document.getElementById('name').value;
                let lastName = document.getElementById('lastName').value;
                let email = document.getElementById('email').value;
                let password = document.getElementById('inputPassword').value;
                $.post('api/register', {
                    username: username,
                    lastName: lastName,
                    email: email,
                    password: password
                }
                ).done(()=>{
                    swal(
                        'Exito!',
                        'iniciarás sesión en un segundo',
                        'success'
                    )    
                })
                
            }
            else{
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: '¡Algo salió mal!',
                  })
            }
        });
    });

    $('#cerrarSesion').click(()=>{
        $.post('api/logout',{
            
        })
    })

})  
