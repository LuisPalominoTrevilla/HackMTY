$(document).ready(()=>{

    $("#login").click(()=>{
            swal({
                title: "<h2>Inicia sesión o registrate</h2>",
                type: "info",
                html: `
                <form>
                    <div class="form-group">
                        <label for="inputEmail1">Correo electrónico</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
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
                    let username = document.getElementById('email').value;
                    let password = document.getElementById('inputPassword').value;
                    console.log(username);
                    console.log(password);
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
                        text: 'Algo salió mal!',
                      })
                }
            });
    });

})  
