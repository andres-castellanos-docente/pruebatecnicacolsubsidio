# BancoFront
# Instalar Dependencias
Descargar dependencias con "npm install"

# Ejecutar
iniciar proyecto con "ng serve"



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.1.


# Si desea editar los colores(light/dark) y Recompilar los estilos de Scss a css

Los colores se encuentran en los archivos: ./src/themes/layout/scss/layout-blue-light.scss y
./src/themes/layout/scss/layout-blue-dark.scss


## Instalar Node Sass de forma global

sudo npm install -g node-sass --unsafe-perm=true --allow-root

##Convertir Estilos scss a css, validar carpeta local assets/layout/css/

node-sass --output-style compressed ./src/themes/layout/scss/layout-blue-dark.scss > ./src/assets/layout/css/layout-blue-dark.css

node-sass --output-style compressed ./src/themes/layout/scss/layout-blue-light.scss > ./src/assets/layout/css/layout-blue-light.css




## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
