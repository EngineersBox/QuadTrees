class AABB {

    /**
     * Create new Axis-aligned bounding box
     * 
     * @param {p5.Vector} center 
     * @param {Number} radius
     */
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    }

    contains(point) {
        return Utils.inRange(point.x, this.center.x - this.radius, this.center.x + this.radius) &&
               Utils.inRange(point.y, this.center.y - this.radius, this.center.y + this.radius)
    }

    intersects(other) {
        return !(other.center.x - other.radius > this.center.x + this.radius ||
                 other.center.x + other.radius < this.center.x - this.radius ||
                 other.center.y - other.radius > this.center.y + this.radius ||
                 other.center.y + other.radius < this.center.y - this.radius);
    }

}