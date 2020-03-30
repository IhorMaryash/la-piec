import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: Array<any>, name: string): unknown {
    if (!name) { return users; }
    if (!users) { return []; }
    return users.filter(user => user.firstName.includes(name));
  }

}
