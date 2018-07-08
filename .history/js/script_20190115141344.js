(function(win, doc) {
  window.addEventListener('load', carregamentoSuave, false);
  function carregamentoSuave(){
    $(document).ready(() => {
      $("body").fadeIn(1000);
    });
  }
}(window, document));
