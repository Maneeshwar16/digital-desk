# Interactive Todo App

A beautiful and interactive todo application with a React frontend and Node.js/Express backend, featuring user authentication and persistent data storage.

## Features

- ✨ **Beautiful UI** with smooth animations using Framer Motion
- 🔐 **User Authentication** with JWT tokens
- 📝 **CRUD Operations** for todos (Create, Read, Update, Delete)
- 🎯 **Drag & Drop** interface for task cards
- 💾 **Persistent Data** stored in MongoDB
- 🔄 **Real-time Updates** with backend integration
- 📱 **Responsive Design** with Tailwind CSS

## Tech Stack

### Frontend
- React 18
- Vite
- Framer Motion (animations)
- Tailwind CSS (styling)
- Axios (API calls)
- React Router (navigation)

### Backend
- Node.js
- Express.js
- MongoDB (database)
- Mongoose (ODM)
- JWT (authentication)
- bcryptjs (password hashing)

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v16 or higher)
2. **MongoDB** installed and running locally
3. **npm** or **yarn** package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Todo
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up MongoDB**
   - Make sure MongoDB is running on your local machine
   - The app will automatically create the database `todo-app`

4. **Configure environment variables**
   - The backend configuration is in `server/config.env`
   - You can modify the MongoDB URI and JWT secret if needed

## Running the Application

### Development Mode (Recommended)
Run both frontend and backend simultaneously:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Run Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## Usage

1. **Register/Login**: Create a new account or login with existing credentials
2. **Add Tasks**: Click the + button on any card to add a new task
3. **Mark Complete**: Click the checkmark icon to mark tasks as done
4. **Delete Tasks**: Click the delete icon to remove tasks
5. **Drag Cards**: Move task cards around the interface
6. **Logout**: Use the logout button to sign out

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile

### Todos
- `GET /api/todos` - Get all todos for user
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion

## Project Structure

```
Todo/
├── package.json                 # Root package.json
├── README.md                   # This file
├── server/                     # Backend code
│   ├── index.js               # Main server file
│   ├── package.json           # Backend dependencies
│   ├── config.env             # Environment variables
│   ├── models/                # MongoDB models
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/                # API routes
│   │   ├── userRoutes.js
│   │   └── todoRoutes.js
│   └── middleware/            # Custom middleware
│       └── auth.js
└── vite-project/              # Frontend code
    ├── src/
    │   ├── App.jsx           # Main app component
    │   ├── main.jsx          # Entry point
    │   ├── assets/           # Components
    │   │   ├── Login.jsx
    │   │   ├── Foreground.jsx
    │   │   ├── Card.jsx
    │   │   └── ...
    │   ├── context/          # React context
    │   │   └── AuthContext.jsx
    │   └── services/         # API services
    │       └── api.js
    └── package.json          # Frontend dependencies
```

## Customization

### Styling
- Modify Tailwind classes in components
- Update colors in `tailwind.config.js`
- Customize animations in Framer Motion components

### Backend
- Add new API endpoints in `server/routes/`
- Modify database models in `server/models/`
- Update authentication logic in `server/middleware/auth.js`

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running: `mongod`
   - Check connection string in `server/config.env`

2. **Port Already in Use**
   - Change ports in `server/config.env` and `vite-project/vite.config.js`

3. **CORS Errors**
   - Backend CORS is configured for development
   - Update CORS settings in `server/index.js` for production

4. **JWT Token Issues**
   - Clear browser localStorage
   - Check JWT_SECRET in `server/config.env`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on the repository. 