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

    containsPoint(point) {
        return Utils.inRange(point.x, this.center.x - radius, this.center.x + radius) &&
               Utils.inRange(point.y, this.center.y - radius, this.center.y + radius)
    }

    intersectsAABB(other) {
        return;
    }

}