# Cheffelo Take-Home Test - Iulia
## Task Chosen
I chose **Task 1 - Favourites API & UI integration**

## Features Implemented

### Core Requirements

- Implemented `GET`, `POST`, and `DELETE` endpoints for the favourites API using the provided `devDb` (LowDB)
- Implemented:
  - `handleAddToFavorites`
  - `handleRemoveFromFavorites`
- UI updates reflect favourite state instantly using **optimistic updates**
- Added rollback handling in case of failed requests

### Favourites View

- Implemented a dedicated **Favourites page** accessible via the main navigation menu
- Users can view all favourited listings in one place

## Enhancements

- **Favorites count in navigation**
  - Displays the number of favourited listings in real-time

- **Visual highlighting of favourites**
  - Subtle border glow and icon badge for favourited listings

- **Toast notifications**
  - Feedback when adding/removing favourites
  - Improves clarity and user experience

- **Optimistic UI updates**
  - Immediate UI response without waiting for API confirmation

- **Persistence across sessions**
  - Favourites are stored in a local JSON database (`LowDB`)
  - State is preserved on page reload

- **Improved loading and empty states**
  - User-friendly loading messages
  - Clear feedback when no data is available

- **Clean navigation structure**
  - Simple and intuitive page flow between Listings and Favourites

## Technical Notes

- Used **Redux Toolkit Query (RTK Query)** for data fetching and caching
- Implemented **context-based toast system** to avoid prop drilling and provide global UI feedback
- Structured components to be **reusable and context-aware** (e.g. shared `Listings` component with variants)

## Prerequisites:

- Node.js version 18.17.0 or above

## Installation

- Install dependencies by running `npm install`
- Boot up the dev server by running `npm run dev`

Instructions for the tasks are on the home page of the application
