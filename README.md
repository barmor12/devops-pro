# Frontend Project - Node.js Website for DevOps Course

Welcome to our Node.js Frontend Project! This is an integral part of our DevOps course, where we aim to demonstrate the essential components of a modern DevOps workflow. This project allows us to practice important DevOps concepts and tooling, such as automated testing, linting, and Continuous Integration/Continuous Deployment (CI/CD).

## Getting Started

To get started with the project, you'll need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) installed on your local development environment.

1. Clone the repository:
```
git clone git clone https://github.com/barmor12/devops-pro.git
```

2. Change to the project directory:
```
cd <frontend-project-name>
```

3. Install the dependencies:
```
npm install
```

4. Run the development server:
```
npm start
```

The React app should now be accessible at `http://localhost:3000`.


## Linter and Syntax

This project uses a linter with Airbnb's syntax configuration. This helps maintain a consistent coding style throughout the project. The linter will check for syntax errors and enforce best practices in the code.

To run the linter manually, execute the following command:

```
npm init @eslint/config
```

## CI/CD Pipeline

Our CI/CD pipeline is set up using Azure. The pipeline is triggered upon every push to the repository. It includes the following stages:

1. Install npm packages
2. Run tests
3. Run linter
4. Build the project
5. CI Deployment (To Render hosting)

The live version of the frontend project is hosted at: devopspro.azurewebsites.net

You can find the configuration file for the CircleCI pipeline in the `.circleci` folder at the root of the repository.


