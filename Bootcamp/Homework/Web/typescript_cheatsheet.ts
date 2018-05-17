// _____                  __           _       _   
///__   \_   _ _ __   ___/ _\ ___ _ __(_)_ __ | |_ 
//  / /\/ | | | '_ \ / _ \ \ / __| '__| | '_ \| __|
// / /  | |_| | |_) |  __/\ \ (__| |  | | |_) | |_ 
// \/    \__, | .__/ \___\__/\___|_|  |_| .__/ \__|
//       |___/|_|                       |_|        
//Typescript Cheat Sheet: every syntax feature exemplified

//variables are the same as javascript, but can be defined with a type:
var myString:string;
var myNumber:number;
var myWhatever:any;
var myComplexObject:{x:number,y:number} = {x:0,y:0}; //the type is an object literal with x and y number-type properties. 
var rad2deg:(rad:number)=>number = function(radians){return radians * (180/Math.PI);};//the () and => indicate the type is a function. (arguments)=>return type. 
var nop:()=>void = function(){}; //or with the shorter lambda syntax  var nop:()=>void = ()=>{};
var myNumberArray:Array<number> = [0,1,2,3];//Array<type>
var myAnonymousComplexArray:Array<typeof myComplexObject> = [myComplexObject, {x:0,y:0}];//the items in the array MUST have the same shape as myComplexObject (declared above). 
var myNestedNumberArray:Array<Array<number>> = [[1,2,3],[0,1,2]];//whoa. 

//we can do enums like C#, setting values (or starting value for sequential):
enum CoinResult {
    HEADS = 0,
    TAILS = 1
}

//functions are declared with argument types and a return type, in the format: function <functionName>(<argumentName>:<argumentType>):<returnType>
//if there is no return type, you can specify void. 
//the types can be string, number, any, a custom type, or an array of any of those.
//the parameters can be optional by using a ?. They can have default values too, but optionals/default must be at the end of the argument list (like C#):
function  functionName (argument1:string,argument2:number,argument3?:Array<any>, argument4="default value"):void{
    //argument4 will always have a value (but it could be null, if null was supplied)
    if(typeof(argument3)!='undefined'){ //TS won't use any default values (if argument3 is not supplied, it will NOT provide [] or even null, it will be undefined). 
       console.log(argument3.length);
    }
}

//function types can be declared in a variable (var <variableName>:<variableType> = <value>):
//The below says that functionTypeDef's type is a function that takes 4 arguments and returns void. 
//The parenthesis indicate a function, and => indicates the return type:
var functionTypeDef:(argument1:string,argument2:number,argument3?:Array<any>, argument4?:string)=>void;

functionTypeDef = (a,b,c?,d?)=>{/*do work*/};
functionTypeDef = (a,b)=>{/*since c and d are optional, we can set it to a function that doesn't use them*/};
//the function functionName matches the type signature of functionTypeDef, the arguments and return type are the same. Argument names do NOT have to match.
functionTypeDef = functionName;  

//Functions will be discussed deeper below.

///INTERFACES

//TypeScript has interfaces and classes:
interface InterfaceName{ 
    property1:string; 
    //a method named doSomething that takes a string and number and returns a number
    doSomething(functionArg1:string,functionArg2:number):number; 
}

///CLASSES

class BaseClassName{
    //classes can have static methods and properties:
    static getVersion():string{return "v.1.0"};
    //classes can have a constructor method, and using public or private 
    constructor(public AutomaticProperty1:string, private AutomaticProperty2:string[]){}
}

//classes can extend a class and implement an interface:
class ClassName extends BaseClassName implements InterfaceName{ 
    //we can override base class methods, and use super to access them: (base in C#)
    static getVersion():string{return super.getVersion() + " beta";};
    initialized:boolean;//properties are made public by default
    //implementation requirement of InterfaceName, the method name and signature must match, argument names do not have to match.
    doSomething(f:string, f2:number){ return 0; }  
    //the constructor of derived types must call the parent constructor. The constructor configures member variables by using 'this':
    constructor(public property1:string){super(property1,["private property"]);this.initialized = true; }
}

//call a static method
var classVersion = ClassName.getVersion();

//instantiate an instance
var classNameInstance:ClassName = new ClassName("property1Value");

//access the class method
classNameInstance.doSomething("do",1);

