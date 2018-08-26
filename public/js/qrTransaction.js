$('#transaction').click(()=>{
    console.log(document.getElementById('trans-type').value);
    
    let points = document.getElementById('points').value;

    if(document.getElementById('trans-type').value === 'buy'){
        if( points < 0){
            points = points * -1
        }
        createTransaction('buy',points, (res)=>{
            createQR(res);
        })
    }else if(document.getElementById('trans-type').value === 'exchange'){
        if( points > 0){
            points = points * -1
        }
        createTransaction('exchange', points, (res)=>{
            createQR(res);
        })
    }
});


function createTransaction(trans_type, points, callback){
    $.post('api/createTransaction', {
        trans_type: trans_type,
        points: points
    }).then((res)=>{
        callback(res);
    });
}

 function createQR(res){
    swal({
        html: '<img src="https://api.qrserver.com/v1/create-qr-code/?data=http://solidario.mx/transaction/'+res+'&amp;size=400x400" alt="" title="" />'
    })
} 