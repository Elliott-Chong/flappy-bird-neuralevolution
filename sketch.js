let population;
let pipes = [];
let POPULATION_SIZE = 100;
let MUTATION_RATE = 0.01;
let counter = 0;

let slider;

function setup() {
  slider = createSlider(1, 10, 3);
  slider.parent(select("main.container"));
  noStroke();
  let cnv = createCanvas(800, 800);
  cnv.parent(select("#canvas"));
  population = new Population(POPULATION_SIZE, MUTATION_RATE);
  for (let i = 0; i < 1; i++) {
    pipes[i] = new Pipe();
  }
}

function draw() {
  background(0);
  for (let i = 0; i < slider.value(); i++) {
    if (counter % 80 === 0) {
      pipes.push(new Pipe());
    }
    for (let i = 0; i < population.birds.length; i++) {
      // population.birds[i].show();
      population.birds[i].update();
      population.birds[i].think(pipes);
    }
    for (let i = 0; i < pipes.length; i++) {
      // pipes[i].show();
      pipes[i].update();

      for (let j = population.birds.length - 1; j >= 0; j--) {
        if (
          population.birds[j].collide(
            pipes[i] || population.birds[j].offScreen()
          )
        ) {
          population.remove(j);
        }
      }
    }
    for (let i = pipes.length - 1; i >= 0; i--) {
      if (pipes[i].offScreen()) {
        pipes.splice(i, 1);
      }
    }

    if (population.birds.length == 0) {
      population.repopulate();
      pipes = [];
      pipes.push(new Pipe());
      counter = 0;
    }
    counter++;
  }

  for (let bird of population.birds) {
    bird.show();
  }
  for (let pipe of pipes) {
    pipe.show();
  }
}

// function keyPressed() {
//   if (key == " ") {
//     for (let bird of birds) {
//       bird.flap();
//     }
//   }
// }
