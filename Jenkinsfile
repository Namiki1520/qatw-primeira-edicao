pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.1-noble' // Agente original para build da imagem
            args '--network qatw-primeira-edicao_skynet'
        }
    }

    stages {
        stage('Build da Imagem Docker Customizada') {
            steps {
                echo "🛠️ Construindo a imagem Docker personalizada..."
                sh 'docker build --no-cache -t playwright-node-java-v1-noble .'
            }
        }

        stage('Verificar Imagens Disponíveis') {
            steps {
                echo "🔍 Listando imagens disponíveis..."
                sh 'docker images | grep playwright-node-java-v1-noble || echo "❌ Imagem não encontrada!"'
            }
        }

        stage('Testar Imagem Docker') {
            steps {
                echo "✅ Testando a imagem Docker antes de rodar os testes..."
                sh 'docker run --rm playwright-node-java-v1-noble node -v'
            }
        }

        stage('Instalar Dependências Node.js') {
            steps {
                sh 'npm install'
            }
        }

        stage('Executar Testes E2E') {
            agent {
                docker {
                    image 'playwright-node-java-v1-noble' // Usa a imagem recém-criada para rodar os testes
                    args '--network qatw-primeira-edicao_skynet'
                }
            }
            steps {
                echo "🚀 Rodando testes Playwright dentro da imagem customizada..."
                sh 'npx playwright test'
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}
