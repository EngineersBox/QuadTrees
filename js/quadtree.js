class QuadTree {

    /**
     * Create a new QuadTree with a specified capacity
     * 
     * @param {Number} capacity 
     */
    constructor(capacity, boundary) {
        this.capacity = capacity;
        this.boundary = boundary;
        this.points = [];
        this.northWest = null;
        this.northEast = null;
        this.southWest = null;
        this.southEast = null;
    }

    insert(point) {
        if (this.boundary.containsPoint(point) == false)
            return false;

        if (this.points.length < this.capacity) {
            points.push(point);
            return true;
        }
        if (this.northWest == null) {
            if (this.points.length < this.capacity) {
                points.push(point);
                return true;
            } else {
                this.subdivide();
            }
        }

        if (this.northWest.insert(point) == true)
            return true;
        if (this.northEast.insert(point) == true)
            return true;
        if (this.southWest.insert(point) == true)
            return true;
        if (this.southEast.insert(point) == true)
            return true;

        return false;
    }

    subdivide() {
        this.northWest = new QuadTree(capacity, newBoundary);
        this.northEast = new QuadTree(capacity, newBoundary);
        this.southWest = new QuadTree(capacity, newBoundary);
        this.southEast = new QuadTree(capacity, newBoundary);
    }

    queryRange(range) {
        let pointsInRange = [];
        if (this.boundary.intersectsAABB(range) == false)
            return pointsInRange;
        
        for (let p of this.points) {
            if (range.containsPoint(p))
                pointsInRange.push(p);
        }
        if (this.northWest == null)
            return pointsInRange;

        pointsInRange.concat(this.northWest.queryRange(range))
                     .concat(this.northEast.queryRange(range))
                     .concat(this.southWest.queryRange(range))
                     .concat(this.southEast.queryRange(range));
        
        return pointsInRange;
    }

}