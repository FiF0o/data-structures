/**
 * Created by jonlazarini on 24/06/17.
 */
// O log(n)

function BST(val) {
    this.value = val;
    this.left = null;
    this.right = null;
}

BST.prototype.insert = function(val) {
    // left
    if(val <= this.value) {
        if (!this.left) this.left = new BST(val) //no left child
        else this.left.insert(val) // recursion - insert value to create new BST on free spot, down the tree
    }
    // right - else if (val > this.value) {}
    else {
        if (!this.right) this.right = new BST(val)
        else this.right.insert(val)
    }
}

BST.prototype.contains = function(val) {
    if (val === this.value) return true
    else if (val < this.value) { // go to the left
        if(!this.left) return false
        else return this.left.contains(val);
    }
    else if (val > this.value) {
        if(!this.right) return false
        else return this.right.contains(val)
    }
}

// goes through all the nodes (least to greatest)
BST.prototype.depthFirstTraversal = function(iteratorFunc, order) {
    if(order === 'pre-order') iteratorFunc(this.value)
    if(this.left) this.left.depthFirstTraversal(iteratorFunc, order)  // iteratorFunc(this.left.value)
    if (order === 'in-order') iteratorFunc(this.value) // value to be logged
    if(this.right) this.right.depthFirstTraversal(iteratorFunc, order)  // iteratorFunc(this.right.value)
    if(order === 'post-order') iteratorFunc(this.value)
}

BST.prototype.getMinVal = function() {
    // lowest val is always at the left in the tree
    if(this.left) return this.left.getMinVal()
    else return this.value
}

BST.prototype.getMaxVal = function() {
    if(this.right) return this.right.getMaxVal()
    else return this.value
}

var logger = function(val) {
    console.log('val', val)
}

// moving down level by level
BST.prototype.BreathFirstTraversal = function(cb) {
    var queue = [this]; // initiate the queue with our first root node - 50 this.value from new BST()
    while(queue.length) {
        var treeNode = queue.shift() // gets node to be processed by the iterator
        cb(treeNode)
        // push children (left right) in the queue
        if (treeNode.left) queue.push(treeNode.left)
        if (treeNode.right) queue.push(treeNode.right)
    }
}


var bst = new BST(50)
bst.insert(30)
bst.insert(70)
bst.insert(100)
bst.insert(60)
bst.insert(59)
bst.insert(20)
bst.insert(45)
bst.insert(35)
bst.insert(85)
bst.insert(105)
bst.insert(10)

// console.log(bst.right.left.left) // 59
// console.log(bst.left.right.left) // 35
// console.log(bst.right.right) // 100

// console.log(bst.contains(59)) //true
// console.log(bst.contains(15)) //false
/*
 in-order
 pre-order
 post-order
 */
// bst.depthFirstTraversal(logger, 'in-order') // left to right nodes
// bst.depthFirstTraversal(logger, 'pre-order') // all the left branches first
// bst.depthFirstTraversal(logger, 'post-order') // reads fromt bottom to up, all levels from left to right
function logNode(node) {
    console.log('node value is', node.value)
}

bst.BreathFirstTraversal(logNode) // logs child nodes at levels/stages
