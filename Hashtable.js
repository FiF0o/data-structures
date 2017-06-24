/**
 * Created by jonlazarini on 25/06/17.
 */
// O (1)
function HashTable(size) {
    this.buckets = Array(size) // , , , , ,
    this.numbBuckets = this.buckets.length
}

// to go in buckets
function HashNode(key, value, next) {
    this.key = key
    this.value = value
    this.next = next || null // in case we have collision
}

// console.log('somestring'.charCodeAt(0)) // debug, get unicode/unique number for 's'
HashTable.prototype.hash = function(key) {
    // key prop on our node to be hashed
    var total = 0;
    for(var i = 0; i < key.length; i++) {
        total += key.charCodeAt(i) // will always hash to the same values
    }
    var bucket = total % this.numbBuckets // relative to HT size - gets a number/remainer between 0 and numbBuckets
    return bucket
}

HashTable.prototype.insert = function(key, value) {
    var index = this.hash(key) // create a bucket in hashtable - between 0 and numbBuckets
    if(!this.buckets[index]) this.buckets[index] = new HashNode(key, value) // bucket is empty
    else if (this.buckets[index].key === key) { // checks the first node
        this.buckets[index].value = value // updates info if it s the first node
    }
    else {
        var currentNode = this.buckets[index]
        while(currentNode.next) { // runs until next is not null - a node exists
            if(currentNode.next.key === key) { // we found the key we want to update
                currentNode.next.value = value // updated
                return // stop method running otherwise after the update, we would still create a new HashNode
            }
            currentNode = currentNode.next // travels down the chain to the last element
        }
        currentNode.next = new HashNode(key, value) // attaches node at the last bucket down the chain
    }
}

HashTable.prototype.get = function(key) {
    var index = this.hash(key) // look for a bucket
    if(!this.buckets[index]) {
        return null // bucket is empty
    }
    else {
        var currentNode = this.buckets[index]
        while(currentNode) { // not trying to insert a node here
            if(currentNode.key === key) return currentNode.value // found the key
            currentNode = currentNode.next // travels down the nodes
        }
        return null
    }
}

HashTable.prototype.retrieveAll = function() {
    var allNodes = []
    for (var i = 0; i < this.numbBuckets; i++) {
        var currentNode = this.buckets[i]
        while(currentNode) {
            allNodes.push(currentNode)
            currentNode = currentNode.next
        }
    }
    return allNodes;
}

var HT = new HashTable(10)
console.log(HT)
console.log(HT.hash('John'))
HT.insert('John', 'john@mail.com')
HT.insert('Pete', 'pete@mail.com')
HT.insert('Ohjn', 'john@mail.com') // collides test linked list in the bucket
HT.insert('Ohjn', 'blabla@mail.com') // test updating nodes
HT.insert('Pete', 'dsfdsfds@mail.com') // test updating nodes - else if
console.log(HT.buckets)

console.log(HT.get('John')) // returns value - email

HT.insert('object', {foo: 'bar', baz: 'batz'})
console.log(HT.get('object'))
console.log(HT.retrieveAll())
