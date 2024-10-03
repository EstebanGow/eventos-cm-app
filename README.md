# Servicio Gestion Eventos Api REST

Servicio para la creación de eventos, usuarios e inscripción de usuarios a eventos.

## Tabla de Contenidos
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Rutas de la API](#rutas-de-la-api)
- [Recomendaciones](#recomendaciones)
- [Primeros Pasos](#primeros-pasos)
- [Scripts](#scripts)

## Estructura del Proyecto

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

Para una estructura más detallada, consulte el archivo original.

## Rutas de la API

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

**Nota**: Todas las rutas, excepto `/eventos-cm-app/autenticar`, requieren autenticación mediante un token.

## Recomendaciones

### Editor
Se recomienda utilizar [VS Code](https://code.visualstudio.com/)

### Extensiones Recomendadas
- Prettier - Code formatter
- npm
- npm Intellisense
- Jest-cucumber code generator
- Javascript (ES6) code snippets
- GitLens
- ESLint
- EditorConfig
- TypeScript Hero
- Path Intellinsense

### Gestor de Paquetes
El gestor de paquetes utilizado es [Yarn](https://yarnpkg.com/)

## Primeros Pasos

### Prerrequisitos
- Versión estable de [Node.js](https://nodejs.org/) (LTS)
- Yarn instalado

### Instalación de Dependencias
```bash
yarn
```

### Post Instalación
Ejecutar el siguiente comando para tener el pre-commit:
```bash
yarn husky:install
```

### Ejecutar el Proyecto
1. Ejecutar el comando:
   ```bash
   yarn dev
   ```
2. Abrir un navegador y dirigirse a:
   - http://localhost:8081/
   - http://localhost:8081/docs

### Validar Versionamiento de las Dependencias
```bash
yarn outdated
```

**Nota**: Si hay warnings o errores, comuníquese con el Arquitecto.

### Copiar la Estructura del Proyecto
```bash
cp -R ./ destination_folder
```

## Scripts

- **build**: Compilar el proyecto
  ```bash
  yarn build
  ```

- **infra-as-code**: Generar recursos de infraestructura en GCP
  ```bash
  yarn infra-as-code
  ```

- **lint**: Ejecutar el linter
  ```bash
  yarn lint
  ```

- **format**: Formatear el código
  ```bash
  yarn format
  ```

- **format-check**: Verificar el formato del código
  ```bash
  yarn format-check
  ```

- **dev**: Ejecutar el servidor en modo desarrollo
  ```bash
  yarn dev
  ```

- **start**: Ejecutar el servidor
  ```bash
  yarn start
  ```

- **start:debug**: Ejecutar el servidor en modo debug
  ```bash
  yarn start:debug
  ```

- **test**: Ejecutar los tests
  ```bash
  yarn test
  ```

- **coverage**: Mostrar la cobertura de pruebas
  ```bash
  yarn coverage
  ```

- **release**: Generar CHANGELOG.md para despliegue
  ```bash
  yarn release
  ```