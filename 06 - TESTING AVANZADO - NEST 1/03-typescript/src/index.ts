const hola = (name: string): string => {
  // console.log(`Hola ${name}`);
  return `Hola ${name}`;
};

hola("juanuyrty");

let myFirstvar: number | boolean;

myFirstvar = true;

let mySecVAr: string = "hola";
mySecVAr = "chau";

interface Usuario {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  role?: string;
}

const objeto: Usuario = {
  first_name: "juan",
  last_name: "perez",
  age: 45,
  email: "juan@mail.com",
};

type UsuarioType = {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  role?: string;
};
