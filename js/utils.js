class Utils {

    /**
         * Check if a number is in a range
         * 
         * @param {Number} val 
         * @param {Number} min 
         * @param {Number} max 
         * @returns {Boolean}
         */
    static inRange(val, min, max) {
        return val >= min && val < max;
    }

    /**
     * Get DOM element with specified id
     * 
     * @param {String} id 
     * @returns {*}
     */
    static getElem(id) {
        return document.getElementById(id);
    }

}