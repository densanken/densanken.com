/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CONTACT_GOOGLE_FORM_URL: string;
  readonly JOIN_GOOGLE_FORM_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
