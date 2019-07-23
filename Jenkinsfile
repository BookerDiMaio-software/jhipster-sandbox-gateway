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
        sh 'npm run test-ci'
      }
    }
    stage('Deliver') {
      steps {
        sh 'chmod -R +x ./jenkins'
        sh './jenkins/scripts/deliver.sh'
        input 'Finished using the web site? (Click "Proceed" to continue)'
        sh './jenkins/scripts/kill.sh'
      }
    }
  }
}