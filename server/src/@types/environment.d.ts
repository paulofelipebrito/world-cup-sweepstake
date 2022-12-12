declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_ACCESS_TOKEN: string;
      GOOGLE_ID: string;
      JWT_SECRET: string;
    }
  }
}

export {};
