const assert = require('assert');
const {
        No,
        LinkedList,
        List,
        Stack,
        Queue,
        Set,
        Map,
        HashTable,
        BST
      } = require('./data.structure');

describe('Classes ',() => {
  let texto='Deve ter um classe';
  [No,List,Stack,LinkedList].forEach((classe) => {
    it(`> ${texto} ${classe.name}`,() => {
      assert.deepEqual(new classe(),new classe())
    })
  });

  it('> Stack herda List',() => {
    assert.equal( Stack.prototype instanceof List, true)
  })
})
describe('Queue',() => {
  let q
  it('> Deve ser instanciável',() => {
    q = new Queue()
    assert.notEqual(q,null)
    assert.notEqual(q,undefined)
    assert.notEqual(q,0)
  })
  it('> Queue herda List',() => {
    assert.equal( Queue.prototype instanceof List, true)
  })
  it('> adicionar velha',() => {
    q.add('Velha')
    assert.equal(q.indexOf('Velha'),0)
    assert.equal(q.elementAt(0),'Velha')
  })
  it('> adicionar Velho',() => {
    q.add('Velho')
    assert.equal(q.indexOf('Velho'),0)
    assert.equal(q.elementAt(0),'Velho')
  })
  it('> remover Velha',() => {
    assert.equal(q.remove(),'Velha')
    assert.equal(q.size,1)
  })
  it('> remover Velho',() => {
    assert.equal(q.remove(),'Velho')
    assert.equal(q.size,0)
  })
})
describe('LinkedList',() => {
  let ll
  it('> Classe não pode ser nula.',()=>{
    ll = new LinkedList()
    assert.notEqual(new LinkedList(),undefined)
  })
  it('> Adiciona um Gato',()=>{
    ll.add('Gato')
    assert.equal(ll.size,1)
    assert.equal(ll.elementAt(0),'Gato')
    assert.notEqual(ll.elementAt(0),undefined)
  })
  it('> Deve ter um Gato no index 0',() => {
    assert.notEqual(ll.elementAt(ll.indexOf('Gato')),undefined)
    assert.equal(ll.indexOf('Gato'),0)
  })
  it('> Deve adicionar um Cão atrás do Gato',() => {
    ll.addAt(0,'Cão')
    assert.equal(ll.indexOf('Cão'),0)
    assert.equal(ll.size,2)
  })
  it('> Deve adicionar após Cão',() => {
    ll.addAt(1,'Passaro')
    assert.equal(ll.elementAt(1),'Passaro')
    assert.equal(ll.indexOf('Cão'),0)
  })
  it('> Remove o Cão e Passaro',()=>{
    ll = new LinkedList()
    ll.add('Gato')
    ll.add('Cão')
    ll.add('Passaro')
    assert.notEqual(ll.elementAt(2),undefined)
    assert.notEqual(ll.elementAt(1),undefined)
    assert.equal(ll.size,3)
    assert.equal(ll.removeAt(1),'Cão')
    assert.notEqual(ll.elementAt(1),'Cão')
    assert.equal(ll.size,2)
    assert.equal(ll.removeAt(1),'Passaro')
    assert.notEqual(ll.elementAt(1),'Passaro')
    assert.equal(ll.size,1)
  })
})
describe('Stack',() => {
  let s;
  it('> Deve ser instanciável',() => {
    s = new Stack()
    assert.notEqual(s,null)
    assert.notEqual(s,undefined)
    assert.notEqual(s,0)
  })
  it('> Push um Gato',() => {
    s.push('Gato')
    assert.equal(s.size,1);
    assert.equal(s.elementAt(0),'Gato')
  })
  it('> Pop um Gato',() => {
    assert.equal(s.pop(),'Gato')
    assert.equal(s.size,0);
  })
  context('> Push Gato e Cão',() => {
    it('> Cão vem primeiro',() => {
      s.push('Gato')
      s.push('Cão')
      assert.equal(s.elementAt(1),'Cão')
      assert.equal(s.size,2);
    })
    it('> Peek Gato',() => {
      assert.equal(s.peek(),'Cão')
      assert.equal(s.elementAt(0),'Gato')
      assert.equal(s.size,1)
    })
  })
})
describe('Set',() => {
  let s, o;
  it('> Deve ser instanciável',() => {
    s = new Set()
    assert.notEqual(s,null)
    assert.notEqual(s,undefined)
    assert.notEqual(s,0)
  })
  it('> Deve adicionar itens',() => {
    s.add(1)
    assert.notEqual(s.size,0)
    assert.equal(s.size,1)
  })
  it('> Deve remover item',() => {
    assert.equal(s.add(3),true)
    assert.notEqual(s.add(3),true)
    assert.equal(s.has(3),true)
    assert.notEqual(s.has(3),false)
    assert.equal(s.remove(3),true)
    assert.notEqual(s.remove(3),true)
  })
  it('> Deve permitir trocar o conjunto inteiro',() => {
    o = new Set()
    assert.equal(o.size,0)
    o.values = s.values
    assert.equal(o.size,s.size)
    o.values = undefined
    assert.notEqual(o.values,undefined)
    assert.deepEqual(o.values,[])
  })
  it('> Deve evitar repetição de itens',() => {
    assert.equal(s.add(1),false)
    assert.notEqual(s.size,0)
    assert.notEqual(s.size,2)
    assert.equal(s.size,1)
  })
  it('> Deve permitir união',() => {
    o = new Set();
    assert.equal(o.add(2),true)
    assert.deepEqual(Set.union(s,o).values,[ 1, 2 ])
    assert.deepEqual(Set.union(s,o).values,Set.union(o,s).values.reverse())
  })
  it('> Deve achar a interseção',() => {
    s.add(2)
    assert.equal(s.size,2)
    assert.equal(o.size,1)
    let
    diff = new Set(Set.difference(s,o).values),
    inter = Set.intersetion(s,o ).values

    assert.deepEqual(inter,[2])
    assert.notDeepEqual(inter,diff)
  })
  it('> Deve achar a diferença',() => {
    assert.equal(s.size,2)
    assert.equal(o.size,1)
    assert.deepEqual(Set.difference(s,o).values,[1])
    assert.notDeepEqual(Set.difference(s,o).values,[2])
  })
  it('> Deve achar o subconjunto',() => {
    assert.equal(s.size,2)
    assert.equal(o.size,1)
    assert.deepEqual(s.subset(o),false)
    assert.notDeepEqual(s.subset(o),true)
  })
})
describe('Map',() => {
  let m;
  it('> Deve ser instanciável',() => {
    m = new Map()
    assert.notEqual(m,null)
    assert.notEqual(m,undefined)
    assert.notEqual(m,0)
  })
  it('> Deve adicionar um par',() => {
    assert.equal(m.size,0)
    m.set('n',1)
    m.set('n',1)
    assert.equal(m.size,1)
  })
  it('> Deve remover um par',() => {
    assert.equal(m.size,1)
    m.set('m',2)
    m.set('n',1)
    assert.equal(m.size,2)
    m.delete('m')
    assert.equal(m.size,1)
  })
  it('> Deve retorna um par',() => {
    assert.equal(m.size,1)
    assert.deepEqual(m.get('n'),1)
    assert.notEqual(m.get('m'),2)
  })
  it('> Deve retorna valores',() => {
    assert.equal(m.size,1)
    assert.deepEqual(m.values,[1])
    assert.notDeepEqual(m.values,[1,2])
  })
  it('> Deve se limpar',() => {
    assert.equal(m.size,1)
    m.clear()
    assert.equal(m.size,0)
  })
})
describe('HashTable',() => {
  let ht;
  it('> Deve ser instanciável',() => {
    ht = new HashTable()
    assert.notEqual(ht,null)
    assert.notEqual(ht,undefined)
    assert.notEqual(ht,0)
  })
  it('> Deve adicionar item',() => {
    ht.add('Cão',1)
    assert.equal(ht.lookup('Cão'),1)
    assert.notEqual(ht.lookup('Cão'),0)
  })
  it('> Deve remover item',() => {
      ht.remove('Cão')
      assert.equal(ht.lookup('Cão'),undefined)
      assert.notEqual(ht.lookup('Cão'),1)
  })
  it('> Deve exibir tabela',() => {
    for (var i = 0; i < 11; i++) {
      ht.add(''+i,i)
    }
    ht.print()
  })
})
describe('BinarySearchTree',() => {
  let b;
  it('> Deve ser instanciável',() => {
    b = new BST()
    assert.notEqual(b,null)
    assert.notEqual(b,undefined)
    assert.notEqual(b,0)
  })
  describe('funções básicas',() => {
    let b = new BST(),n=rand()
    it('add',() => {
      b.add(n)
      assert.deepEqual(b.root,new NodeBST(n))
    })
    it('remove',() => {
      n=b.remove(n)
      assert.notDeepEqual(n,new NodeBST(n))
      assert.equal(b.root,undefined)
    })
  })
  describe('manipulação',() => {
    let b = new BST(),
        n=[rand(),rand(),rand(),rand(),rand(),rand()],
        i

    // filtra repetido
    n=n.reduce((e,p,i,arr) => {
      if( !n.some(
          (q,ii) => {
            // console.log(`${i}==${ii} ${q}!==${p} ? ${!(i==ii || q !== p)} | i:${i} | arr:[${e}] | ${n}`)
            if(i==ii || q !== p) return false
            return true
          }
        )
      ) e.push(p);
      return e;
    },[])

    n.map((e) => {
      b.add(e)
    })

    it('find',() => {
      i=n[rand(n.length)]
      assert.equal(b.find(i).data, new NodeBST(i).data)
    })
    it('isPresent',() => {
      i=n[rand(n.length)]
      assert.equal(b.isPresent(i),true)
    })

  })
})
