import { AbstractControl } from "@angular/forms";
import { GenderEnum } from '../enum/gender.enum';

export function genderValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value === undefined ||
        control.value === null ||
        control.value === GenderEnum.FEMININE ||
        control.value === GenderEnum.MALE) {
        return null;
    }
    return { 'gender': true };
}