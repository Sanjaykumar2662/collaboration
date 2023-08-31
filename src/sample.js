
const IBM = require('ibm-cos-sdk');

var config = {
    endpoint: 'https://s3.us-south.cloud-object-storage.appdomain.cloud',
    apiKeyId: 'PPdDPrIZFYjBIcLKnwMJdQEjhhk0681lX9rMIzt9BB1_',
    serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/0f7e3a62d36c459f8bddb84c24f289d5:68bf8de0-e518-4295-bbcc-332d06e0be35::',
    signatureVersion: 'iam',
    
};

var s3 = new IBM.S3(config);
  
function createBucket(bucketName) {
    console.log(`Creating new bucket: ${bucketName}`);
    return s3.createBucket({
        Bucket: bucketName,
        CreateBucketConfiguration: {
          LocationConstraint: 'us-south'
        },        
    }).promise()
    .then((() => {
        console.log(`Bucket: ${bucketName} created!`);
    }))
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

function getBuckets() {
    console.log('Retrieving list of buckets');
    return s3.listBuckets()
    .promise()
    .then((data) => {
        if (data.Buckets != null) {
            for (var i = 0; i < data.Buckets.length; i++) {
                console.log(`Bucket Name: ${data.Buckets[i].Name}`);
            }
        }
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}
const fs = require('fs');
const path = require('path');
function createTextFile() {
    console.log(`Creating new item: `);
    var local = "C:/Users/sanja/OneDrive/Documents/dbms notes.pdf";
    const fileStream = fs.createReadStream(local);
    const fileName = path.basename(local);
    return s3.putObject({
        Bucket: "ibm-hc-clone", 
        Key: fileName, 
        Body: fileStream,
    }).promise()
    .then(() => {
        console.log(`Item:created!`);
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

//createTextFile();

// function getDownloadLink(bucketName, objectKey) {
//     const params = {
//       Bucket: bucketName,
//       Key: objectKey,
//       Expires: 3600, // Link will expire in 1 hour (adjust as needed)
//     };
  
//     const url = s3.getSignedUrl('getObject', params);
//     return url;
//   }
  
//   function getBucketContents(bucketName) {
//     console.log(`Retrieving bucket contents from: ${bucketName}`);
//     return s3.listObjects({ Bucket: bucketName })
//       .promise()
//       .then((data) => {
//         if (data != null && data.Contents != null) {
//           for (var i = 0; i < data.Contents.length; i++) {
//             var itemKey = data.Contents[i].Key;
//             var itemSize = data.Contents[i].Size;
//             console.log(`Item Key: ${itemKey}`);
//             var downloadLink = getDownloadLink(bucketName, itemKey);
//             console.log(`Item: ${itemKey} (${itemSize} bytes).`);
//             console.log(`Download Link: ${downloadLink}`);
//           }
//         }
//       })
//       .catch((e) => {
//         console.error(`ERROR: ${e.code} - ${e.message}\n`);
//       });
//   }
  
  

// var params = {
//     Bucket: 'ibm-hc-clone', /* required */
//     // ContinuationToken: 'STRING_VALUE',
//     // Delimiter: 'STRING_VALUE',
//     EncodingType: 'url',
//     FetchOwner: true,
//     //StartAfter: 'STRING_VALUE'
//   };
//   s3.listObjectsV2(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });
 const bucketName = 'ibm-hc-clone'; // Replace with your bucket name
function getBucketContents(bucketName) {
    console.log(`Retrieving bucket contents from: ${bucketName}`);
    return s3.listObjects(
        {Bucket: bucketName},
    ).promise()
    .then((data) => {
        if (data != null && data.Contents != null) {
            for (var i = 0; i < data.Contents.length; i++) {
                var itemKey = data.Contents[i].Key;
                var itemSize = data.Contents[i].Size;
                // getItem(bucketName,itemKey)
                console.log(`Item: ${itemKey} (${itemSize} bytes).`)
            }
        }    
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

function getItem(bucketName, itemName) {
    console.log(`Retrieving item from bucket: ${bucketName}, key: ${itemName}`);
    return s3.getObject({
        Bucket: bucketName, 
        Key: itemName
    }).promise()
    .then((data) => {
        if (data != null) {
            console.log('File Contents: ' + Buffer.from(data.Body).toString());
        }    
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}
//getBucketContents('ibm-hc-clone');
//getItem("ibm-hc-clone","dbms notes.pdf")

createBucket("sanjaykumar6112002");
