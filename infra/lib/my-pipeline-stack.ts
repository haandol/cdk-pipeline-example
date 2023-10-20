import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './my-pipline-app-stage';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = codecommit.Repository.fromRepositoryName(
      this,
      'Repository',
      'cdk-pipeline-example'
    );

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.codeCommit(repository, 'main'),
        commands: ['cd infra', 'npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    pipeline.addStage(new MyPipelineAppStage(this, 'test'));
  }
}
