
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

function Drawing() {
    this.tab=new Map();
}

function Form(x, y,epaisseur,color) {
    this.x=x
    this.y=y
    this.epaisseur=epaisseur
    this.color=color
}
function Rectangle(x,y,epaisseur,color,height,width) {
    Form.call(this,x,y,epaisseur,color)
    this.height=height
    this.width=width
}

function Line(x,y,epaisseur,couleur,xFinal,yFinal) {
    Form.call(this,x,y,epaisseur,couleur)
    this.xFinal=xFinal
    this.yFinal=yFinal

}