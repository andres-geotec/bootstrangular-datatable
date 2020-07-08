# Procedimiento de generación

Estos son los pasos que se siguieron para generar esta librería.

## Crear proyecto

Ejecuta `ng new <name-workspace> --create-application=false ` para generar el espacio de trabajo del proyecto sin generar los AppModules, vea la documentación competa en [Angular Creating libraries](https://angular.io/guide/creating-libraries). En este caso como si queremos agregar una aplicación para probar los cambios, el comando es `ng new bootstrangular-datatable --commit=false --routing=false --style=scss`.

Visita [Angular CLI ng new](https://angular.io/cli/new) para ver más parámetros para generar el proyecto.

## Añadir repositorio

Ejecuta `git remote add origin <link repository>` para agregar el repositorio remoto de github. En este caso `git remote add origin https://github.com/andres-geotec/bootstrangular-datatable.git`. Se recomienda que a partir de este paso se realice un `commit` en cada paso posterior o cada que se crea pertinente.


# Codificación

Se recomienda que antes de crear la librería o compilarla se realicen pruebas de funcionabilidad a través de componentes.

En este caso, como necesita [bootstrap](https://www.npmjs.com/package/bootstrap) y sus dependencias ([jquery](https://www.npmjs.com/package/jquery) y [popper](https://www.npmjs.com/package/popper.js)) para funcionar, se intalarán con el siguiente comando `npm i bootstrap jquery popper.js` para realizar pruebas. Además, se complementa con los iconos de [Fontawesome](https://fontawesome.com/icons?d=gallery) con el comando `npm i @fortawesome/fontawesome-free`.
```bash
npm i bootstrap jquery popper.js @fortawesome/fontawesome-free
```

## Creación de la librería

Ejecuta `ng generate library <lib-name>` para generar la librería que se va a publicar. En este caso `ng generate library datatable`.

> NOTA: Configuración adicional. En este paso, como se está trabajando con VS Code se tubo que configurar el 'max_user_watches' con el comando `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`, el valor por default de la variable es de `8192`. Ejecuta `cat /proc/sys/fs/inotify/max_user_watches` para ver el valor actual de la variable. Visitar [Visual Studio Code (error ENOSPC)](https://code.visualstudio.com/docs/setup/linux#_visual-studio-code-is-unable-to-watch-for-file-changes-in-this-large-workspace-error-enospc) para obtener detalles.

A partir de esta sección puede vacear el código en los modulos de la librería o configurarla como sea necesario y realizar las pruebas pertinentes. Este paso se puede generar antes o despúes de la [configuración prepublish](./PROCEDURES.md#configuración-prepublish).

## Construir librería

Ejecuta `ng-packagr -p projects/datatable/ng-package.json` para construir la librería. En este caso se requiere que el archivo README.md, LICENSE y el Contributor Covenant se agreguen a la carpeta dist de la librería, por lo que el comando quedaría así: `ng-packagr -p projects/datatable/ng-package.json; cp README.md dist/datatable/README.md; cp LICENSE dist/datatable/LICENSE; cp CODE_OF_CONDUCT.md dist/datatable/CODE_OF_CONDUCT.md`.

También es posible agregar este comando a los scripts de package.json. En este caso se agregó con el nombre `build:lib`.


# Configuración prepublish

Antes de publicar la librería es importante preparar el proyecto con los archivos de licencia y contribución así como la [configuracíon](./PROCEDURES.md#configuración-general-npm) necesaria para npm.

## Licencia MIT

Ejecuta `npx license MIT -o "<name>" > LICENSE` para generar la licencia MIT con tu nombre en la variable `<name>`. En este caso `npx license MIT -o "Andrés Martínez González" > LICENSE` seguido de `y` después de la instalación para terminar el proceso.
```
npx license MIT -o "Andrés Martínez González" > LICENSE
y

```

## Contributor Covenant

Ejecuta `npx covgen "<email>"` para generar el [Contributor Covenant](https://www.contributor-covenant.org/) en la variable `<email>`. En este caso `npx covgen "andres.geotec@gmail.com"`.

## Configuración general npm 

Ejecuta `npm init` para modificar desde consola el archivo `package.json` generado por angular y personalizarlo con los siguientes [parámetros](./PROCEDURES.md#parámetros). Esta configuración tambien se debe aplicar para el `package.json` de la librería.

### Parámetros

`name` asigna nombre clave para npm. Este nombre no debe duplicarse en los repositorios de npm.

`version` asigna la version del proyecto. Revisa sobre números de versión y rangos en [Semver](https://semver.org/).

`entry point` (no necesaria para este proyecto).

`git repository` asigna el link del repositorio git. En este caso al haber añadido anteriormente el repositorio, ya debería estar cargado por default.

`keywords` asigna las palabras clave que aparecerán en npm como palabras de búsqueda. Deben estar escritas separadas por comas.

`author` asigna el nombre y atributos del autor del proyecto. La sintaxis recomendada es `Name <email> (web)`, ejemplo: `Andrés Martínez González <andres.geotec@gmail.com> (https://github.com/andres-geotec)`.

`license` asigna el tipo de licencia del proyecto o librería. En este caso `MIT`.

Revisa la documentación en [Configuring npm](https://docs.npmjs.com/files/package.json) para ajustar más parámetros.


# Publicar en NPM

Ejecuta `npm publish --access=public` para publicar el paquete con acceso público. En este caso, como solo se debe publicar la librería construida, se tiene que acceder al directorio `dist/datatable` despues de [construir la librería](./PROCEDURES.md#construir-librería) para iniciar la pubblicación.

