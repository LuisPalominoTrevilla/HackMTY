$('#transaction').click(()=>{
    console.log(document.getElementById('trans-type').value);
    if(document.getElementById('trans-type').value === 'buy'){
        createTransaction((res)=>{
            createQR(res);
        })
    }
        
});

function createTransaction(callback){
    $.post('api/createTransaction', {
        trans_type: 'buy',
        points: document.getElementById('points').value
    }).then((res)=>{
        callback(res);
    });
}

 function createQR(res){
    swal({
        html: '<img src="https://api.qrserver.com/v1/create-qr-code/?data=https://localhost:3000/transaction/'+res+'&amp;size=400x400" alt="" title="" />'
    })
} 