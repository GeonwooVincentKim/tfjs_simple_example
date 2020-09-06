import { Component, ViewChild, OnInit } from '@angular/core';

import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// First of all, let just test this codes.
export class AppComponent implements OnInit {
  // Setting up a property called Linear-Model that
  // defines the actual Tesnor-Model that will train and 
  // make predictions.
  linearModel: tf.Sequential;

  // training some randomly generated static data.
  prediction: any;  

  ngOnInit(){
    this.trainNewModel();
  }
  
  async trainNewModel(){
    // Define a Model for Linear-Regression.
    this.linearModel = tf.sequential();
    this.linearModel.add(tf.layers.dense({units: 1, inputShape: [1]}));
  
    // Prepare the model for training: Specify the loss and the optimizer.
    this.linearModel.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    
    // Training data, completely random stuff.
    // xs -> training features for the Data-Set.
    // ys -> The label for 'xs'-DataSet data.
    const xs = tf.tensor1d([3.2, 4.4, 5.5, 6.71, 6.98, 7.168, 9.779, 6.182, 7.59, 2.16, 7.04]); // --> One-Dimensional
    const ys = tf.tensor1d([1.6, 2.7, 2.9, 3.19, 1.684, 2.53, 3.366, 2.596, 2.53, 1.22, 2.81]);
    
    // Train
    await this.linearModel.fit(xs, ys);
    console.log("Model-Trained");
  }

  /*
    - 1. Calling 'Linear-Model-fit' with our 'x' and' 'y' data.
    - 2. It's a statisical-Model that can predict values
    based on this DataSet that've we've provided.
    - 3. To make a prediction, we'll call 'Linear-Model' predict,
    then pass on the value in the form of a Tensor.
  */
  linearPrediction(val){
    console.log("Testing..");
    // return a prediction in the form of a tensor.
    // Why the program has top when I set the value as '3'? But it doesn't occur any error..!! 
    // Why parameter, 'val' does not working??
    const output = this.linearModel.predict(tf.tensor2d([3], [1, 1])) as any;
    // Create an array and then call 'dataSync' on the tensor.
    this.prediction = Array.from(output.dataSync())[0]
  }
}
