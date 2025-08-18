# Koradi Bingo - Arte que Sana

![Koradi Bingo](./client/src/assets/koradi-logo.png)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
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
- **Cuenta de Stripe** (para procesamiento de pagos)
- **Make** (para automatización de construcción)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/otobonh/koradi-bingo.git
cd koradi-bingo
```

2. **Instalar dependencias raíz**
```bash
npm install
```

3. **Instalar dependencias del servidor**
```bash
cd server
make install
```

4. **Instalar dependencias del cliente**
```bash
cd ../client
make install
```

5. **Configurar variables de entorno**

Crear archivos `.env` en los directorios raíz y servidor:

**`.env` raíz:**
```bash
VITE_API_BASE_URL=http://localhost:4000
VITE_STRIPE_PUBLIC_KEY=pk_test_tu_clave_publica_stripe
```

**`.env` del servidor:**
```bash
PORT=4000
MONGO_URI=mongodb://localhost:27017/koradi_bingo
CORS_ORIGIN=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta_stripe
STRIPE_WEBHOOK_SECRET=whsec_tu_secreto_webhook
ORG_NAME="Fundación Koradi"
GOAL_MIN=21100000
GOAL_MAX=24100000
BINGO_PRICE=30000
JWT_SECRET=tu_secreto_jwt_aqui
```

6. **Iniciar MongoDB**

Asegúrate de que MongoDB esté ejecutándose en tu sistema o configura la conexión a MongoDB Atlas.

## Uso

### Modo de Desarrollo

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

**Comandos del servidor:**
```bash
cd server
make install     # Instalar dependencias
make dev         # Ejecutar en modo desarrollo
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
make dev           # Ejecutar en modo desarrollo
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
- `POST /api/admin/draw/next` - Sortear siguiente número (admin)
- `POST /api/admin/draw/reset` - Reiniciar sorteo (admin)

### Configuración de Webhook de Stripe
Configura tu endpoint de webhook de Stripe para que apunte a:
```
https://tudominio.com/api/stripe/webhook
```

Eventos a escuchar:
- `checkout.session.completed`

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