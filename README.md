# Servicio Gestion Eventos Api REST

Servicio para la creacion de eventos, usuarios e inscripción de usuarios a eventos


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
|   |   |__ api
│   │   ├── entities
|   |   |__ enum  
│   │   ├── exceptions
|   |   |__ model 
│   │   ├── repository
│   │   ├── response
│   │   └── services
│   ├── infrastructure
│   │   ├── api
│   │   │   ├── middlewares
│   │   │   ├── routers
│   │   │   ├── schemas
│   │   │   └── util
|   |   |__ api-client        
│   │   └── repositories
│   │       |── Postgres
│   │       |    ├── adapter
│   │       |    └── dao
|   |       |__ redis
|   |            |__ adapter
|   |            |__ dao        
|   |      
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

## Rutas de la API

El servicio expone las siguientes rutas:

### Eventos

- `GET /evento/:id`: Obtener un evento específico por ID
- `GET /eventos`: Obtener todos los eventos
- `POST /evento`: Crear un nuevo evento
- `POST /evento/inscribir-usuario`: Inscribir un usuario a un evento
- `PUT /evento`: Editar un evento existente
- `DELETE /evento/eliminar/:id`: Eliminar un evento por ID
- `GET /eventos/metricas`: Obtener métricas de eventos

### Usuarios

- `POST /usuarios/usuario`: Crear un nuevo usuario
- `GET /usuarios/usuario/:id`: Obtener un usuario específico por ID
- `GET /usuarios/usuarios`: Obtener todos los usuarios
- `DELETE /usuarios/eliminar/:id`: Eliminar un usuario por ID

### Plantillas

- `GET /plantilla`: Obtener una plantilla
- `GET /plantilla/obtener-estado-proceso/:id`: Obtener el estado de carga de eventos
- `POST /plantilla/carga`: Cargar un archivo de plantilla

### Autenticación

- `POST /autenticar`: Autenticar un usuario

Todas las rutas, excepto `/eventos-cm-app/autenticar`, requieren autenticación mediante un token.

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


## Diagrama

graph TD
    subgraph "On-Premise"
        B[(PostgreSQL Réplica)]
        C[(Redis Cache)]
    end
    
    subgraph "Cloud"
        A[Microservicio de Eventos]
        D[(PostgreSQL Primario)]
        E[Balanceador de Carga]
        F[Servicio de Mensajería]
        G[Servicio de Logs]
        H[Auto-scaling Group]
    end
    
    I[Cliente] -->|HTTP/REST| E
    E --> A
    E --> H
    A -->|Escrituras| D
    D -->|Replicación| B
    A <-->|Lectura/Escritura Cache| C
    A -->|Publicar Eventos| F
    A -->|Logs| G
    
    subgraph "Funcionalidades"
        J[Gestión de Usuarios]
        K[Gestión de Eventos]
        L[Gestión de Reservas]
    end
    
    A --> J
    A --> K
    A --> L
    
    subgraph "Resiliencia & Idempotencia"
        M[Circuit Breaker]
        N[Retry Mechanism]
        O[Idempotency Keys]
    end
    
    A --> M
    A --> N
    A --> O
    
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style B fill:#ccf,stroke:#333,stroke-width:2px
    style C fill:#fcc,stroke:#333,stroke-width:2px
    style D fill:#ccf,stroke:#333,stroke-width:4px
    style E fill:#cfc,stroke:#333,stroke-width:2px
    style F fill:#ffc,stroke:#333,stroke-width:2px
    style G fill:#cff,stroke:#333,stroke-width:2px
    style H fill:#fcf,stroke:#333,stroke-width:2px
    style I fill:#cfc,stroke:#333,stroke-width:2px
    style J fill:#fcf,stroke:#333,stroke-width:2px
    style K fill:#fcf,stroke:#333,stroke-width:2px
    style L fill:#fcf,stroke:#333,stroke-width:2px
    style M fill:#ff9,stroke:#333,stroke-width:2px
    style N fill:#ff9,stroke:#333,stroke-width:2px
    style O fill:#ff9,stroke:#333,stroke-width:2px