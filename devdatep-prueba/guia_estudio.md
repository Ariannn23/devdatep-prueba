# 📚 Guía de Estudio: Nivel 2 (Intermedio)

Esta guía te ayudará a explicar técnicamente todo lo que hemos construido en este nivel. Está diseñada para que sepas el "por qué" de cada decisión.

---

## 1. Arquitectura y "Clean Code"
**¿Qué hicimos?**
Aislamos la lógica de los comentarios en un **Custom Hook** llamado `useComments.js`.

**¿Por qué es importante?** (Respuesta para entrevista):
> *"He aplicado el principio de **Separación de Responsabilidades**. El componente UI solo se encarga de pintar, mientras que toda la lógica de persistencia (localStorage) y operaciones CRUD vive en un hook independiente. Esto hace que el código sea testeable, reutilizable y mucho más fácil de mantener."*

---

## 2. Colorimetría y Diseño (UX/UI)
**Paleta de Colores:**
- **Rojo Base (#8b3030):** Color principal que evoca la intensidad de Dragon Ball.
- **Naranja Accento (#f5a623):** Usado en botones y elementos activos para captar la atención.
- **Crema (#f5f0dc):** Usado para el texto, ya que es más suave a la vista que el blanco puro sobre fondos oscuros.

**Efectos y Animaciones:**
- **Framer Motion:** Usamos `AnimatePresence` y `layout` para que cuando borres o edites un comentario, los demás se reacomoden suavemente en lugar de "saltar".
- **Skeletons:** Mantienen la estructura visual mientras los datos cargan, evitando que el usuario vea una pantalla vacía o parpadeos bruscos.

---

## 3. Navegación con React Router
Hemos configurado rutas dinámicas (`/character/:id`).
- **useParams:** Lo usamos para capturar el ID de la URL y saber qué personaje mostrar.
- **Link:** Permite una navegación instantánea sin recargar la página (Single Page Application).

---

## 4. Validación con Zod
Usamos **Zod** junto con **React Hook Form**.

**¿Por qué Zod?**:
> *"Zod nos permite definir un **Esquema de Verdad**. Validamos que el nombre tenga al menos 2 caracteres y el comentario al menos 5. Esto asegura la integridad de los datos antes de que lleguen a la lógica del negocio o a la base de datos."*

---

## 5. Gestión de Datos con React Query
En la página de detalle, usamos `useQuery`.
- **Cache:** Si vuelves a entrar a un personaje que ya viste, carga instantáneamente porque React Query guarda los datos en memoria.
- **Simplicidad:** Maneja automáticamente los estados de `isLoading` y `isError`.

---

## Consejos Finales para la Entrevista:
- Si te preguntan por **localStorage**: *"Lo usé para dar una experiencia de persistencia real sin necesidad de un backend complejo en esta etapa del proyecto."*
- Si te preguntan por los **Skeletons**: *"Es una mejor práctica de UX (User Experience) comparado con un spinner de carga tradicional."*
