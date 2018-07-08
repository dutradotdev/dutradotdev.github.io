(function(win, doc) {
  'use strict';
  win.addEventListener('load', carregamentoSuave, false);
  function carregamentoSuave(){
    $(doc).ready(() => {
      $("body").fadeIn(1000);
    });
  }
}(window, document));
