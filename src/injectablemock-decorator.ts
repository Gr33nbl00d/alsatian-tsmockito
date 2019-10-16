import {InjectionMethod} from "./InjectionMethod";
import {PropertyAccessInjection} from "./PropertyAccessInjection";
import {InjectMockInfo} from "./internal/InjectMockInfo";
import {mock} from "ts-mockito";
import {ReflectUtils} from "./Utils";

export function InjectableMock<T>(injectionMethod?: InjectionMethod) {
    return (
        target: object,
        propertyKey: string,
        descriptor?: TypedPropertyDescriptor<any>
    ) => {
        if (!injectionMethod) {
            injectionMethod = new PropertyAccessInjection();
        }
        let list: Array<InjectMockInfo> = Reflect.getMetadata("INJECTABLE_MOCKS", target);
        if (!list) {
            list = [];
            Reflect.defineMetadata("INJECTABLE_MOCKS", list, target);
        }
        let clazzToMock = ReflectUtils.getClassByReflection(target, propertyKey);
        list.push(new InjectMockInfo(propertyKey, injectionMethod));
        if (clazzToMock)
            target[propertyKey] = mock(clazzToMock);
        else
            target[propertyKey] = mock<T>();

    };
}