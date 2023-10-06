/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="gtag.js" />
export {};

declare module 'gtag.js';
declare global {
  interface Window {
    SpeechRecognition: any;
    MercadoPago: any;
    KueskipayAdvertising: any;
    webkitSpeechRecognition: any;
    dataLayer: Record<string, any>[];
  }
}
