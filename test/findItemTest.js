const tap = require('tap')
const findItemCmd = require('../src/findItem')

const list = [
    { value: 'a', ELEMENT: 'element_a'},
    { value: 'b', ELEMENT: 'element_b'},
    { value: 'c', ELEMENT: 'element_c'}
]

const mockDriver = {
    elements: function (selector) {
        return (selector) ? Promise.resolve(list) : Promise.resolve()
    }
}

// Returns a predicate function which returns true if the given
// `item``has the value `value`
function hasValue (value) {
    return function (item) {
        return (item.value === value) ? Promise.resolve(item) : Promise.reject()
    }
}

const findItem = findItemCmd(mockDriver)

tap.test('returns the item if the evaluator function resolves the promise', async function (t) {
    let result = await findItem('selector', hasValue('c'))    
    t.equal(result.ELEMENT, 'element_c')
    t.end()
})

tap.test('returns undefined if the item could not be found', async function (t) {
    let result = await findItem('selector', () => Promise.reject())
    t.false(result)
    t.end()
})

tap.test('returns undefined if no list is found', async function (t) {
    let result =  await findItem(null, hasValue('a'))
    t.false(result)
    t.end()
})



