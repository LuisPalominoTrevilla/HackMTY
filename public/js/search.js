$(document).ready(()=>{

  $("#search-btn").click(()=>{
    var zone = $("#zone option:selected").text();
    var cat = $("#cat option:selected").text();

    if(zone == "Todas las zonas"){
      zone = ""
    }

    if(cat == "Todas las categorías"){
      cat = ""
    }

    window.location.href = "/listing?cat=" + cat + "&zone=" + zone;

  });

});
