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
  
  /* 
    1. Set up an asynchronous function, 
    called 'trainNewModel'.

    2. Adding a Dense-Layer or a fully connected Layer
    that will output a shape of one and also take 
    an input with a shape one. 

    3. Define the loss metric which in this case,
    will be 'meanSquaredError', and minimize the 'meanSquaredError' of the predictions
    from the algorithm.

    4. Define an optimizer which is the function that
    determines how we reach this actual Minimum-Error-Point.

    5. SGD statnd sfor stochastic-gradient-descent,
    and there's a number of different optimizers that you can
    choose from.
  */
  async trainNewModel(){
    // Define a Model for Linear-Regression.
    this.linearModel = tf.sequential();
    this.linearModel.add(tf.layers.dense({units: 1, inputShape: [1]}));
  
    // Prepare the model for training: Specify the loss and the optimizer.
    this.linearModel.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
  }
}
