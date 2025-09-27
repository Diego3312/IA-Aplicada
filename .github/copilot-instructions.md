# Copilot Instructions for Aurora

Aurora is a web/mobile-first personal planner with a .NET backend and React frontend. It uses SQLite for persistence and integrates OpenAI API for NLP features.

## Architecture Overview
- **Frontend:** React (mobile-first), located in `/frontend`. Key components: calendar, event management, user settings, conversational input.
- **Backend:** ASP.NET Core (.NET 8), located in `/backend`. RESTful API, all data validations via FluentValidation. SQLite database (`/backend/aurora.db`).
- **AI Integration:** Backend connects to OpenAI API for NLP parsing of user input.

## Key Patterns & Conventions
- **Frontend:**
  - Use camelCase for variables/functions, PascalCase for components.
  - Prioritize mobile-first and accessibility in UI.
  - All user-facing texts and UI labels must be in Spanish.
- **Backend:**
  - Use PascalCase for classes/methods, camelCase for variables, _camelCase for private fields.
  - All code, comments, and identifiers must be in English.
  - All validations are implemented with FluentValidation (no DataAnnotations/manual checks).
  - Return descriptive error codes/messages to frontend on validation failure.
- **API:**
  - JSON for all requests/responses.
  - Endpoints follow RESTful conventions (e.g., `/events`, `/auth`, `/nlp`).

## Developer Workflows
- **Testing:**
  - Frontend: Jest + React Testing Library.
  - Backend: xUnit. Minimum 80% coverage.
- **Build/Run:**
  - Backend: `dotnet restore`, `dotnet ef database update`, `dotnet run`.
  - Frontend: `npm install`, `npm start`.

## Integration Points
- **OpenAI API:** Used for NLP parsing in event creation. See backend `/nlp` endpoint.
- **SQLite:** All persistent data stored in `/backend/aurora.db`.

## Project-Specific Rules
- All user-facing responses, UI texts, and documentation for end users must be in Spanish.
- All source code (classes, variables, methods, comments) must be in English.
- Follow the validation and business rules defined in user stories and instructions.
- Maintain folder/file structure as described above.

## Example Files
- `/frontend/` — React components, Spanish UI
- `/backend/Validators/` — FluentValidation classes
- `/backend/aurora.db` — SQLite database
