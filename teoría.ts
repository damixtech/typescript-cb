//BASE: El navegador no entiende TypeScript, es compilado a JavaScript.

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

//CASO 1
enum Color {
    RED,
    GREEN,
    BLUE
}

//Así se ve en el navegador
const enumeracionCompilada = {
    0: "RED",
    1: "GREEN",
    2: "BLUE",
    "RED": 0,
    "GREEN": 1,
    "BLUE": 2
};

//CASO 2
enum Color2 {
    RED = "red",
    GREEN = "green",
    BLUE = "blue"
}


const colorCompilado = {
    RED: "red",
    GREEN: "green",
    BLUE: "blue"
}


//GENERICOS
//No he entendido nada, buscar más información

//FUNCTIONAL OVERLOADING

function miFunction(param: number): string; //Recibe un number, devuelve un string
function miFunction(param: string): number; //Recibe un string, devuelve un number

//Recibe un number o string, devuelve un number o string
//Potente: Dependiento del tipo de parametro que recibe,
//devuelve un tipo de dato u otro.
function miFunction(param: string | number): string | number {
    if (typeof param === "string") {
        return param.length;
    }

    if (typeof param === "number") {
        return param.toString();
    }

    return "unknown"; //Si no es number o string, devuelve unknown
}


//Y si le damos un objeto con datos??

interface Alumno {
    nombre: string;
    apellido: string;
    nota: number;
}


interface Profesor {
    nombre: string;
    apellido: string;
    expediente: number;
}

const alumno1: Alumno = {
    nombre: "Lucas",
    apellido: "Perez",
    nota: 10
};

const profesor1: Profesor = {
    nombre: "Manolo",
    apellido: "Garcia",
    expediente: 4352
};



function miFunction(param: Alumno): number;
function miFunction(param: Profesor): string;

//Podemos ver que hay en un objeto que no lo hay en el otro 
//y filtrar por ahí
function miFunction(param: Alumno | Profesor): string | number {
    if ("nota" in param) {
        return param.nota;
    }

    if ("expediente" in param) {
        return param.expediente;
    }

    return "unknown";
}


const nota = miFunction(alumno1);
console.log('Nota:',nota); //10

const expediente = miFunction(profesor1)
console.log('Expediente:',expediente); //4352



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
//Es como un molde para crear objetos.
//En la interfaz le digo la estructura que tiene que cumplir y luego la uso
//para crear objetos. Solo se usan en tiempo de desarrollo. Al compilar a JS
//se eliminan.
interface PersonaInterface {
    nombre: string;

    getNombre: () => string;
    setNombre: (nombre: string) => void;
}


//Concepto de SHAPE: La forma de las cosas
//No le importa si la clase es Persona o si la interfaz es PersonaInterface,
//lo que le importa es como es por dentro. Se tiene que cumplir que la clase 
//y la interfaz sean igual por dentro, es como un contrato que hay que cumplir.
//En este caso, que tenga un nombre, getNombre y setNombre.
const persona: PersonaInterface = new PersonaTS('menganito', 5);

 //typescript es tonto
 
 const arregloDeValores = [
    {
        numero: 1,
        label: "numero 1",
    },
    {
        numero:2 ,
    },
 ];


const method = (param: typeof arregloDeValores) => {
    const indexArray =  [1, 2]; //El índice es dinámico

    

    indexArray.forEach((index) => {
        //Versión 1 que hace que el param[index].label que imprime sea undefined
        if (param[index].label) { //Aquí puede ser string o undefined, si es string entra en la condición
            console.log(param[index].label); // Pero aquí también puede ser string o undefined
        }

        //Versión 2 para solucionarlo
        const value = param[index]; //Aquí guardamos el valor en ese index
        if (value.label) { //Aquí de nuevo puede ser string o undefined, pero si entra en la condición:
            console.log(value.label); //Aquí ya no duda, por que hemos guardado el valor con value.
        }
    });  

}


//UNION VS INTERSECTION DE TIPOS

//Union
interface Alumno {
    nombre: string;
    nota: number;
}


interface Profesor {
    nombre: string;
    expediente: number;
}


type AlumnoOProfesor = Alumno | Profesor;

//Creado a posteriori
//Aquí funciona con todos las propiedades por que a la hora de crearlo es la union
//pero a la hora de usarlo (este caso) es la intersección.
const alumnoOProfesor: AlumnoOProfesor = {
    nombre: "Pepito",
    expediente: 1, //Podemos quitar expediente o nota pero no los dos, pues en ese caso
    nota: 10,      //no cumple con la estructura de la interfaz. Mira abajo: en la interseccion
                   //funciona si tiene todos los tipos que hay entre las dos interfaces.
};

