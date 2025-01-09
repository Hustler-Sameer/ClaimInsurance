import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class EncryptDecryptService {
  functionpadKeyTo256Bit(keyBase64: string): string {
    const keyUint8 = new Uint8Array(
      atob(keyBase64)
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    if (keyUint8.length === 24) {
      const paddedKey = new Uint8Array(32);
      paddedKey.set(keyUint8);
      return btoa(String.fromCharCode(...new Uint8Array(paddedKey)));
    }

    throw new Error(
      "Key length must be 24 bytes (192 bits) to pad it to 256 bits."
    );
  }

  encryptText = async (
    jsonData: any,
    fixedKeyBase64: string,
    fixedIVBase64: string
  ): Promise<{ encryptedText: string }> => {
    const paddedKey = this.functionpadKeyTo256Bit(fixedKeyBase64);
    console.log("padded key : " + paddedKey);
    const keyUint8 = new Uint8Array(
      atob(fixedKeyBase64)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    const ivUint8 = new Uint8Array(
      atob(fixedIVBase64)
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    console.log(keyUint8);
    const key = await window.crypto.subtle.importKey(
      "raw",
      keyUint8,
      { name: "AES-GCM"},
      true,
      ["encrypt"]
    );

    const encryptedData = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: ivUint8 },
      key,
      new TextEncoder().encode(JSON.stringify(jsonData))
    );

    const eData = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));

    return {
      encryptedText: eData,
    };
  };
}
