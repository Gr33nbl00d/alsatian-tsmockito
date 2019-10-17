import {Expect, MatchError, Setup, Test, TestFixture} from "alsatian";
import _default, {instance, reset, resetCalls, verify, when} from "ts-mockito";
import "reflect-metadata";
import {
    ResetCallsOnNonInjectableMocks,
    ResetCallsOnInjectableMocks,
    InjectableMock,
    InjectMocks,
    Mock,
    PropertyAccessInjection,
    ResetNonInjectableMocks
} from "../src";

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
        this.greetInternal(this.friendlyGreeter);
        this.greetInternal(this.rudeGreeter);
    }

    greetInternal(greeter: Greeter) {
        greeter.greet();
    }
}

@TestFixture()
export class DemoClassSpec {

    @Mock()
    private mockForResetDemo: Greeter;
    @InjectableMock()
    private mockForInjectableResetDemo: Greeter;
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

    @Setup
    @ResetCallsOnInjectableMocks()
    public setupTest() {
        when(this.mockForResetDemo.greet()).thenThrow(new Error("should never happen"));
    }

    @Test("test greet all")
    public testGreetAll() {
        this.sut.greetAll();
        verify(this.friendlyGreeter.greet()).once();
        verify(this.diffentName.greet()).once();
    }

    @Test("test greet all2")
    public testGreetAll2() {
        this.sut.greetAll();
        verify(this.friendlyGreeter.greet()).once();
        verify(this.diffentName.greet()).once();
    }

    @Test("test greet internal")
    public testGreetInternal() {
        this.sut.greetInternal(instance(this.manualGreeter));
        verify(this.manualGreeter.greet()).once();
    }

    @Test("test greet internal2")
    @ResetCallsOnNonInjectableMocks()
    public testGreetInternal2() {
        this.sut.greetInternal(instance(this.manualGreeter));
        verify(this.manualGreeter.greet()).once();
    }

    @Test("test without reset")
    public testWithoutResetMock() {
        try {
            instance(this.mockForResetDemo).greet();
        } catch (e) {
            return;
        }
        throw new MatchError("Exception should be thrown")
    }

    @Test("test with reset")
    @ResetNonInjectableMocks()
    public testWithResetMock() {
        instance(this.mockForResetDemo).greet();
    }


}