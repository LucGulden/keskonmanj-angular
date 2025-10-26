import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'user_language';
  private readonly SUPPORTED_LANGUAGES = ['fr', 'en'];
  private translate = inject(TranslateService);

  constructor() {
    // Configure supported languages
    this.translate.addLangs(this.SUPPORTED_LANGUAGES);
    this.translate.setDefaultLang('fr');

    // Set initial language from localStorage or use default
    const savedLang = this.getCurrentLanguage();
    this.translate.use(savedLang);
  }

  getCurrentLanguage(): string {
    return localStorage.getItem(this.STORAGE_KEY) || 'fr';
  }

  setLanguage(lang: string): void {
    if (this.SUPPORTED_LANGUAGES.includes(lang)) {
      localStorage.setItem(this.STORAGE_KEY, lang);
      this.translate.use(lang);
    }
  }

  getSupportedLanguages(): string[] {
    return this.SUPPORTED_LANGUAGES;
  }
}