require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Agrega el elemento value al comienzo de la lista. 
 * @param {*} value 
 * @param {Array} list 
 * @returns {Array}
 * @example cons(1, [2, 3]); // => [1, 2, 3]
 */
function cons(value, list) {
    let tmp = list.slice(0);
    tmp.splice(0, 0, value);
    return tmp;
}

/**
 * Retorma el primer elemento de la lista
 * @param {Array} list 
 * @example first([1, 2, 3]) // => 1
 * @returns {*}
 */
function first(list) {
    return list.slice(0, 1)[0];
}

/**
 * Retorna todos los elementos de la lista, excepto el primero
 * @param {Array} list 
 * @returns {Array}
 * @example rest([1, 2, 3]); // => [2, 3]
 */
function rest(list) {
    return list.slice(1);
}

/**
 * La lista de entrada está vacio?
 * @param {Array} list 
 * @returns {boolean}
 * @example isEmpty([1, 2, 3]); // => false
 * @example isEmpty([]); // => true

 */
function isEmpty(list) {
    if (typeof list == 'object') {
        return list.length === 0;
    }
    return false;
}

/**
 * Retorna verdadero si el objeto de entrada es una lista
 * @param {Array} list
 * @returns {boolean} 
 * @example isList([]); // => true
 * @example isList([1, 2]); // => true
 * @example isList(1); // => false
 * @example isList("Hola"); // => false
 */
function isList(list) {
    return typeof list === 'object' && typeof list.length == 'number' && list.length >= 0;
}

/**
 * Retorna la longitud de un arreglo
 * @param {Array} list 
 * @returns {Number}
 * @example length([]); // => 0
 * @example length([2, 4]); // => 2
 */
function length(list) {
    return list.length;
}

/**
 * Concatena la list2 al final de la list1. Si list2 no es un arreglo, simplemente agrega
 * este elemento al final de list1.
 * @param {Array} list1 
 * @param {Array | Object} list2 
 * @returns {Array}
 * @example append([1, 2], [3, 4]); // => [1, 2, 3, 4]
 */
function append(list1, list2) {
    let tmp = list1.slice();
    if (typeof list2 === 'object' && list2.length >= 0) {
        tmp.push(...list2);
        return tmp;
    } else {
        tmp.push(list2);
        return tmp;
    }
}

/**
 * Filtra la lista l usando la función f.
 * @param {Array} l 
 * @param {function} f función booleana 
 * @returns {Array}
 * @example filter([1, 2, 3, 4, 5], x => x % 2 === 1); // => [1, 3, 5]
 */
function filter(l, f) {
    if (isEmpty(l)) {
        return [];
    } else if (f(first(l))) {
        return cons(first(l), filter(rest(l), f));
    } else {
        return filter(rest(l), f);
    }
}

/**
 * Aplica la función f a cada elemento del arreglo a
 * @param {Array} a 
 * @param {function} f 
 * @returns {Array}
 * @example console.log(map([1,2,3], x => x*x)); // => [1, 4, 9]
 */
let map = function (a, f) {
    if (isEmpty(a)) {
        return [];
    } else {
        return cons(f(first(a)), map(rest(a), f));
    }
};

