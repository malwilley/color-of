# color-of

Library for finding the the most representative color of a given search term. Matches to the nearest color of the provided palette. Uses either Google Custom Search Engine API or Microsoft Cognitive Services.

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

The options object **must** include API information for either Google or Bing. Both services provide a limited number of uses for free. [Instructions here](#getting-api-keys).

#### Google

Required properties: 
- `googleCseId`
- `googleApiKey`

```js
const options = {
  googleCseId: 'adb85cb75d71403cba06e1783b28b414', // replace with valid key
  googleApiKey: 'adb85cb75d71403cba06e1783b28b414', // replace with valid key
};
```

#### Bing

Required properties:
- `bingApiKey`

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

#### Number of Search Results

By default, the first 50 image results are used in determining the closest color match. If you would like to match on a smaller number of images, provide this number in the `numResults` property

Bing only returns the first 50 image results. Google, on the other hand, will return 10 per API request. This means that a numResults = 50 will chew up 5 Google API requests.

```js
const options = {
  bingApiKey,
  numResults = 30 // max 50 for Bing, no limit for Google
};
```

## Building

### Testing

Add your own API keys for Google and Bing in test/inputs/secret.js. Follow the example file there.

To run the mocha tests:

`
npm run test
`

## Getting API Keys

Below are details on how to get free search API keys for either Google or Bing.

### Bing

Navigate to [azure.microsoft.com/en-us/try/cognitive-services/](https://azure.microsoft.com/en-us/try/cognitive-services/), switch to the 'Search' tab, and select 'Get API Key' for Bing Search APIs. Login with any of the providers and your keys will be listed at [https://azure.microsoft.com/en-us/try/cognitive-services/my-apis/](https://azure.microsoft.com/en-us/try/cognitive-services/my-apis/). This will be your `bingApiKey`.

### Google

#### 1. Create Google Custom Search Engine (CSE)

Navigate to [cse.google.com/cse](https://cse.google.com/cse/all) and add a search engine.

When creating, do not specify a URL in the 'Sites to search' section. In the 'Advanced' dropdown, enter 'Thing' as the Schema.org type.

After created, go to the control panel for your search engine and get the search engine ID in the 'Details' section. This is your `googleCseId`.

#### 2. Enable image search for your CSE

In the control panel for your CSE, right below your search engine ID, switch 'Image search' to ON.

#### 3. Create API for your CSE

Navigate to [console.developers.google.com](https://console.developers.google.com/) and create a new project with any name.

In 'Enable APIs and Services', search "custom search API" and enable it for the project.

In the 'Credentials' section, the API key will be your `googleApiKey`.