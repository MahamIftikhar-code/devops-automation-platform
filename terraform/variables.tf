variable "aws_region" {
  default = "us-east-2"
}

variable "project_name" {
  default = "devops-automation-platform"
}

variable "instance_type" {
  default = "t3.micro"
}

variable "key_pair_name" {
  default = "devops-key"
}

variable "ami_id" {
  description = "Ubuntu 22.04 AMI for us-east-2"
  default     = "ami-0fe18bc3cfa53a248"
}