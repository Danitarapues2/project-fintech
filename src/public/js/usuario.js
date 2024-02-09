class optenerNumero {
    constructor(){
        this.numero = document.getElementById( 'numero' );
    }
    obtener(){
        if(this.numero.value === ''){
            this.numero.value = 1
        } else{
            this.numero.value = parseInt(this.numero.value) + 1
        }
    }
}
let numeros = new optenerNumero()
window.onload = numeros.obtener()
