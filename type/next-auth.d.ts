import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      url: string;
      provider: string;
    };

    serverTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    } | null;
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      url: string;
      provider: string;
    };

    serverTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    } | null;
  }
}
