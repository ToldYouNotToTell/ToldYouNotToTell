// src/lib/utils/getUserIP.ts
import type { IncomingMessage } from "http";

/**
 * Возвращает IP-адрес клиента из объекта запроса.
 * Учтены заголовки X-Forwarded-For (если используется прокси) и прямое соединение.
 *
 * @param req — объект запроса (IncomingMessage или NextApiRequest)
 * @returns IP-адрес клиента или пустая строка, если не удалось определить
 */
export function getUserIP(req: IncomingMessage): string {
  // @ts-ignore
  const xff = (req.headers["x-forwarded-for"] ?? "") as string;
  if (xff) {
    const [first] = xff.split(",").map(ip => ip.trim());
    if (first) return first;
  }

  // @ts-ignore
  if (req.socket?.remoteAddress) {
    // @ts-ignore
    return req.socket.remoteAddress;
  }

  return "";
}
