export type ClassValue = string | number | null | false | undefined | Record<string, unknown> | ClassValue[];

export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  const walk = (v: ClassValue): void => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') {
      out.push(String(v));
      return;
    }
    if (Array.isArray(v)) {
      v.forEach(walk);
      return;
    }
    if (typeof v === 'object') {
      for (const key in v) {
        if (v[key]) out.push(key);
      }
    }
  };
  values.forEach(walk);
  return out.join(' ');
}
