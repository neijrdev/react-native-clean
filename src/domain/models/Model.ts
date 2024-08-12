export class JsonSerializer {
  static fromJson<T>(json: any, expectedKeys?: (keyof T)[]): T {
    if (!json || typeof json !== 'object') {
      throw new Error('Invalid JSON format');
    }

    // Checks if all expected keys are present in the JSON
    if (expectedKeys) {
      for (const key of expectedKeys) {
        if (!(key in json)) {
          throw new Error(`Missing property: ${String(key)}`);
        }
      }
    }

    return json as T;
  }

  static toJson<T>(data: T): string {
    return JSON.stringify(data);
  }
}
