# CDK Pipeline Example

accroding to [CDK Best Practice](https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html) you are going to need to deploy [CDK Pipeline](https://docs.aws.amazon.com/cdk/v2/guide/cdk_pipeline.html#cdk_pipeline_bootstrap) for each stages.

![cdk deploy](https://docs.aws.amazon.com/images/cdk/v2/guide/images/best-practice-deploy-to-multiple-accounts.png)

# Preresuiqites

- Node.js 18+
- AWSCLI

# Installation

install depedencies

````bash
$ cd infra
$ npm i
```

bootstrap with Admin policy

```bash
$ npx cdk bootstrap --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess```
````

# Deploy my stacks using CDK Pipeline

## Deploy

create codecommit repository and set it to remote as `codecommit`.

```bash
$ aws codecommit create-repository --repository-name cdk-pipeline-example
$ git remote add codecommit codecommit::ap-northeast-2://cdk-pipeline-example
$ git push codecommit main
```

deploy pipeline

```bash
$ cdk deploy
```

visit [Codepipeline AWS Consonle](https://ap-northeast-2.console.aws.amazon.com/codesuite/codepipeline/pipelines/MyPipeline/view?region=ap-northeast-2), and check out the progress.

## Invoke lambda

visit [Lambda AWS Console](https://ap-northeast-2.console.aws.amazon.com/lambda/home?region=ap-northeast-2#/functions) and invoke the function with name starts with `dev-LambdaStack-MyFunuctionxxx`.

# Destory

```bash
$ cdk destroy
```
