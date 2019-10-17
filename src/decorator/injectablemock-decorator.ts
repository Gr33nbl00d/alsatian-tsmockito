import {InjectionMethod} from "../InjectionMethod";
import {PropertyAccessInjection} from "../PropertyAccessInjection";
import {InjectMockInfo} from "../internal/InjectMockInfo";
import {mock} from "ts-mockito";
import {ReflectUtils} from "../internal/ReflectUtils";

export function InjectableMock<T>(injectionMethod?: InjectionMethod) {
    return (
        target: object,
        propertyKey: string,
        descriptor?: TypedPropertyDescriptor<any>
    ) => {
        if (!injectionMethod) {
            injectionMethod = new PropertyAccessInjection();
        }
        var list = ReflectUtils.getInjectableMockListOfObject(target);
        let clazzToMock = ReflectUtils.getClassByReflection(target, propertyKey);
        list.push(new InjectMockInfo(propertyKey, injectionMethod));
        if (clazzToMock)
            target[propertyKey] = mock(clazzToMock);
        else
            target[propertyKey] = mock<T>();

    };
}