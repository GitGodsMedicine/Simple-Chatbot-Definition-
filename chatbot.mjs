import { readFileSync } from 'fs';
import { memory } from './rnn.asm.js'; // this import was directly taken, to use asm in this mjs, you need to use libraries, this example takes the direct import from the rnn.asm

const KNOWLEDGE_PATH = './knowledge.txt';
const RNN_PATH = './rnn.asm.js';

// Initialize the neural network
const input = new Float64Array(RNN.INPUT_SIZE);
const weights = new Float64Array(memory.buffer, memory.buffer.byteOffset + RNN.weights, RNN.HIDDEN_SIZE  RNN.OUTPUT_SIZE);
const biases = new Float64Array(memory.buffer, memory.buffer.byteOffset + RNN.biases, RNN.OUTPUT_SIZE);

// Load the knowledge into the input layer
const knowledge = readFileSync(KNOWLEDGE_PATH, 'utf-8');
for (let i = 0; i < knowledge.length; i++) {
  input[i] = knowledge.charCodeAt(i);
}

// Train the neural network
for (let i = 0; i < 1000; i++) {
  RNN.train(input, input);
}

// Respond to a question
export function respond(question) {
  // Convert the question to a float64 array
  const questionArray = new Float64Array(RNN.INPUT_SIZE);
  for (let i = 0; i < question.length; i++) {
    questionArray[i] = question.charCodeAt(i);
  }

  // Feed the question through the neural network
  RNN.forward_pass(questionArray);

  // Get the output from the neural network
  const output = new Float64Array(RNN.OUTPUT_SIZE);
  output.set(memory.buffer, memory.buffer.byteOffset + RNN.weights);

  // Find the index of the highest output value
  let maxIndex = 0;
  for (let i = 1; i < RNN.OUTPUT_SIZE; i++) {
    if (output[i] > output[maxIndex]) {
      maxIndex = i;
    }
  }

  // Convert the index to a character
  const response = String.fromCharCode(maxIndex);

  // Return the response
  return response;
}
