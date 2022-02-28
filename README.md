# Offline instructions
- add serverless-offline to plugins
- remove serverless-webpack from plugins
- add profile to provider 
- run:
serverless config credentials --provider aws --key yourAccessKeyId --secret yourSecretAccessKey --profile yourProfileName
- npm install serverless-offline --save-dev
- run:
sls offline start
- add x-api-key: generatedToken to your request header

# Deploying using github