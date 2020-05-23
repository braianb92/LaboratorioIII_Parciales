//Funcion Generica que muestra/oculta el loading gif y la tabla.
//Recibe parametros genericos
function showLoading(loadingId,bool = true){
    var loading = document.getElementById(loadingId);
    loading.hidden = !bool;
}

function capitalize(palabra) {
    return palabra[0].toUpperCase() + palabra.slice(1);
  };

  function formatDate(date,charAreemplazar,charReemplazo){
    var arrayFecha = date.split(charAreemplazar,3);
    var fechaFixed = arrayFecha[2]+charReemplazo+arrayFecha[1]+charReemplazo+arrayFecha[0];
    return fechaFixed;
}

export {showLoading,capitalize,formatDate};