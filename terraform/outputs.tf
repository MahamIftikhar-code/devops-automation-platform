output "ec2_public_ip" {
  value = aws_instance.app.public_ip
}

output "ssh_command" {
  value = "ssh -i devops-key.pem ubuntu@${aws_instance.app.public_ip}"
}

output "app_url" {
  value = "http://${aws_instance.app.public_ip}:4000"
}