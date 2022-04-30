
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
  this.x = 0;
  this.y = 0;
  this.xFinal = 0;
  this.yFinal = 0;
  this.isClique = false;
  this.interactor=interactor;

	// Developper les 3 fonctions gérant les événements
  this.sourisCliquer = function (evt) {
    var pos = getMousePosition(canvas, evt)
    this.x = pos.x;
    this.y = pos.y;
    this.isClique = true;
    this.interactor.onInteractionStart(this);
  }.bind(this);

  this.sourisEnDeplacement = function (evt) {
    if(this.isClique) {
      var pos = getMousePosition(canvas, evt);
      this.xFinal = pos.x;
      this.yFinal = pos.y;
      this.isClique = true;
      this.interactor.onInteractionUpdate(this);
    }
  }.bind(this);

  this.sourisRelacher = function (evt) {
    var pos = getMousePosition(canvas, evt)
    this.xFinal = pos.x;
    this.yFinal = pos.y;
    this.isClique = false;
    interactor.onInteractionEnd(this);
  }.bind(this);

	// Associer les fonctions précédentes aux évènements du canvas.
  canvas.addEventListener('mousedown', this.sourisCliquer, false);
  canvas.addEventListener('mousemove', this.sourisEnDeplacement, false);
  canvas.addEventListener('mouseup', this.sourisRelacher, false);
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};
