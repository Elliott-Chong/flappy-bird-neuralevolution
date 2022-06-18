class Population {
  constructor(POPULATION_SIZE, MUTATION_RATE) {
    this.POPULATION_SIZE = POPULATION_SIZE;
    this.MUTATION_RATE = MUTATION_RATE;
    this.birds = [];
    this.deadBirds = [];
    for (let i = 0; i < this.POPULATION_SIZE; i++) {
      this.birds[i] = new Bird();
    }
  }

  remove(j) {
    this.deadBirds.push(this.birds[j]);
    this.birds.splice(j, 1);
  }

  repopulate() {
    this.normalize(this.deadBirds);
    for (let i = 0; i < this.POPULATION_SIZE; i++) {
      let parent = this.weightedChoice(this.deadBirds);
      let child = new Bird(parent.brain.copy());
      child.mutate(this.MUTATION_RATE);
      this.birds.push(child);
    }
    this.deadBirds = [];
    console.log("Next generation");
  }

  weightedChoice(deadBirds) {
    let choice = random(deadBirds);
    while (Math.random() > choice.fitness) {
      choice = random(deadBirds);
    }
    return choice;
  }

  normalize(deadBirds) {
    let sum = 0;
    for (let bird of deadBirds) {
      sum += bird.fitness;
    }
    for (let bird of deadBirds) {
      bird.fitness = bird.fitness / sum;
    }
  }
}
