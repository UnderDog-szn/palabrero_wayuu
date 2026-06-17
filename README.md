# Monumento al Palabrero Wayúu 🗿

Una plataforma web interactiva dedicada al Monumento al Palabrero Wayúu (Putchipuu) en Riohacha, La Guajira, Colombia. Proyecto desarrollado como parte de la asignatura de Ingeniería de Sistemas en la Universidad de La Guajira.

## 🌟 Características Principales

### 📋 Información Cultural
- **Nombre del Monumento**: Monumento al Palabrero Wayúu (Putchipuu)
- **Ubicación**: Riohacha, La Guajira, Colombia
- **Autor**: Jacinto Celadora
- **Año**: 2005
- **Reseña Histórica**: Información completa sobre la figura del Palabrero en la cultura Wayúu
- **Significado Cultural**: Contexto sobre el reconocimiento UNESCO (2010)
- **Importancia Local**: Relevancia para Riohacha y La Guajira

### 🎨 Elementos Interactivos

#### 1. **Formulario de Registro Interactivo**
- Validación visual en tiempo real con checkmarks
- Sistema de notificaciones toast (éxito, error, información)
- Campos: Rango de edad, Procedencia, Tipo de visitante
- Diseño responsivo y accesible

#### 2. **Carrusel de Imágenes Mejorado**
- Navegación por botones, puntos o teclas flecha (← →)
- Soporte para swipe/drag en móvil
- Transiciones suaves con opacidad
- Autoplay cada 6 segundos
- 5 imágenes del monumento

#### 3. **Quiz Interactivo**
- 4 preguntas sobre la cultura Wayúu
- Validación de respuestas
- Puntuación en porcentaje
- Mensajes personalizados según desempeño
- Retroalimentación visual

#### 4. **Mapa Interactivo con Algoritmo Dijkstra**
- Mapa de Riohacha usando Leaflet.js + OpenStreetMap
- 6 monumentos y sitios turísticos
- Cálculo de rutas más cortas usando el **Algoritmo de Dijkstra**
- Visualización de rutas en el mapa
- Detalles paso a paso de las rutas
- Estadísticas de distancia y paradas

#### 5. **Video Educativo**
- Reproductor embebido de YouTube
- Contenido sobre el Palabrero Wayúu

#### 6. **Línea de Tiempo Interactiva**
- 5 eventos históricos principales
- Diseño en zigzag alternado
- Línea central con gradiente
- Totalmente responsiva

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos avanzados (Grid, Flexbox, Animaciones)
- **JavaScript Vanilla** - Funcionalidades interactivas
- **Leaflet.js** - Mapas interactivos

### Backend
- **Node.js** - Servidor
- **Express.js** - Framework web
- **Integración con API de encuestas**: https://sevidor-encuestas-production.up.railway.app

### Despliegue
- **Railway.app** - Hosting en la nube

## 📱 Características Responsivas

El sitio es completamente responsivo para:
- 📱 Dispositivos móviles (320px+)
- 📱 Tablets (600px+)
- 💻 Laptops y desktops

Optimizaciones especiales:
- Mapa ajustado a 350px en móvil
- Controles del mapa en una sola columna
- Fuentes ajustadas para mejor legibilidad
- Espaciado optimizado

## 🚀 Instalación Local

### Requisitos
- Node.js (v14 o superior)
- npm o yarn

### Pasos
1. **Clonar el repositorio**
```bash
git clone https://github.com/UnderDog-szn/palabrero_wayuu.git
cd palabrero_wayuu
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor**
```bash
node server.js
```

4. **Acceder a la aplicación**
```
http://localhost:3000
```

## 📦 Dependencias

```json
{
  "express": "^5.2.1",
  "qrcode": "^1.5.4"
}
```

### Librerías del lado del cliente (CDN)
- **Google Fonts**: Playfair Display, Lato
- **Leaflet.js**: Mapas interactivos
- **OpenStreetMap**: Datos de mapas

## 🔧 Estructura del Proyecto

```
palabrero-wayuu/
├── server.js                 # Servidor Express
├── package.json             # Dependencias
├── README.md                # Este archivo
├── generarQR.js             # Generador de QR
└── public/
    ├── index.html           # Página principal
    ├── css/
    │   └── styles.css       # Estilos principales
    ├── js/
    │   └── main.js          # Lógica JavaScript
    └── img/                 # Imágenes del monumento
