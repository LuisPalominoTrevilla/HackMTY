$('#transaction').click(()=>{
    if(document.getElementById(trans-type).value() === 'buy'){
        //createTransaction()
    }
   /* $.post('/api/getQR',
    {
        trans_tipo: document.getElementById("#trans-type")
    }).done(()=>{*/
        swal({
            html: `<img src="https://api.qrserver.com/v1/create-qr-code/?data=https://localhost:3000/transaction/id&amp;size=400x400" alt="" title="" />`
        })
    /*})*/
})

function createTransaction(){
    $.post('api/createTransaction', {
        shop_id: 1,
        client_id: null,
        trans_date: new Date().toISOString().slice(0, 10),
        trans_type: buy,
        points: document.getElementById('#points').value()

    }).then(()=>{

    })
}