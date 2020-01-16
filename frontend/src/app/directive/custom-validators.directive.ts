import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputRestriction]'
})
export class CustomValidatorsDirective {
  inputElement: ElementRef;

  @Input('appInputRestriction') appInputRestriction: string;
  arabicRegex = '[\u0600-\u06FF]';

  constructor(el: ElementRef) {
      this.inputElement = el;
  }

  @HostListener('keypress', ['$event']) onKeyPress(event) {
      if (this.appInputRestriction === 'integerOnly') {
          this.integerOnly(event);
      } else if (this.appInputRestriction === 'noSpecialChars') {
          this.noSpecialChars(event);
      }
  }

  integerOnly(event) {
      const e = <KeyboardEvent>event;
      if (e.key === 'Tab' || e.key === 'TAB') {
          return;
      }
      if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
          (e.keyCode === 65 && e.ctrlKey === true) ||
          (e.keyCode === 67 && e.ctrlKey === true) ||
          (e.keyCode === 86 && e.ctrlKey === true) ||
          (e.keyCode === 88 && e.ctrlKey === true)) {
          return;
      }
      if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1) {
          e.preventDefault();
      }
  }

  noSpecialChars(event) {
      const e = <KeyboardEvent>event;
      if (e.key === 'Tab' || e.key === 'TAB') {
          return;
      }
      let k;
      k = event.keyCode;
      if ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57)) {
          return;
      }
      const ch = String.fromCharCode(e.keyCode);
      const regEx = new RegExp(this.arabicRegex);
      if (regEx.test(ch)) {
          return;
      }
      e.preventDefault();
  }

  @HostListener('paste', ['$event']) onPaste(event) {
      let regex;
      if (this.appInputRestriction === 'integerOnly') {
          regex = /[0-9]/g;
      } else if (this.appInputRestriction === 'noSpecialChars') {
          regex = /[a-zA-Z0-9\u0600-\u06FF]/g;
      }
      const e = <ClipboardEvent>event;
      const pasteData = e.clipboardData.getData('text/plain');
      let m;
      let matches = 0;
      while ((m = regex.exec(pasteData)) !== null) {
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }
          m.forEach((match, groupIndex) => {
              matches++;
          });
      }
      if (matches === pasteData.length) {
          return;
      } else {
          e.preventDefault();
      }
    }

}