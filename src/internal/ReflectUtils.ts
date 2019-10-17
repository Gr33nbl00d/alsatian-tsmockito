// no globals and typing support out of the box with intellisense
import {instance} from "ts-mockito";
import "reflect-metadata";
import {InjectMockInfo} from "./InjectMockInfo";

export class ReflectUtils {
    static METADATA_INJECTABLEMOCKS: string = "INJECTABLE_MOCKS";
    private static METADATA_NONINJECTABLEMOCKS: "NON_INJECTABLE_MOCKS";

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


    static getInjectableMockListOfObject(target: object): Array<InjectMockInfo> {
        let list: Array<InjectMockInfo> = Reflect.getMetadata(ReflectUtils.METADATA_INJECTABLEMOCKS, target);
        if (!list) {
            list = [];
            Reflect.defineMetadata(ReflectUtils.METADATA_INJECTABLEMOCKS, list, target);
        }
        return list;
    }

    static getNonInjectableMockListOfObject(target: object): Array<string> {
        let list: Array<string> = Reflect.getMetadata(ReflectUtils.METADATA_NONINJECTABLEMOCKS, target);
        if (!list) {
            list = [];
            Reflect.defineMetadata(ReflectUtils.METADATA_NONINJECTABLEMOCKS, list, target);
        }
        return list;

    }
}
