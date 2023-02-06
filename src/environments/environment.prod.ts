import packageJson from "../../package.json"
export const APP_CONFIG = {
  version: packageJson.version,
  production: true,
  environment: 'PROD'
};
