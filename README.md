
# Project Title
**Document Vault**

# Logo
![vault](https://user-images.githubusercontent.com/82435523/170882255-f67911a6-5193-4d98-9d82-dd06963f6df5.png)

# Project Description

This project focuses on improving the security measures of any web app to some extent.

It includes Sign in with the 2 factor-authentication method-

1.Password                                                                                                                                                             
2.Face Recognition with the image

After successful Registration and Sign in user will be able to access the web app and Hence, can safely preserve his documents and files in that and access them from anywhere in the world.

## Tech Stack

**Client:** HTML, CSS ,JavaScript

**Server:** Node.js, Express                                                                     

**Database:** MongoDB ,AWS s3 bucket

## Features
- Navigation Bar
- Register Page with the link to signin page
- Uploading the 1st image Page 1
- Uploading the 2nd image Page 2
- Successfully Registered
- Sign in Page with the link to register page
- Successfully inside the Web App


## Screenshots
**Register Page**

![image](https://user-images.githubusercontent.com/82435523/170882612-f0a7eca0-3d7d-44e4-9d44-b3be672477d9.png)

**Sign Up Page**

![image](https://user-images.githubusercontent.com/82435523/170882660-c2a0c97d-51b7-458c-8543-3a20ead4a603.png)

**Upload Image 1**

![image](https://user-images.githubusercontent.com/82435523/170882784-9723287c-6f60-4748-9d50-31a39043b40d.png)

**Upload Image 2**

![image](https://user-images.githubusercontent.com/82435523/170882823-9163720a-fa69-4471-b61d-37fec4a3657b.png)


**VAULT APP**

![image](https://user-images.githubusercontent.com/82435523/170882721-e6ff7f48-601e-44f7-bab7-65bbfb1103e4.png)

## For more reference see the Video Demo
https://drive.google.com/file/d/1kMQC25iI-VbfKB2hLgh-rXip0mk4P9s2/view?usp=sharing

## To Run Locally

Clone the project

```bash
  git clone https://github.com/Deep-anjali01/Microsoft-Engage-22.git
```

Go to the project directory

```bash
cd Microsoft-Engage-22
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT = `                                                              
`MONGODB = mongodb+srv://<username>:<password>@cluster0.<yours>.mongodb.net/users?retryWrites=true&w=majority`

`AWS_ACCESS_KEY_ID= `                                    
`AWS_ACCESS_KEY_SECRET= `                              
`AWS_BUCKET_NAME=`

## Installation


Install required tech stacks  on you local environment-                                 
- install node.js 
- install MongoDB 







Install the  required packages by-

```bash
  npm i

```

For Configuration of AWS s3 bucket

- uncheck block all public acess
- enable Access control list (ACL) 
- config CORS json file for get request

```bash
  npm i aws-sdk
```  












