# 🛍️ MarketPlace SecondHand Hub

Este proyecto es una **plataforma web de productos de segunda mano**, desarrollada con técnologías modernas tanto en el frontend como en el backend. Permite a los usuarios registrase, publicar productos, gestionar favoritos, editar el perfil y más.

---

## 🚀 Técnologías utilizadas

### 🖥️ FrontEnd (React + Redux)
- React + Vite
- React Redux (Gestión de estados)
- React Router (Para manejo de rutas)
- CSS personalizado
- Cloudinary (Subida de imágenes)
- Fetch API para consumo de la API REST

### ⚙️ BackEnd ( Node.js + Express)
- NodeJs con express
- MongoDB + Mongoose
- JWT para autenticación
- Nodemailer para envío de email
- Bcrypt para hash de contraseñas
- Cloudinary SDK (Para almacenamiento de imágenes)

---

## 🧩 Funcionalidades principales

### 👤 Usuarios
- Registro y login con JWT
- Edición de perfil (fotografía, dirección, teléfono, DNI, etc...)
- Eliminación de cuenta
- Reseteo de contraseña

### 🛒 Productos
- Publicación de productos con hasta 6 imágenes
- Categorías, estado, marca y ubicación geográfica
- Visualización de productos propios y favoritos
- Filtros de búsqueda y ordenación

### ⭐ Favoritos
- Marcar productos como favoritos
- Gestión desde el perfil de usuario

### 📸 Subida de imágenes
- Súbida múltiple (hasta 6 imágenes png)
- Almacenamiento en Cloudinary
- Visualización y eliminación previa a publicación

---

## 📁 Estructura del proyecto

### 🚀 FrontEnd(`/frontend`)
```bash  
- src/
  - assets/
  - components/
  - core/
    - redux/
        - reducers/
        - store/
    - services/
  - css/
  - pages/
  - utils/
  - App.jsx
  - main.jsx
- index.html
- LICENSE
- README.md   
```


### 🛠 Backend (`/backend`)
```bash  
- controllers/
- core/
- db/
- models/
- routes/
- uploads/
- utils/
- .env
- index.js
```  
---   

## 🧪 Instalación y ejecución

### 🚀 FrontEnd

Introduce los siguientes comandos:
```bash   
cd <dir-frontend>   
npm install   
npm run dev   
```

### 🛠 BackEnd

Asegúrate de crear en la raiz del backend un archivo .env con las siguientes variables:   
[Aportadas por ser necesarias en la conexión, solo para este uso. Caducidad programada.]

```env
PORT=3000
URL_MONGO_DB=mongodb://localhost:27017/second_hand_hub
SECRET_TOKEN=e720ff556878af5acada414f2ed3d45945c64baeae84e9fce2310cecfa32a8f2
SECRET_TOKEN_REFRESH=7ba8138504aa5de7a44ca53d03a9df62bbb81866b36be1d371566ae7888301ba
CLOUDINARY_CLOUD_NAME=dpjutptpa
CLOUDINARY_API_KEY=323518172844378
CLOUDINARY_API_SECRET=B38fGVg_uRNvdAotc-TaXinOmZc
```

Introduce los siguientes comandos:
```bash
cd <dir-backend>
npm install
npm run dev
```

Tip: Para facilidad de manejo, en la conexión inicial del backend, se crean automaticamente usuarios y productos.   
<p style="color: red">¡¡¡Para el reseteo de contraseña de usuario, se debe usar un email válido!!!</p>   

```bash
👥 Usuarios Mockeados:                         
| User: user1@shhub.com | Pass: 1234   │
| User: user2@shhub.com | Pass: 1234   │
| User: user3@shhub.com | Pass: 1234   │
| User: user4@shhub.com | Pass: 1234   │
| User: user5@shhub.com | Pass: 1234   │
``` 

### 🚀 Ejecución y uso
Abre [http://localhost:5173](http://localhost:5173) en tu navegador

---   

### 🧩 Próximas funcionalidades   
Por motivos de tiempo y desarrollo, áun no se han implementado, pero si ideado el poder mandar mensajes entre usuarios y dar puntuacione y validaciones o reports en las transacciones.   


## 📝 Autor   
**Alejandro García Serrano**


## 📝 Licencia
Archivo LICENSE en el raiz del repositorio
