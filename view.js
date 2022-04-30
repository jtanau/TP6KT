
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
Rectangle.prototype.paint = function(ctx) {
    ctx.strokeStyle=this.color
    ctx.lineWidth=this.epaisseur
    ctx.strokeRect(this.x,this.y,this.width,this.height)
};
  
Line.prototype.paint = function(ctx) {
    ctx.strokeStyle=this.color
    ctx.lineWidth=this.epaisseur
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.xFinal, this.yFinal);
    ctx.stroke();
};
  
Drawing.prototype.paint = function(ctx,canvas) {
    ctx.fillStyle = '#F0F0F0'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.tab.forEach(element=>element.paint(ctx))
};

function updateShapeList(index,shape){
    document.getElementById('shapeList').insertAdjacentHTML('beforeend',toDom(shape,index))
}

function toDom(shape,index){
    if(shape && typeof shape === 'object'){
      let innerHtml = '<li id="liRemove${index}">'
      if(shape.constructor === Rectangle)
        innerHtml += '<span style="color:'+ shape.color + '">▢</span> Rectangle'
      else if(shape.constructor === Line)
        innerHtml += '<span style="color:'+ shape.color + '">/</span> Line'
        innerHtml +='<button type="button" class="btn btn-default remove" id="remove${index}">'

    }
}
