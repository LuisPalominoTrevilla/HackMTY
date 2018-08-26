$(document).ready(()=>{

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
                            ).then(()=>{
                                window.location.reload();
                            })
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

})
