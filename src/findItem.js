/**
* Creates the webdriverio `findItem` command 
*
* @param {object} driver - the webdriverio instance
*/
module.exports = function (driver) {

    /**
    * 
    * @param {string} listSelector
    * @param {Function} predicate
    * @return {Promise.<Object>} 
    */
    return function findItem (listSelector, predicate) {

        return driver
            .elements(listSelector)
            .then(iterate)
  
        function iterate (list) {
            if (!list) return
            
            let idx = 0

            // returns a promise that chains itself until the promise resolves.
            // the promise resolves when either the item is found, or the end
            // of the list is reached.
            function next () {
                if (idx < list.length) { 
                    let candidate = list[idx]
                    idx++
                    return predicate(candidate).catch(next)
                } else {
                    // got to the end of the list. resolve nothing - or should we reject?
                    return Promise.resolve()
                }
            }
            return next() 
        }
    }
}