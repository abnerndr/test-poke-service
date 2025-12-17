export class UrlUtils {
  static getIdFromUrl(url: string): string {
    return url.split('/').filter(Boolean).pop() ?? '';
  }
}