//cast as an interface or base class:
(classNameInstance as InterfaceName).property1 = "set new value";
(classNameInstance as BaseClassName).AutomaticProperty1 = "set new value";

//declare an anonymous object that implements InterfaceName
var anonymousInterfaceImplementingVar:InterfaceName = {property1:"Test", doSomething:(arg1:string,arg2:number):number=>{return arg2+arg2;}}; 

//both of the above objects implement the InterfaceName interface, and can be in an array of that type together:
var ArrayOfInterfaceNames:Array<InterfaceName> = [classNameInstance, anonymousInterfaceImplementingVar];

//we can downcast the array to 'any' type and our array conforms:
var ArrayofAny:Array<any> = ArrayOfInterfaceNames;

//dictionary objects indexers can be specified as either string or number, the name of the key is (apparently) irrelevant:
var stringBasedInterfaceNameDictionary:{[key:string]:InterfaceName} = {};
stringBasedInterfaceNameDictionary["FirstKey"] = classNameInstance;
stringBasedInterfaceNameDictionary["SecondKey"] = anonymousInterfaceImplementingVar;
console.log(stringBasedInterfaceNameDictionary);

//a number based dictionary object, using a different value for the key (to show how its not relevant):
var numberBasedInterfaceNameDictionary:{[k:number]:InterfaceName} ={};
numberBasedInterfaceNameDictionary[4] = classNameInstance;
numberBasedInterfaceNameDictionary[10000] = anonymousInterfaceImplementingVar;
console.log(numberBasedInterfaceNameDictionary);

//class constructors are optional:
class Foo {prop:string = "Hello";}; 
var foobar = new Foo();
foobar.prop += " World";
//create an object whose type is the type of our Foo class.
//Set its to the Foo class definition - this is essentially aliasing our Foo class, its a pointer to our Foo class.
var FooBuilder : typeof Foo = Foo; 
//FooBuilder is now an alias for Foo -- the below is the same as new Foo(); (it compiles the same)
foobar = new FooBuilder(); 
console.log(foobar.prop);

///MODULES

//reusable code components are namespaced into modules, where the classes and properties are tagged to export to expose them:
module Zoo{
    export interface IEatMeat{eat():void;}
    export class Animal{constructor(public name:string){}}
    var notExported = "some secret value";
}
//we can extend a modules class through the Zoo namespace:
class Cat extends Zoo.Animal implements Zoo.IEatMeat{eat(){console.log('NOM NOM NOM');}}
var cat:Zoo.IEatMeat = new Cat("Winkles");
cat.eat();

//modules defined elsewhere can be referenced by adding it like this to the top of the file: /// <reference path="Zoo.ts" />, the compiler will bring it in. 

///FUNCTIONS

//a simple add function that takes two numbers, x and y, and returns a number:
function add(x: number, y: number): number { return x+y; }

//anonymous add function that does the same:
var myAdd                                               = function(x: number, y: number): number { return x+y; };

//the below compiles to the same as above, but includes the TYPE of myAdd. its a function that takes two arguments and returns => a number.
//the fat arrow => inside a type definition points to the return type.
//myAdd can then be assigned to any function with a matching type signature. 
var myAdd: (baseValue:number, increment:number)=>number = function(x: number, y: number): number { return x+y; };

//we can shorten above since the compiler knows the return type and argument types of the myAdd variable, and enforces that on the function definition set as its value:
var myAdd: (baseValue:number, increment:number)=>number = function(x, y) { return x+y; };

//we could have the add function variable declared with its type, and then we can assign it to different values that adhere to the functions parameter/return type structure:
var myAdd: (a:number, b:number)=>number;
//the below three lines all compile the same:
myAdd = (a,b)=>{return a+b;};
myAdd = function(a,b){return a+b;};
myAdd = function(a:number,b:number){return a+b;};

//a different implementation of the function, but it matches the shape of the variable myAdd's type: (number,number)=>number.
myAdd = (a,b)=>{return ((b+a)*2)/2;};

// while fat arrows => within a type definition means 'returns', it can be used in a function definition just like lambda expressions in C#:
myAdd = (a,b)=>{
    a  = a + 1;
    b = b+1;
    a = a * b;
    return b;
    //return Math.pow(a*b,2);    
};

