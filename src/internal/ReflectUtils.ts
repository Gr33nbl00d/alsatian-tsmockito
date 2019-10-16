// no globals and typing support out of the box with intellisense
import {instance} from "ts-mockito";
import "reflect-metadata";
import {InjectMockInfo} from "./InjectMockInfo";

export class ReflectUtils{

    public static isInterface(clazzToMock) {
        return clazzToMock.toString().startsWith("class") == false;
    }

    public static getClassByReflection(target: object, propertyKey: string) {
        let clazzToMock = Reflect.getMetadata("design:type", target, propertyKey);
        if (ReflectUtils.isInterface(clazzToMock)) {
            clazzToMock = undefined;
        }
        return clazzToMock;
    }



}
