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

        let radii = createVector(b.radii.x / 2, b.radii.y / 2);
        let vecNW = createVector(b.center.x - radii.x, b.center.y + radii.y);
        let vecNE = createVector(b.center.x - radii.x, b.center.y + radii.y);
        let vecSW = createVector(b.center.x - radii.x, b.center.y - radii.y);
        let vecSE = createVector(b.center.x + radii.x, b.center.y - radii.y);

        this.northWest = new QuadTree(this.capacity, new AABB(vecNW, radii));
        this.northEast = new QuadTree(this.capacity, new AABB(vecNE, radii));
        this.southWest = new QuadTree(this.capacity, new AABB(vecSW, radii));
        this.southEast = new QuadTree(this.capacity, new AABB(vecSE, radii));

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
        rect(this.boundary.center.x, this.boundary.center.y, this.boundary.radii.x * 2, this.boundary.radii.y * 2);
        
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