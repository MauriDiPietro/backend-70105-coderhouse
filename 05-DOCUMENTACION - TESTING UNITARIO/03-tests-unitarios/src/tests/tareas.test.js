import Chai from 'chai';
import { Tareas } from '../utils/tareas.js';
const { expect, assert } = Chai;

describe('Conjunto de pruebas de tareas', ()=>{
    it('Debería crear el contenedor de tareas vacío', ()=>{
        //etapa de preparacion
        const tareas = new Tareas();
        
        //etapa de ejecucion
        const listaDeTareas = tareas.list();
        
        //etapa de afirmaciones
        expect(listaDeTareas).to.have.lengthOf(0);  //expect
        assert.lengthOf(listaDeTareas, 0);          //assert
        assert.strictEqual(listaDeTareas.length, 0);
        // listaDeTareas.should.have.lengthOf(0);      //should
    });

    it('Debería agregar una tarea al array', ()=>{
        const tareas = new Tareas();
        tareas.add('Practicar testing');
        const listaTareas = tareas.list();
        assert.strictEqual(listaTareas.length, 1);
        assert.deepStrictEqual(listaTareas, [
            { complete: false, title: 'Practicar testing' }
        ])
    });

    it('Comprobar error en intentar marcar como completa una tarea inexistente', ()=>{
        const tareas = new Tareas();

        const funcionTest = ()=>{
            tareas.complete('una tarea');
        }

        assert.throws(funcionTest, Error, 'No hay tareas');
        expect(funcionTest).to.throw(Error, 'No hay tareas');
    });
    
    // it('', ()=>{});
})