class AABB {

    /**
     * Create new Axis-aligned bounding box
     * 
     * @param {p5.Vector} center 
     * @param {p5.Vector} radii
     */
    constructor(center, radii) {
        this.center = center;
        this.radii = radii;
    }

    contains(point) {
        return Utils.inRange(point.x, this.center.x - this.radii.x, this.center.x + this.radii.x) &&
               Utils.inRange(point.y, this.center.y - this.radii.y, this.center.y + this.radii.y)
    }

    intersects(other) {
        return !(other.center.x - other.radii.x > this.center.x + this.radii.x ||
                 other.center.x + other.radii.x < this.center.x - this.radii.x ||
                 other.center.y - other.radii.y > this.center.y + this.radii.y ||
                 other.center.y + other.radii.y < this.center.y - this.radii.y);
    }

}