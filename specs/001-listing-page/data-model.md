# Data Model: Listing Page

## Entities

### Pet
Represents an animal available for adoption/sale.

| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| id | UUID/Long | Unique identifier | Primary Key |
| name | String | Name of the pet | Not Null |
| species | Enum | Dog, Cat, Bird, Fish | Not Null |
| breed | String | Breed (e.g., Golden Retriever) | Optional |
| age | Integer | Age in months/years | Min 0 |
| price | Decimal | Sale price | Not Null, Min 0 |
| imageUrl | String | URL to pet photo | Not Null |
| description | String | Short bio/description | Max 500 chars |
| status | Enum | AVAILABLE, PENDING, SOLD | Default: AVAILABLE |

### Category
Groups pets by species for navigation.

| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| id | Long | Unique identifier | Primary Key |
| name | String | Species name (Dog, Cat, etc.) | Unique, Not Null |
| icon | String | Icon identifier for UI | Not Null |

## Relationships
- **Pet (Many) to Category (One)**: Each pet belongs to one species category.
