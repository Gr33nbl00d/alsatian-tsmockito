import {InjectionMethod} from "../InjectionMethod";

export class InjectMockInfo {
    private _propertyName: string;
    private _injectionMethod: InjectionMethod;

    constructor(propertyName: string, injectionMethod: InjectionMethod) {
        this._propertyName = propertyName;
        this._injectionMethod = injectionMethod;
    }

    get propertyName(): string {
        return this._propertyName;
    }

    get injectionMethod(): InjectionMethod {
        return this._injectionMethod;
    }
}