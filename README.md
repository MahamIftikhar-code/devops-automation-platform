# DevOps Automation Platform

End-to-end DevOps workflow combining Infrastructure as Code with automated CI/CD pipeline.

## Architecture

GitHub Push
↓
Jenkins Pipeline
├── Run Tests
├── Terraform Plan + Apply → AWS EC2 provisioned
├── Docker Build + Push to Docker Hub
└── SSH Deploy to EC2
↓
App live on internet

## Pipeline Stages
| Stage | Tool | What happens |
|-------|------|-------------|
| Test | Node.js | npm test |
| Infrastructure | Terraform | VPC, EC2, Security Groups |
| Build | Docker | Image built and tagged |
| Push | Docker Hub | Image published |
| Deploy | SSH + Docker | Container running on EC2 |

## Tech Stack
| Category | Tools |
|----------|-------|
| Infrastructure | Terraform, AWS VPC, EC2 |
| CI/CD | Jenkins, GitHub |
| Containers | Docker, Docker Hub |
| Cloud | AWS (EC2, IAM, VPC) |
| App | Node.js, Express |

## Project Structure

Devops Automation Platform/
├── app/               # Node.js application
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── terraform/         # Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── Jenkinsfile        # CI/CD Pipeline
└── README.md