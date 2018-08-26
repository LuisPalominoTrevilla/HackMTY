$(document).ready(
  function(){

    $.ajax({
      url: '/api/getNegocios',
      dataType: 'json',
      type: 'get',
      success: function(data) {
        for (var i=0; i<data.length; i++) {
          $("#list").append("<a href='/negocio/"+data[i].shop_id+"'><div class='col-12 col-sm-6 col-lg-4'><div class='single-features-area mb-50'><img src='"+data[i].picture+"' style='height: 235px; overflow: hidden;' alt=''> <div class='price-start'> <p>"+data[i].category+"</p></div><div class='feature-content d-flex align-items-center justify-content-between'><div class='feature-title'><h5 >"+data[i].shop_name+"</h5><p>"+data[i].zone+"</p></div><div class='feature-favourite'><a href='#'><i class='fa fa-heart-o' aria-hidden='true'></i></a></div></div></div></div></a>");
        }
      }
    });

});
