
A simple React application that displays a list of products with a grid layout. It includes:
- Fetching product data from an API.
- Responsive design with a grid layout for desktop and list layout for mobile.
- Error handling with user-friendly messages if the data fetch fails.
- Loading spinner during data fetch.
- Modal for displaying detailed product information.


1. **Clone the repository**:
   ```bash
   https://github.com/chiragbtp/react-product-list.git

2. **Navigate to the project folder**

3.  **Install dependencies**

    npm install
4. **Run the development server**

    npm start


**Design Decisions**:

The app was built using React to create a modern, component-driven structure.
The Material-UI library was chosen to ensure a clean and responsive UI with reusable components.
React Hooks (useState, useEffect) were used for state management and side-effects to ensure functional, clean, and modular code.

**Patterns Used:**
The Container-Presenter Pattern is used, where the ProductList is a container that fetches data and manages the logic, while ProductModal acts as a presentational component that displays data.
Lazy Loading is implemented to load more products as the user scrolls or clicks the "Load More" button.


**Limitations & Future Enhancements**

**Limitations:**

No user authentication or access control is in place.

**Future Enhancements**:

Introduce server-side filtering for better performance with large datasets.
Add authentication to allow users to log in and save favorite products.
Add unit tests and end-to-end tests to improve code coverage and reliability.