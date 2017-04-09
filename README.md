# webdriver-finditem

This is a custom [webdriverIO](http://webdriver.io/) command. Given a selector for a list of elements, it
iterates over the list and calls a predicate function for each element in the list, returning a promise that resolves
with the value of the matched item.

### Example

```javascript
// initialize webdriverIO client
const webdriverio = require('webdriverio')
const client = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome' }})

// attach findItem to the client
const findItem = require('webdriver-finditem')(client)

client
  .init()
  .url('https://duckduckgo.com/')
  .findItem('.list_selector', (item) => {
    // ...
  })
  .then((item) => client.elementIdClick(item.value.ELEMENT)
  .end();
```
