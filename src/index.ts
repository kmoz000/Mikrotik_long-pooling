import AWS from "aws-sdk"

// hadi ghaliban maghadich tghayar
AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'YOUR_REGION'
});

// Create an ECS service object
const ecs = new AWS.ECS();

// hna service details
const params:AWS.ECS.CreateServiceRequest = {
  cluster: 'YOUR_CLUSTER_NAME',
  serviceName:"ouzmir.ispapp.co",
  serviceConnectConfiguration:{
    services: [
      { portName:"collector", clientAliases:[{ port: 8550 }], discoveryName:"ouzmir" },
    ],
    enabled:true,
  },
  taskDefinition:"",
  enableExecuteCommand:true,
  // networkConfiguration:{
  //   awsvpcConfiguration:{
  //     subnets: 
  //   }
  // }
  volumeConfigurations:[{
    name:"db",
    managedEBSVolume:{
      volumeType:"gp3",
      roleArn:"",
      sizeInGiB:3
    }
  }]
};

// Call the createContainerInstances API to launch the container instance
ecs.createService(params, function(err, data) {
  if (err) {
    console.log('Error launching container instance:', err, err.stack);
  } else {
    console.log('Container instance launched successfully:', data);
  }
});
