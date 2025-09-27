---
applyTo: '**'
---
# Aurora - Planificador Inteligente

Aurora es una aplicación web/mobile-first para organización personal, con backend en .NET y frontend en React. Utiliza SQLite como base de datos y OpenAI API para procesamiento de lenguaje natural.

## Estructura del Proyecto

- `/frontend`: Aplicación React (mobile-first)
- `/backend`: API REST ASP.NET Core (.NET 8)
- `/backend/aurora.db`: Base de datos SQLite

## Convenciones de Código

- Frontend: JavaScript (React), camelCase para variables y funciones, PascalCase para componentes
- Backend: C# (.NET), PascalCase para clases y métodos, camelCase para variables, _camelCase para campos privados
- API: JSON para requests/responses

## Pruebas

- Frontend: Jest + React Testing Library
- Backend: xUnit
- Cobertura mínima: 80%

## Instrucciones para Validaciones en Backend (.NET) con FluentValidation

- Todas las validaciones de modelos en el backend deben implementarse usando FluentValidation.
- Si la validación falla, retorna un error descriptivo e identificable con código de error al frontend.
- No uses validaciones manuales en los controladores ni atributos de DataAnnotations; solo FluentValidation.
- Mantén las reglas de validación centralizadas y fácilmente modificables en las clases de validadores.

## Instrucciones de Idioma para Copilot

- Todo el código fuente (clases, variables, métodos, comentarios) debe estar escrito en inglés.
- Todas las respuestas al usuario, textos de la interfaz y documentación para usuarios finales deben estar en español.
- Las instrucciones y documentación técnica para el equipo deben estar en español.

## Indicaciones adicionales para Copilot

- Priorizar el diseño mobile-first y la accesibilidad en los componentes de frontend.
- Seguir las validaciones y restricciones definidas en las historias de usuario.
- Usar SQLite como base de datos en el backend.
- Implementar todas las validaciones de datos con FluentValidation.
- Mantener la estructura y convenciones de carpetas y archivos según lo indicado arriba.
