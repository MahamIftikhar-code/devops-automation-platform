pipeline {
    agent { label 'mhm' }

    environment {
        DOCKER_IMAGE = "mahamiftikhar/devops-automation-platform"
        DOCKER_TAG   = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Pulling code from GitHub'
                checkout scm
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests'
                dir('app') {
                    sh 'npm install'
                    sh 'npm test'
                }
                echo 'All tests passed'
            }
        }

        stage('Terraform Plan') {
            steps {
                echo 'Planning infrastructure'
                dir('terraform') {
                    sh 'terraform init'
                    sh 'terraform plan -out=tfplan'
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                echo 'Provisioning AWS infrastructure'
                dir('terraform') {
                    sh 'terraform apply -auto-approve tfplan'
                    script {
                        env.EC2_IP = sh(
                            script: 'terraform output -raw ec2_public_ip',
                            returnStdout: true
                        ).trim()
                    }
                }
                echo "EC2 provisioned at: ${env.EC2_IP}"
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image'
                dir('app') {
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                    sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing to Docker Hub'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
                echo 'Image pushed successfully'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "Deploying to ${env.EC2_IP}"
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'ec2-ssh-key',
                    keyFileVariable: 'SSH_KEY'
                )]) {
                    sh """
                        sleep 30
                        ssh -i \$SSH_KEY -o StrictHostKeyChecking=no ubuntu@${env.EC2_IP} '
                            docker pull ${DOCKER_IMAGE}:latest &&
                            docker stop flagship-app 2>/dev/null || true &&
                            docker rm flagship-app 2>/dev/null || true &&
                            docker run -d \\
                                --name flagship-app \\
                                --restart unless-stopped \\
                                -p 4000:4000 \\
                                ${DOCKER_IMAGE}:latest
                        '
                    """
                }
                echo "App live at: http://${env.EC2_IP}:4000"
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
            echo "App live at: http://${env.EC2_IP}:4000"
        }
        failure {
            echo 'Pipeline failed. Check logs above.'
        }
    }
}