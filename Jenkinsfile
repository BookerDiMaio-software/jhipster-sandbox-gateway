pipeline {
    agent {
        docker {
            image 'node:10.16.0'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('npm Tests') {
            steps {
                sh 'npm test-ci'
            }
        }
    }
}
