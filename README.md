
# Proyecto de Gestión de Proyectos con AdonisJS

Este proyecto es una API REST para la **gestión de proyectos** construida con [AdonisJS v6](https://docs.adonisjs.com/) y base de datos MariaDB.

## Requisitos

- Node.js >= 18.x
- MariaDB instalado y corriendo localmente
- [AdonisJS CLI](https://docs.adonisjs.com/guides/installation) instalado globalmente (opcional)

---

## Pasos para correr el proyecto localmente

### 1. Clona el repositorio

```bash
git clone https://github.com/EIMYR15/gestion-proyectos-backend.git
cd gestion-proyectos-backend
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Copia el archivo de ejemplo y modifica los valores necesarios:

```bash
cp .env.example .env
```

Edita `.env` y asegúrate de definir:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=nombre_de_tu_db
```

> **Nota:** Asegúrate de que MariaDB esté instalado y corriendo localmente.

---

### 4. Ejecuta el comando de inicialización

Este comando:

- Genera la clave de la app (`APP_KEY`)
- Crea la base de datos (si no existe)
- Ejecuta las migraciones

```bash
npm run app:init
```

---

### 5. Levanta el servidor de desarrollo

```bash
npm run dev
```

La API estará disponible en `http://127.0.0.1:3333`.

---

## Endpoints disponibles

- Este proyecto expone un CRUD completo para la gestión de usuarios como parte del sistema.
