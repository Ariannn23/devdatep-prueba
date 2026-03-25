# Dragon Ball Z - SPA

## Tecnologías

- **Frontend**: React 18 + Vite.
- **Estilos**: Tailwind CSS
- **Estado Global/Caché**: React Query
- **Validación de Datos**: Zod
- **Peticiones HTTP**: Axios (Instancias personalizadas para múltiples APIs).
- **Animaciones**: Framer Motion
- **Iconografía**: React Icons (Fa Icons).

## Arquitectura Scalable (Feature-based)

El proyecto está organizado por "Features" para maximizar la mantenibilidad:

- `src/features/characters`: Gestión de guerreros, filtros y búsqueda.
- `src/features/missions`: CRUD completo de misiones inter-galácticas.
- `src/features/comments`: Sistema de opiniones y feedback.
- `src/api`: Centralización de clientes Axios (Base API y REST Countries).
- `src/hooks`: Lógica reutilizable y hooks personalizados.
- `src/components/ui`: Componentes atómicos (Skeletons, CustomSelects).

## Implementación Nivel 3 (Avanzado)

### 1. CRUD Completo de Entidad (Misiones)

- **Crear**: Formulario dinámico con validación en tiempo real.
- **Listar**: Vista en grid con estados de skeleton y animaciones de entrada.
- **Actualizar**: Edición directa desde el listado con precarga de datos.
- **Eliminar**: Borrado persistente con feedback visual instantáneo.
- **Persistencia**: Sincronización transparente con `LocalStorage` vía React Query.

### 2. Validación & Comunicación

- **Zod**: Esquemas de validación estricta para garantizar la integridad de las misiones (`missionSchema.js`).
- **Axios**: Manejo de peticiones asíncronas con interceptores y gestión de estados de error.

### 3. Integración Multi-API

Relación de datos entre dos fuentes externas:

- **Dragon Ball API**: Listado de personajes, razas y estadísticas.
- **REST Countries API**: Selección de países reales para la ubicación de las misiones.

### 4. UI/UX Premium & Movimiento Inteligente

- **Staggered Animations**: Las listas se revelan de forma escalonada.
- **Intelligent Motion**: El sistema detecta si la página ya está en caché para omitir animaciones redundantes durante la navegación, pero las mantiene al filtrar.
- **Custom Scrollbars**: Scroll estilizado y corregido para una estética 100% limpia.

## Instalación y Desarrollo

1. Descarga las dependencias: `npm install`
2. Ejecutar el servidor de desarrollo: `npm run dev`
3. Construir para producción: `npm run build`

## Despliegue Manual (Vercel)

Para desplegar este proyecto de forma manual en **Vercel**:

1. **Subir a GitHub**: Subir el código a un repositorio de GitHub.
2. **Conectar a Vercel**:
   - Ve a [Vercel](https://vercel.com/) e inicia sesión.
   - Haz clic en **"Add New"** > **"Project"**.
   - Importa tu repositorio de GitHub.
3. **Configuración**:
   - Vercel detectará automáticamente que es un proyecto de **Vite**.
   - Haz clic en **"Deploy"**.
4. **¡Listo!**: Tu aplicación estará en línea en pocos segundos con una URL pública.