//when specifying default parameters, the type can be inferred from the default value, (as can the return type):
function defaultParameterExample(firstName:string, lastName         ="Stevens"){
    return firstName + " " + lastName;
}
//OR fully type-defined:
function defaultParameterExample2(firstName:string, lastName:string ="Stevens"):string{
    return firstName + " " + lastName;
}

//what if we want a default value thats a complex object? 
function defaultObjectParameterExample(firstname:string, userDetail={op:"ADD",values:Array<number>(2,3,4,5,6) }){ // -OR- values:[2,4,5,6,7]
   !userDetail.values.length && userDetail.values.push(0);
   userDetail.op==="ADD" && userDetail.values.push(userDetail.values[0]+userDetail.values[0]);
   userDetail.op==="SUBTRACT" && userDetail.values.push(userDetail.values[0]-userDetail.values[0]);
}
//DEFAULT VALUES IMPLY OPTIONAL PARAMETERS. userDetail?={} won't compile. See:
defaultObjectParameterExample("bob");

//without the default value requires defining the type (if its not a class or interface):
function defaultObjectParameterExample2(firstname:string, userDetail:{op:string,values:number[]}){
   !userDetail.values.length && userDetail.values.push(0);
   userDetail.op==="ADD" && userDetail.values.push(userDetail.values[0]+userDetail.values[0]);
   userDetail.op==="SUBTRACT" && userDetail.values.push(userDetail.values[0]-userDetail.values[0]);
}

//defaultObjectParameterExample2("Silly",null);//this will error because 'values' will be undefined the compiler will NOT catch this.
var userDetail =  { op:"SUBTRACT", values:[5,2,10,44]}
defaultObjectParameterExample2("Sassy",userDetail);
console.info(userDetail);
 
 //define our cart object, it has an items property thats an array of any type:
 var cart:{items:any[]} = {items:[]};
 
 //functions have the equivalent of the C# (params string[] items) functionality:
 function addCartItems(...items:any[]):void{   
     items.forEach((_)=>cart.items.push(_));
 }
 addCartItems({name:"Dog Food", price:12.44});
 //the below two lines are NOT equivalent. our function addCartItems will build an array of ANY type out of the arguments. 
 //If the arguments are already an array, it still satisfies the ANY requirement, and is a single argument.
 addCartItems({name:"Dog Treat", price:1.44},{name:"cat treat", price:1.00});//works as intended
 //will result in cart.items being: [{name:"Dog Food", price:12.44} , {name:"Dog Treat", price:1.44} , {name:"cat treat", price:1.00} , [{name:"Dog Treat", price:1.44},{name:"cat treat", price:1.00}]]
 addCartItems([{name:"Dog Treat", price:1.44},{name:"cat treat", price:1.00}]);
 
 console.info(cart.items);
 cart = {items:[]};
//the reassignable function type definition would be:
var addCartItemFunc:(...items:any[])=>void = (...items:any[])=>{items.forEach((_)=>{cart.items.push(_)})};

addCartItemFunc({name:"Dog Food", price:1.44},{name:"Dog Food", price:12.48},{name:"Dog Food", price:12.33});  
console.info(cart.items);

addCartItemFunc = (...items)=>{ cart.items = items };
addCartItemFunc(1,2,3,4,5); 
console.info(cart.items); //[1,2,3,4,5], because inside our redefined function, 'items' is our argument '...items', which is an array made from the arguments in the method call. This is set to cart.items. 

//lambda expressions can CAPTURE OUTER CONTEXT, removing the need to work with 'this' (in most cases):
var cardPickerFactory = {
    suits: new Array<string>("hearts", "spades", "clubs", "diamonds"),
    createSuitPicker: function() {  
        var _this = this;      //the old way would require re-scoping 'this' as a local
        return function(){           
           return _this.suits[Math.floor(Math.random() * 3)];//0-3
        }
    },
    newCreateSuitPicker:function(){        
        return ()=>{ //the new way will compile to match the above method
            return this.suits[Math.floor(Math.random() * 3)];
        }
    },
    whatAboutThis:function(){ //'this' will affect our top-level suits, so be careful:
        return ()=>{
            this.suits.splice(0,3); //this assumes we're accessing cardPickerFactory as 'this'.
            return this.suits[Math.floor(Math.random() * this.suits.length)];//only 'diamonds' are left. 
        };
    },
    soDoThisWay:function(){
        var _this = this; //do it this way to keep your 'this' within your anonymous function
        return function(){
             this.suits = new Array<string>("hearts","spades"); 
             return this.suits[Math.floor(Math.random() * 2)];
        };
    }
}
var picker:()=>string; 
picker = cardPickerFactory.createSuitPicker();
console.log(picker());//hearts, spades, clubs, or diamonds
picker = cardPickerFactory.newCreateSuitPicker();
console.log(picker());//hearts, spades, clubs, or diamonds
picker = cardPickerFactory.whatAboutThis();
console.log(picker()); //diamonds
picker = cardPickerFactory.soDoThisWay();
console.log(picker());//hearts or spades

