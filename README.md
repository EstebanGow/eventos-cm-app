# Plantilla de microservicio

En este repositorio se encuentran la estructura de carpetas y todos los archivos de configuración para un microservicio en Node.

## Estructura del proyecto

```
├── @types
│   └── (modulos que no tienen types)
├── dist
│   ├── application
│   │   ├── data
│   │   ├── services
│   │   └── util
│   ├── configuration
│   ├── domain
│   │   ├── entities
│   │   ├── exceptions
│   │   ├── repository
│   │   ├── response
│   │   └── services
│   ├── infrastructure
│   │   ├── api
│   │   │   ├── middlewares
│   │   │   ├── routers
│   │   │   ├── schemas
│   │   │   └── util
│   │   └── repositories
│   │       └── firestore
│   │           ├── adapter
│   │           └── dao
│   └── util
├── docs
├── infra
├── manifests
├── src
│   ├── application
│   │   ├── data
│   │   │   ├── in
│   │   │   └── out
│   │   ├── services
│   │   └── util
│   ├── configuration
│   ├── domain
│   │   ├── entities
│   │   ├── exceptions
│   │   ├── repository
│   │   ├── response
│   │   └── services
│   ├── infrastructure
│   │   ├── api
│   │   │   ├── middlewares
│   │   │   ├── routers
│   │   │   ├── schemas
│   │   │   └── util
│   │   ├── listener
│   │   └── repositories
│   │       └── firestore
│   │           ├── adapter
│   │           └── dao
│   └── util
└── test
```

# Recomendaciones

-   ## Editor

        Se recomienda utilizar [VS Code](https://code.visualstudio.com/)

-   ## Extensiones recomendadas

        -   Prettier - Code formatter
        -   npm
        -   npm Intellisense
        -   Jest-cucumber code generator
        -   Javascript (ES6) code snippets
        -   GitLens
        -   ESLint
        -   EditorConfig
        -   TypeScript Hero
        -   Path Intellinsense

-   ## Gestor de paquetes

        El gestor de paquetes utilizado es [Yarn](https://yarnpkg.com/)

# Primeros pasos

Se debe tener la versión estable [**Node.js**](https://nodejs.org/) (LTS) y tener instalado **Yarn**

### Instalación de dependencias

```zsh
# Consola
yarn
```

## Post instalación

Se debe ejecutar el comando para tener el pre-commit

```zsh
# Consola
yarn husky:install
```

### Ejecutar el proyecto

Solo tienes que ejecutar el comando `yarn dev` y dirigirse a un navegador con la url **http://localhost:8080/api/v1** o **http://localhost:8080/docs**

### Validar versionamiento de las dependencias

```zsh
# Consola
yarn outdated
```

**Si no hay ningún warning ni error entonces puede continuar con los pasos, si por lo contrario los tiene por favor comunicarse con el Arquitecto**

### Copiar la estructura del proyecto en el directorio deseado

```zsh
# Consola -> Ir a la ruta donde se encuentre la plantilla
cp -R ./ destination_folder
```

## Scripts

### build

```zsh
# Se utiliza para compilar el proyecto
yarn build
```

### infra-as-code

```zsh
# Se utiliza generar los recursos de infraestructura en GCP
yarn infra-as-code
```

### lint

```zsh
# Se corre el linter
yarn lint
```

### format

```zsh
# Se utiliza para formatear el código
yarn format
```

### format-check

```zsh
# Se utiliza para verificar el formato del código
yarn format-check
```

### dev

```zsh
# Se utiliza para correr el servidor y estar atento a los cambios en los archivos Typescript
yarn dev
```

### start

```zsh
# Se utiliza para correr el servidor
yarn start
```

### start:debug

```zsh
# Se utiliza para correr el servidor en modo debug
yarn start:debug
```

### test

```zsh
# Se utiliza para ejecutar los tests
yarn test
```

### coverage

```zsh
# Se utiliza para mostrar la cobertura de pruebas
yarn coverage
```

### release

```zsh
# Se utiliza cada vez que se va a desplegar una versión CHANGELOG.md
yarn release
```

## Commit lint

Se utiliza la convención estandar para escribir el mensaje en el commit

[Commit Message Convention](https://github.com/conventional-changelog/commitlint)

---
