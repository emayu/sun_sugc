export interface EmailProvider {
    send(email:EmailOptions): Promise<{success:boolean, error?:any, messageId?:any}>;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  /**
   * Para Buffer o Stream
   */
  content?: any;
  path?: string;
  contentType?: string;
  cid?: string;
}