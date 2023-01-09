# aws-cli

## Introduction

Official Amazon AWS command-line interface.

## Installation

- Install via brew: `brew install awscli`

## Commands

- `aws --version`: Check version of cli.
- `aws configure`: Configure the credentials (you need to put in `AWS Access Key ID` & `AWS Secret Access Key`)
- `aws s3api list-buckets`: Check buckets available.
- `aws s3 ls s3://[bucket-name]`: Lists bucket root directories, e.g: `aws s3 ls s3://prod-bucket`.
- `aws s3 ls s3://[bucket-name] --recursive`: Lists bucket root directories recursively, e.g: `aws s3 ls s3://prod-bucket --recursive`.
- `aws s3 cp s3://[bucket-name]/data/items.csv items-2022.csv`: Copy a file from the bucket to your local machine.
- `aws s3 cp s3://[bucket-name]/data ./ --recursive`: Download all files from the s3 bucket `/data` directory to the current directory.
