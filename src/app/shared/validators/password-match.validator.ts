import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Custom validator per confontare le password
export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        return password && confirmPassword && password !== confirmPassword
        ? { mismatch: true } // Se la condizione è vera (cioè le password non sono entrambe inserite e non corrispondono fra loro), restituisce un oggetto { mismatch: true }. Questo oggetto rappresenta l'errore di validazione e può essere utilizzato nel template per mostrare un messaggio di errore all'utente.
        :null;
    };
}