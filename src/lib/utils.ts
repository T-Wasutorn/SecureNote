import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * แปลง String ให้กลายเป็นตัวเลขที่แน่นอน (Deterministic Hash)
 * โดยใช้หลักการ Bitwise เพื่อให้ Input เดิมได้ Output เดิมเสมอ
 */
export function generateDbId(rawId: string, email: string): number {
  const salt = "hachimi_is_here_mala"; // salt นี้เป็นคำอะไรก็ได้
  const secureSeed = `${rawId}-${email}-${salt}`;
  
  let hash = 0;
  for (let i = 0; i < secureSeed.length; i++) {
    hash = (hash << 5) - hash + secureSeed.charCodeAt(i);
    hash |= 0; // แปลงเป็น 32-bit integer
  }
  
  // ใช้ Math.abs และ Modulo เพื่อให้ได้เลขบวกที่อยู่ในช่วงที่ PocketHost/API รับได้
  // จำกัดไว้ที่เลข 7 หลักเพื่อความปลอดภัย
  return Math.abs(hash % 10000000); 
}
