# Project Notes

## Backend Implementation

1. Fixed the backend to include **authentication and authorization** using **JWT**.
2. Fixed **CORS issues** to allow frontend requests.
3. Added **error handling** for API endpoints.
4. Connected **PostgreSQL** using **Docker**.

## Frontend Implementation

1. Added **Login** and **Signup** pages.
2. Created **authService** to handle login and signup requests.
3. Created **taskService** to handle CRUD operations for tasks.
4. Connected the frontend to the backend using **Axios**.

## Testing the App

1. Run PostgreSQL via Docker.
2. Get the connection string to connect the backend to the database:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Port=5432;Database=mydb;Username=postgres;Password=mypassword"
   }
   ```
3. Add the JWT key for token signing:
   ```json
   "Jwt": {
   "Key": "any key"
   }
   ```
4. Add the connection string and JWT key to your appsettings.json.
5. Start the backend and frontend servers.
6. Test the application by signing up, logging in, and performing CRUD operations on tasks.
