import {ReflectUtils} from "../internal/ReflectUtils";
import {reset} from "ts-mockito";

export function ResetNonInjectableMocks() {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let listNonInjectable: Array<string> = ReflectUtils.getNonInjectableMockListOfObject(target);
            for (const propertyName of listNonInjectable) {
                reset(target[propertyName]);
            }
            return original.apply(this, args);
        };
        return descriptor;
    };
}
