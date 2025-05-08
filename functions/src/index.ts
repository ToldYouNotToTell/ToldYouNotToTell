import { setGlobalOptions } from "firebase-functions/v2";
import { verifyCaptcha } from "./verifyCaptcha";
import * as logger from "firebase-functions/logger";

// Настройки для всех функций
setGlobalOptions({ 
  region: "us-central1",
  maxInstances: 3,
  memory: "256MiB", // Исправлено на MiB вместо MB
  timeoutSeconds: 60
});

// Экспортируемые функции
export { verifyCaptcha };