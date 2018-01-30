class Hiversaires {
  constructor() {
    this.element = document.createElement("hiversaires");
    document.body.appendChild(this.element);

    this.artBook = new ArtBook();
    this.game = new Game();
    this.world = new World();
    this.music = new Music();
    this.stage = new Stage(this.element);
    this.walkthrough = new Walkthrough();
  }

  start() {
    this.stage.start();
    this.game.start();
    this.walkthrough.start();

    // Temporary
    // this.music.setRecord(Records.act1);
    // this.music.setAmbience(Ambience.antechannel);

    this.dozenal = new Dozenal();
    this.dozenal.start();
  }
}

const Records = {
  act1: "music_act1",
  act2: "music_act2",
  act3: "music_act3",
  act4: "music_act4",
  act5: "music_act5",
  credit: "music_credit"
};

const Zone = {
  antechannel: "antechannel",
  capsule: "capsule",
  circular: "circular",
  entente: "entente",
  forest: "forest",
  metamondst: "metamondst",
  nataniev: "nataniev",
  rainre: "rainre",
  stones: "stones",
  studio: "studio"
};

const ambienceByZone = function() {
  let ambienceByZone = {};
  ambienceByZone[Zone.antechannel] = "ambient_antechannel";
  ambienceByZone[Zone.capsule] = "ambient_capsule";
  ambienceByZone[Zone.circular] = "ambient_circular";
  ambienceByZone[Zone.entente] = null;
  ambienceByZone[Zone.forest] = "ambient_forest";
  ambienceByZone[Zone.metamondst] = "ambient_metamondst";
  ambienceByZone[Zone.nataniev] = "ambient_nataniev";
  ambienceByZone[Zone.rainre] = "ambient_rainre";
  ambienceByZone[Zone.stones] = "ambient_stones";
  ambienceByZone[Zone.studio] = "ambient_studio";
  return ambienceByZone;
}();
