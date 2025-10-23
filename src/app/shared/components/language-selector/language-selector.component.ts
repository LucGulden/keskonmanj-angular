import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  languages: {code: string, name: string, flagIcon: string}[] = [
    { code: 'fr', name: 'Français', flagIcon: 'fi-fr' },
    { code: 'en', name: 'English', flagIcon: 'fi-gb' }
  ];
  
  currentLang: string;
  isDropdownOpen = false;
  
  private languageService = inject(LanguageService);
  
  constructor() {
    this.currentLang = this.languageService.getCurrentLanguage();
  }
  
  changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
    this.isDropdownOpen = false;
  }
  
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  getCurrentLanguageData() {
    return this.languages.find(lang => lang.code === this.currentLang) || this.languages[0];
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      this.isDropdownOpen = false;
    }
  }
}