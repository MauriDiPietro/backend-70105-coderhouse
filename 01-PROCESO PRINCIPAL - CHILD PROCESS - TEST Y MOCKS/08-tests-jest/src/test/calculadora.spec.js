import calculadora from "../calculadora.js";

describe('conjunto de pruebas de calculadora', ()=>{
    it('debería sumar dos numeros', ()=>{
        //preparacion
        const num1 = 8
        const num2 = 2
        const resultadoEsperado = 10

        //ejecucion
        const resultado = calculadora.suma(num1, num2)

        //verificacion
        expect(resultado).toBe(resultadoEsperado)
        expect(resultado).not.toBe(0)
        expect(resultado).toBeDefined()
        expect(resultado).not.toBeUndefined()
        expect(resultado).toBeGreaterThan(9)
    })

    it('deberia restar dos numeros', ()=>{
        const num1 = 8
        const num2 = 2
        const resultadoEsperado = 6

        //ejecucion
        const resultado = calculadora.resta(num1, num2)

        //verificacion
        expect(resultado).toBe(resultadoEsperado)
        expect(resultado).not.toBe(0)
        expect(resultado).toBeDefined()
        expect(resultado).not.toBeUndefined()
        expect(resultado).toBeGreaterThan(5)
    })

    it('si se intentan sumar argumentos no numericos, debe responder con error', ()=>{
        const num1 = 8
        const num2 = ['pepe']

        expect(()=>calculadora.suma(num1, num2).toThrow('Argumentos invalidos'))
        expect(()=>calculadora.suma(num1, num2).toThrow())
    })
})