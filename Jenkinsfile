pipeline {
    agent { label 'agent-1' }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main', credentialsId: '011', url: 'https://github.com/karthi210/fullstack2.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh '''
                    npm install
                    chmod +x node_modules/.bin/react-scripts
                    npm run build
                    '''
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                sh '''
                mkdir -p /home/ubuntu/app
                cp backend/target/backend-1.0.jar /home/ubuntu/app/
        
                pkill -f backend || true
        
                cd /home/ubuntu/app
                nohup java -jar backend-1.0.jar > backend.log 2>&1 &
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                sudo rm -rf /var/www/html/*
                sudo cp -r frontend/build/* /var/www/html/
                '''
            }
        }
    }
}
