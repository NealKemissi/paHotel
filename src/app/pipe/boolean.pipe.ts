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
    name: 'roomStatus'
})
@Injectable()
export class RoomStatusPipe implements PipeTransform {
    transform(value: number): any {
        if(value == 1){
            return 'Reservé';
        } else if(value == 2){
            return 'En cours';
        }
        return 'Terminé';
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

@Pipe({
    name: 'myDateFormat'
})
@Injectable()
export class myDateFormatPipe implements PipeTransform {
    transform(value: any): any {   
        return value.toString().replace(new RegExp(':00.000Z', 'gi'), '').replace('T', ' à ');
      }
}