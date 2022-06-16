class Pipe {
  constructor() {
    this.x = width;
    this.gap = random(100, 300);
    this.top = random(height * 0.6);
    this.bottom = max(this.top + this.gap, 100);
    this.width = 50;
  }

  show() {
    fill(255);
    rectMode(CORNERS);
    rect(this.x, 0, this.x + this.width, this.top);
    rect(this.x, height, this.x + this.width, this.bottom);
  }

  update() {
    this.x -= 5;
  }

  offScreen() {
    return this.x < -this.width;
  }
}