module.exports = { cons, first, rest, isEmpty, isList, length, append, filter, map };
},{}],"aux-functions":[function(require,module,exports){
const { cons, first, rest, isEmpty, isList, append, length } = require('functional-light');

// FUNCIONES AUXILIARES 

  function pantallaComp() {
    let x = document.getElementById("canvas");

    if(x.mozRequestFullScreen){
      x.mozRequestFullScreen();
    }
    else if (x.webkitRequestFullscreen) {
      x.webkitRequestFullscreen();
    }
  }


  /*search: any,List -> Boolean
  Verifica si un item se encuentra como elemento dentro de una lista l y retorna true o false
  function search(item, l)
  */

 function search(item, l) {
    if (isEmpty(l)) {
      return false;
    } else if (first(l).x == item.x && first(l).y == item.y) {
      return true;
    } else {
      return search(item, rest(l));
    }
  }

  /*
  search2: any, List -> Boolean
  Verifica si un item es igual a algun elemento de la lista ingresada
  function search2(item, l)
  */
  function search2(item, l) {
    if (isEmpty(l)) {
      return false;
    } else if (first(l) == item) {
      return true
    } else {
      return search2(item, rest(l))
    }
  }

  /**
   * guardar_localStorageBS : [] -> none
   * Recibe un mundo, y guarda su atributo "best score" en el localStorage
   */
  function guardar_localStorageBS(world) {
    localStorage.setItem("Best Score", world.bestScore)
  }


  /**
 * guardar_localStorageBS : [] -> any
 * llama el atributo "best score" del localStorage
 */
  function obtener_localStorageBS(world) {
    localStorage.getItem("Best Score")
  }


  /* remove:any,List->List
            Eliminar un elemento "item" de una lista  "l" y retornar la lista restante
            Ejemplos:
        
            console.log(remove(2,[1,4,2,5,6])) // [1,4,5,6]
            console.log(remove(true,[false,true,"hola","mundo"])) // [false,"hola","mundo"]
            console.log(remove(2,[4,5,6,7,8])) // [4,5,6,7,8]
        
        */
  function remove(item, l) {
    if (isEmpty(l)) {
      return [];
    } else if (first(l) === item) {
      return rest(l);
    } else {
      return cons(first(l), remove(item, rest(l)));
    }
  }


  /**
   * colision2: object, object -> boolean
   * confirma si dos objetos tienen las mismas propidades X y Y
  */
  function colision2(obj1, obstaculo) {
    return ((obj1.x >= obstaculo.x && obj1.x <= obstaculo.x + obstaculo.ancho) &&
      (obj1.y >= obstaculo.y && obj1.y <= obstaculo.y + obstaculo.alto));
  }


  /**
   * make: world, object -> world
   * recibe un objeto "data" y le modifica o agrega una propiedad "attribute"
   */
  function make(data, attribute) {
    return Object.assign({}, data, attribute);
  }


  /* 
  obj: any,any->object
  crear un objeto con dos parametros x,y
  function obj(x,y)
  ejemplos: obj(2,3) => {2, 3}
            obj('a', 'c') => {'a', 'c'}
  */
  function obj(x, y) {
    return { x, y }
  }

  /*
  last: list -> []
  Funcion que retorna el ultimo elemento de una lista ingresada
  function last(x)
  */
  function last(x) {
    return x[length(x) - 1]
  }

  /*
  aplicar: function, list -> list
  funcion que simula un mapeado (aplica una funcion a todos los elementos de una lista)
  function aplicar(funcion, x)
  */
  function aplicar(funcion, x) {
    if (isEmpty(x)) {
      return []
    }
    else {
      return cons(funcion(first(x)), aplicar(funcion, rest(x)))
    };
  }

  /*
  colision: obj, obj -> bool
  esta funcion comprueba si hay colision un objeto con otro
  function colision(obj1,obstaculo)
  */
  function colision(obj1, obstaculo) {
    return ((obj1.x >= obstaculo.x && obj1.x <= obstaculo.x + obstaculo.ancho - 10) &&
      (obj1.y >= obstaculo.y && obj1.y <= obstaculo.y + obstaculo.alto - 10))
  }

  /*
  aplicar1: function, [], [] -> list
  aplicar una funcion con dos parametros a dos elementos x e y
  */
  function aplicar2(funcion, x, y) {
    if (isEmpty(x)) {
      return []
    }
    else {
      return cons(funcion(y, first(x)), aplicar2(funcion, rest(x), y))
    };
  }

  /*
  sumamil: obj -> obj
  sumar 1000 a las propiedades x e y de un objeto
  function sumamil(obj)
  */
  function sumamil(obj) {
    return { x: obj.x + 1000, y: obj.y }
  }


  /*
  colisionbotones: obj, obj
  detectar si la posicion del primer objeto se encuentra en el area del segundo
  function colisionbotones(mouse, boton)
  */
  function colisionbotones(mouse, boton) {
    return ((mouse.x >= boton.x && mouse.x <= boton.x + boton.ancho) &&
      (mouse.y >= boton.y && mouse.y <= boton.y + boton.alto))
  }


  /*
  contador: list, number, obj -> number
  dada una lista, un acumulador y un objeto, determinar la posicion del objeto de la lista con la que colosiono el objeto ingresado
  function contador(lis, acum, obj)
  */
  function contador(lis, acum, obj) {

    if (isEmpty(lis)) {

      return [];

    } else if (colision2(obj, first(lis))) {

      return acum;

    } else {
      return contador(rest(lis), acum + 1, obj);
    }
  }

  /*
  removerI: number, list -> list
  eliminar el elemento en la posicion n de una lista ingresada
  function removerI(n, x)
  */

  function removerI(n, x) {
    if (n >= 0 || n <= longitud(x)) {
      if (isEmpty(x)) {
        return [];
      } else {
        return remove(x[n], x)
      }
    }
  }


  /*
  cambiodenivel: number -> any
  determina el nivel que se cargará de acuerdo al puntaje
  function cambiodenivel(score)
  ejemplos: cambiodenivel(5) => nivel2
            cambiodenivel(15) => nivel4
  */
  function cambiodenivel(score) {

    switch (score) {

      case 5:
        return nivel2;
        break;

      case 10:
        return nivel3;
        break;

      case 15:
        return nivel4;
        break;
    }
  }

  /*
  puntajenivel: number -> bool
  determina si el puntaje permite cambiar de nivel
  function puntajenivel(score) 
  ejemplos: puntajenivel(5) => true
            puntajenivel(10) => true

  */
  function puntajenivel(score) {

    switch (score) {

      case 5:
        return true;
        break;

      case 10:
        return true;
        break;

      case 15:
        return true;
        break;
    }
  }


  /*
  moverBala: any, string => any
  mueve la bala deacuerdo a world.direccionBala
  function moverBala(bala,ultimatecla)
  */
  function moverBala(bala, direccionBala) {
    switch (direccionBala) {

      case "derecha":
        return { x: bala.x + 20, y: bala.y }
        break;

      case "izquierda":
        return { x: bala.x - 20, y: bala.y }
        break;

      case "abajo":
        return { x: bala.x, y: bala.y + 20 }
        break;

      case "arriba":
        return { x: bala.x, y: bala.y - 20 }
        break;
    }
  }

  /*
  limitebala: any, number
  determina si la bala alcanzó su limite
  function limitebala(posicionbala, limite)
  ejemplos: limitebala({x: 100, y: 50}, 100) => true
            limitebala({x: 690, y: 150}, 400) => false
  */
  function limitebala(posicionbala, limite) {
    if (posicionbala.x == limite || posicionbala.y == limite) {
      return true;
    } else { return false }
  }

  /*
  fijarlimite: string, any -> number
  establece el limite de la bala de acuerdo a la posicion en la que fue lanzada
  function fijarlimite(ultimatecla, posicionsnake)
  ejemplos:   fijarlimite("arriba", {x: 100, y: 400}) => 100
              fijarlimite("derecha", {x: 450, y: 100}) => 750 
  */
  function fijarlimite(ultimatecla, posicionsnake) {

    switch (ultimatecla) {

      case "arriba":
        return posicionsnake.y - 300;
        break;

      case "abajo":
        return posicionsnake.y + 300;
        break;

      case "izquierda":
        return posicionsnake.x - 300;
        break;

      case "derecha":
        return posicionsnake.x + 300;
        break;
    }
  }

  /*
  nivelesdebonus: number -> bool
  determina si el nivel actual es apto para el bonus
  function nivelesdebonus(nivel)
  ejemplos: niveldebonus(4) => true
            nivelesdebonus(3) => false
  */
  function nivelesdebonus(nivel) {
    if (nivel == 1 || nivel == 4) {
      return true;
    } else {
      return false;
    }
  }

module.exports = {pantallaComp, search, search2, guardar_localStorageBS, obtener_localStorageBS, remove, colision2, make, obj, last, aplicar, colision, aplicar2, sumamil, colisionbotones, contador, removerI, cambiodenivel, puntajenivel, moverBala, limitebala, fijarlimite, nivelesdebonus};

},{"functional-light":1}]},{},[]);
