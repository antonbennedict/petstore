# Tasks: Listing Page

**Input**: Design documents from `/specs/001-listing-page/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are NOT explicitly requested as TDD in the spec, but basic validation is included in implementation tasks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app (Default)**: `backend/src/main/java/com/lulu/petstore/`, `frontend/src/`
- Paths shown below assume web app structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Initialize backend Spring Boot project in `backend/` with dependencies (Web, JPA, Postgres, Security)
- [x] T002 [P] Initialize frontend React/TypeScript project in `frontend/` with MUI and Tailwind CSS
- [x] T003 [P] Configure shared `.env` and `application.properties` per quickstart.md
- [x] T004 [P] Setup project-wide linting and formatting (Checkstyle for Java, ESLint/Prettier for TS)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T005 [P] Configure PostgreSQL database and JPA properties in `backend/src/main/resources/application.properties`
- [x] T006 [P] Implement `Category` entity and repository in `backend/src/main/java/com/lulu/petstore/models/Category.java`
- [x] T007 [P] Implement `Pet` entity and repository in `backend/src/main/java/com/lulu/petstore/models/Pet.java`
- [x] T008 Implement `PetService` for basic CRUD in `backend/src/main/java/com/lulu/petstore/services/PetService.java`
- [x] T009 Setup base `PetController` with `/lulu/pets` prefix in `backend/src/main/java/com/lulu/petstore/controllers/PetController.java`
- [x] T010 [P] Setup frontend API client and environment config in `frontend/src/services/apiClient.ts`

**Checkpoint**: Foundation ready - data models and basic API plumbing are in place.

---

## Phase 3: User Story 1 - Browse All Pets (Priority: P1) 🎯 MVP

**Goal**: Display a responsive grid of available pets fetched from the backend.

**Independent Test**: Navigate to the landing page and confirm that a grid of pet cards (Name, Species, Price, Image) is displayed.

- [x] T011 [P] [US1] Implement `GET /lulu/pets` endpoint with basic pagination in `PetController.java`
- [x] T012 [P] [US1] Create `PetCard` MUI component in `frontend/src/components/PetCard.tsx`
- [x] T013 [US1] Create `ListingPage` to fetch and display pets in `frontend/src/pages/ListingPage.tsx`
- [x] T014 [US1] Integrate `ListingPage` into main App routing in `frontend/src/App.tsx`

**Checkpoint**: MVP Ready - Users can browse all available pets.

---

## Phase 4: User Story 2 - Filter by Species (Priority: P1)

**Goal**: Allow users to filter the pet list by category (Dogs, Cats, Birds, Fishes).

**Independent Test**: Select "Dogs" from the filter bar and verify only dogs are shown.

- [ ] T015 [P] [US2] Implement `GET /lulu/pets/categories` endpoint in `PetController.java`
- [ ] T016 [P] [US2] Add `species` filter parameter to `GET /lulu/pets` in `PetController.java` and `PetService.java`
- [ ] T017 [P] [US2] Create `FilterBar` MUI component in `frontend/src/components/FilterBar.tsx`
- [ ] T018 [US2] Integrate `FilterBar` into `ListingPage.tsx` and update API call to include species filter

---

## Phase 5: User Story 3 - Search Pets by Name (Priority: P2)

**Goal**: Real-time search filtering by pet name.

**Independent Test**: Type a pet's name in the search bar and verify only matching results remain.

- [ ] T019 [P] [US3] Add `search` parameter and name-filtering logic to `GET /lulu/pets` in `backend`
- [ ] T020 [P] [US3] Add search input field to `FilterBar.tsx` or create `SearchBar.tsx`
- [ ] T021 [US3] Update `ListingPage.tsx` to handle search state and trigger filtered API calls

---

## Phase 6: User Story 6 (Clarified) - "Load More" Pagination (Priority: P2)

**Goal**: Handle large inventories using a "Load More" button.

**Independent Test**: Scroll to bottom, click "Load More", and verify new pets are appended to the grid.

- [x] T022 [US6] Implement "Load More" button logic in `ListingPage.tsx` to fetch next page and append to state
- [x] T023 [US6] Add "No more pets to load" visual cue when `last` is true in API response

---

## Phase 7: User Story 4 - View Pet Details (Priority: P3)

**Goal**: Navigate to a dedicated pet details page.

**Independent Test**: Click a pet card and verify navigation to `/pets/:id`.

- [ ] T024 [P] [US4] Implement `GET /lulu/pets/{id}` endpoint in `PetController.java`
- [ ] T025 [P] [US4] Create `PetDetailPage` component in `frontend/src/pages/PetDetailPage.tsx`
- [ ] T026 [US4] Update `PetCard.tsx` to navigate to details on click

---

## Phase N: Polish & Cross-Cutting Concerns

- [ ] T027 [P] Implement "No pets found" message in `ListingPage.tsx` (FR-005)
- [ ] T028 [P] Add image lazy loading to `PetCard.tsx`
- [ ] T029 [P] Add loading skeletons/spinners for better UX during API calls
- [ ] T030 Final verification against `Success Criteria` in `spec.md`

---

## Dependencies & Execution Order

1. **Setup (Phase 1)** → **Foundational (Phase 2)**
2. **Foundational (Phase 2)** → **US1 (Phase 3)**
3. **US1 (Phase 3)** → **US2, US3, US6** (These can proceed in parallel once US1 is stable)
4. **US1 (Phase 3)** → **US4 (Phase 7)**

### MVP Path
T001-T014 provides the complete MVP (Displaying pets).

---

## Parallel Opportunities

- T001 and T002 (Backend/Frontend initialization)
- T006 and T007 (Entity creation)
- T011 and T012 (Backend endpoint vs Frontend UI component)
- T015 and T017 (Category endpoint vs Filter UI component)