```

## 🎓 Requisitos Cumplidos (Fase 3)

### Información Mínima Requerida ✅
- [x] Nombre del monumento
- [x] Fotografía principal
- [x] Ubicación
- [x] Autor o creador
- [x] Año de construcción
- [x] Reseña histórica
- [x] Significado cultural
- [x] Importancia para Riohacha y La Guajira

### Elementos Adicionales Implementados ✅
- [x] Galería fotográfica (carrusel interactivo)
- [x] Video educativo
- [x] Línea de tiempo
- [x] Mapa de ubicación interactivo
- [x] Quiz interactivo (bonus)
- [x] Notificaciones toast (bonus)
- [x] Algoritmo Dijkstra para rutas (bonus)

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: #8B4513 (Marrón oscuro - tierra Wayúu)
- **Secundario**: #DAA520 (Dorado - energía cultural)
- **Fondo**: #f5f0e8 (Beige suave)
- **Texto**: #2c1810 (Marrón oscuro)

### Tipografía
- **Títulos**: Playfair Display (elegante, formal)
- **Body**: Lato (legible, amigable)

## 🔐 Seguridad

- Validación de entrada en formularios
- Protección contra XSS (manejo de contenido dinámico)
- HTTPS en producción (Railway)
- CORS configurado

## 📊 Algoritmo Dijkstra

El mapa utiliza el **Algoritmo de Dijkstra** para calcular la ruta más corta entre monumentos:

```javascript
- Entrada: Nodo origen, nodo destino
- Salida: Ruta más corta, distancia total
- Complejidad: O(V²) donde V = número de vértices
```

**Locaciones disponibles:**
1. Monumento Palabrero
2. Catedral de Riohacha
3. Malecón de Riohacha
4. Plaza Principal
5. Puerto de Riohacha
6. Mercado Central

## 🌐 Despliegue en Railway

La aplicación está desplegada en **Railway.app** con CI/CD automático:

```bash
# Hacer cambios
git add .
git commit -m "descripción"
git push origin main

# Railway automáticamente:
# 1. Detecta los cambios
# 2. Hace un nuevo build
# 3. Despliega la aplicación
```

**URL de producción:**
```
https://palabrero-wayuu-production.up.railway.app
```

## 📞 API Integrada

### Endpoint de Respuestas de Encuesta
```
POST https://sevidor-encuestas-production.up.railway.app/respuestas
```

**Payload:**
```json
{
  "id_encuesta": 1,
  "respuestas": [
    { "id_pregunta": 1, "id_opcion": 2 },
    { "id_pregunta": 2, "id_opcion": 7 },
    { "id_pregunta": 3, "id_opcion": 11 }
  ]
}
```

## 🤝 Contribuyentes

- **Desarrollado por**: Estudiante de Ingeniería de Sistemas
- **Universidad**: Universidad de La Guajira
- **Asignatura**: Ingeniería de Sistemas

## 📚 Referencias

- [UNESCO - Patrimonio Cultural Inmaterial](https://ich.unesco.org/)
- [Wayuu - Pueblo Originario](https://es.wikipedia.org/wiki/Pueblo_wayuu)
- [Leaflet.js - Documentación](https://leafletjs.com/)
- [Express.js - Documentación](https://expressjs.com/)

## 📝 Licencia

Este proyecto está bajo la licencia ISC. Consulta el archivo `package.json` para más detalles.

## ✨ Mejoras Futuras

- [ ] Integración con redes sociales (compartir)
- [ ] Sección de comentarios de visitantes
- [ ] Galería 360° del monumento
- [ ] Guía interactiva en audio
- [ ] Sistema de notificaciones push
- [ ] Análisis de datos de visitantes
- [ ] Traducción a wayuunaiki (lengua originaria)

## 📧 Contacto

Para preguntas o sugerencias sobre este proyecto, contacta a través de la Universidad de La Guajira.

---

**Hecho con ❤️ en Riohacha, La Guajira**

*Honrando la sabiduría del Palabrero Wayúu a través de la tecnología*