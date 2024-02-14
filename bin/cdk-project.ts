import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CDKContext } from '../types';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export const getContext = async(app: cdk.App) : Promise<CDKContext> => {
  return new Promise(async(resolve, reject) => {
    try {

      const currentBranch = 'development';

      const environment = app.node.tryGetContext('environments').find((e:any) => e.branchName === currentBranch);

      const globals = app.node.tryGetContext('globals');
      return resolve( {...globals, ...environment})
    } catch (err) {
      console.error(err);
      return reject();
    }
  })
}


//create stacks 
const createStacks = async () => {
  try {
    const app = new cdk.App();
    const context = await getContext(app);
    const tags:any = {
      Environment: context.environment,
    }
    const stackProps: cdk.StackProps= {
      env: {
        account: context.accountNumber,
        region: context.region
      },
      description: `create the stacks`,
      stackName: "lambda-stack",
      tags
    }
    // new LambdaS
  } catch (err) {
    console.error(err);
  }
}
createStacks();