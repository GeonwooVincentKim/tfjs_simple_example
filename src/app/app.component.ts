import { Component, ViewChild, OnInit } from '@angular/core';
import { DrawableDirective } from './drawable.directive';
import '@angular/compiler';

import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// First of all, let just test this codes.
export class AppComponent implements OnInit {
  // Setting up a property called Linear-Model that
  // defines the actual Tesnor-Model that will train and 
  // make predictions.
  linearModel: tf.Sequential;

  // training some randomly generated static data.
  prediction: any;  

  model: tf.ModelCompileArgs;
  predictions: any;

  @ViewChild(DrawableDirective) canvas;

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
    console.log(val, " ", typeof(val));
    // return a prediction in the form of a tensor.
    // Why the program has top when I set the value as '3'? But it doesn't occur any error..!! 
    // Why parameter, 'val' does not working??
    const output = this.linearModel.predict(tf.tensor2d([3], [1, 1])) as any;
    // Create an array and then call 'dataSync' on the tensor.
    this.prediction = Array.from(output.dataSync())[0]
  }

  async loadModel() {
    // this.linearModel = await tf.loadModel('/assets/model.json');
  }

  async predict(imageData: ImageData) {

    const pred = await tf.tidy(() => {

      // Convert the canvas pixels to 
      // let img = tf.fromPixels(imageData, 1);
      // img = img.reshape([1, 28, 28, 1]);
      // img = tf.cast(img, 'float32');

      // Make and format the predications
      // const output = this.linearModel.predict(img) as any;

      // Save predictions on the component
      // this.prediction = Array.from(output.dataSync()); 
    });

  }
}


// export class AppComponent {

//   trained: false;
//   xValues: [1,2,3,4,5,6];
//   yValues: [1,3,5,7,9,11];
//   predictedValue:'Click on train';
//   valueToPredict: '';
//   addItem() {
//     this.xValues.push(0);
//     this.yValues.push(0);
//   }
//   train() {
//     // Define a model for linear regression.
//     const model = this.model = tf.sequential();
//     model.add(tf.layers.dense({units: 1, inputShape: [1]}));
//     // Prepare the model for training: Specify the loss and the optimizer.
//     model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
//     const xs = tf.tensor2d(this.xValues, [this.xValues.length, 1]);
//     const ys = tf.tensor2d(this.yValues, [this.yValues.length, 1]);
//     // Train the model using the data.
//     model.fit(xs, ys, {epochs: 50}).then(() => {
//       this.trained = true;
//       this.predictedValue = 'Ready for making predictions';
//     });
//   }
//   predict() {
//     // Use the model to do inference on a data point the model hasn't seen before:
//     this.predictedValue = this.model.predict(tf.tensor2d([this.valueToPredict], [1, 1])).get(0, 0);
//   }
// }