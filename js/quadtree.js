class QuadTree {

    /**
     * Create a new QuadTree with a specified capacity and boundary
     * 
     * @param {Number} capacity 
     * @param {AABB} boundary
     */
    constructor(capacity, boundary) {
        this.capacity = capacity;
        this.boundary = boundary;
        this.points = [];
        this.quads = {
            NW: null,
            NE: null,
            SW: null,
            SE: null
        };
        this.divided = false;
    }

    /**
     * Insert a point into the QuadTree
     * 
     * @param {p5.Vector} point 
     * @returns {Boolean}
     */
    insert(point) {
        if (!this.boundary.contains(point))
            return false;

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
            }
            for (let val in this.quads) {
                if (this.quads[val].insert(point)) {
                    return true;
                }
            }
        }
    }

    /**
     * Create four QuadTree children that fully divide
     * this QuadTree into four quads of equal area
     */
    subdivide() {
        let b = this.boundary;

        let radii = createVector(b.radii.x / 2, b.radii.y / 2);
        let coeffs = [[-1, 1], [1, 1], [-1, -1], [1, -1]]
        let count = 0;
        for (let val in this.quads) {
            let vec = createVector(b.center.x + (coeffs[count][0] * radii.x), b.center.y + (coeffs[count][1] * radii.y));
            this.quads[val] = new QuadTree(this.capacity, new AABB(vec, radii));
            count++;
        }

        this.divided = true;
    }

    /**
     * Find all points that appear within a boundary
     * 
     * @param {AABB} range 
     * @param {Array} pointsInRange
     * @returns {Array}
     */
    queryRange(range, pointsInRange) {
        if (!pointsInRange) {
            pointsInRange = [];
        }
        if (!this.boundary.intersects(range)) {
            return;
        } else {
            for (let p of this.points) {
                if (range.contains(p)) {
                    pointsInRange.push(p);
                }
            }
            if (this.divided) {
                for (let val in this.quads) {
                    this.quads[val].queryRange(range, pointsInRange);
                }
            }
        }
        return pointsInRange;
    }

    /**
     * Render the QuadTree
     */
    show() {
        stroke(255);
        noFill();
        strokeWeight(1);
        rectMode(CENTER);
        rect(this.boundary.center.x, this.boundary.center.y, this.boundary.radii.x * 2, this.boundary.radii.y * 2);
        
        for (let p of this.points) {
            strokeWeight(2);
            point(p.x, p.y);
        }

        if (this.divided) {
            for (let val in this.quads) {
                this.quads[val].show();
            }
        }
    }

}