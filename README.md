# Employee Management System

Sistema de administración de empleados desarrollado con Node.js, Express, MySQL y JWT.

## Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Token)
- HTML
- JavaScript
- Axios

---

## Funciones del sistema

- Inicio de sesión con JWT
- Mostrar empleados
- Buscar empleados por ID o nombre
- Agregar empleados
- Editar empleados
- Eliminar empleados
- Protección de rutas mediante token

---

## Instalación

### 1. Clonar repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

---

### 2. Instalar dependencias

```bash
npm install
```

---

### 3. Importar base de datos

Importar el archivo:

```bash
proyecto_taller_node.sql
```

en phpMyAdmin.

---

### 4. Configurar base de datos

Verificar que los datos de conexión en:

```bash
config/database.js
```

coincidan con la configuración local de MySQL.

Ejemplo:

```js
host: 'localhost',
user: 'root',
password: '',
database: 'proyecto_taller_node'
```

---

### 5. Ejecutar servidor


```bash
npm start
```

---

## Usuario de prueba

```txt
Usuario: admin
Contraseña: 12345
```

---

## Rutas principales API

### Login

```http
POST /user/login
```

---

### Obtener empleados

```http
GET /employees
```

---

### Agregar empleado

```http
POST /employees
```

---

### Actualizar empleado

```http
PUT /employees/:id
```

---

### Eliminar empleado

```http
DELETE /employees/:id
```

---

## Autor

Joshua Ismael Serna Ventura