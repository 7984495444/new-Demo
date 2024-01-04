pipeline {
  agent any

  environment {
    NODEJS_VERSION = '14'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        script {
          // Use Node.js tool installer to install Node.js
          def nodejsHome = tool 'NodeJS'
          env.PATH = "${nodejsHome}/bin:${env.PATH}"

          // Install project dependencies
          sh 'npm install'
        }
      }
    }

    stage('Run Tests') {
      steps {
        script {
          sh 'npm test'
        }
      }
    }

    stage('Build and Deploy') {
      steps {
        script {
          // Customize this based on your project build and deployment steps
          sh 'npm run build'
          // Add more deployment steps here
        }
      }
    }
  }
}
