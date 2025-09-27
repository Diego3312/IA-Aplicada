# Modelado de Datos - Aurora

Aurora utiliza SQLite como base de datos para persistencia. El modelado de datos principal incluye:

## Usuario
- Id (int, PK, autoincrement)
- Nombre (string, requerido, máx. 50)
- Email (string, requerido, único, formato email)
- ContraseñaHash (string, requerido)
- ZonaHoraria (string, requerido)
- FechaRegistro (datetime, requerido)
- Preferencias (json/string, opcional)

## Evento
- Id (int, PK, autoincrement)
- Titulo (string, requerido, máx. 100)
- Descripcion (string, opcional, máx. 250)
- Fecha (date, requerido)
- HoraInicio (time, requerido)
- HoraFin (time, requerido, > HoraInicio)
- Categoria (string, requerido, enum: Trabajo, Estudio, Personal, Ejercicio, Descanso)
- UsuarioId (int, FK a Usuario)
- Recurrencia (string/json, opcional)
- ConfianzaNLP (float, opcional, para eventos creados por IA)

## PreferenciaUsuario
- Id (int, PK, autoincrement)
- UsuarioId (int, FK a Usuario)
- HorarioLaboral (string, opcional, ej: "09:00-18:00")
- DiasEjercicio (string, opcional, ej: "Lunes,Miércoles")
- PrimerDiaSemana (string, opcional, ej: "Lunes")
- PalabrasClave (string/json, opcional)
- Tema (string, opcional, ej: "claro"/"oscuro")
- Notificaciones (bool, opcional)

## Conversacion (para IA/chat)
- Id (int, PK, autoincrement)
- UsuarioId (int, FK a Usuario)
- Mensaje (string, requerido, máx. 500)
- FechaHora (datetime, requerido)
- Tipo (string, enum: enviado/recibido)
- Contexto (string/json, opcional)
