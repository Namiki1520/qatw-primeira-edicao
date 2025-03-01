pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('custom-playwright-image', '-f Dockerfile .')
                }
            }
        }
        stage('Node.js Deps') {
            agent {
                docker {
                    image 'custom-playwright-image'
                    args '--network qatw-primeira-edicao_skynet'
                }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Tests') {
            agent {
                docker {
                    image 'custom-playwright-image'
                    args '--network qatw-primeira-edicao_skynet'
                }
            }
            steps {
                sh 'npx playwright test'
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
    post {
        always {
            script {
                // Clean up Docker containers
                sh 'docker container prune -f'
            }
        }
    }
}