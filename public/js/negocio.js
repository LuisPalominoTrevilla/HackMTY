$(document).ready(
  function(){

    $.ajax({
      url: '/api/getNegocios',
      dataType: 'json',
      type: 'get',
      success: function(data) {
        $("#header-img").css('background-image': 'url(/img/bg-img/breadcumb.jpg)');
        $("#businessName").text(data[0].shop_name);
        }
      }
    });

});
