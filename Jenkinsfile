pipeline {
    agent { label 'nodejs' }

    environment {
        APP_DIR = "/home/ubuntu/app"
    }

    stages {

        stage('Clone') {
            steps {
                git branch: 'main', credentialsId: '001', url: 'https://github.com/karthi210/fullstack2.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                sh '''
                rm -rf $APP_DIR
                mkdir -p $APP_DIR
                cp -r backend $APP_DIR/
                '''
            }
        }

        stage('Start/Restart Backend') {
            steps {
                sh '''
                cd $APP_DIR/backend

                # Kill old app if exists
                pm2 delete contact-app || true

                # Start app
                pm2 start server.js --name contact-app

                pm2 save
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                sudo rm -rf /var/www/html/*
                sudo cp -r frontend/* /var/www/html/
                '''
            }
        }

        stage('Restart Nginx') {
            steps {
                sh 'sudo systemctl restart nginx'
            }
        }
    }
}
