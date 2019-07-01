import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'filter'
})
@Injectable()
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], value: string, searchString: string) {

    if (!searchString) {
      console.log('no search');
      return items;
    }
    if (!value) {
      console.log('no value');
      return items;
    }

    return items.filter(it => {
      const filter = it[value].toString().toLowerCase().includes(searchString.toLowerCase());
      return (filter);
    });
  }
 }

@Pipe({
  name: 'highlight'
})
@Injectable()
export class HighLightPipe implements PipeTransform {
  transform(value: any, args: string): any {

    if (!args) {
      console.log('no highlight');
      return value;
    }

    return value.toString().replace(new RegExp(args, 'gi'), '<span class="highlight">' + args + '</span>');
  }
}