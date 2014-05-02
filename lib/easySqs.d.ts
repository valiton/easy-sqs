
declare module "easy-sqs" {

  import AWS = require("aws-sdk");
  
  export function CreateClient(accessKey: string, secretKey: string, region: string): ISqsClient;

  export interface IQueue {
    getMessage(callback: (err: Error, data: AWS.Sqs.Message) => void);
    deleteMessage(msg: AWS.Sqs.Message, callback: (err: Error) => void);
    sendMessage(data: string, callback: (err: Error) => void);
    createQueueReader(): IQueueReader;
    drain(callback?: (err:Error) => void);
  }

  export interface IQueueReader {
    onReceipt(callback: (err, messages: AWS.Sqs.Message[], context: IMessageDeleter) => void);
    onEmpty(callback: (err) => void);
    start();
    stop();
    receiptCallback: (err: Error, messages: AWS.Sqs.Message[], context: IMessageDeleter) => void;
    emptyCallback: (err: Error) => void;
    errorHandler: (err: Error) => void;

  }

  export interface ISqsClient {
    getQueue(queueName: string): IQueue;
  }

  export interface IMessageDeleter {
    deleteMessage(message: AWS.Sqs.Message);
    deleteMessages(messages: AWS.Sqs.Message[]);
  }

}