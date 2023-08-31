const IBM = require('ibm-cos-sdk');

var config = {
    endpoint: 'https://s3.us-south.cloud-object-storage.appdomain.cloud',
    apiKeyId: 'PPdDPrIZFYjBIcLKnwMJdQEjhhk0681lX9rMIzt9BB1_',
    serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/0f7e3a62d36c459f8bddb84c24f289d5:68bf8de0-e518-4295-bbcc-332d06e0be35::',
    signatureVersion: 'iam',
    
};

var s3 = new IBM.S3(config);

module.exports = s3;
