/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (p===q){
        return true;
    }
    else if (p.val===q.val) {
        return isSameTree(p.left,q.left) && isSameTree(p.right,q.right);        
    }
    else 
        return false;
};

console.log(isSameTree([1,2,3],[1,2,3]));
/*
======>
    Solucion IA;
*/
var isSameTree = function(p, q) {
  // Caso base: si ambos nodos son nulos, son iguales.
  if (!p && !q) {
    return true;
  }

  // Si uno de los nodos es nulo o si sus valores son diferentes, no son iguales.
  if (!p || !q || p.val !== q.val) {
    return false;
  }

  // Llama de forma recursiva para los subárboles izquierdo y derecho.
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

/*
=====>
    Con bucle (Usando COLA con shift y el otro ejemplo con PIL y pop)
*/
//Enfoque con Búsqueda en Profundidad (DFS) usando una pila
var isSameTree = function(p, q) {
    // Si ambos árboles son nulos, son iguales.
    if (!p && !q) return true;
    
    // Si uno es nulo y el otro no, no son iguales.
    if (!p || !q) return false;
    
    // Usamos una pila para almacenar los nodos a comparar.
    const stack = [p, q];

    while (stack.length > 0) {
        // Sacamos los dos nodos de la parte superior de la pila
        const node1 = stack.pop();
        const node2 = stack.pop();

        // Si los nodos actuales son diferentes, los árboles no son iguales.
        if (node1.val !== node2.val) {
            return false;
        }

        // Si los hijos izquierdos no son iguales, no son el mismo árbol.
        if ((node1.left && !node2.left) || (!node1.left && node2.left)) {
            return false;
        }
        
        // Si los hijos derechos no son iguales, no son el mismo árbol.
        if ((node1.right && !node2.right) || (!node1.right && node2.right)) {
            return false;
        }

        // Empujamos los hijos derechos a la pila (si existen)
        if (node1.right) {
            stack.push(node1.right);
            stack.push(node2.right);
        }

        // Empujamos los hijos izquierdos a la pila (si existen)
        if (node1.left) {
            stack.push(node1.left);
            stack.push(node2.left);
        }
    }

    // Si el bucle termina, los árboles son idénticos.
    return true;
};

// Enfoque con Búsqueda en Amplitud (BFS) usando una cola
var isSameTree = function(p, q) {
    // Si ambos árboles son nulos, son iguales.
    if (!p && !q) return true;
    
    // Si uno es nulo y el otro no, no son iguales.
    if (!p || !q) return false;

    // Usamos una cola para almacenar los nodos a comparar.
    const queue = [p, q];

    while (queue.length > 0) {
        // Sacamos los dos nodos del frente de la cola
        const node1 = queue.shift();
        const node2 = queue.shift();

        // Comprobamos si los nodos son nulos. Si ambos son nulos, continuamos con el siguiente par.
        if (!node1 && !node2) {
            continue;
        }

        // Si uno es nulo o si sus valores no coinciden, los árboles no son iguales.
        if (!node1 || !node2 || node1.val !== node2.val) {
            return false;
        }

        // Encolamos los hijos izquierdos de ambos nodos
        queue.push(node1.left);
        queue.push(node2.left);

        // Encolamos los hijos derechos de ambos nodos
        queue.push(node1.right);
        queue.push(node2.right);
    }

    // Si el bucle termina, significa que todos los nodos comparados eran iguales.
    return true;
};