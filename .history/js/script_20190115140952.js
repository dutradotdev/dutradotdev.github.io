function carregamentoSuave(){
    console.warn('opa')
    $(document).ready(() => {
        $("body").fadeIn(1000);
    });
}
document.addEventListener('load', carregamentoSuave(), false);