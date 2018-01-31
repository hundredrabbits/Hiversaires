class Hiversaires {
  constructor() {
    this.element = document.createElement("hiversaires");
    document.body.appendChild(this.element);

    this.artBook = new ArtBook();
    this.game = new Game();
    this.music = new Music();
    this.stage = new Stage(this.element);
    this.walkthrough = new Walkthrough();
  }

  start() {
    this.stage.start();
    this.game.start();
    this.walkthrough.start();

    this.dozenal = new Dozenal();
    this.dozenal.start();
  }
}
