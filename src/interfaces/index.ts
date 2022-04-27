export interface ITokenPayload {
  discord_id: string;
  iat: number;
  exp: number;
}

export interface IUser {
  discord_id: string;
  wallet_address: string;
  username: string;
  discriminator: string;
}

export interface IUpdateUser {
  discord_id: string;
  wallet_address: string;
}
