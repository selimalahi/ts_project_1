import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handelDuplicateError = (err: any): TGenericErrorResponse => {
  //Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // the extractrd value will be in the first captureing group
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already Exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handelDuplicateError;
