/**
 * Created by ale on 7/18/17.
 */
class No {
  constructor( element=undefined ) {
    this.element = element;
    this.next    = undefined;
  }
}

class List {
  constructore(e=undefined) {
    this.length = 0;
    this.head   = e;
  }

  get size() {
    return this.length;
  }

  add( element ) {
    let n = new No( element );
    if ( !this.head ) {
      this.head = n;
    }
    else {
      let c = this.head;
      for ( ; c.next ; ) {
        c = c.next;
      }
      c.next = n;
    }
    this.length++;
  }

  remove( element ) {
    let c = this.head,
        p,
        r
    if( c.element === element){
      this.head= c.next;
    }
    else{
      for(; c.element!==element;){
        p=c;
        c= c.next;
      }
      p.next= c.next;
    }
    this.length--;
    return c.element;
  }

  elementAt(index){
    let c= this.head,
        i=0
    if(index<0||index>=this.length||!c){
      return;
    }
    for(;i<index;){
      i++;
      c= c.next;
    }
    return c.element;
  }

  get isEmpty(){
    return !this.length;
  }

  indexOf(e){
    let c = this.head,
    i=0
    if( !c ) return -1;
    for(;c = c.next;){
      if(c && c.element ===e) {
        i++
        break;
      }
    }
    return i;
  }
}

class LinkedList extends List {
  constructor(e=undefined) {
    super(e)
    this.length = 0;
    this.head   = e;
  }

  addAt(index,element){
    let n =new No(element),
        c = this.head,
        p,
        currentIndex=0

    if(index>this.length) {
      return
    }
    if(!index){
      n.next=c;
      this.head=n;
    }
    else{
      for(;currentIndex<index;){
        currentIndex++;
        p=c;
        c= c.next;
      }
      n.next=c;
      p.next=n;
    }
    this.length++;
  }
  removeAt(index){
    let c = this.head,
        p,
        currentIndex=0
    if(index<0||index>=this.length){
      return
    }
    if(!index){
      this.head= c.next;
    }
    else{
      for(;currentIndex<index;){
        currentIndex++
        p=c
        c= c.next
      }
      p.next= c.next
    }
    this.length--;
    return c.element;
  }

}

class Stack extends List{
  constructor(e=undefined){
    super(e)
    this.length = 0;
    this.head   = e;
  }
  push(e){
    this.add(e);
  }
  pop(){
    return this.remove(this.elementAt(this.length-1));
  }
  peek(){
    return this.remove(this.elementAt(this.length-1));
  }
}

class Queue extends LinkedList{
  constructor(e=undefined){
    super(e)
    this.length = 0;
    this.head   = e;
  }

  add(e){
    this.addAt(0,e);
  }

  remove(){
    return this.removeAt(this.length-1);
  }
}

class Set {
  constructor(e=[]){
    this.collection=e;
  }
  get values(){
    return this.collection;
  }
  set values(e){
    this.collection = e || [];
  }
  has(element){
    return this.collection.indexOf(element) !== -1;
  }
  add(element){
    if(!this.has(element)){
      this.collection.push(element)
      return true
    }
    return false
  }
  remove(element){
    if(this.has(element)){
      let i =this.collection.indexOf(element);
      if(i>-1) this.collection.splice(i,1);
      return true
    }
    return false
  }
  get size(){
    return this.collection.length
  }
  subset(set){
    let subset = this.values
    return subset.every(function(e) {
      return set.has(e)
    })
  }
  static union( firstSet, secondSet ){
    let union = new Set(),
        first = firstSet.values,
        second = secondSet.values

    first.forEach(function (e) {
      union.add(e)
    })

    second.forEach(function (e) {
      union.add(e)
    })
    return union
  }
  static intersetion( firstSet, secondSet ){
    let
      inter = new Set(),
      first = firstSet.values
    first.forEach(function(e){
      secondSet.has(e) && inter.add(e)
    })
    return inter
  }
  static difference(firstSet, secondSet ){
    let
      diff = new Set(),
      first = firstSet.values
    first.forEach(function (e) {
      !secondSet.has(e) && diff.add(e)
    })
    return diff
  }
}

class Map {
  constructor(e={}){
    this.collection=e;
    this.length=e.length||0;
  }
  get size(){
    return this.length
  }
  set( key, value){
    if(!this.has(key))
      this.length++
    this.collection[key]=value
  }
  has(key){
    return this.collection.hasOwnProperty(key)
  }
  get(key){
    if(this.has(key))
      return this.collection[key]
    return
  }
  delete(key){
    if(this.has(key)){
      delete this.collection[key]
      this.length--
    }
  }
  get values(){
    let key, arr=[]
    for ( key in this.collection) {
      if (this.collection.hasOwnProperty(key)) {
        arr.push(this.collection[key]);
      }
    }
    if(arr.length)
      return arr;
    return
  }
  clear(){
    this.collection={};
    this.length=0;
  }
}

class HashTable {
  constructor(storage={},length=10,fn=(string,max) => {
    let hash=0
    for (var i = 0; i < string.length; i++) {
      hash+= string.charCodeAt(i)
    }
    return hash % max
  }
  ) {
    this.storage=storage
    this.length=length
    this.fn=fn
  }
  print(){
    console.log(this.storage);
  }
  add( key,value){
    let index = this.fn(key,this.length)
    if(this.storage[index]===undefined){
      this.storage[index]=[
        [key,value]
      ]
    }
    else{
      let inserted,arr = this.storage[index], max = arr.length
      for (;max--;) {
        if(arr[max][0] === key){
          arr[max][1] = value
          inserted=true
          break;
        }
        if(!inserted){
          arr[max].push([key,value])
        }
      }
    }
  }
  remove(key){
    let index = this.fn(key,this.length),arr = this.storage
    if(arr[index].length === 1 && arr[index][0][0]===key){
      delete arr[index]
    }
    else{
      arr = arr[index]
      let max = arr.length
      for (;max--;) {
        if(arr[max][0]===key){
          delete arr[max]
          break
        }
      }
    }
  }
  lookup(key){
    let index = this.fn(key,this.length),arr = this.storage
    if(arr[index]===undefined){
      return
    }
    else{
      arr = arr[index]
      let max = arr.length
      for (;max--;) {
        if(arr[max][0]===key){
          return arr[max][1]
        }
      }
    }
  }
}

class No2  {
  constructor( data=undefined, left=undefined,right=undefined ) {
    this.data = data;
    this.left = left;
    this.right= right;
  }
}
class BinarySearchTree {
  constructor(root=null) {
    this.root=root;
  }
}

module.exports ={
  No:No,
  List:List,
  Stack:Stack,
  LinkedList:LinkedList,
  Queue:Queue,
  Set:Set,
  Map:Map,
  HashTable:HashTable,
  No2:No2,
  BST:BinarySearchTree
}
