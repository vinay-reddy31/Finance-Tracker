// lib/config.ts
export const keycloakConfig = {
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
    logoutUrl: process.env.NEXT_PUBLIC_KEYCLOAK_LOGOUT_URL!,
    postLogoutRedirectUri: process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000"
  };
  