import {InjectMockInfo} from "./internal/InjectMockInfo";
import {instance} from "ts-mockito";

export function InjectMocks(any: any) {
    return (
        target: object,
        propertyKey: string,
        descriptor?: TypedPropertyDescriptor<any>
    ) => {
        target[propertyKey] = any;
        let list: Array<InjectMockInfo> = Reflect.getMetadata("INJECTABLE_MOCKS", target);
        if (list) {
            for (const injectMockInfo of list) {
                injectMockInfo.injectionMethod.inject(any, injectMockInfo.propertyName, instance(target[injectMockInfo.propertyName]))
            }
        }
    };
}
