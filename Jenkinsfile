pipeline {
    agent any

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
                script {
                    def imageExists = sh(script: 'docker images -q playwright-node-java-v1-noble', returnStatus: true)
                    if (imageExists != 0) {
                        echo "❌ Imagem não encontrada!"
                        currentBuild.result = 'FAILURE'
                        return
                    } else {
                        echo "✅ Imagem encontrada!"
                    }
                }
            }
        }

        stage('Testar Imagem Docker') {
            steps {
                echo "✅ Testando a imagem Docker antes de rodar os testes..."
                sh 'docker run --rm playwright-node-java-v1-noble node -v'
                sh 'docker run --rm playwright-node-java-v1-noble npm -v'
            }
        }

        stage('Instalar Dependências Node.js') {
            steps {
                echo "🔧 Instalando dependências Node.js dentro do container..."
                sh "docker run --rm -v \"\$(pwd):/workspace\" -w /workspace playwright-node-java-v1-noble sh -c 'test -f package.json && npm install || { echo \"package.json not found\"; exit 1; }'"
            }
        }

        stage('Executar Testes E2E') {
            agent {
                docker {
                    image 'playwright-node-java-v1-noble'
                    args '--network qatw-primeira-edicao_skynet' // Só inclua se for necessário
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

// pipeline {
//     agent {
//         docker {
//             image 'papitodev/playwright-nj-v1.50.1-noble'
//             args '--network qatw-primeira-edicao_skynet'
//         }
//     }

//     stages {
//         stage('Node.js Deps') {
//             steps {
//                 sh 'npm install'
//             }
//         }
//         stage('E2E Tests') {
//             steps {
//                 sh 'npx playwright test'
//                 allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
//             }
//         }
//     }
// }