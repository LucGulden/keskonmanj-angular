import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'user_language';
  private readonly SUPPORTED_LANGUAGES = ['fr', 'en'];
  
  getCurrentLanguage(): string {
    return localStorage.getItem(this.STORAGE_KEY) || 'fr';
  }
  
  setLanguage(lang: string): void {
    if (this.SUPPORTED_LANGUAGES.includes(lang)) {
      localStorage.setItem(this.STORAGE_KEY, lang);
      window.location.href = `/${lang}`;
    }
  }
  
  getSupportedLanguages(): string[] {
    return this.SUPPORTED_LANGUAGES;
  }
}