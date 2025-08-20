# Koradi Bingo - Arte que Sana

![Koradi Bingo](./client/src/assets/koradi-logo.png)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![Express](https://img.shields.io/badge/express-4.19.2-lightgrey.svg)

Plataforma de Bingo de donación diseñada para recaudar fondos para el programa de rehabilitación de la Fundación Koradi.

Esta aplicación web interactiva combina la emoción del bingo con el impacto social, con el objetivo de recaudar COP $21.100.000 - $24.100.000 para mejorar las condiciones de vida de 25 jóvenes en rehabilitación.

Es una plataforma full-stack que combina tecnologías como React para el frontend, Node.js y Express para el backend, y MongoDB para la base de datos.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Primeros Pasos](#primeros-pasos)
  - [Prerrequisitos](#prerrequisitos)
  - [Instalación](#instalación)
- [Uso](#uso)
  - [Modo de Desarrollo](#modo-de-desarrollo)
  - [Modo de Producción](#modo-de-producción)
  - [Comandos Make Disponibles](#comandos-make-disponibles)
- [Endpoints de la API](#endpoints-de-la-api)
- [Configuración de Bold](#configuración-de-bold)
- [Configuración de Webhook de Stripe](#configuración-de-webhook-de-stripe)
- [Configuración de servidor seguro](#configuración-de-servidor-seguro)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Licencia](#licencia)
- [Contribuir](#contribuir)
- [Créditos](#créditos)

## Descripción

Koradi Bingo es una plataforma de bingo moderna y en tiempo real que permite a los participantes comprar cartones de bingo o hacer donaciones directas para apoyar a jóvenes en rehabilitación. La plataforma cuenta con sorteo de números en vivo, verificación automática de ganadores, seguimiento de progreso en tiempo real y procesamiento seguro de pagos a través de Stripe.

El proyecto encarna la misión "Arte que Sana" combinando tecnología con impacto social, creando una forma atractiva para que la comunidad contribuya a una causa significativa.

## Características

- 🎯 **Juego de Bingo en Tiempo Real**: Sorteo de números en vivo con Socket.IO para actualizaciones instantáneas
- 💳 **Pagos Seguros**: Integración con Stripe para cartones de bingo (COP $30.000) y donaciones libres
- 🏆 **Detección Automática de Ganadores**: Algoritmo inteligente que valida las victorias de bingo (horizontal, vertical, diagonal)
- 📊 **Seguimiento de Progreso en Vivo**: Progreso de donaciones en tiempo real hacia la meta de recaudación
- 📱 **Diseño Responsivo**: Interfaz amigable para móviles con la identidad visual de Koradi
- 🔐 **Panel de Administración**: Herramientas para el personal para gestionar sorteos y monitorear reclamos
- 🎫 **Cartones de Bingo Únicos**: Cartones generados algorítmicamente siguiendo las reglas estándar B-I-N-G-O
- 🌐 **Soporte Multi-idioma**: Diseñado para audiencia de habla hispana
- ⚡ **Notificaciones en Tiempo Real**: Actualizaciones instantáneas para sorteos de números y reclamos de bingo

## Tecnologías

### Backend
- **Node.js** (≥18.0.0) - Entorno de ejecución
- **Express.js** (4.19.2) - Framework web
- **MongoDB** con Mongoose (8.3.1) - Base de datos y ODM
- **Socket.IO** (4.7.5) - Comunicación en tiempo real
- **Stripe** (14.0.0) - Procesamiento de pagos
- **CORS** (2.8.5) - Intercambio de recursos de origen cruzado

### Frontend
- **React** (18.2.0) - Framework de UI
- **Vite** (5.3.3) - Herramienta de construcción y servidor de desarrollo
- **Socket.IO Client** (4.7.5) - Cliente en tiempo real

### Herramientas de Desarrollo
- **Nodemon** (3.0.3) - Reinicio automático del servidor de desarrollo
- **Morgan** (1.10.0) - Logger de peticiones HTTP
- **Concurrently** (8.2.2) - Ejecutar múltiples comandos
- **Make** - Automatización de construcción

## Primeros Pasos

### Prerrequisitos

Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

- **Docker** (para despliegue en contenedores)
- **Node.js** (versión 18.0.0 o superior)
- **MongoDB** (instalación local o mejor aun MongoDB Atlas)
- **Cuenta de Bold** (para procesamiento de pagos desde Colombia)
- **Cuenta de Stripe** (para procesamiento de pagos desde Estados Unidos)
- **Git** (para clonar el repositorio)
- **Make** (para automatización de construcción)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/otobonh/koradi-bingo.git
cd koradi-bingo
```

2. **Instalar todas las dependencias (server y client)**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivos `.env` en los directorios raíz y servidor:

**`.env` en directorio client:**
```bash
VITE_APP_DOMAIN_NAME=localhost
VITE_API_BASE_URL=http://${VITE_APP_DOMAIN_NAME}:4000
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key_here
VITE_BOLD_PUBLIC_KEY=pk_test_your_bold_public_key_here
VITE_BINGO_PRICE=${BINGO_PRICE:-30000}
VITE_DEBUG=0
```

**`.env` en directorio server:**
```bash
SERVER_DEBUG=1
PORT=4000
APP_DOMAIN_NAME=localhost
MONGO_DATABASE=koradi_bingo
MONGO_USERNAME=root
MONGO_PASSWORD=example
MONGO_URI=mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo:27017
CORS_ORIGIN=http://${APP_DOMAIN_NAME}
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
BOLD_PRIVATE_KEY=pk_test_your_bold_private_key_here
APP_NAME="Koradi Bingo"
ORG_NAME="Fundación Koradi"
GOAL_MIN=21100000
GOAL_MAX=24100000
BINGO_PRICE=30000
ADMIN_USERNAME=username
ADMIN_PASSWORD=password
```

4. **Iniciar MongoDB**

Asegúrate de que MongoDB esté ejecutándose en tu sistema o configura la conexión a MongoDB Atlas.

## Uso

### Modo de Desarrollo

* Con Docker y MongoDb local

**Iniciar cliente, servidor y mongoDB simultáneamente:**
```bash
make run
```

**Reinicio de servicios:**
```bash
make restart
```

**Detener servicios:**
```bash
make down
```

* Con Vite, NodeJS y MongoDb Atlas

**Iniciar cliente y servidor simultáneamente:**
```bash
npm run dev
```

**O iniciarlos por separado:**

**Iniciar el servidor:**
```bash
cd server
make dev
```

**Iniciar el cliente (en otra terminal):**
```bash
cd client
make dev
```

### Modo de Producción

**Construir el cliente:**
```bash
cd client
make build
```

**Iniciar el servidor:**
```bash
cd server
make start
```

**Entrar en el sistema**

- Cargar el navegador web de su preferencia
- Ir a [http://localhost](http://localhost)

### Comandos Make Disponibles

**Comandos del directorio raíz:**
```bash
make run                # Ejecutar en modo desarrollo
make up                 # Ejecutar en modo producción
make down               # Detener servicios
make restart            # Reiniciar servicios (con docker-compose restart)
make hard-restart       # Reiniciar servicios desde cero
make logs               # Mostrar logs
make logs-f             # Seguir logs
make clean-docker       # Limpiar docker
make status             # Mostrar estado de los servicios en Docker
make install            # Instalar dependencias de todos los proyectos (server y client)
make build              # Construir el cliente
make start              # Iniciar el servidor
make dev                # Iniciar el cliente
make clean              # Limpiar dependencias de todos los proyectos (server y client)
make list-scripts       # Listar scripts disponibles
make ssl-certs-creation # Crear certificados SSL
```

**Comandos del servidor:**
```bash
cd server
make install     # Instalar dependencias
make run         # Ejecutar en modo desarrollo
make dev         # Alias de run
make start       # Ejecutar en modo producción
make clean       # Limpiar node_modules y package-lock.json
make reinstall   # Limpiar y reinstalar dependencias
make help        # Mostrar comandos disponibles
```

**Comandos del cliente:**
```bash
cd client
make install       # Instalar dependencias
make build         # Construir para producción
make run           # Ejecutar en modo desarrollo
make dev           # Alias de run
make preview       # Vista previa de construcción de producción
make clean         # Limpiar node_modules, package-lock.json y dist
make reinstall     # Limpiar y reinstalar dependencias
make build-preview # Construir y previsualizar versión de producción
make help          # Mostrar comandos disponibles
```

### Endpoints de la API

- `GET /api/health` - Verificación de salud
- `GET /api/progress` - Obtener progreso de donaciones
- `POST /api/checkout` - Crear sesión de checkout de Stripe
- `GET /api/my-card` - Obtener cartón de bingo del usuario
- `POST /api/claim-bingo` - Reclamar victoria de bingo
- `GET /api/draw/state` - Obtener estado actual del sorteo
- `GET /api/live-url` - Obtener URL de transmisión
- `POST /api/bold-hash` - Generar hash de Bold
- `POST /api/admin/draw/next` - Sortear siguiente número (admin)
- `POST /api/admin/draw/reset` - Reiniciar sorteo (admin)
- `POST /api/admin/login` - Iniciar sesión (admin)
- `POST /api/admin/set-live-url` - Establecer URL de transmisión (admin)

### Configuración de Bold

Configura tu cuenta de Bold en [bold.co](https://bold.co).

Luego extrae las credenciales de tu cuenta de Bold y agrégalas a los archivos `.env` del servidor y del cliente.

En el archivo `client/.env` del cliente:
```env
# Llave publica de Bold
VITE_BOLD_PUBLIC_KEY=pk_test_tu_clave_publica_bold
```

En el archivo `server/.env` del servidor:
```env
# Llave privada de Bold
BOLD_PRIVATE_KEY=pk_test_your_bold_private_key_here
```

### Configuración de Webhook de Stripe

Configura tu cuenta de Stripe en [stripe.com](https://stripe.com).

Luego extrae las credenciales de tu cuenta de Stripe y agrégalas a los archivos `.env` del servidor y del cliente.

En el archivo `client/.env` del cliente:
```env
# Llave publica de Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key_here
```

En el archivo `server/.env` del servidor:
```env
# Llave privada de Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
# Llave de webhook de Stripe
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

Configura tu endpoint de webhook de Stripe para que apunte a:

```
https://tudominio.com/api/stripe/webhook
```

Eventos a escuchar:
- `checkout.session.completed`

### Configuración de servidor seguro

Configura tu servidor local para que use SSL, de tal forma de poder probar las funcionalidades de pago, ya que algunas APIs de pago y funcionailidades de Javascript (por ejemplo `crypto`) requieren que el servidor sea seguro.

Para ello, puedes usar el script `make ssl-certs-creation` que creará los certificados SSL en el directorio `server/ssl`.

Crear una entrada en el archivo `/etc/hosts` con el siguiente contenido:

```bash
sudo nano /etc/hosts
```

Agregar la siguiente línea:

```
127.0.0.1 koradibingo.dev
```

Luego se debe configurar las siguientes variables en los archivos `.env` del servidor y del cliente:

En el archivo `client/.env` del cliente:
```env
VITE_APP_DOMAIN_NAME=koradibingo.dev
VITE_API_BASE_URL=https://${VITE_APP_DOMAIN_NAME}
```

En el archivo `server/.env` del servidor:
```env
APP_DOMAIN_NAME=koradibingo.dev
CORS_ORIGIN=https://${APP_DOMAIN_NAME}
```

## Estructura del Proyecto

```
koradi-bingo/
├── README.md
├── LICENSE
├── package.json              # Gestor de workspace (npm workspaces)
├── .env.example
├── server/                   # Backend (Express + MongoDB + Socket.IO)
│   ├── Makefile
│   ├── package.json
│   ├── webhookTest.http
│   └── src/
│       ├── server.js         # Archivo principal del servidor
│       ├── config/
│       │   ├── db.js         # Conexión a MongoDB
│       │   └── env.js        # Configuración de entorno
│       ├── models/
│       │   ├── User.js       # Esquema de usuario
│       │   ├── BingoCard.js  # Esquema de cartón de bingo
│       │   ├── Donation.js   # Esquema de donación
│       │   └── DrawState.js  # Esquema de estado del sorteo
│       ├── services/
│       │   ├── bingo.js      # Lógica de bingo y generación de cartones
│       │   └── payments.js   # Procesamiento de pagos con Stripe
│       ├── routes/
│       │   ├── public.js     # Rutas públicas de la API
│       │   └── admin.js      # Rutas de administración de la API
│       └── utils/
│           └── logger.js     # Utilidad de logging
├── client/                   # Frontend (React + Vite)
│   ├── Makefile
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── main.jsx          # Punto de entrada de React
│       ├── App.jsx           # Componente principal de la App
│       ├── api.js            # Cliente de API
│       ├── styles.css        # Estilos globales
│       ├── components/       # Componentes de React
│       └── assets/           # Recursos estáticos
└── deploy/                   # Configuración de despliegue
    ├── docker-compose.yml
    └── nginx.conf
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## Contribuir

1. Haz fork del repositorio
2. Crea tu rama de característica (`git checkout -b feature/CaracteristicaIncreible`)
3. Confirma tus cambios (`git commit -m 'Agregar alguna CaracteristicaIncreible'`)
4. Empuja a la rama (`git push origin feature/CaracteristicaIncreible`)
5. Abre un Pull Request

Por favor, asegúrate de actualizar las pruebas según corresponda y seguir el estilo de código existente.

## Créditos

Este proyecto es desarrollado y mantenido por [Omar Tobon](https://omartobon.com). Para más información o para contribuir al proyecto, visita [Koradi Bingo](https://github.com/otobonh/koradi-bingo).

---

**Fundación Koradi - Arte que Sana** 🎨✨  
*Apoyando a jóvenes en rehabilitación a través del poder sanador del arte y la comunidad.*