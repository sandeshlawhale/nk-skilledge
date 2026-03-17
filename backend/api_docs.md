# NK Skilledge API Documentation

All routes are prefixed with `/api/v1`.

## 1. Authentication (`/auth`)
Routes for user registration, login, and session management.

| Method | Endpoint | Description | Input (Body/Params) | Auth |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/auth/register` | Register a new user | `{ name, email, password, role? }` | None |
| POST | `/auth/login` | Login user | `{ email, password }` | None |
| POST | `/auth/logout` | Logout user | None | JWT |
| GET | `/auth/me` | Get current user profile | None | JWT |

---

## 2. Users (`/users`)
Administrative routes for user management.

| Method | Endpoint | Description | Input (Body/Params) | Auth (Role) |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/users` | Get all users | None | Admin |
| GET | `/users/:userId` | Get user by ID | None | Admin |
| PUT | `/users/:userId` | Update user role | `{ role }` | Admin |
| DELETE | `/users/:userId` | Delete a user | None | Admin |

---

## 3. Courses (`/courses`)
Routes for course listing and management.

| Method | Endpoint | Description | Input (Body/Params) | Auth (Role) |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/courses` | Get all published courses | None | None |
| GET | `/courses/:courseId` | Get course details | None | None |
| POST | `/courses` | Create new course (Draft) | Form-Data: `{ title, description, price, thumbnail: File }` | Admin |
| PUT | `/courses/:courseId` | Update course details | `{ title, description, price, status }` | Admin |
| DELETE | `/courses/:courseId` | Delete a course | None | Admin |
| PUT | `/courses/:courseId/publish` | Publish a course | None | Admin |
| PUT | `/courses/:courseId/unpublish` | Unpublish a course | None | Admin |

---

## 4. Lessons (`/lessons`)
Routes for lesson management within courses.

| Method | Endpoint | Description | Input (Body/Params) | Auth (Role) |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/lessons/course/:courseId` | Get all lessons for a course | None | None |
| GET | `/lessons/:lessonId` | Get lesson details | None | None |
| POST | `/lessons` | Create new lesson (Draft) | `{ title, courseId, order, content, videoUrl }` | Admin |
| PUT | `/lessons/:lessonId` | Update lesson details | `{ title, order, content, videoUrl, status }` | Admin |
| DELETE | `/lessons/:lessonId` | Delete a lesson | None | Admin |

---

## 5. Tasks (`/tasks`)
Educational tasks (MCQs, Coding, Assignments).

| Method | Endpoint | Description | Input (Body/Params) | Auth (Role) |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/tasks/lesson/:lessonId` | Get all tasks for a lesson | None | None |
| GET | `/tasks/:taskId` | Get task details | None | None |
| POST | `/tasks` | Create new task | `{ lessonId, courseId, title, description, taskType, ... }` | Admin |
| PUT | `/tasks/:taskId` | Update task details | `{ title, description, ... }` | Admin |
| DELETE | `/tasks/:taskId` | Delete a task | None | Admin |

---

## 6. Enrollments (`/enrollments`)
Course enrollment management.

| Method | Endpoint | Description | Input (Body/Params) | Auth (Role) |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/enrollments` | Enroll user in a course | `{ userId, courseId, accessType, expiresAt? }` | JWT |
| GET | `/enrollments/user/:userId` | Get user's enrolled courses | None | JWT |
| GET | `/enrollments/course/:courseId` | Get all students in a course | None | Admin |
| DELETE | `/enrollments/:enrollmentId` | Unenroll user | None | Admin |

---

## 7. Progress (`/progress`)
User learning progress tracking.

| Method | Endpoint | Description | Input (Body/Params) | Auth |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/progress/complete-task` | Mark task as completed | `{ courseId, lessonId, taskId }` | JWT |
| GET | `/progress/user/:userId/course/:courseId` | Get course progress | None | JWT |

---

## 8. Services (`/services`)
Development service inquiries.

| Method | Endpoint | Description | Input (Body/Params) | Auth (Role) |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/services/inquiry` | Submit service inquiry | `{ name, email, serviceType, projectDetails, budget }` | None |
| GET | `/services/inquiries` | Get all inquiries | None | Admin |
| DELETE | `/services/inquiry/:id` | Delete inquiry | None | Admin |
