/**
 * jwt token payload
 */
export type TokenPayload =  {
  sessionId: string;
  userId: string;
} & Record<string, string>;