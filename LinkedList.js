/**
 * Created by jonlazarini on 24/06/17.
 */
// O (n)
function LinkedList() {
    this.head = null; // no node yet when we create the list. point to nothing
    this.tail = null;
}

function Node(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
}
// const node1 = new Node(100, 'node2', null);

LinkedList.prototype.addToHead = function(value) {
// this refers to the constructor method here not the constructor itself as this is a function
    var newNode = new Node(value, this.head, null)
    if(this.head) this.head.prev = newNode // links already exist,
    else this.tail = newNode // no links, tail and head are pointing to the same node as this is the only one
    this.head = newNode // whatever case the newNsode becomes the new head
}

LinkedList.prototype.addToTail = function(val) {
    var n = new Node(val, null, this.tail)
    if (this.tail) this.tail.next = n
    else this.head = n
    this.tail = n
}

LinkedList.prototype.removeHead = function() {
    if (!this.head) return null; // list is empty
    var val = this.head.value
    this.head = this.head.next // new head node
    if (this.head) this.head.prev = null
    else this.tail = null // list is empty
    return val
}

LinkedList.prototype.removeTail = function() {
    if (!this.tail) return null;
    var val = this.tail.value
    this.tail = this.tail.prev
    if (this.tail) this.tail.next = null
    else this.head = null
    return val
}

LinkedList.prototype.search = function(searchVal) {
    let currentNode = this.head // starts from head
    while(currentNode) { // if true
        if (currentNode.value === searchVal) return currentNode.value
        // is not null or undefined goes to the next node
        currentNode = currentNode.next
    }
    return null
}

LinkedList.prototype.indexOf = function(search) {
    let indexes = []
    let currentIndex = 0;
    let currentNode = this.head
    while(currentNode) {
        if (currentNode.value === search) {
            indexes.push(currentIndex);
        }
        currentNode = currentNode.next
        currentIndex++
    }
    return indexes
}

/************/
var LL = new LinkedList()
LL.addToHead(10)
// console.log(LL) // both head node and tail node as we only have one Link
LL.addToHead(20)
// console.log(LL)
LL.addToHead(30)

LL.addToTail(60)
LL.addToTail(50)
LL.addToTail(40)
//console.log(LL)
console.log(LL.search(30)) //true returns 30
console.log(LL.search(70)) // false so it returns null
