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
    // Get a ML-Algorithm to predict, 
    // depending on the size of the Data-Set training the model 
    // can take a long-time, but it just have few values,
    // so it's going to happen very quick.
    await this.linearModel.fit(xs, ys);
    console.log("Model-Trained");
  }
}
