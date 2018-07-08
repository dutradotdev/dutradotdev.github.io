(function() {
  document.addEventListener('load', carregamentoSuave(), false);
  function carregamentoSuave(){
    console.warn('oi')
    $(document).ready(() => {
      $("body").fadeIn(1000);
    });
  }
}());
