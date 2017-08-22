class V2 {
    constructor(x, y) {
        this.x = x; this.y = y;
    }

    add(v) {
        return new V2(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return new V2(this.x - v.x, this.y - v.y);
    }

    mul(a) {
        return new V2(this.x * a, this.y * a);
    }

    norm() {
        return this.x*this.x + this.y*this.y;
    }

    normalize() {
        const n = Math.sqrt(this.norm());
        if (n === 0) return new V2(0, 0);
        return new V2(this.x / n, this.y / n);
    }
}

class Obj {
    constructor(dom, pos, accelCoeff) {
        this.dom = dom;
        this.pos = pos;
        this.accelCoeff = accelCoeff;
        this.vel = new V2(0, 0);
    }
}

class SushiStalker {
    constructor (riceDOM, fishDOM, sushiDOM, config) {
        this.config = config;
        this.rice = new Obj(
            riceDOM, new V2(0, 0), config.riceAccelCoeff
        );
        this.fish = new Obj(
            fishDOM, new V2(window.innerWidth, window.innerHeight), config.fishAccelCoeff
        );

        this.sushiDOM = sushiDOM;
        this.sushiDOM.style.visibility = 'hidden';

        this.mousePos = new V2(window.innerWidth / 2, window.innerHeight / 2);
    }

    run() {
        setInterval(this._loop.bind(this), 1000 / this.config.fps);
    }

    setMousePos(posX, posY) {
        this.mousePos = new V2(posX, posY);
    }

    _loop() {
        [this.rice, this.fish].forEach(obj => {
            const accel = this.mousePos.sub(obj.pos).normalize().mul(obj.accelCoeff);
            obj.vel = obj.vel.mul(this.config.inertia).add(accel);
            obj.pos = obj.pos.add(obj.vel);
            obj.dom.style.left = obj.pos.x;
            obj.dom.style.top  = obj.pos.y;
        });

        this.setSushi(this.rice.pos.sub(this.fish.pos).norm() < this.config.sushiRange);
    }

    setSushi(isSushi) {
        this.rice.dom.style.visibility = this.fish.dom.style.visibility
            = isSushi ? 'hidden' : 'visible';
        this.sushiDOM.style.visibility = isSushi ? 'visible' : 'hidden';
        if (isSushi) {
            const sushiPos = this.rice.pos.add(this.fish.pos).mul(0.5);
            this.sushiDOM.style.left = sushiPos.x;
            this.sushiDOM.style.top  = sushiPos.y;
        }
    }
}
