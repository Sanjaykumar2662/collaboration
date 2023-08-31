const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});


const IBM = require('ibm-cos-sdk');

var config = {
    endpoint: 'https://s3.us-south.cloud-object-storage.appdomain.cloud',
    apiKeyId: 'PPdDPrIZFYjBIcLKnwMJdQEjhhk0681lX9rMIzt9BB1_',
    serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/0f7e3a62d36c459f8bddb84c24f289d5:68bf8de0-e518-4295-bbcc-332d06e0be35::',
    signatureVersion: 'iam',
    
};

var s3 = new IBM.S3(config);

io.on('connection', socket => {
    socket.on("createfile", async (fileName, fileData, bname) => {
        await createFile(fileName, fileData, bname);
    });
    socket.on("displaycontent", async (bname) => {
      await getBucketContents(bname);
  });
    
});
//   socket.on("bucket-creation", async bucketName=>{
//     await createBucket(bucketName)
//     //console.log(bucketName)
//   });

//   socket.on("save-button",async file=>{
//     await createTextFile(file)
//   })

//   console.log('connected..');
// });

// const bucketName="";
// function createBucket(bucketName) {
//   console.log(`Creating new bucket: ${bucketName}`);
//   return s3.createBucket({
//     Bucket: bucketName,
//     CreateBucketConfiguration: {
//       LocationConstraint: 'us-south'
//     },
//   }).promise()
//     .then(() => {
//       console.log(`Bucket: ${bucketName} created!`);
//     })
//     .catch((e) => {
//       console.error(`ERROR: ${e.code} - ${e.message}\n`);
  


function createFile(fname,file,bname) {
  console.log(`Creating new item: `);
  // var local = "C:/Users/sanja/OneDrive/Documents/dbms notes.pdf";
  // const fileStream = fs.createReadStream(local);
  // const fileName = path.basename(local);
  return s3.putObject({
      Bucket:bname, 
      Key:fname, 
      Body: file,
  }).promise()
  .then(() => {
      console.log(`Item:created!`);
  })
  .catch((e) => {
      console.error(`ERROR: ${e.code} - ${e.message}\n`);
  });
}
function getBucketContents(bucketName) {
  console.log(`Retrieving bucket contents from: ${bucketName}`);
  return s3.listObjects({ Bucket: bucketName })
    .promise()
    .then((data) => {
      if (data != null && data.Contents != null) {
        const contents = data.Contents.map((item) => {
          return {
            name: item.Key,
            lastModified: item.LastModified,
            size: item.Size,
          };
        });
        io.emit("bucketContentsFetched", contents);
        return contents;
      } else {
        return [];
      }
    })
    .catch((e) => {
      console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}



