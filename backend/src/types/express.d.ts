

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        nombre: string;
        roles: string[];
      }
    }
  }
}