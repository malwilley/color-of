# color-of

Node library for finding the the most representative color of a given search term. Matches to the nearest color of the provided palette.

## Installation
````
npm install color-of
````

## Usage

```js
const colorOf = require('color-of');
colorOf('banana', options) // returns a promise
.then(color => console.log(color.hex())) // resolves to a (npmjs.com/package/color) object
```

### Options object

The only required property is `bingApiKey`, which needs to be set to a valid Bing Web Search API key. Get this string by creating an account with [Microsoft Cognitive Services](https://www.microsoft.com/cognitive-services/en-us/bing-web-search-api).

```js
const options = {
  bingApiKey: 'adb85cb75d71403cba06e1783b28b414', // replace with valid key
};
```

#### Color Palette

This library will match search terms to the nearest color in the provided palette. The `palette` property expects an array of colors, which can be formatted as css color strings or objects. Really, anything that is accepted as a constructor to the [Qix- color package](https://www.npmjs.com/package/color).

| Palette Name  | Description                                           | Source |
| ------------- |-------------------------------------------------------|--------|
| 'material'    | Google's material design palette (default brightness) | [Link](https://material.io/guidelines/style/color.html?hl=fi#color-color-tool)   |
| 'w3c'         | The W3C color palette                                 | [Link](https://www.w3.org/TR/css3-color/#html4) |
| 'css'         | The palette of all valid CSS color strings            | [Link](https://drafts.csswg.org/css-color/#named-colors) |

```js
const options = {
  bingApiKey,
  palette: [ 'rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)']
  // or 'w3c'
  // or 'css'
  // or [ '#ff0000', '00ff00', '0000ff' ]
  // or [ 'hsl(0,100%,50%)', 'hsl(120,100%,50%)', 'hsl(240,100%,50%)' ]
  // or [ 'red', 'green', 'blue' ]
  // or [ { h: 0, s: 100, v: 100 }, { h: 120, s: 100, v: 100 }, { h: 240, s: 100, v: 100 } ]
  // ..etc
};
```

#### Number of Bing Results

By default, the first 50 image results are used in determining the closest color match. This is the maximum  allowed by the Bing API. If you would like to match on a smaller number of images, provide this number in the `numResults` property.

```js
const options = {
  bingApiKey,
  numResults = 30 // max 50
};
```
