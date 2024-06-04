# SG-Koala
## Overview
The Science Gallery Melbourne is facing challenges with its current booking system for secondary school group visits, which relies on multiple platforms like Microsoft Office tools and Priava. This setup leads to inefficiencies, as changes in bookings necessitate updates across various systems, demanding significant administrative effort and coordination. To address this, they are planning to develop a Unified Booking Management System. This proposed system aims to streamline and automate the booking process by integrating booking, calendar scheduling, and space and equipment management into a single, easy-to-use platform. This solution will enable the Learning Team staff to swiftly add and update bookings, effectively handle scheduling conflicts, and automatically store all tour details in a centralized database, significantly enhancing operational efficiency.

## Table of Contents
- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Changelog](#changelog)
  - [Sprint One](#sprint-one)
  - [Sprint Two](#sprint-two)
  - [Sprint Three](#sprint-three)
  - [Sprint Four](#sprint-four)
- [Workflow Guidelines](#workflow-guidelines)
- [Demo](#demo)
- [Contact](#contact)

## Folder Structure
- `README.md`: This file. Includes the project overview, folder structure, changelog, and other essential information.
- `docs/`: Contains all documentation files. Further organized into subfolders for requirements, design documents, etc.
- `src/`: Source code of the project.
- `tests/`: Documents about test cases and methods.
- `data samples/`: Documents required for simulating or demonstrating your prototype, including all necessary data inputs.

## Installation
- **Node.js**: It's recommended to use the latest LTS (Long Term Support) version of Node.js to ensure compatibility and stability. You can download it from [Node.js official website](https://nodejs.org/).

- **Python**: For backend development, Python 3.8 or newer is required. This is crucial for running Django and other Python-based tools. Download Python from the [official Python website](https://www.python.org/downloads/).

- **Integrated Development Environment (IDE)**: A suitable IDE can enhance your development experience significantly. We recommend using [Visual Studio Code (VSCode)](https://code.visualstudio.com/),


## Usage
### Script
To launch both the frontend and the backend simultaneously, run the following script from the root directory:
```bash
sh ./launch_fullstack.sh
```
> If you encounter a "permission denied" error, you may need to grant execution permissions to the script using:
```bash
chmod +x ./launch_fullstack.sh
```
### Run Frontend
```bash
cd ./src/front-end
# Install dependencies
npm i
# Start the frontend server
npm start
# The application will be hosted at: http://localhost:3000
```
### Run Backend
```bash
cd ./src/back-end
# Create a virtual environment (optional but recommended)
python3 -m venv venv
# Use virtual environment
source venv/bin/activate
# Install required modules
pip install -r requirements.txt
# Start the server
python3 manage.py runserver
# The server will be run at: http://localhost:8000
```

## Features
The application offers a comprehensive set of features designed to enhance user experience and operational efficiency. Below are the key features:

1. **Login via MongoDB**: 
   - Users can securely log in to the application. Authentication is handled through our bakcend server via MongoDB, ensuring that user data is securely stored and managed.

2. **Create and Manage Bookings**: 
   - Users have the ability to create new bookings and manage existing ones. This feature includes options to update or delete bookings as needed, facilitating effective scheduling and resource management.

3. **Create and Edit Templates (for Checklists)**: 
   - This feature allows users to create and modify templates for checklists. These templates can be used to standardize processes or tasks, enhancing consistency and efficiency across operations.

4. **Database Visualization**: 
   - The application provides tools for visualizing data directly from the database. This feature helps users understand complex data sets through graphical representations, making it easier to interpret and analyze data.

5. **Data Analytics**: 
   - Advanced data analytics capabilities are included, enabling users to perform detailed analysis of their data. This feature supports better decision-making by providing insights and trends based on the collected data.

6. **Calendar**:
    - The calendar visualization aids users in easily viewing and managing their booking schedules, enhancing timetable management.

7. **Search**:
    - A search feature is available for locating bookings by ID or organization name, displaying all relevant results and facilitating quick access.

## Changelog
  ### Sprint One
  - Date
    - Start: 03/03/2024
    - End: 22/03/2024
    - Duration: 3 weeks
  - Log
    - Initial setup
    - Upload docs
  ### Sprint Two
  - Date
    - Start: 25/03/2024
    - End: 26/04/2024
    - Duration: 4 weeks
  - Log
    - ADD `Dashboard Page`
    - ADD `Database Page`
    - ADD `New Template Detail Page`
    - ADD `New Template Page`
    - ADD `Search Bar Function (backend)`
    - ADD `Navbar`
    - ADD `API Server`
    - ADD `Testing`
    - ADD `Email sending booking reference number`
    - ADD `Deployment`
    - ADD `tests` on GitHub repo
    - ADD `data sample` on GitHub repo    
    - UPDATE `docs` on GitHub repo
  ### Sprint Three
  - Date
    - Start: 29/04/2024
    - End: 24/05/2024
    - Duration: 4 weeks
  - Log
    - ADD `Autofill Functionality`
    - ADD `Analytics Page`
    - ADD `Calendar Page`
    - ADD `Backend Testing`on GitHub repo
    - UPDATE `Database Page`
    - UPDATE `Dashboard Page`
    - UPDATE `docs` on GitHub repo
  ### Sprint Four
  - Date
    - Start: 27/05/2024
    - End: 07/06/2024
    - Duration: 3 weeks
  - Log
    - ADD `Login Page`
    - FIX bugs
    - UPDATE `docs` on GitHub repo
      
> The changelog will be updated progressively throughout each sprint.

## Workflow Guidelines

### Branch Naming Conventions
- **Scope Branches**: `<scope>/feature/<short-feature-description>`
  - Example: `backend/feature/oauth-integration`
- **Feature Branches**: `feature/<short-feature-description>`
  - Example: `feature/oauth-integration`
- **Bug Fixes**: `fix/<short-bug-description>`
  - Example: `fix/login-error`
- **Documentation**: `docs/<documentation-subject>`
  - Example: `docs/api-specification`

### Commit Messages
- Use specific keywords to start your commit messages for clarity:
  - **ADD** for new features or additions.
    - Example: `ADD user authentication logic`
  - **UPDATE** for changes in existing code.
    - Example: `UPDATE login page styling`
  - **REMOVE** for deletions of code or files.
    - Example: `REMOVE deprecated methods`
  - **FIX** for bug fixes.
    - Example: `FIX form submission error`

### Pull Requests (PRs)
- Provide a detailed description of the changes.
- Reference related issues or tasks.

### Code Reviews
- Assign PRs to at least one team member for review.
- Incorporate feedback before merging.

### Merging Strategy
- Use **Squash and Merge** for feature branches and bug fixes.
- Use **Rebase and Merge** for minor fixes or updates.

## Demo
**Sprint2 Update**: watch on [Youtube](https://youtu.be/H5LxiF4b4GY)

**Sprint3 Website**: watch on [Koala Management System](https://regal-profiterole-7e6b9f.netlify.app/)

**Sprint4 Final Product**: watch on [Youtube](https://www.youtube.com/watch?v=ZSZaohDa8UY)

## Contact
| Name                | Email                                  | GitHub                               |
|---------------------|----------------------------------------|--------------------------------------|
| Guixian Li (Leona)  | [guixianl@student.unimelb.edu.au](mailto:guixianl@student.unimelb.edu.au) | [Leona7658](https://github.com/Leona7658) |
| Daniel Su (Daniel)  | [dss1@student.unimelb.edu.au](mailto:dss1@student.unimelb.edu.au)         | [dyts1](https://github.com/dyts1) |
| Pangfeng ZHENG (Jack)| [pangfengz@student.unimelb.edu.au](mailto:pangfengz@student.unimelb.edu.au)| [PangFengZheng-unim](https://github.com/PangFengZheng-unim) |
| Yongli Qin (Matt)   | [yongliq@student.unimelb.edu.au](mailto:yongliq@student.unimelb.edu.au)    | [YongLi-Qin](https://github.com/YongLi-Qin) |
| Yuanbo Xu (Chris)   | [yuanbo@student.unimelb.edu.au](mailto:yuanbo@student.unimelb.edu.au)     | [Mor-Poi](https://github.com/Mor-Poi) |
| Yun-Chi Hsiao (Jim) | [yunchi@student.unimelb.edu.au](mailto:yunchi@student.unimelb.edu.au)     | [is0xJim](https://github.com/is0xjh25) |
