$(document).ready(
  function(){

    var cat, zone;
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&').join(',').split('=').join(',').split(',');

      if(sURLVariables[0]=="cat"){
        if(sURLVariables[1] == "Restaurantes" || sURLVariables[1] == "Tienditas" || sURLVariables[1] == "Belleza" || sURLVariables[1] == "Servicios" || sURLVariables[1] == "Otros") {
          cat = sURLVariables[1];
        } else { cat = "all"; }
      } else { cat = "all"; }
      if(sURLVariables[2]=="zone"){
        if(sURLVariables[3] == "Zona%20Real" || sURLVariables[3] == "Providencia" || sURLVariables[3] == "Centro" || sURLVariables[3] == "Ciudad%20del%20sol" ) {
          zone = sURLVariables[3];
        } else { zone = "all"; }
      } else { zone = "all"; }

    if (cat == "all" && zone == "all"){
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
    } else if (cat == "all" && zone != "all"){
      $.ajax({
        url: '/api/getNegociosOneParam?type=zone&value=' + zone,
        dataType: 'json',
        type: 'get',
        success: function(data) {
          for (var i=0; i<data.length; i++) {
            $("#list").append("<a href='/negocio/"+data[i].shop_id+"'><div class='col-12 col-sm-6 col-lg-4'><div class='single-features-area mb-50'><img src='"+data[i].picture+"' style='height: 235px; overflow: hidden;' alt=''> <div class='price-start'> <p>"+data[i].category+"</p></div><div class='feature-content d-flex align-items-center justify-content-between'><div class='feature-title'><h5 >"+data[i].shop_name+"</h5><p>"+data[i].zone+"</p></div><div class='feature-favourite'><a href='#'><i class='fa fa-heart-o' aria-hidden='true'></i></a></div></div></div></div></a>");
          }
        }
      });
    } else if (cat != "all" && zone == "all"){
      $.ajax({
        url: '/api/getNegociosOneParam?type=cat&value=' + cat,
        dataType: 'json',
        type: 'get',
        success: function(data) {
          for (var i=0; i<data.length; i++) {
            $("#list").append("<a href='/negocio/"+data[i].shop_id+"'><div class='col-12 col-sm-6 col-lg-4'><div class='single-features-area mb-50'><img src='"+data[i].picture+"' style='height: 235px; overflow: hidden;' alt=''> <div class='price-start'> <p>"+data[i].category+"</p></div><div class='feature-content d-flex align-items-center justify-content-between'><div class='feature-title'><h5 >"+data[i].shop_name+"</h5><p>"+data[i].zone+"</p></div><div class='feature-favourite'><a href='#'><i class='fa fa-heart-o' aria-hidden='true'></i></a></div></div></div></div></a>");
          }
        }
      });
    } else {
      $.ajax({
        url: '/api/getNegociosTwoParam?cat=' + cat + '&zone=' + zone,
        dataType: 'json',
        type: 'get',
        success: function(data) {
          for (var i=0; i<data.length; i++) {
            $("#list").append("<a href='/negocio/"+data[i].shop_id+"'><div class='col-12 col-sm-6 col-lg-4'><div class='single-features-area mb-50'><img src='"+data[i].picture+"' style='height: 235px; overflow: hidden;' alt=''> <div class='price-start'> <p>"+data[i].category+"</p></div><div class='feature-content d-flex align-items-center justify-content-between'><div class='feature-title'><h5 >"+data[i].shop_name+"</h5><p>"+data[i].zone+"</p></div><div class='feature-favourite'><a href='#'><i class='fa fa-heart-o' aria-hidden='true'></i></a></div></div></div></div></a>");
          }
        }
      });
    }

});
