export class TransformHelper {
  public static trim({ value }) {
    return value ? value.trim() : value;
  }
  public static trimArray({ value }) {
    return value ? value.map((item: string) => item.trim()) : value;
  }
  public static toLowerCaseArray({ value }) {
    return value ? value.map((item: string) => item.toLowerCase()) : value;
  }
  public static uniqueItems({ value }) {
    return value ? Array.from(new Set(value)) : value;
  }
}
