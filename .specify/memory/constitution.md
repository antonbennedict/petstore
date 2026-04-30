<!--
Sync Impact Report:
- Version change: N/A → 1.0.0
- List of modified principles:
  - API-First (New)
  - Component-Based UI (New)
  - Data Integrity (New)
  - Cloud-Native Deployment (New)
  - Atomic Features (New)
- Added sections: Technology Stack, Development Workflow
- Removed sections: N/A
- Templates requiring updates:
  - .specify/templates/plan-template.md (✅ updated)
  - .specify/templates/tasks-template.md (✅ updated)
  - .specify/templates/spec-template.md (✅ checked, no changes needed)
- Follow-up TODOs: None
-->

# Petstore Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### I. API-First
All backend functionality must be exposed via well-documented REST APIs using Java Spring Boot. The API serves as the single source of truth for the frontend and any external consumers.

### II. Component-Based UI
The user interface must be built using React with MUI components to ensure consistency, accessibility, and a modern aesthetic. Tailwind CSS should be used for layout and custom styling that falls outside the MUI component set.

### III. Data Integrity
Enforce strict database schemas in PostgreSQL. Use JPA/Hibernate for object-relational mapping to ensure type safety and data consistency across the application.

### IV. Cloud-Native Deployment
The application is designed for deployment on Render. Use environment-based configuration for all sensitive data and service-specific settings. Ensure the application is stateless to support horizontal scalability.

### V. Atomic Features
Each feature (e.g., product listings, shopping cart, checkout) should be implemented as a vertical slice including its own API endpoints, database models, and UI components to ensure independent testability and maintainability.

## Technology Stack
The petstore application is built using the following technologies:
- **Backend**: Java 17+, Spring Boot 3.x, Spring Data JPA, Spring Security. Base package: `com.lulu.petstore`.
- **Database**: PostgreSQL.
- **Frontend**: React 18, TypeScript, Material UI (MUI), Tailwind CSS.
- **Deployment**: Render (Web Services for backend/frontend, Managed PostgreSQL).

## Development Workflow
- **Branching**: All work must be done in feature branches.
- **Testing**: JUnit and Mockito for backend tests. Vitest and React Testing Library for frontend tests.
- **Review**: All pull requests must be reviewed by at least one peer.
- **CI/CD**: Automated builds and tests must pass before deployment to Render.

## Governance
The Constitution is the ultimate authority for project standards. All development must align with these principles.

- All PRs/reviews must verify compliance.
- Complexity must be justified.
- Amendments require a majority agreement and a version bump.

**Version**: 1.0.0 | **Ratified**: 2026-04-30 | **Last Amended**: 2026-04-30
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
