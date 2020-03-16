# This web app lets user to train two models in the web browser using TF.js with layer customisation and more.
#### 1. Four Shapes Recognition (Square, circle, star and triangle) [dark Filled figures on white backgrounds]
###### ⨀ Dataset taken from https://www.kaggle.com/smeschke/four-shapes
#### 2. Handwritten digits Recognition (white digits on dark background)
###### ⨀ References taken from TF documentation and MNIST dataset used.

#### The web app allows a user to add/modify/delete the layers of the model. The user can change different layer parameters according to his needs. The parameters to model.compile() and model.fit() can also be altered accordingly. Training can be performed in the browser itself according to the user provided customisation or optimally(different option provided). After training the user can draw a figure in the canvas or browse for an image to check for prediction.

## Hosted App

#### https://camicroscope-devwork-challenge.herokuapp.com/

## To Run the App locally

#### 1. Run `npm install` in the directory

#### 2. Then run `npm start` or `node server.js`

#### 3. Open web browser at `localhost:8080`

## Sample Video can be seen here :
#### 1. Digits:  https://youtu.be/r8kJyY5itFU
#### 2. Shapes:  https://youtu.be/oT2jkxyuYZY

## Future Project Ideas
1. Generation of spritesheet in the browser using existing dataset from camicroscope or user's own dataset. 
2. Giving the user many options for creating a new model entirely in browser.
3. A very basic user login system maybe so that progress of the user is stored and user can continue from wherever he/she left last time. Or using cookies and avoid logging in at all.
4. Exporting and importing the workbench as a JSON file maybe so as to continue work anytime.
5. Creating the algorithm architecture and selecting training data maybe preexisting from camicroscope or browsing local or selecting a url.
6. An option to train model on server-side by user giving his/her own server address. The server will be deployed on heroku by the user first with very minimum difficulty and instructions will be provided.

## Tools and libraries used (main ones atleast):
##### 1. JQuery
##### 2. mdbootstrap
##### 3. tensorflow.js
