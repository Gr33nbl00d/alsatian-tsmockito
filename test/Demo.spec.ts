// no globals and typing support out of the box with intellisense
import {Test, TestFixture} from "alsatian";
import _default, {instance, verify} from "ts-mockito";
import "reflect-metadata";
import {InjectableMock, InjectMocks, Mock, PropertyAccessInjection} from "../src";

class Greeter {
    private _message: string;

    constructor(message: string) {
        this._message = message;
    }

    greet() {
        console.log(this._message);
    }
}

class DemoClass {
    protected friendlyGreeter: Greeter = new Greeter("Hello!");
    protected rudeGreeter: Greeter = new Greeter("Ummpf!");

    greetAll() {
        this.greetInternal(this.friendlyGreeter)
        this.greetInternal(this.rudeGreeter)
    }

    greetInternal(greeter: Greeter) {
        greeter.greet();
    }
}

@TestFixture()
export class DemoClassSpec {

    @Mock()
    private manualGreeter: Greeter;
    @InjectableMock()
    private friendlyGreeter: Greeter;
    //example with different property name
    @InjectableMock(new PropertyAccessInjection("rudeGreeter"))
    private diffentName: Greeter;
    //all injectables will be injected
    @InjectMocks(new DemoClass())
    private sut: DemoClass;

    @Test("test greet all")
    public testGreetAll() {
        this.sut.greetAll();
        verify(this.friendlyGreeter.greet()).called();
        verify(this.diffentName.greet()).called();
    }

    @Test("test greet internal")
    public testGreetInternal() {
        this.sut.greetInternal(instance(this.manualGreeter));
        verify(this.manualGreeter.greet()).called();
    }

}