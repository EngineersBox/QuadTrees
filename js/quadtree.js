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
        this.northWest = null;
        this.northEast = null;
        this.southWest = null;
        this.southEast = null;
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
            if (this.northWest.insert(point) == true)
                return true;
            if (this.northEast.insert(point) == true)
                return true;
            if (this.southWest.insert(point) == true)
                return true;
            if (this.southEast.insert(point) == true)
                return true;
        }
    }

    /**
     * Create four QuadTree children that fully divide
     * this QuadTree into four quads of equal area
     */
    subdivide() {
        let b = this.boundary;

        let vecNW = createVector(b.center.x - b.radius / 2, b.center.y + b.radius / 2);
        let vecNE = createVector(b.center.x + b.radius / 2, b.center.y + b.radius / 2);
        let vecSW = createVector(b.center.x - b.radius / 2, b.center.y - b.radius / 2);
        let vecSE = createVector(b.center.x + b.radius / 2, b.center.y - b.radius / 2);

        this.northWest = new QuadTree(this.capacity, new AABB(vecNW, b.radius / 2));
        this.northEast = new QuadTree(this.capacity, new AABB(vecNE, b.radius / 2));
        this.southWest = new QuadTree(this.capacity, new AABB(vecSW, b.radius / 2));
        this.southEast = new QuadTree(this.capacity, new AABB(vecSE, b.radius / 2));

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
                this.northWest.queryRange(range, pointsInRange);
                this.northEast.queryRange(range, pointsInRange);
                this.southWest.queryRange(range, pointsInRange);
                this.southEast.queryRange(range, pointsInRange);
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
        rect(this.boundary.center.x, this.boundary.center.y, this.boundary.radius * 2, this.boundary.radius * 2);
        
        for (let p of this.points) {
            strokeWeight(2);
            point(p.x, p.y);
        }

        if (this.divided) {
            this.northWest.show();
            this.northEast.show();
            this.southWest.show();
            this.southEast.show();
        }
    }

}