const metodo1  = (entidad: AlumnoOProfesor) => {
    entidad.expediente; //Da error por que es posible que en uno de las dos interfaces no exista
    entidad.nota; //Pasa lo mismo
    entidad.nombre; //nombre si es seguro usarlo, por que existe en las dos interfaces
}


//Intersection
type AlumnoYProfesor = Alumno & Profesor;

const metodo2 = (entidad: AlumnoYProfesor) => {

    //Funciona por que ahora tiene que ser todo.
    //Tiene que ser alumno y profesor por lo tanto coge todo.
    //Tiene que tener todos los tipos.
    entidad.expediente; 
    entidad.nota; 
    entidad.nombre;
}


//TYPE 
//palabra reservada para crear tipos custom
//alias
type numID = string; //Si en el futuro esto cambia a otro tipo, nos va a saltar
                     //error en todas partes que lo hayamos usado por lo tanto
                     //nos da un mayor control

const metodo4 = (numID: numID) => {
    console.log(numID);
}

const numID: numID = "123456";

metodo4(numID);

//Otro ejemplo:
type StringYNumber = number & string;


//Cuando utilizar una interface y cuando utilizar un type
//Regla: usa siempre una interfaz hasta que no puedas continuar.


//TYPEOF 
//Indagar más sobre el uso de esto, preguntar chatgpt por caso real
const a = {
    a: 1,
    b: 2,
    c: 3,
    nota: 4,
    setNota: (n: number) => (a.nota = n),
};

type Parametro = typeof a;

const metodo5 = (param: Parametro) => param.a + param.b + param.nota;


//RETURN TYPE
//Muy potente cuando usamos metodos muy grandes y complicados importados de librerías
//y no sabemos lo que hacen o cómo funcionan
const metodoComplicado = () => {
    return {
        a: 1,
        b: 2,
        c: 3,
        nota: 4,
        setNota: (n: number) => (a.nota = n),
        getNota: () => a.nota;
    };
};

type ReturnTypeComplicado = ReturnType<typeof metodoComplicado>;

const metodoComplicado2 = (param: ReturnTypeComplicado) => {
    param.getNota();
    return param.a + param.b + param.nota;
}


//UTILITIES
//Si por ejemplo quiero que alguna de las siguientes propiedades
//sea opcional, en vez de crear otra interface (Ej: UsuarioOpcional)
//Utilizo el helper Partial
interface Usuario {
    nombre: string;
    apellido: string;
    edad: number;
}

//Esto crea un tipo llamado OptionalUsuario de tipo Usuario Parcial,
//Es decir, tiene las propiedades de la interfaz Usuario pero son opcionales,
//no obligatorias
type OptionalUsuario = Partial<Usuario>;
type RequiredUsuario = Required<Usuario>; //Ahora son todos obligatorios
type ReadOnlyUsuario = Readonly<Usuario>; //Ahora no se pueden modificar

//Una forma de tipar un objeto
type RecordUsuario = Record<string, string>; //Clave string y valor string

const recordUsuario: RecordUsuario = {
    nombre: "Juan",
    apellidos: "pers",
    edad: 54, //Da error por que no permite number solo string como le
              //hemos indicado arriba
}

//Selecciono solo las propiedades nombre o edad
type PickUsuario = Pick<Usuario, "nombre" | "apellido">;

const pickUsuario: PickUsuario = {
    nombre: "Juan"!,
    apellido: "Perez",
    edad: 45; //No he seleccionado la propiedad edad por lo tanto
              //no puedo asignarla
}

//Omite la propiedad que le indicamos, por ejemplo si queremos todas menos edad
type OmitUsuario = Omit<Usuario, "edad">;
const omitUsuario: OmitUsuario = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 20, //Como la omitimos no la podemos asignar
}

interface Alumni {
    nota: number;
}

//No me entero con la explicación de Alan
type ExcludeAlumni = Exclude<Usuario | Alumni, Alumni>; //Buscar explicación


type Complejo = string | number | boolean | null | undefined;

type NonNullableComplejo = NonNullable<Complejo>; //Saca null y undefined de la ecuación


//AS CONST
const returnConfig = () => {
    return {
        "target": "ES2017",
        "module": "ESNext",
        "rootDir": "src",
        "outDir": "dist",
        "strict": true,
        "sourceMap": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true
    } as const; //Fija las propiedades como readonly, no se pueden modificar
                //En vez de que pueda ser un string, number, boolean
                //Es lo que yo quiero que sera, esos valores.
}

const config = returnConfig(); //config tiene valores fijos, readonly


//UNIFICAR ENUMS

//No sé para qué sirven ni para qué sirve la unificacion de enums
enum Keys {
    "A" = "a",
    "B" = "b",
}

type CustomType = {
    [key in Keys]: string;
}


