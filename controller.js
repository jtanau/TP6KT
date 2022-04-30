
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	document.getElementById('butRect').onclick = (_) => this.currEditingMode=editingMode.rect
	document.getElementById('butLine').onclick = (_) => this.currEditingMode=editingMode.line
	document.getElementById('spinnerWidth').onchange = (e) => this.currLineWidth=e.target.value
	document.getElementById('colour').onchange = (e) => this.currColour=e.target.value




	new DnD(canvas, this);

	this.onInteractionStart = function(dnd){
		this.formeCourant=new Rectangle();

	}.bind(this)

	this.onInteractionUpdate = function(dnd){

		if(this.currEditingMode==editingMode.rect){

			this.formeCourant=new Rectangle(dnd.debX,dnd.debY,this.currLineWidth,this.currColour,dnd.finY-dnd.debY,dnd.finX-dnd.debX);
			
		}else{
			this.formeCourant=new Line(dnd.debX,dnd.debY,this.currLineWidth,this.currColour,dnd.finX,dnd.finY);

		}

		drawing.paint(ctx,canvas);
		this.formeCourant.paint(ctx);
		//console.log('update')

	}.bind(this);

	this.onInteractionEnd = function(dnd){
		//this.formeCourant=new Rectangle(dnd.debX,dnd.debY,this.currColour,this.currLineWidth,dnd.finX-dnd.debX,dnd.finY-dnd.debY);
		var uuid=generateUUID();
		console.log(uuid);
		drawing.tab.set(uuid,this.formeCourant);
		drawing.paint(ctx,canvas);
		updateShapeList(uuid,this.formeCourant);
		document.getElementById("remove" + uuid).onclick=(event)=>remove(drawing,event.currentTarget.id.substring(6),ctx,canvas);
		/*
		drawing.tab.push(this.formeCourant);
		drawing.paint(ctx,canvas);
		this.formeCourant.paint(ctx);*/

	}.bind(this);

	function remove(drawing,index,ctx,canvas){
		console.log(index);
		drawing.tab.delete(index);
		document.getElementById('liRemove' + index).remove();
		drawing.paint(ctx,canvas);
	};


	function generateUUID() { // Public Domain/MIT
		var d = new Date().getTime();//Timestamp
		var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16;//random number between 0 and 16
			if(d > 0){//Use timestamp until depleted
				r = (d + r)%16 | 0;
				d = Math.floor(d/16);
			} else {//Use microseconds since page-load if supported
				r = (d2 + r)%16 | 0;
				d2 = Math.floor(d2/16);
			}
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
	}

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
};


