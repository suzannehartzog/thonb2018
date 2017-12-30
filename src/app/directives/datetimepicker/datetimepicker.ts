import { Directive, ElementRef } from '@angular/core';
import 'eonasdan-bootstrap-datetimepicker';
import * as $ from 'jquery';

interface JQuery {
    addClass(className: string): JQuery;
    attr(attributeName: string, value: string | number): JQuery;
}
@Directive({ selector: '[datetimepicker]' })
export class DateTimePicker {
    constructor(private el: ElementRef) { }
    ngAfterViewInit() {
        $(this.el.nativeElement).datetimepicker();
    }
}
