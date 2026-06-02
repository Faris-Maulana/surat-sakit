export const config = {
  useMock: (process.env as Record<string, string>).USE_MOCK !== 'false',

  satusehat: {
    clientId: (process.env as Record<string, string>).SATUSEHAT_CLIENT_ID || '',
    clientSecret: (process.env as Record<string, string>).SATUSEHAT_CLIENT_SECRET || '',
    orgId: (process.env as Record<string, string>).SATUSEHAT_ORG_ID || '',
    baseUrl: (process.env as Record<string, string>).SATUSEHAT_ENV === 'prod'
      ? 'https://api-satusehat.kemkes.go.id'
      : 'https://api-satusehat-dev.dto.kemkes.go.id',
  },

  bpjs: {
    consId: (process.env as Record<string, string>).BPJS_CONS_ID || '',
    secretKey: (process.env as Record<string, string>).BPJS_SECRET_KEY || '',
    userKey: (process.env as Record<string, string>).BPJS_USER_KEY || '',
    baseUrl: (process.env as Record<string, string>).BPJS_ENV === 'prod'
      ? 'https://apijkn.bpjs-kesehatan.go.id/vclaim-rest'
      : 'https://apijkn-dev.bpjs-kesehatan.go.id/vclaim-rest-dev',
  },

  upstash: {
    url: (process.env as Record<string, string>).UPSTASH_REDIS_URL || '',
    token: (process.env as Record<string, string>).UPSTASH_REDIS_TOKEN || '',
  },
}
