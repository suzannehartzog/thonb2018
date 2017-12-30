import { Directive, ElementRef } from '@angular/core';
import 'bootstrap-datepicker';
import * as $ from 'jquery';

interface JQuery {
    addClass(className: string): JQuery;
    attr(attributeName: string, value: string | number): JQuery;
}
@Directive({ selector: '[datepicker]' })
export class DatePicker {
    constructor(private el: ElementRef) { }
    ngAfterViewInit() {
        $(this.el.nativeElement).datepicker();
    }
}
