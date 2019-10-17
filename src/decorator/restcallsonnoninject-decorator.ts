import {InjectMockInfo} from "../internal/InjectMockInfo";
import {ReflectUtils} from "../internal/ReflectUtils";
import {resetCalls} from "ts-mockito";

export function ResetCallsOnNonInjectableMocks() {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let listNonInjectable: Array<string> = ReflectUtils.getNonInjectableMockListOfObject(target);
            for (const propertyName of listNonInjectable) {
                resetCalls(target[propertyName]);
            }
            return original.apply(this, args);
        };
        return descriptor;
    };
}
