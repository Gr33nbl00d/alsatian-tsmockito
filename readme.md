# Adds Decorator Based TS-Mockito Support to Alsatian + decorator based mock injection

## Install
npm install alsatian-tsmockito

## Decorators
### Property Decorators
```typescript
    @Mock()    
```
Defines that a mock should be injected in this property 

```typescript
    @InjectableMock()    
```
Defines that a mock should be injected in this property which will be later injected
in the object defined by the @InjectMocks() decorator.

#### Injection Methods
By default injectable mocks will be injected by assuming that the property name used
in the test is equal to the one used in the class it should be injected in.

The @InjectableMock decorator accepts a parameter which can be used to override this default
behavior. The argument is an interface which will be called during injection.

```typescript
export interface InjectionMethod {
    inject(target: object, propertyKey: string, value: any);
}
```
##### PropertyAccessInjection
PropertyAccessInjection can be used if the injection is done by setting a simple property on th test object.
The name of the property is defined as argument.
```typescript
@InjectableMock(new PropertyAccessInjection("propertyName"))
```

### Method Decorators
#### Reset Calls on Mocks
Reset Calls
```typescript
@ResetCallsOnInjectableMocks()
```
Resets all calls on injectable mocks (@InjectableMock)

```typescript
@ResetCallsOnNonInjectableMocks()
```
Resets all calls on NON injectable mocks (@Mock)

```typescript
@ResetCallsOnAllMocks()
```
Resets all calls on all mocks (@Mock && @InjectableMock)

#### Reset Mocks
Restes calls and stubbing
```typescript
@ResetInjectableMocks()
```
Resets calls and stubbing on injectable mocks (@InjectableMock)

```typescript
@ResetNonInjectableMocks()
```
Resets calls and stubbing on NON injectable mocks (@Mock)

```typescript
@ResetAllMocks()
```
Resets calls and stubbing on all mocks (@Mock && @InjectableMock)

## Example
See Demo.spec.ts in test folder:

```typescript
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

```