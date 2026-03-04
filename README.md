# NNPTUDM_NguyenQuocKhang_2/3
# Name: Nguyen QuocKhang
# MSSV: 2280601418
# 22DTHE5

## 🚀 Running the Project

1. **Install dependencies**
   ```bash
   cd c:\Users\acer\Downloads\NNPTUDM_NguyenQuocKhang_02-03-main\NNPTUDM_NguyenQuocKhang_02-03-main
   npm install
   ```

2. **Start the server**
   ```bash
   npm start
   ```
   By default the application listens on port `3000`. You can open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Development mode** (optional)
   ```bash
   npm run dev
   ```
   This uses `nodemon` if installed globally to reload on code changes.

> ⚠️ Make sure you have Node.js installed (version 12+).

## 📁 Project Structure
The application uses Express.js with the following layout:

- `app.js` – main entry point
- `routes/` – route definitions (`users.js`, `roles.js`)
- `controllers/` – request handlers
- `models/` – Mongoose schemas (`User.js`, `Role.js`)
- `config/db.js` – database connection
- `middlewares/errorHandler.js` – error handling
- `public/` – static assets

Feel free to examine and modify components as needed.