//can we overload functions so we don't have to deal with checking the type of an argument explicitly? not like you would hope/expect.
//we can define the overloads without implementations above our implementation just for the benefit of type checking the calls and blocking calls to the base implementation directly
class Coin {toss():CoinResult{return Math.floor(Math.random() * 1);}}

function toss(obj:Coin):CoinResult;
function toss(obj:Array<number>):number;
//function toss(obj:any):number; //this would allow our invalid argument below to pass to our implementation below, ignoring the parameters constraints (and compiling!). Order your overloads most-specific to least-specific.
function toss(obj:Coin|Array<number>):any{ //you can accept multiple specific types by separating them with a |
        if(obj instanceof Coin){
           return (obj as Coin).toss();
        }
        else if(typeof obj == 'object' && obj.length){
            return obj[Math.floor(Math.random() * obj.length)];
        }
        else{
           console.log('invalid type:' + typeof(obj));
        }
}

console.log('Flipped Coin:' + toss(new Coin()));
console.log('Rolled Die:' + toss([1,2,3,4,5,6]));
//toss({invalid:'argument'}); //this call will not compile when there are defined overloads



///GENERICS IN INTERFACES/CLASSES - The below example was written without any prior knowledge of how generics work in TypeScript,
// but purely based on C# generic knowledge, and it works. We use T to represent an 'unknown' type, a variable that can be set to any different type when used:
interface IList<T>{
    count():number;
    elementAt(index:number):T;
    add(element:T):void;
    remove(element:T):void;
    toString():void;
}
//here we implement our generic interface to work with string types in place of T:
class WordBank implements IList<string>{
    constructor(private _items:string[] = []){}
    count(){return this._items.length;}
    elementAt(n){return this._items.length > n ? this._items[n] : null;}
    add(element){this._items.push(element);}
    remove(element){
        var idx = this.find(element);
        idx >=0 && this._items.splice(idx,1);
    }
    toString(){return this._items.join(" ");};
    private find(element:string){
        return this._items.indexOf(element);
    }
}

var myWordList:IList<string> = new WordBank(["The","Quick","Brown"]);
myWordList.add("Fox");
myWordList.remove("The");
console.log(myWordList.toString());


//Generics in functions, and use of arrays of T:
function concat<T>(base:T[], items:T[]):T[]{ //alternatively: concat<T>(base:Array<T>,items:Array<T>):Array<T>
     return base.concat(items);
}
var numArray:number[] = concat([1,2,3],[4,5,6]);
console.log(numArray);//[1,2,3,4,5,6]

//how does this function's type definition look?
var concatFunc:<T>(base:T[],items:T[])=>T[]; //the <T> is in the same location: right before the arguments.
concatFunc = concat;
console.log(concatFunc([1,2,3],[4,5,6]));//[4,5,6,1,2,3]
concatFunc = <T>(arg1:T[],arg2:T[])=>{return arg2.concat(arg1);}; //redefine it, same shape, reversed
console.log(concatFunc([1,2,3],[4,5,6]));//[4,5,6,1,2,3]

//interfaces can be generic, or can just specify generic methods:
interface IComparer{
    Compare<T>(element:T, otherElement:T):boolean;
}
class DefaultComparer implements IComparer{
    //overloading the method that needs to be implemented:
    Compare(element:string, otherElement:string):boolean;
    Compare(element:number, otherElement:number):boolean;
    //this method is what gets called when an instance is declared as type IComparer, but it cannot be called directly in an instance of DefaultComparer:
    Compare(element:any, otherElement:any):boolean{return element === otherElement;}
}
var myComparer:IComparer = new DefaultComparer();
console.log(myComparer.Compare("A","A"));//returns true
console.log(myComparer.Compare(1,2));//returns false, myComparer is an IComparer, so we can pass any types to the Compare method.. 
//it also means we can pass arguments that ARE NOT HANDLED BY OUR IMPLEMENTATION OVERLOADS.. what will happen here?  
console.log(myComparer.Compare([1],[1]));//returns false (two arrays are not ===). This means we bypass our overload constraints when we are typed as the generic IComparer!
//new DefaultComparer().Compare([],[]);//this will NOT compile


