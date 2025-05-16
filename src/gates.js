export class Node {
    constructor(xOffset, yOffset, isOutput) {
        this.state = false
        this.xOffset = xOffset
        this.yOffset = yOffset
        this.isOutput = isOutput
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
            a: new Node(0, 20, false),
            b: new Node(0, 60, false),
            out: new Node(100, 40, true),
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
            a: new Node(0, 20, false),
            out: new Node(68, 20, true),
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
export class Input extends Gate {
    name = 'input'
    constructor(x, y) {
        super(x, y);
        this.state = false;
        this.operation = () => this.state;
        this.nodes = {
            out: new Node(30, 15, true)
        }
    }
}

export class Connection {
    constructor(nodes) {
        this.nodes = nodes
        this.state = false
        this.direction = -1
    }
}

export class FreeNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.nodes = {}
    }
}