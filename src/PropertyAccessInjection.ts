import {InjectionMethod} from "./InjectionMethod";

export class PropertyAccessInjection implements InjectionMethod {
    private injectionPropertyName: string;

    constructor(injectionPropertyName?: string) {
        this.injectionPropertyName = injectionPropertyName;
    }

    inject(target: object, propertyKey: string, value: any) {
        if (this.injectionPropertyName)
            target[this.injectionPropertyName] = value;
        else
            target[propertyKey] = value;
    }
}