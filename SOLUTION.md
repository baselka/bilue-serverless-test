# Bilue Serverless Test

The solution provided doesn't use the provided [boilerplate](https://github.com/Bilue/aws-serverless-test), therefore please find the instructions to run this app both locally and on AWS serverless lambda function.

Given more time I would have created an express app from scratch and created unit tests for the controller and service and the routes.

### This API has two endpoints :
> **Note:** The project contain a **Postman Collection and Environment** in the ./postman directory.

App host **http://localhost:4000/api/v1**
```
Endpoint: /auth/login
Method: POST
Body: {email, password}
Auth: false
``` 
```
Endpoint: /weather
Method: GET
Params: {post_code, country_code}
Authorization: JWT as Headers Bearer Token
``` 

To test the endpoints make sure you login using the below credentials:
```{"email": "test@example.com","password": "123456"}```

# Setup

Clone this repo and run the following commands in the projects root directory :
#### `$ touch .env`
the above command will create a .env file in the root dir of the project copy and paste the below env vars to the file and save it.
```
 ENV=prod 
 PORT=4000
 OPEN_WEATHER_API_URL="https://api.openweathermap.org"
 OPEN_WEATHER_API_KEY="<use your own api key>"
 ```

#### Installing dependencies 
#### `$ npm install`

## Run locally
> **Note:** in the .env file change the   **ENV=prod** to **ENV=dev**.
#### `$ npm start`
the api should be running now on [http:localhost:4000](http:localhost:4000)
## Deploy to AWS lambda

I'm using the  [Serverless Framework](https://www.serverless.com/) to  deploy to the [AWS lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html).

Make sure you have the **serverless npm package installed** .
If not installed run the following command:
#### `$ npm install -g serverless`
provide the AWS credentials to the serverless package to be able to create CFN stack and deploy our app by running the following command:

#### `$ serverless config credentials --provider aws --key ACCESS_KEY ?secret SECRET_KEY`
> **Note:** make sure the .env file has the ENV set to prod **"ENV=prod"**.

Run the deployment command
#### `$ serverless deploy`
You should be able to see something similar to the below output if everything went well: 
```
✔ Service deployed to stack bilue-serverless-test-dev (184s) 
console:https://console.serverless.com/territorialsilverfish/metrics/awsLambda?globalEnvironments=dev&globalNamespace=bilue-serverless-test&globalRegions=ap-southeast-2&globalScope=awsLambda&globalTimeFrame=15m
endpoints:
  ANY - https://jo8otsx7o3.execute-api.ap-southeast-2.amazonaws.com/dev/
  ANY - https://jo8otsx7o3.execute-api.ap-southeast-2.amazonaws.com/dev/{proxy+}
functions:
  app: bilue-serverless-test-dev-app (25 MB)```