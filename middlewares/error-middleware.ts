import Express from 'express';
import ApiError from '../exceptions/api-error';

export default function (err, req: Express.Request, res: Express.Response) {
  console.log(err);

  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Something went wrong.' });
}
