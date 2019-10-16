# Adds Decorator Based TS-Mockito Support to Alsatian + decorator based mock injection

## Install
npm install alsatian-tsmockito

## Example
See Demo.spec.ts in test folder:

```typescript
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
```