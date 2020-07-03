# Procedimiento de generación

Estos son los pasos que se siguieron para generar esta librería.

## Creación del proyecto

```bash
echo "# BootstrangularDatatableStylelint" >> README.md
git init
git remote add origin https://github.com/andres-geotec/bootstrangular-datatable-stylelint.git
npm init
npm i @angular/common @angular/compiler @angular/core @angular/platform-browser @angular/platform-browser-dynamic
npm i -D @angular-devkit/build-angular @angular-devkit/build-ng-packagr @angular/cli @angular/compiler-cli @types/node codelyzer core-js cpx deploy-to-git mkdirp ng-packagr rimraf rxjs stylelint stylelint-config-standard stylelint-order terser ts-node tsickle tslint typescript watch zone.js
```

### Parámetros npm init

name: `bootstrangular-datatable`.

version: `1.0.0-beta.2`. Revisa sobre números de versión y rangos en [Semver](https://semver.org/).

git repository: `https://github.com/andres-geotec/bootstrangular-datatable-stylelint.git`.

keywords: `angular, bootstrap, datatable, fontawesome, table-paginator, table-buttons, table-filter`.

author: `Andrés Martínez González <andres.geotec@gmail.com> (https://github.com/andres-geotec)`.

license: `MIT`.
