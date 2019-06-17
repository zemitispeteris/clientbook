import { AbstractControl } from '@angular/forms';
import { ONLY_GEORGIAN_LETTERS_PATTERN, ONLY_ENGLISH_LETTERS_PATTERN } from 'src/app/constants/patterns.constants';


export function LanguageValidator(control: AbstractControl) {


const georgian = ONLY_GEORGIAN_LETTERS_PATTERN;

const english = ONLY_ENGLISH_LETTERS_PATTERN;

  
return georgian.test(control.value) ===  english.test(control.value) ? {  validLang: true } : null;

}
