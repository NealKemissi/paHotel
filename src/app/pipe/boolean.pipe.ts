import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'boolTransform'
})
@Injectable()
export class BoolTransformPipe implements PipeTransform {
    transform(value: boolean): any {
        return value == true ? 'Oui' : 'Non';
    }
}

@Pipe({
    name: 'isClean'
})
@Injectable()
export class isCleanPipe implements PipeTransform {
    transform(value: boolean): any {
        return (value) ? 'Propre' : 'Sale';
    }
}