export {};

interface Payload {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: Payload;
    }
  }
}
