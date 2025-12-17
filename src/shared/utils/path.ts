export class PathUtils {
  static getLastPath(url: string): string {
    return url.split('/').filter(Boolean).pop() ?? '';
  }
}