//an interface can apply to a SINGLE METHOD, where it is UNNAMED in the interface:
interface IFunc{
    (n:number):void;
}
var takeNumberReturnNothing:IFunc = (_:number)=>{};
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
class Tuple<T,U,V>{
    constructor(public arg1:T, public arg2:U, public arg3:V){} //each argument becomes a public property of its respective type
}
var myTuple = new Tuple(5,"what",[0,0,0]);
myTuple.arg2 = "is up?";

var myTupleType:Tuple<string,string,Array<number>>;//this object can only hold a tuple thats string/string/array of numbers.  
myTupleType = new Tuple("OH","what",[0,0,19]);
myTupleType = new Tuple("HI","there",[1]);


//Generics on the whole interface:
interface IsTruthy<T>{
    (arg:T):boolean;
}

var myTruthyStringImpl:IsTruthy<string> = (arg:string)=>{return /^true$/i.test(arg) || arg=="1";};
console.log(myTruthyStringImpl("TRUE"));//true
console.log(myTruthyStringImpl(""));//false
console.log(myTruthyStringImpl("1"));//true
var myTruthyNumberImpl:IsTruthy<number> = (arg:number)=>{return !!arg;};
console.log(myTruthyNumberImpl(0));//false
console.log(myTruthyNumberImpl(1));//true

//can we recreate the C# Nullable<T> in typescript?
//we can fully if we target ECMAScript5 and use getters and setters, but to exemplify generics in classes:
class Nullable<T>{    
    //static something:T; //static members can NOT use the class-level generic type, this doesn't work
    static IsNullable<U>(arg:U):boolean{return arg instanceof Nullable;} //but they can still use generics
    HasValue():boolean{return this.Value != null;} //a method instead of a property because we cannot use getters and setters with default compilation settings. 
    Value:T;
    constructor(value?:T){
        if(typeof(value)=='undefined' || value == null){          
            this.Value = null;
        }
        else{         
            this.Value = value;
        }
    }
}
var n:Nullable<number> = new Nullable(4);//type of T of <number> is inferred from the argument
console.log(n.HasValue());//true
n = new Nullable<number>(); //<number> is required because no arguments can be used to inferred
console.log(n.HasValue());//false
console.log(Nullable.IsNullable(n));
console.log(Nullable.IsNullable<any>(new Nullable(5)));//true   //TODO: can we replace any with type def? 
console.log(Nullable.IsNullable<any>("nope"));//false


///GENERIC CONSTRAINTS
//can we apply constraints to generics like in C#? Specifically, method/property constraints, and constructor constraints?
//For INSTANCE properties and methods, we can constrain T to require it match an interface:
interface IDisposable{
    Disposed:boolean;
    Dispose():void;
}

//In C#,  "where T: IDisposable"" would be "<T extends IDisposable>"  in TypeScript: 
function GarbageCollect<T extends IDisposable>(arg:T):void{
    if(!arg.Disposed){
        arg.Dispose();        
    }
}

class DBConnection implements IDisposable{ // Note: "implements IDisposable" is not required for our example. The type is checked without being explicit about it conforming to the interface.
    connection:{timeout:number};
    Disposed:boolean;
    Dispose():void{this.connection = null;this.Disposed = true;}
    constructor(){this.Disposed = false;this.connection = {timeout : 1000 * 30};}
    executeScalar(sql:string):string{return "Bob";}; 
}

//so, one way we could have a generic garbage collector method that can handle classes with Dispose methods:
var db:DBConnection = new DBConnection();
db.connection.timeout = 0; //etc
GarbageCollect(db);


//a chained class for performing an action on and disposing an IDisposable:
class DisposableAction<T extends IDisposable>{
    _instance:T;
    constructor(private instance:T){
        this._instance = instance;
    }
    //a function that takes a function expecting an argument of type T, with no return type:
    do(delegate:(arg:T)=>void):DisposableAction<T>{
        if(this._instance.Disposed) throw "Cannot perform action on disposed member.";        
        delegate(this._instance);
        return this;
    }
    dispose(){
        if(!this._instance.Disposed) this._instance.Dispose();
    }
}
//Usage Example:
var userFirstName:string = null;

