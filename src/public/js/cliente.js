class optenerNumb {
    constructor(){
        this.numb = document.getElementById( 'numb' );
    }
    obtener(){
        if(this.numb.value === ''){
            this.numb.value = 1
        } else{
            this.numb.value = parseInt(this.numb.value) + 1
        }
    }
}
let numbs = new optenerNumb()
window.onload = () => numbs.obtener();
