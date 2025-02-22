# TaskFlow - Todo App

A modern task management application that allows users to add, edit, delete, and reorder tasks using a drag-and-drop interface. The app is fully responsive, uses a clean and minimalistic design, and instantly saves changes to a MongoDB database. Authentication is handled via Firebase (Google sign-in), and tasks are organized into three categories: To-Do, In Progress, and Done.

## [Visit the website ↗️](https://taskflow---todo-app.web.app/)

## Features

- **User Authentication:**
  - Only authenticated users can access the app.
  - Uses Firebase Authentication (Google sign-in).
  - User details (User ID, email, display name) are stored in the database upon first login.

- **Task Management:**
  - Add, edit, and delete tasks.
  - Drag-and-drop to reorder tasks within the same category or move tasks between categories.
  - Each task includes:
    - Title (required, max 50 characters)
    - Description (optional, max 200 characters)
    - Timestamp (auto-generated upon creation)
    - Category (To-Do, In Progress, Done)
    - Order index for maintaining position
  - Changes are saved instantly to the database.

- **Real-time Synchronization:**
  - Optimistic UI updates reflect changes immediately.
  - Backend is updated in real time to maintain persistent task order.
  - Can be extended with MongoDB Change Streams or WebSockets for real-time push updates.

- **Responsive Design:**
  - Built with Vite.js + React and Tailwind CSS.
  - Mobile-friendly drag-and-drop experience.
  - Clean and minimalistic UI using a maximum of four colors.

- **Bonus Features (Optional):**
  - Dark mode toggle.
  - Task due dates with color indicators (e.g., overdue tasks appear red).
  - Activity log to track task changes (e.g., "Task moved to Done").

## Technologies Used

- **Frontend:**
  - Vite.js, React, Tailwind CSS (with @tailwindcss/vite)
  - @dnd-kit for drag-and-drop functionality
  - Axios for API requests
  - Firebase for authentication
  - @tanstack/react-query for data fetching and caching
  - Additional libraries: Ant Design, react-hot-toast, react-icons, react-spinners

- **Backend:**
  - Express.js for RESTful API endpoints
  - MongoDB for data persistence (using the native MongoDB Node.js driver)
  - Firebase Admin (if needed) for managing authentication on the server

## Installation and Setup

### Prerequisites

- Node.js (v14+ recommended)
- Yarn package manager
- MongoDB instance (local or remote)
- Firebase project with Google sign-in enabled

### Frontend Setup

1. **Clone the Client Repository:**

   ```bash
   git clone https://github.com/ii-shimul/project-todo-list.git
   cd project-todo-list
   ```

2. **Install Dependencies:**

   ```bash
   yarn install
   ```

3. **Configure Firebase:**

   - Update your Firebase configuration in your frontend code (e.g., in a `firebase.js` file).

4. **Run the Development Server:**

   ```bash
   yarn dev
   ```

5. **Build for Production:**

   ```bash
   yarn build
   yarn preview
   ```

### Backend Setup

1. **Clone the Server Repository:**

   ```bash
   git clone https://github.com/ii-shimul/project-todo-list-server.git
   cd project-todo-list-server
   ```

2. **Install Dependencies:**

   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**

   - Set your MongoDB connection string.
   - Configure Firebase Admin credentials if needed.
   - Create a `.env` file with your configuration settings.

4. **Run the Backend Server:**

   ```bash
   yarn start
   ```

## Folder Structure

```
project-todo-list/
├── client/                 # Frontend application
│   ├── public/             # Public assets
│   ├── src/
│   │   ├── components/     # React components (Navbar, Column, TaskCard, etc.)
│   │   ├── hooks/          # Custom hooks (useAuth, useAxios, etc.)
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   ├── package.json        # Frontend dependencies and scripts
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── postcss.config.js   # PostCSS configuration
└── server/                 # Express.js backend server
    ├── controllers/        # Controller logic for API endpoints
    ├── models/             # Schema definitions (using native MongoDB driver)
    ├── routes/             # Express routes for tasks, users, etc.
    ├── index.js or app.js   # Entry point for the backend server
    └── package.json        # Backend dependencies and scripts
```

## Dependencies

Below are the main dependencies from the frontend `package.json`:

```json
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@ant-design/cssinjs": "^1.23.0",
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@tailwindcss/vite": "^4.0.8",
    "@tanstack/react-query": "^5.66.9",
    "antd": "^5.24.1",
    "axios": "^1.7.9",
    "firebase": "^11.3.1",
    "init": "^0.1.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hot-toast": "^2.5.2",
    "react-icons": "^5.5.0",
    "react-spinners": "^0.15.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.19.0",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.19.0",
    "eslint-plugin-react": "^7.37.4",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.18",
    "globals": "^15.14.0",
    "tailwindcss": "^4.0.8",
    "vite": "^6.1.0"
  }
}
```

*Note: Ensure your backend `package.json` includes Express, the MongoDB native driver (or Mongoose if applicable), and any required middleware.*

## Live Link

Access the live application at: [https://taskflow---todo-app.web.app/](https://taskflow---todo-app.web.app/)

## Repository Links

- **Client Repo:** [https://github.com/ii-shimul/project-todo-list](https://github.com/ii-shimul/project-todo-list)
- **Server Repo:** [https://github.com/ii-shimul/project-todo-list-server](https://github.com/ii-shimul/project-todo-list-server)

## Additional Notes

- **Optimistic UI Updates:**  
  The application immediately reflects user actions (such as drag-and-drop) in the UI and synchronizes with the backend to ensure data persistence.

- **Drag-and-Drop:**  
  Built with @dnd-kit, supporting both reordering within a column and moving tasks between columns.

- **Responsive Design:**  
  The app is fully responsive and optimized for both desktop and mobile devices.

- **Extensibility:**  
  Clean code practices and modular architecture make it easy to extend with additional features like dark mode, due dates, and activity logs.
