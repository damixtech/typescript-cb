//NO USAR ANY
// let metodo: any = 1;

//TIPOS:
//boolean, number, string, any, null, undefined, unknown
let booleanValue: boolean = true;
let cantidad: number = 5;
let nombre: string = "Pepito";
let cadenaValores: number[] = [1,2,3,4,5]; //Cadena de números - Forma1
let otraCadenaValores: Array<number> = [1,2,3,4,5]; //Array que dentro contiene numbers - Forma2
let cualquierCosa: any = "cualquier cosa";
let n: null = null; //Tiene un valor que es nulo
let u: undefined = undefined; //Está definido pero no tiene un valor
let unknown: unknown = "hola"; //Puede ser cualquier cosa pero no sabemos que es


//Esto en cambio no funciona porque le estamos diciendo que tenemos
// un array que dentro tiene un número, pero no cinco números
let cadenaValoresConUnNumero: [number] = [1,2,3,4,5];


//En cambio lo siguiente si funciona porque le decirmos que tenemos
//un array que contiene un number y un string y así es
let cadenaValoresNumeroString: [number, string ] = [1, "hola"];


//TIPO: enum


//TIPO: void
//no tiene valor, no devuelve nada, lo llamas y no hace nada
function log() : void {
    console.log("hola");
}


//CASTEO DE TIPOS
const a = 1;
let b: any = "hola";
let o: unknown = "hola";

const metodo = (a: string) : void => {}; //Recibe string como parámetro

//Mejor opcion en vez de lo de abajo:
const castedB = b as string; //Ahora al método le estamos pasando un string en vez de un any
const castedB2 = <string>b; //Igual que lo anterior, distinta sintaxis
const castedO = o as string; //Ahora si pas
const castedO2 = <string>o; //Igual que lo anterior, distinta sintaxis

//Primero hacemos esto:
metodo(b); //Funciona porque b es any por lo tanto pasa como string
metodo(castedB) //Después de castear b
metodo(o); //Esto no funciona sin castear, por que unknown no sabemos lo que es, por tanto no pasa como string.
metodo(castedO); //Esto si funciona por que forzamos o a ser un string


//Castear el tipo de un objeto
const castedObjectB = ( b as string ).length;
const castedObjectB2 = ( <string>b ).length;


//JAVASCRIPT APRENDE DE TYPESCRIPT

//Clase persona con propiedad privada en JS
class PersonaJS {
    #nombre = "PEPITO"; //Se crean con #

    constructor(apellido) {
        this.apellido = apellido;
    }
}

//Clase persona con propiedad privada en TS
class PersonaTS {
    nombre: string;
    // private nombre: string; //Se crean con la palabra reservada private
    protected edad: number; //Se crea con la palabra reservada protected

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }

    getNombre(): string {
        return this.nombre;
    }

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }
}


//INTERFACES
interface PersonaInterface {
    nombre: string;

    getNombre: () => string;
    setNombre: (nombre: string) => void;
}


//Concepto de SHAPE: La forma de las cosas
//No le importa si la clase es Persona o si la interfaz es PersonaInterface,
//lo que le importa es como es por dentro. Se tiene que cumplir que la clase 
//y la interfaz sean igual por dentro
//En este caso, que tenga un nombre, getNombre y setNombre.
const persona: PersonaInterface = new PersonaTS('menganito', 5);