import User from "../db/entity/User";

export type JwtPayloadType = {
  id: string;
};

export type ValidationErrorType = {
  field: string;
  message: string;
};

export type ResponseType = {
  tokens: ResponseTokensType;
  user: User;
};

type ResponseTokensType = {
  accessToken: string;
  refreshToken: string;
};
