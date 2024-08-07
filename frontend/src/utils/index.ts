import { Priorities } from "@/types";
export const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };
  
  export const luminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };
  
  export const isColorDark = (color: string) => {
    const [r, g, b] = hexToRgb(color);
    const lum = luminance(r, g, b);
    return lum < 0.5;
  };

  export const getContrastColor = (color: string) => {
    return isColorDark(color) ? '#ffffff' : '#000000';
  };

  export const stringToPriority = (priority: string): Priorities  => {
    switch (priority) {
      case 'LOW':
        return Priorities.Low;
      case 'MEDIUM':
        return Priorities.Medium;
      case 'HIGH':
        return Priorities.High;
      case 'URGENT':
        return Priorities.Urgent;
      default:
        return Priorities.Low;
    }
  };
  