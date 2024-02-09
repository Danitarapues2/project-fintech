class optenerName {
    constructor(){
        this.name = document.getElementById( 'name' );
    }
    obtener(){
        if(this.name.value === ''){
            this.name.value = 1
        } else{
            this.name.value = parseInt(this.name.value) + 1
        }
    }
}
let names = new optenerName()
window.onload = names.obtener()
