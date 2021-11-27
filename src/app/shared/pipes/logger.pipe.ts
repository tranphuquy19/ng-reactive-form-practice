import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'logger'
})
export class LoggerPipe implements PipeTransform {
  transform(value: any): string {
    console.log('LoggerPipe', value);
    return value;
  }
}
