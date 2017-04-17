# dot-path
Object accessor with dot notation.

## API

### getPath(obj, path)

Return the value of a nested object property from it path.

Usages:

```
getPath({ style: { width: '10px' } }, 'style.width')
// => '10px'
```

```
getPath({}, 'properties.that.do.not.exist')
// => undefined
```
### setPath = function (obj, path, value, options = {})

Set the value of a nested object property.

Usages:

```
setPath({}, 'a.nested.prop', 'myValue')
// { a: { nested: { prop: 'myValue' } } }
```
