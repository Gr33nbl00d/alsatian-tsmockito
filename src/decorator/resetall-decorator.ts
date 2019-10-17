import {InjectMockInfo} from "../internal/InjectMockInfo";
import {ReflectUtils} from "../internal/ReflectUtils";
import {reset} from "ts-mockito";

export function ResetAllMocks() {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let list: Array<InjectMockInfo> = ReflectUtils.getInjectableMockListOfObject(target);
            for (const injectMockInfo of list) {
                reset(target[injectMockInfo.propertyName]);
            }
            let listNonInjectable: Array<string> = ReflectUtils.getNonInjectableMockListOfObject(target);
            for (const propertyName of listNonInjectable) {
                reset(target[propertyName]);
            }
            return original.apply(this, args);
        };
        return descriptor;
    };
}
