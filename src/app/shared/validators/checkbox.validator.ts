// Custom validator creato per inefficienza del Validatore nativo requiredTrue
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function requiredTrueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value === true ? null : { requiredTrue: true } // Se control.value è true, viene restituito null, indicando che non ci sono errori di validazione. Se control.value non è true (quindi il checkbox è deselezionato), viene restituito un oggetto { requiredTrue: true }. Questo oggetto indica che c'è un errore di validazione e che il validatore requiredTrue non è stato soddisfatto.
    }
}