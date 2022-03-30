
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
  this.x = 0;
  this.y = 0;
  this.xFinal = 0;
  this.yFinal = 0;
  this.isClique = false;

	// Developper les 3 fonctions gérant les événements
  this.sourisCliquer = function (evt) {
    const pos = getMousePosition(canvas, evt)
    this.xFinal = this.x = pos.x
    this.yFinal = this.y = pos.y
    this.isClique = true
    interactor.onInteractionStart(this)
    console.log(evt)
  }.bind(this);

  this.sourisEnDeplacement = function (evt) {
    if(this.isClique) {
      this.x = this.xFinal
      this.y = this.yFinal
      const pos = getMousePosition(canvas, evt)
      this.xFinal = pos.x
      this.yFinal = pos.y
      interactor.onInteractionUpdate(this)
      console.log(evt)
    }
  }.bind(this);

  this.sourisRelacher = function (evt) {
    if(this.isClique) {
      const pos = getMousePosition(canvas, evt)
      this.xFinal = pos.x
      this.yFinal = pos.y
      this.isClique = false
      interactor.onInteractionEnd(this)
      console.log(evt)
    }
  }.bind(this);

	// Associer les fonctions précédentes aux évènements du canvas.
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



