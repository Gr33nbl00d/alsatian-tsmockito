import {mock} from "ts-mockito";
import {ReflectUtils} from "./internal/ReflectUtils";

export function Mock<T>() {
    return (
        target: object,
        propertyKey: string,
        descriptor?: TypedPropertyDescriptor<any>
    ) => {
        let clazzToMock = ReflectUtils.getClassByReflection(target, propertyKey);
        target[propertyKey] = mock<T>(clazzToMock);
    };
}