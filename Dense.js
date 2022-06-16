class Dense {
  constructor(nodes, potential) {
    if (potential) {
      this.weights = potential.weights.copy();
      this.bias = potential.bias.copy();
    } else {
      this.weights = null;
      this.bias = null;
    }
    this.learning_rate = 0.1;
    this.nodes = nodes;
    this.activation_function = {
      func: (x) => {
        return 1 / (1 + Math.exp(-x));
      },
      dfunc: (y) => {
        return y * (1 - y);
      },
    };
    this.output = null;
    this.errors = null;
  }
  copy() {
    return new Dense(this.nodes, this);
  }

  feedforward(input) {
    let output = Matrix.multiply(this.weights, input);
    output.add(this.bias);
    output.map(this.activation_function.func);
    return output;
  }

  backprop(inputs, errors) {
    // calculate gradients
    let gradient = Matrix.map(this.output, this.activation_function.dfunc);
    // hadamard product here
    gradient.multiply(errors);
    gradient.multiply(this.learning_rate);

    // calculate deltas
    let input_transposed = Matrix.transpose(inputs);
    let weight_deltas = Matrix.multiply(gradient, input_transposed);

    // update weights and biases using deltas
    this.weights.add(weight_deltas);
    this.bias.add(gradient);
  }
}
