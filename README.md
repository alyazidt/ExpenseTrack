# ExpenseTrack
A full-stack expense management platform developed as part of the Full Stack Developer Technical Challenge at Maaly Company. It allows users to track, categorize, and manage daily expenses with features like user authentication, category-based tracking, and a normalized database.


### Database Design (ERD & Normalization) :
-  ERD (Entity Relationship Diagram) :
  <img width="960" height="881" alt="image" src="https://github.com/user-attachments/assets/2b15d20b-9afc-4f31-a009-2893844f3c12" />


- SQL Statements to Create Tables (Microsoft SQL Server) :


```
{
  -- Create Users Table
CREATE TABLE Users (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL
);

-- Create Categories Table
CREATE TABLE Categories (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(255) NOT NULL UNIQUE
);

-- Create Expenses Table
CREATE TABLE Expenses (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description NVARCHAR(255),
    date DATE NOT NULL,
    payment_method NVARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);
}
```



### Setup Instructions :


### Backend Development (API) :
-  API Endpoints :
  
- Sample requests/responses (Postman) :

