class Bird {
  constructor(brain) {
    this.fitness = 0;
    this.x = 50;
    this.y = width / 2;
    this.vel = 1;
    this.gravity = 0.5;
    this.max_vel = 30;
    this.radius = 12;
    this.brain;
    if (!brain) {
      this.brain = new NeuralNetwork();
      this.brain.input(5);
      this.brain.add(new Dense(300));
      this.brain.add(new Dense(2));
    } else {
      this.brain = brain;
    }
    this.brain.compile();
  }
  offScreen() {
    let res = this.y >= height || this.y <= 0;
    console.log(res);
  }

  show() {
    ellipseMode(CENTER);
    stroke(255);
    fill(150, 100, 0, 50);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  think(pipes) {
    let nearestPipe;
    let nearestDist = Infinity;
    for (let pipe of pipes) {
      if (pipe.x - this.x > 0 && pipe.x - this.x < nearestDist) {
        nearestDist = pipe.x - this.x;
        nearestPipe = pipe;
      }
    }

    let input = [
      this.y / height,
      this.vel / this.max_vel,
      nearestPipe.x / width,
      nearestPipe.top / height,
      nearestPipe.bottom / height,
    ];
    let decision = this.brain.predict(input);
    if (decision[0] > decision[1]) {
      this.flap();
    }
  }

  update() {
    this.vel += this.gravity;
    this.y += this.vel;
    if (this.y > height) {
      this.y = height;
      this.vel = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.vel = 0;
    }
    if (this.vel > this.max_vel) {
      this.vel = this.max_vel;
    }
    if (this.vel < -this.max_vel) {
      this.vel = -this.max_vel;
    }
    this.fitness++;
  }

  flap() {
    this.vel -= this.vel + 10;
  }

  collide(pipe) {
    return (
      this.x + this.radius >= pipe.x &&
      this.x + this.radius <= pipe.x + pipe.width &&
      (this.y <= pipe.top || this.y >= pipe.bottom)
    );
  }
}
