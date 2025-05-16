export class Node {
    constructor(xOffset, yOffset) {
        this.state = false
        this.xOffset = xOffset
        this.yOffset = yOffset
    }
}

export class Gate {
    name = ''
    operation = (a, b) => a && b;
    nodes = {}

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class DoubleInputGate extends Gate {
    constructor(x, y) {
        super(x, y);
        this.nodes = {
            a: new Node(0, 20),
            b: new Node(0, 60),
            out: new Node(100, 40),
        }
    }
}

class NegatedDoubleInputGate extends DoubleInputGate {
    constructor(x, y) {
        super(x, y);
        this.nodes.out.xOffset = 108
    }
}

export class And extends DoubleInputGate {
    name = 'and'
    operation = (a, b) => a && b;
}
export class Or extends DoubleInputGate {
    name = 'or'
    operation = (a, b) => a || b;
}
export class Xor extends DoubleInputGate {
    name = 'xor'
    operation = (a, b) => a !== b;
}
export class Not extends Gate {
    name = 'not'
    operation = a => !a

    constructor(x, y) {
        super(x, y);
        this.nodes = {
            a: new Node(0, 40),
            out: new Node(100, 40),
        }
    }
}
export class Nand extends NegatedDoubleInputGate {
    name = 'nand'
    operation = (a, b) => !(a && b);
}
export class Nor extends NegatedDoubleInputGate {
    name = 'nor'
    operation = (a, b) => !(a || b);
}
export class Xnor extends NegatedDoubleInputGate {
    name = 'xnor'
    operation = (a, b) => a === b;
}

export class Connection {
    constructor(nodes) {
        this.nodes = nodes;
        this.state = false;
    }
}