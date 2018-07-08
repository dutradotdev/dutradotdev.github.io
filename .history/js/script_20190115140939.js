function carregamentoSuave(){
    $(document).ready(() => {
        $("body").fadeIn(1000);
    });
}
document.addEventListener('load', carregamentoSuave(), false);
onload="javascript:carregamentoSuave();"