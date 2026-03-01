# Coaching Center Management System – Frontend

Frontend for an internal management system built for coaching centers to manage daily operations.  
The app uses a **role-based system** where Admin, Teacher, and Student each have their own dashboards to perform specific actions.

---

## Features

- Role-based authentication (Admin, Teacher, Student)  
- Admin dashboard for managing students, teachers, batches, and fees  
- Teacher dashboard for attendance-related actions  
- Student dashboard to view personal info, batches, and attendance  

---

## Tech Stack

- React  
- Tailwind CSS  

---

## Environment Variables

This project uses environment variables for configuration.

1. Create a `.env` file using the example:

```bash
cp .env.example .env
```

2. Add your env values

---

## How to run locally

```bash
git clone https://github.com/Nandini0409/ccms-frontend
npm install
npm run dev
```