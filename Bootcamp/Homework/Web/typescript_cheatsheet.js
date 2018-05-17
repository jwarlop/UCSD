// _____                  __           _       _   
///__   \_   _ _ __   ___/ _\ ___ _ __(_)_ __ | |_ 
//  / /\/ | | | '_ \ / _ \ \ / __| '__| | '_ \| __|
// / /  | |_| | |_) |  __/\ \ (__| |  | | |_) | |_ 
// \/    \__, | .__/ \___\__/\___|_|  |_| .__/ \__|
//       |___/|_|                       |_|        
//Typescript Cheat Sheet: every syntax feature exemplified
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//variables are the same as javascript, but can be defined with a type:
var myString;
var myNumber;
var myWhatever;
var myComplexObject = { x: 0, y: 0 }; //the type is an object literal with x and y number-type properties. 
var rad2deg = function (radians) { return radians * (180 / Math.PI); }; //the () and => indicate the type is a function. (arguments)=>return type. 
var nop = function () { }; //or with the shorter lambda syntax  var nop:()=>void = ()=>{};
var myNumberArray = [0, 1, 2, 3]; //Array<type>
var myAnonymousComplexArray = [myComplexObject, { x: 0, y: 0 }]; //the items in the array MUST have the same shape as myComplexObject (declared above). 
var myNestedNumberArray = [[1, 2, 3], [0, 1, 2]]; //whoa. 
//we can do enums like C#, setting values (or starting value for sequential):
var CoinResult;
(function (CoinResult) {
    CoinResult[CoinResult["HEADS"] = 0] = "HEADS";
    CoinResult[CoinResult["TAILS"] = 1] = "TAILS";
})(CoinResult || (CoinResult = {}));
//functions are declared with argument types and a return type, in the format: function <functionName>(<argumentName>:<argumentType>):<returnType>
//if there is no return type, you can specify void. 
//the types can be string, number, any, a custom type, or an array of any of those.
//the parameters can be optional by using a ?. They can have default values too, but optionals/default must be at the end of the argument list (like C#):
function functionName(argument1, argument2, argument3, argument4) {
    if (argument4 === void 0) { argument4 = "default value"; }
    //argument4 will always have a value (but it could be null, if null was supplied)
    if (typeof (argument3) != 'undefined') { //TS won't use any default values (if argument3 is not supplied, it will NOT provide [] or even null, it will be undefined). 
        console.log(argument3.length);
    }
}
//function types can be declared in a variable (var <variableName>:<variableType> = <value>):
//The below says that functionTypeDef's type is a function that takes 4 arguments and returns void. 
//The parenthesis indicate a function, and => indicates the return type:
var functionTypeDef;
functionTypeDef = function (a, b, c, d) { };
functionTypeDef = function (a, b) { };
//the function functionName matches the type signature of functionTypeDef, the arguments and return type are the same. Argument names do NOT have to match.
functionTypeDef = functionName;
///CLASSES
var BaseClassName = /** @class */ (function () {
    //classes can have a constructor method, and using public or private 
    function BaseClassName(AutomaticProperty1, AutomaticProperty2) {
        this.AutomaticProperty1 = AutomaticProperty1;
        this.AutomaticProperty2 = AutomaticProperty2;
    }
    //classes can have static methods and properties:
    BaseClassName.getVersion = function () { return "v.1.0"; };
    ;
    return BaseClassName;
}());
//classes can extend a class and implement an interface:
var ClassName = /** @class */ (function (_super) {
    __extends(ClassName, _super);
    //the constructor of derived types must call the parent constructor. The constructor configures member variables by using 'this':
    function ClassName(property1) {
        var _this = _super.call(this, property1, ["private property"]) || this;
        _this.property1 = property1;
        _this.initialized = true;
        return _this;
    }
    //we can override base class methods, and use super to access them: (base in C#)
    ClassName.getVersion = function () { return _super.getVersion.call(this) + " beta"; };
    ;
    //implementation requirement of InterfaceName, the method name and signature must match, argument names do not have to match.
    ClassName.prototype.doSomething = function (f, f2) { return 0; };
    return ClassName;
}(BaseClassName));
//call a static method
var classVersion = ClassName.getVersion();
//instantiate an instance
var classNameInstance = new ClassName("property1Value");
//access the class method
classNameInstance.doSomething("do", 1);
//cast as an interface or base class:
classNameInstance.property1 = "set new value";
classNameInstance.AutomaticProperty1 = "set new value";
//declare an anonymous object that implements InterfaceName
var anonymousInterfaceImplementingVar = { property1: "Test", doSomething: function (arg1, arg2) { return arg2 + arg2; } };
//both of the above objects implement the InterfaceName interface, and can be in an array of that type together:
var ArrayOfInterfaceNames = [classNameInstance, anonymousInterfaceImplementingVar];
//we can downcast the array to 'any' type and our array conforms:
var ArrayofAny = ArrayOfInterfaceNames;
//dictionary objects indexers can be specified as either string or number, the name of the key is (apparently) irrelevant:
var stringBasedInterfaceNameDictionary = {};
stringBasedInterfaceNameDictionary["FirstKey"] = classNameInstance;
stringBasedInterfaceNameDictionary["SecondKey"] = anonymousInterfaceImplementingVar;
console.log(stringBasedInterfaceNameDictionary);
//a number based dictionary object, using a different value for the key (to show how its not relevant):
var numberBasedInterfaceNameDictionary = {};
numberBasedInterfaceNameDictionary[4] = classNameInstance;
numberBasedInterfaceNameDictionary[10000] = anonymousInterfaceImplementingVar;
console.log(numberBasedInterfaceNameDictionary);
//class constructors are optional:
var Foo = /** @class */ (function () {
    function Foo() {
        this.prop = "Hello";
    }
    return Foo;
}());
;
var foobar = new Foo();
foobar.prop += " World";
//create an object whose type is the type of our Foo class.
//Set its to the Foo class definition - this is essentially aliasing our Foo class, its a pointer to our Foo class.
var FooBuilder = Foo;
//FooBuilder is now an alias for Foo -- the below is the same as new Foo(); (it compiles the same)
foobar = new FooBuilder();
console.log(foobar.prop);
///MODULES
//reusable code components are namespaced into modules, where the classes and properties are tagged to export to expose them:
var Zoo;
(function (Zoo) {
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        return Animal;
    }());
    Zoo.Animal = Animal;
    var notExported = "some secret value";
})(Zoo || (Zoo = {}));
//we can extend a modules class through the Zoo namespace:
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.eat = function () { console.log('NOM NOM NOM'); };
    return Cat;
}(Zoo.Animal));
var cat = new Cat("Winkles");
cat.eat();
//modules defined elsewhere can be referenced by adding it like this to the top of the file: /// <reference path="Zoo.ts" />, the compiler will bring it in. 
///FUNCTIONS
//a simple add function that takes two numbers, x and y, and returns a number:
function add(x, y) { return x + y; }
//anonymous add function that does the same:
var myAdd = function (x, y) { return x + y; };
//the below compiles to the same as above, but includes the TYPE of myAdd. its a function that takes two arguments and returns => a number.
//the fat arrow => inside a type definition points to the return type.
//myAdd can then be assigned to any function with a matching type signature. 
var myAdd = function (x, y) { return x + y; };
//we can shorten above since the compiler knows the return type and argument types of the myAdd variable, and enforces that on the function definition set as its value:
var myAdd = function (x, y) { return x + y; };
//we could have the add function variable declared with its type, and then we can assign it to different values that adhere to the functions parameter/return type structure:
var myAdd;
//the below three lines all compile the same:
myAdd = function (a, b) { return a + b; };
myAdd = function (a, b) { return a + b; };
myAdd = function (a, b) { return a + b; };
//a different implementation of the function, but it matches the shape of the variable myAdd's type: (number,number)=>number.
myAdd = function (a, b) { return ((b + a) * 2) / 2; };
// while fat arrows => within a type definition means 'returns', it can be used in a function definition just like lambda expressions in C#:
myAdd = function (a, b) {
    a = a + 1;
    b = b + 1;
    a = a * b;
    return b;
    //return Math.pow(a*b,2);    
};
//when specifying default parameters, the type can be inferred from the default value, (as can the return type):
function defaultParameterExample(firstName, lastName) {
    if (lastName === void 0) { lastName = "Stevens"; }
    return firstName + " " + lastName;
}
//OR fully type-defined:
function defaultParameterExample2(firstName, lastName) {
    if (lastName === void 0) { lastName = "Stevens"; }
    return firstName + " " + lastName;
}
//what if we want a default value thats a complex object? 
function defaultObjectParameterExample(firstname, userDetail) {
    if (userDetail === void 0) { userDetail = { op: "ADD", values: Array(2, 3, 4, 5, 6) }; }
    !userDetail.values.length && userDetail.values.push(0);
    userDetail.op === "ADD" && userDetail.values.push(userDetail.values[0] + userDetail.values[0]);
    userDetail.op === "SUBTRACT" && userDetail.values.push(userDetail.values[0] - userDetail.values[0]);
}
//DEFAULT VALUES IMPLY OPTIONAL PARAMETERS. userDetail?={} won't compile. See:
defaultObjectParameterExample("bob");
//without the default value requires defining the type (if its not a class or interface):
function defaultObjectParameterExample2(firstname, userDetail) {
    !userDetail.values.length && userDetail.values.push(0);
    userDetail.op === "ADD" && userDetail.values.push(userDetail.values[0] + userDetail.values[0]);
    userDetail.op === "SUBTRACT" && userDetail.values.push(userDetail.values[0] - userDetail.values[0]);
}
//defaultObjectParameterExample2("Silly",null);//this will error because 'values' will be undefined the compiler will NOT catch this.
var userDetail = { op: "SUBTRACT", values: [5, 2, 10, 44] };
defaultObjectParameterExample2("Sassy", userDetail);
console.info(userDetail);
//define our cart object, it has an items property thats an array of any type:
var cart = { items: [] };
//functions have the equivalent of the C# (params string[] items) functionality:
function addCartItems() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    items.forEach(function (_) { return cart.items.push(_); });
}
addCartItems({ name: "Dog Food", price: 12.44 });
//the below two lines are NOT equivalent. our function addCartItems will build an array of ANY type out of the arguments. 
//If the arguments are already an array, it still satisfies the ANY requirement, and is a single argument.
addCartItems({ name: "Dog Treat", price: 1.44 }, { name: "cat treat", price: 1.00 }); //works as intended
//will result in cart.items being: [{name:"Dog Food", price:12.44} , {name:"Dog Treat", price:1.44} , {name:"cat treat", price:1.00} , [{name:"Dog Treat", price:1.44},{name:"cat treat", price:1.00}]]
addCartItems([{ name: "Dog Treat", price: 1.44 }, { name: "cat treat", price: 1.00 }]);
console.info(cart.items);
cart = { items: [] };
//the reassignable function type definition would be:
var addCartItemFunc = function () {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    items.forEach(function (_) { cart.items.push(_); });
};
addCartItemFunc({ name: "Dog Food", price: 1.44 }, { name: "Dog Food", price: 12.48 }, { name: "Dog Food", price: 12.33 });
console.info(cart.items);
addCartItemFunc = function () {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    cart.items = items;
};
addCartItemFunc(1, 2, 3, 4, 5);
console.info(cart.items); //[1,2,3,4,5], because inside our redefined function, 'items' is our argument '...items', which is an array made from the arguments in the method call. This is set to cart.items. 
//lambda expressions can CAPTURE OUTER CONTEXT, removing the need to work with 'this' (in most cases):
var cardPickerFactory = {
    suits: new Array("hearts", "spades", "clubs", "diamonds"),
    createSuitPicker: function () {
        var _this = this; //the old way would require re-scoping 'this' as a local
        return function () {
            return _this.suits[Math.floor(Math.random() * 3)]; //0-3
        };
    },
    newCreateSuitPicker: function () {
        var _this = this;
        return function () {
            return _this.suits[Math.floor(Math.random() * 3)];
        };
    },
    whatAboutThis: function () {
        var _this = this;
        return function () {
            _this.suits.splice(0, 3); //this assumes we're accessing cardPickerFactory as 'this'.
            return _this.suits[Math.floor(Math.random() * _this.suits.length)]; //only 'diamonds' are left. 
        };
    },
    soDoThisWay: function () {
        var _this = this; //do it this way to keep your 'this' within your anonymous function
        return function () {
            this.suits = new Array("hearts", "spades");
            return this.suits[Math.floor(Math.random() * 2)];
        };
    }
};
var picker;
picker = cardPickerFactory.createSuitPicker();
console.log(picker()); //hearts, spades, clubs, or diamonds
picker = cardPickerFactory.newCreateSuitPicker();
console.log(picker()); //hearts, spades, clubs, or diamonds
picker = cardPickerFactory.whatAboutThis();
console.log(picker()); //diamonds
picker = cardPickerFactory.soDoThisWay();
console.log(picker()); //hearts or spades
//can we overload functions so we don't have to deal with checking the type of an argument explicitly? not like you would hope/expect.
//we can define the overloads without implementations above our implementation just for the benefit of type checking the calls and blocking calls to the base implementation directly
var Coin = /** @class */ (function () {
    function Coin() {
    }
    Coin.prototype.toss = function () { return Math.floor(Math.random() * 1); };
    return Coin;
}());
//function toss(obj:any):number; //this would allow our invalid argument below to pass to our implementation below, ignoring the parameters constraints (and compiling!). Order your overloads most-specific to least-specific.
function toss(obj) {
    if (obj instanceof Coin) {
        return obj.toss();
    }
    else if (typeof obj == 'object' && obj.length) {
        return obj[Math.floor(Math.random() * obj.length)];
    }
    else {
        console.log('invalid type:' + typeof (obj));
    }
}
console.log('Flipped Coin:' + toss(new Coin()));
console.log('Rolled Die:' + toss([1, 2, 3, 4, 5, 6]));
//here we implement our generic interface to work with string types in place of T:
var WordBank = /** @class */ (function () {
    function WordBank(_items) {
        if (_items === void 0) { _items = []; }
        this._items = _items;
    }
    WordBank.prototype.count = function () { return this._items.length; };
    WordBank.prototype.elementAt = function (n) { return this._items.length > n ? this._items[n] : null; };
    WordBank.prototype.add = function (element) { this._items.push(element); };
    WordBank.prototype.remove = function (element) {
        var idx = this.find(element);
        idx >= 0 && this._items.splice(idx, 1);
    };
    WordBank.prototype.toString = function () { return this._items.join(" "); };
    ;
    WordBank.prototype.find = function (element) {
        return this._items.indexOf(element);
    };
    return WordBank;
}());
var myWordList = new WordBank(["The", "Quick", "Brown"]);
myWordList.add("Fox");
myWordList.remove("The");
console.log(myWordList.toString());
//Generics in functions, and use of arrays of T:
function concat(base, items) {
    return base.concat(items);
}
var numArray = concat([1, 2, 3], [4, 5, 6]);
console.log(numArray); //[1,2,3,4,5,6]
//how does this function's type definition look?
var concatFunc; //the <T> is in the same location: right before the arguments.
concatFunc = concat;
console.log(concatFunc([1, 2, 3], [4, 5, 6])); //[4,5,6,1,2,3]
concatFunc = function (arg1, arg2) { return arg2.concat(arg1); }; //redefine it, same shape, reversed
console.log(concatFunc([1, 2, 3], [4, 5, 6])); //[4,5,6,1,2,3]
var DefaultComparer = /** @class */ (function () {
    function DefaultComparer() {
    }
    //this method is what gets called when an instance is declared as type IComparer, but it cannot be called directly in an instance of DefaultComparer:
    DefaultComparer.prototype.Compare = function (element, otherElement) { return element === otherElement; };
    return DefaultComparer;
}());
var myComparer = new DefaultComparer();
console.log(myComparer.Compare("A", "A")); //returns true
console.log(myComparer.Compare(1, 2)); //returns false, myComparer is an IComparer, so we can pass any types to the Compare method.. 
//it also means we can pass arguments that ARE NOT HANDLED BY OUR IMPLEMENTATION OVERLOADS.. what will happen here?  
console.log(myComparer.Compare([1], [1])); //returns false (two arrays are not ===). This means we bypass our overload constraints when we are typed as the generic IComparer!
var takeNumberReturnNothing = function (_) { };
takeNumberReturnNothing(10);
//A class can't implement IFunc: 
/* //this shows that there types of interfaces that some interfaces can only be implemented by functions, and some only by classes:
class CanIImplementIFunc implements IFunc{
  constructor(n:number){} //this doesn't match the IFunc interface.
  something(n:number){} //matches signature of the interface members arguments and return type, but it is named and the interface method has no name.
  this(n:number){}//this would probably only cause problems, and it does not match IFunc either.
  static (n:number){};  //looks promising? this would work if the interface marked the function as static.
  CanIImplementIFunc(n:number){};//nope..
}
*/
//multiple generic types are supported as well:
var Tuple = /** @class */ (function () {
    function Tuple(arg1, arg2, arg3) {
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.arg3 = arg3;
    } //each argument becomes a public property of its respective type
    return Tuple;
}());
var myTuple = new Tuple(5, "what", [0, 0, 0]);
myTuple.arg2 = "is up?";
var myTupleType; //this object can only hold a tuple thats string/string/array of numbers.  
myTupleType = new Tuple("OH", "what", [0, 0, 19]);
myTupleType = new Tuple("HI", "there", [1]);
var myTruthyStringImpl = function (arg) { return /^true$/i.test(arg) || arg == "1"; };
console.log(myTruthyStringImpl("TRUE")); //true
console.log(myTruthyStringImpl("")); //false
console.log(myTruthyStringImpl("1")); //true
var myTruthyNumberImpl = function (arg) { return !!arg; };
console.log(myTruthyNumberImpl(0)); //false
console.log(myTruthyNumberImpl(1)); //true
//can we recreate the C# Nullable<T> in typescript?
//we can fully if we target ECMAScript5 and use getters and setters, but to exemplify generics in classes:
var Nullable = /** @class */ (function () {
    function Nullable(value) {
        if (typeof (value) == 'undefined' || value == null) {
            this.Value = null;
        }
        else {
            this.Value = value;
        }
    }
    //static something:T; //static members can NOT use the class-level generic type, this doesn't work
    Nullable.IsNullable = function (arg) { return arg instanceof Nullable; }; //but they can still use generics
    Nullable.prototype.HasValue = function () { return this.Value != null; }; //a method instead of a property because we cannot use getters and setters with default compilation settings. 
    return Nullable;
}());
var n = new Nullable(4); //type of T of <number> is inferred from the argument
console.log(n.HasValue()); //true
n = new Nullable(); //<number> is required because no arguments can be used to inferred
console.log(n.HasValue()); //false
console.log(Nullable.IsNullable(n));
console.log(Nullable.IsNullable(new Nullable(5))); //true   //TODO: can we replace any with type def? 
console.log(Nullable.IsNullable("nope")); //false
//In C#,  "where T: IDisposable"" would be "<T extends IDisposable>"  in TypeScript: 
function GarbageCollect(arg) {
    if (!arg.Disposed) {
        arg.Dispose();
    }
}
var DBConnection = /** @class */ (function () {
    function DBConnection() {
        this.Disposed = false;
        this.connection = { timeout: 1000 * 30 };
    }
    DBConnection.prototype.Dispose = function () { this.connection = null; this.Disposed = true; };
    DBConnection.prototype.executeScalar = function (sql) { return "Bob"; };
    ;
    return DBConnection;
}());
//so, one way we could have a generic garbage collector method that can handle classes with Dispose methods:
var db = new DBConnection();
db.connection.timeout = 0; //etc
GarbageCollect(db);
//a chained class for performing an action on and disposing an IDisposable:
var DisposableAction = /** @class */ (function () {
    function DisposableAction(instance) {
        this.instance = instance;
        this._instance = instance;
    }
    //a function that takes a function expecting an argument of type T, with no return type:
    DisposableAction.prototype["do"] = function (delegate) {
        if (this._instance.Disposed)
            throw "Cannot perform action on disposed member.";
        delegate(this._instance);
        return this;
    };
    DisposableAction.prototype.dispose = function () {
        if (!this._instance.Disposed)
            this._instance.Dispose();
    };
    return DisposableAction;
}());
//Usage Example:
var userFirstName = null;
new DisposableAction(new DBConnection())["do"](function (db) {
    db.connection.timeout = 0;
    userFirstName = db.executeScalar("SELECT FirstName FROM USERS WHERE USERID = 4");
}).dispose();
console.log('Hi ' + userFirstName);
//for generic constructor constraints, its a little difficult to understand. Our constraints apply to the STATIC side of a type. 
//Here we have a FartFactory, with a static method that instantiates different kinds of farts:
var FartFactory = /** @class */ (function () {
    function FartFactory() {
    }
    //We require that T be an instance of or derive from the Fart class (optional)
    //To constrain the type of T to one that can be instantiated without arguments, the type itself must be passed in as an argument (fartType),
    //and for that to work, we require this argument be specified as an object that has a new() method that returns T (in TypeScript, this case means a constructor).
    // This is a bit confusing, because new() is used in place of a variable name...but keep reading.
    FartFactory.Create = function (fartType) {
        var mynewFart = new fartType();
        mynewFart.play(); //because we are certain that T is a Fart, and Fart has a play() method
        return mynewFart;
    };
    //lets change the example slightly, instead of requiring an object with a new() function that returns T (i.e. a parameterless ctor case),
    // it requires a createOne function with a string argument.
    //Notice that this requirement is against the STATIC side of the type 'fartType'. If we remove the 'static' from the definition of createOne, it creates an error. 
    //So createOne must be a STATIC method. Looking above, the new() makes a bit more sense now. We require a type that can be new()'d up statically. 
    FartFactory.Create2 = function (fartType) {
        var mynewFart = fartType.createOne("string arg");
        mynewFart.play();
        return mynewFart;
    };
    return FartFactory;
}());
var Fart = /** @class */ (function () {
    function Fart() {
    }
    Fart.prototype.play = function () { console.log("BRRRT.."); };
    ;
    ;
    Fart.createOne = function (str) { return new Fart(); };
    ;
    return Fart;
}());
var WetFart = /** @class */ (function (_super) {
    __extends(WetFart, _super);
    function WetFart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WetFart.prototype.play = function () { console.log("FFLLLPPPPPPPP....UH-OH..."); };
    ;
    WetFart.createOne = function (str) { return new WetFart(); };
    ;
    return WetFart;
}(Fart));
var fart1 = FartFactory.Create(WetFart);
var fart2 = FartFactory.Create(Fart);
//var fart3:Fart = FartFactory.Create(DefaultComparer); //because we require "T extends Fart", this line generates a compilation error.
var fart4 = FartFactory.Create2(WetFart);
//What if we want to use generics, and constrain to a type that can be constructed WITH ARGUMENTS?
//lets say we want to instantiate objects that have timestamps in their constructors through this method:
function CreateObjectNow(t) {
    return new t(Date.now());
}
var Particle = /** @class */ (function () {
    function Particle(start) {
        this.start = start;
        this._end = start + ((Math.floor(Math.random() * 5) + 1) * 1000);
    }
    return Particle;
}());
var particle1 = CreateObjectNow(Particle);
function Translate2D(vector, amount) {
    vector.x += amount.x;
    vector.y += amount.y;
}
//without using explicit classes, interfaces, or custom types, we can get the same functionality this way, (just an example, probably NOT good practice):
var Vector3Def;
function Translate3D(vector, amount) {
    Vector3Def.x += amount.x;
    Vector3Def.y += amount.y;
    Vector3Def.z += amount.z;
}
///TEMPLATE FORMATTING and MULTI LINE:
//using a single tic (`) instead of single quote or double quote around a string allows us to use line-breaks without any messy concatenation:
alert("HELLO WORLD!\nThis is on another line.\nSo is this.\n");
//This single-tic has a built in template formatting using ${params}, (like double handlebars in angular):
var myVector = { x: -3, y: 10 };
Translate2D(myVector, { x: 1, y: 5 });
alert("My Vector: [" + myVector.x + ", " + myVector.y + "]"); //eg. string.format('My Vector: {0}, {1}', myVector.x, myVector.y);
