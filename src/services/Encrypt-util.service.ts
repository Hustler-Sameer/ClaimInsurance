import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})

export class encryptService{
    encryptText = async (jsonData: any, customKey: Uint8Array, customIV: Uint8Array) => {
        try {
          const jsonString = JSON.stringify(jsonData);
       
          const algorithm = { name: 'AES-GCM', length: 256 };
          const key = await window.crypto.subtle.importKey('raw', customKey, algorithm, true, ['encrypt', 'decrypt']);
          const iv = customIV;
       
          const encryptedData = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            new TextEncoder().encode(jsonString)
          );
       
          const base64iv = btoa(String.fromCharCode.apply(null, Array.from(iv)));
          const base64key = btoa(String.fromCharCode.apply(null, Array.from(customKey)));
         
          // Convert encryptedData to a regular array before applying String.fromCharCode.apply
          const encryptedArray = new Uint8Array(encryptedData);
          const eData = btoa(String.fromCharCode.apply(null, Array.from(encryptedArray)));
       
          console.log('base64iv:', base64iv);
          console.log('base64key:', base64key);
          console.log('encryptedData:', eData);
       
          return { encryptedText: eData, base64iv: base64iv, key: base64key };
        } catch (error) {
          console.error('Encryption error:', error);
          return null;
        }
      };
     
}
 
 