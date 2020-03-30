import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hryvnia'
})
export class HryvniaPipe implements PipeTransform {

  transform(value: string, symbol?: string): unknown {
   if (!symbol) { return '$' + value; }
   if (!value) { return ''; }
   if (symbol === 'UAH') {
     return 25 * +value + ' ₴';
   }
  //  return value + ' ₴';
  }

}
