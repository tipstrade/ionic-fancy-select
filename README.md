# A Fancy Select

## for AngularJS & Ionic Framework

This is the implimentation of the concept described in
[Cool Select with ionic](http://codepen.io/mhartington/pen/CImqy?editors=101) by Mike Hartington

## Installation

- Install via bower: `bower install --save`
- Include as a dependency in your app: `angular.module('myApp', ['ionic-fancy-select'])`

## Usage

```html
<!-- Include the plugin -->
<script src="lib/ionic-fancy-select/src/ionic-fancy-select.js" type="text/javascript"></script>

<fancy-select
  header-text="Select an option"
  items="items"
  value="selected"
  icon-property="icon"
  value-property="id"
  text-property="id"
  allow-empty='true'
  multi-select="true"
  text="Nothing selected"
  modal-template-url="lib/ionic-fancy-select/templates/fancy-select-modal-template.html"
  template-url="lib/ionic-fancy-select/templates/item-template.html"
  note-text="A Note text"
  note-img="img/foo.png"
  note-img-class="icon"
  value-changed="onValueChanged(value)"
  get-custom-text="getCustomText(value)"
  >
</fancy-select>
```

## Reference

### Property Attributes

#### header-text
* Type: String
* Used to specify the text that is shown in the [Modal's](http://ionicframework.com/docs/api/service/$ionicModal/)
header bar.

#### items
* Type: Array
* A list of items that is bound to the select.

#### value
* Type: Array or Object
* The currently selected item. If [mult-select](#multi-select) is set to true, an array is returned containg a list of all the values, otherwise a single value is returned.

#### icon-property
* Type: String
* Default: "icon"
* The name of the property that is used to display a custom icon for each item.

#### value-property
* Type: String
* Default: "id"
* The name of the property that is to be returned by [value](#value).

#### text-property
* Type: String
* Default: "text"
* The name of the property that is used to provide the text in the list.

#### allow-empty
* Type: Boolean
* Default: true
* A flag that specifies whether no item is allowed to be selected. If this is set to false, the first item in the list will be used if none is selected.

#### multi-select
* Type: Boolean
* Default: false
* A flag that specifies is multiple items can be selected.

#### text
* Type: String
* The text used when no items are selected

#### modal-template-url
* Type: URL
* An optional URL that can be used to customise the look and feel of the [Modal](http://ionicframework.com/docs/api/service/$ionicModal/)

#### template-url
* Type: URL
* An optional URL that can be used to custome the look and feel of fancy-select element.

#### note-text
* Type: String
* An optional note that can be displayed in the default fancy-select element.

#### note-img
* Type: URL
* An optional image that can be displayed in the default fancy-select element.

#### not-img-class
* Type: CSS class
* An optional list of CSS classes that can be used to customise the [note-img](#note-img) in the default fancy-select element.

### Callback attributes

#### value-changed
* Parameters: value - The currently selected value or list of values
* Raised when the current value changes.

#### get-custom-text
* Parameters: value - The currently selected value or list of values
* Returns: String
* This call back can be used to provide a custom text value, based on the values provided. For example, if the list of selected values is the same length as the list of items, then the method can be used to return the text "All items", rather than the concatenated list of items.
