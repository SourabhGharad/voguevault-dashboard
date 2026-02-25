# VogueVault Dashboard

A Next.js dashboard application for managing inventory data with filtering and
sorting capabilities.

---

## How to run the project locally

1. To get started with the project, clone the repository using  
   `git clone https://github.com/<your-username>/voguevault-dashboard.git`

2. Navigate into the project directory with  
   `cd voguevault-dashboard`

3. Install the required dependencies by running  
   `npm install`

4. Create the environment variables file by copying the example configuration using  
   `cp .env.example .env.local`

5. Start the development server by running  
   `npm run dev`, then open http://localhost:3000 in your browser to view the application.

## Features

### Inventory Table
- Displays inventory items with name, category, price, stock, and status
- Status badges for quick visual feedback (In Stock, Low Stock, Out of Stock)

### Search & Filtering
- Text-based search to filter products by name
- Status-based filtering
- Filters are reflected in the URL query parameters

### Sorting
- Sorting by price and stock quantity
- Supports ascending and descending order
- Visual indicators for sort direction

### URL-based State Management
- Search,status Filters and sort state stored in the URL
- State persists across page refreshes
- Enables sharing links with applied filters

### Server-driven Data Handling
- Data is fetched based on URL parameters
- Sorting and filtering handled on the server
- Consistent behavior across refreshes and environments