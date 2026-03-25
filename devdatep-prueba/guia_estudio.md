# 📚 Guía de Estudio: Nivel 2 (Intermedio)

Esta guía te ayudará a explicar técnicamente todo lo que hemos construido en este nivel. Está diseñada para que sepas el "por qué" de cada decisión.

---

## 1. Arquitectura y "Clean Code"
**¿Qué hicimos?**
- Aislamos la lógica de los comentarios en un **Custom Hook** (`useComments.js`).
- Centralizamos las validaciones en una carpeta `/schemas`.

**¿Por qué es importante?**:
> *"He aplicado el principio de **Separación de Responsabilidades**. El componente UI solo se encarga de pintar, mientras que toda la lógica de persistencia y esquemas de validación viven en archivos independientes. Esto hace que el código sea testeable, reutilizable y profesional."*

---

## 2. Colorimetría y Diseño (UX/UI)
**Paleta de Colores:**
- **Rojo Base (#8b3030):** Color principal que evoca la intensidad de Dragon Ball.
- **Naranja Accento (#f5a623):** Usado en botones para captar la atención.
- **Crema (#f5f0dc):** Texto suave a la vista sobre fondos oscuros.

---

## 3. Navegación con React Router
Rutas dinámicas (`/character/:id`) usando `useParams` para capturar el ID y `Link` para una navegación fluida sin recarga de página.

---

## 4. Validación con Zod
Usamos **Zod** junto con **React Hook Form**.
> *"Zod nos permite definir un **Esquema de Verdad**. Centralizarlo en `/schemas` asegura que las reglas de negocio sean fáciles de encontrar y reutilizar en diferentes partes de la aplicación (como en formularios de edición y creación)."*

---

## 5. Gestión de Datos con React Query
Usamos `useQuery` para manejar la caché y los estados de carga de forma automática.
