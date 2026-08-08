interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_AUTH_LOGIN_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}