new DisposableAction(new DBConnection())
.do((db)=>{
    db.connection.timeout = 0;
    userFirstName  = db.executeScalar("SELECT FirstName FROM USERS WHERE USERID = 4");
}).dispose();
console.log('Hi ' + userFirstName);







//for generic constructor constraints, its a little difficult to understand. Our constraints apply to the STATIC side of a type. 
//Here we have a FartFactory, with a static method that instantiates different kinds of farts:
class FartFactory {
    //We require that T be an instance of or derive from the Fart class (optional)
    //To constrain the type of T to one that can be instantiated without arguments, the type itself must be passed in as an argument (fartType),
    //and for that to work, we require this argument be specified as an object that has a new() method that returns T (in TypeScript, this case means a constructor).
    // This is a bit confusing, because new() is used in place of a variable name...but keep reading.
    static Create<T extends Fart>(fartType:{new():T}):T{
        var mynewFart = new fartType();
        mynewFart.play();//because we are certain that T is a Fart, and Fart has a play() method
        return mynewFart;
    }  
    
    //lets change the example slightly, instead of requiring an object with a new() function that returns T (i.e. a parameterless ctor case),
    // it requires a createOne function with a string argument.
    //Notice that this requirement is against the STATIC side of the type 'fartType'. If we remove the 'static' from the definition of createOne, it creates an error. 
    //So createOne must be a STATIC method. Looking above, the new() makes a bit more sense now. We require a type that can be new()'d up statically. 
    static Create2<T extends Fart>(fartType:{createOne(string):T}):T{
        var mynewFart = fartType.createOne("string arg");
        mynewFart.play();
        return mynewFart;
    }
}
class Fart{    
    play(){console.log("BRRRT..");};
    constructor(){};
    static createOne(str:string){return new Fart();};
}
class WetFart extends Fart{
     play(){console.log("FFLLLPPPPPPPP....UH-OH...");};
     static createOne(str:string){return new WetFart();};
}
var fart1:Fart = FartFactory.Create(WetFart);
var fart2:Fart = FartFactory.Create(Fart);
//var fart3:Fart = FartFactory.Create(DefaultComparer); //because we require "T extends Fart", this line generates a compilation error.
var fart4:Fart = FartFactory.Create2(WetFart);





//What if we want to use generics, and constrain to a type that can be constructed WITH ARGUMENTS?
//lets say we want to instantiate objects that have timestamps in their constructors through this method:
function CreateObjectNow<T>(t:{new(number):T}){
   return new t(Date.now());
}
class Particle{
    _end:number;
    constructor(public start:number){ this._end = start + ((Math.floor(Math.random() * 5)+1) * 1000);   }   
}
var particle1:Particle = CreateObjectNow(Particle);


///CUSTOM TYPES

//we can create our own types:
type NameOrNameArray = string | string[];
type Vector3 = {x:number, y:number, z:number};
type Vector2 = Vector3 | {x:number, y:number};
function Translate2D<T extends Vector2>(vector:T, amount:Vector2){
    vector.x += amount.x;
    vector.y += amount.y;
}

//without using explicit classes, interfaces, or custom types, we can get the same functionality this way, (just an example, probably NOT good practice):
var Vector3Def : {x:number, y:number, z:number};
function Translate3D(vector:typeof Vector3Def, amount:typeof Vector3Def){
    Vector3Def.x += amount.x;
    Vector3Def.y += amount.y;
    Vector3Def.z += amount.z;
}

///TEMPLATE FORMATTING and MULTI LINE:
//using a single tic (`) instead of single quote or double quote around a string allows us to use line-breaks without any messy concatenation:
alert(`HELLO WORLD!
This is on another line.
So is this.
`);
//This single-tic has a built in template formatting using ${params}, (like double handlebars in angular):
var myVector:Vector2 = {x:-3,y:10};
Translate2D(myVector, {x:1,y:5});
alert(`My Vector: [${myVector.x}, ${myVector.y}]`); //eg. string.format('My Vector: {0}, {1}', myVector.x, myVector.y);