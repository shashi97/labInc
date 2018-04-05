import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'insuranceSimulationFilter'
    
})
export class InsuranceSimulationFilter implements PipeTransform {
    transform(items: any[], element: any): any {
        if (!items || !element) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
      return items.filter(item => {
            var term = element.replace(/\s/g, '');
            var name = item.Name.replace(/\s/g, '');
            var regex = new RegExp('^' + term, 'i');
            if (name.match(regex) !== null) {
                return item;
            }

        });
    }
}