# AngularCrud

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.
Note: The application is downgraded to Angular version 5.2

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Reference (Thanks to Venkat)
http://csharp-video-tutorials.blogspot.com/2017/12/angular-crud-tutorial.html

## How to run the application:
1. Check out the source code
2. Make sure you've installed node.js (node version 4.6.x or greater) and npm (npm 3.x.x or greater)
3. Verify node.js and npm versions
   -  node -v
   -  npm -v
4. Run below commands:
   - npm install -g @angular/cli
   - npm install
5. We've added fack REST API, so before starting the app, execute below commands
   - npm install -g json-server 
   - json-server --watch db.json
   - Copy the rest url and update the baseUrl property value inside employee.service.ts file
6. Run below command to start the application
   - ng serve -o

