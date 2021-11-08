import {AbstractControl, ValidatorFn} from "@angular/forms";

export function  valueSelected(myArray: any[]): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    let selectboxValue = c.value;
    let pickedOrNot = myArray.filter(
      (alias) => alias.pnombre === selectboxValue
    );

    if (pickedOrNot.length > 0) {
      return null;
    } else {
      return { match: true };
    }
  };
}
