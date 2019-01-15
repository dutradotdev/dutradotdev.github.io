(function(win, doc) {
  'use strict';

  let app = {
    init: function init() {
      this.addEvtListeners();
    },
    addEvtListeners: function addEvtListeners() {
      win.addEventListener('load', this.carregamentoSuave, false);
    },
    carregamentoSuave: function carregamentoSuave(){
      $(doc).ready(() => {
        $("body").fadeIn(1000);
      });
    },
  };

  app.init();
}(window, document));
