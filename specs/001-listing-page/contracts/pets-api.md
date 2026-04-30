# API Contract: Pets Service

## Base URL
`/lulu/pets`

## Endpoints

### 1. List Pets
`GET /lulu/pets`

Fetches a paginated list of available pets with optional filtering and searching.

**Query Parameters**:
- `page` (int, default: 0): Page number.
- `size` (int, default: 20): Items per page.
- `species` (string, optional): Filter by species name.
- `search` (string, optional): Search by pet name.

**Response (200 OK)**:
```json
{
  "content": [
    {
      "id": "uuid-123",
      "name": "Buddy",
      "species": "Dog",
      "breed": "Golden Retriever",
      "price": 500.00,
      "imageUrl": "https://example.com/buddy.jpg",
      "status": "AVAILABLE"
    }
  ],
  "totalPages": 5,
  "totalElements": 100,
  "last": false,
  "size": 20,
  "number": 0
}
```

### 2. List Categories
`GET /lulu/pets/categories`

Fetches the list of available pet categories for filters.

**Response (200 OK)**:
```json
[
  { "id": 1, "name": "Dogs", "icon": "pets_dog" },
  { "id": 2, "name": "Cats", "icon": "pets_cat" }
]
```
