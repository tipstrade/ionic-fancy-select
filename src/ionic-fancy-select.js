/*jslint white: true */
/*global angular */

(function () { // To stop JSHint/JSLint whing
"use strict";

angular.module("ionic-fancy-select", ["ionic"])

.directive("fancySelect", function($ionicModal) {
  return {
    // Only use as <fancy-select> tag
    restrict: "E",

    /* The default template
     * this uses the default "id" and "text" properties
     */
    template: function(element, attrs) {
      if (attrs.templateUrl) {
        return "<div ng-include='" + attrs.templateUrl + "'></div>";
      } else {
        return '<ion-list> <ion-item ng-click=showItems($event)> {{text}} <span class=item-note>{{noteText}} <img class={{noteImgClass}} ng-if="noteImg != null" src="{{noteImg}}"/> </span> </ion-item> </ion-list>';
      }
    },

    // The default attribute set
    scope: {
      items: "=",
      value: "="
    },

    // Hook up the directive
    link: function(scope, element, attrs) {
      // Default values
      scope.multiSelect = attrs.multiSelect === 'true' ? true : false;
      scope.allowEmpty = attrs.allowEmpty === 'false' ? false : true;

      // Header used in ion-header-bar
      scope.headerText = attrs.headerText || '';

      // Text displayed on label
      scope.text = attrs.text || '';
      scope.defaultText = attrs.text || '';

      // Data binding properties
      scope.checkedProperty = attrs.checkedProperty || "checked";
      scope.iconProperty = attrs.iconProperty || "icon";
      scope.textProperty = attrs.textProperty || "text";
      scope.valueProperty = attrs.valueProperty || "id";

      // The modal properties
      scope.modalTemplateUrl = attrs.modalTemplateUrl;
      scope.modalAnimation = attrs.modalAnimation;
      
      // Note properties
      scope.noteImg = attrs.noteImg || "";
      scope.noteText = attrs.noteText || "";
      scope.noteImgClass = attrs.noteImgClass || "";

      /* Initialise the modal
       * If a modal template URL has been provided, then use that,
       * otherwise use the default one, that uses the
       * "id" and "text" properties
       */
      if (scope.modalTemplateUrl) {
        $ionicModal.fromTemplateUrl(
          scope.modalTemplateUrl,
          {
            scope: scope,
            animation: scope.modalAnimation
          }
        ).then(function(modal) {
          scope.modal = modal;
        });

      } else {
        scope.modal = $ionicModal.fromTemplate(
          '<ion-modal-view> <ion-header-bar class=bar-positive> <button class="button button-positive button-icon ion-ios-arrow-back" ng-click="hideItems()"/> <h1 class=title>{{headerText}}</h1> <button class="button button-positive button-icon ion-checkmark" ng-click="validate()"/> </ion-header-bar> <ion-content> <ion-list> <ion-toggle class=item ng-checked=item.checked ng-if=multiSelect ng-model=item.checked ng-repeat="item in items"> <img alt={{item.text}} class=fancy-select-icon ng-if="item.icon != null" src="{{item.icon}}"/> {{item.text}} </ion-toggle> <label class=item ng-click=validate(item) ng-if=!multiSelect ng-repeat="item in items"> <img alt={{item.text}} class=fancy-select-icon ng-if="item.icon != null" src="{{item.icon}}"/> {{item.text}} </label>  </ion-list></ion-content> </ion-modal-view>',
          {
            scope: scope,
            animation: scope.modalAnimation
          }
        );
      }

      /* When the scope is destroyed, remove the modal */
      scope.$on("$destroy", function() {
        scope.modal.remove();
      });

      // Hides the list
      scope.hideItems = function(event) {
        scope.modal.hide();
      };

      // Shows the list
      scope.showItems = function(event) {
        event.preventDefault(); // Prevent the event from bubbling
        scope.modal.show();
      };

      // Validates the current list
      scope.validate = function(item) {
        if (scope.multiSelect) {
          // Need to scan the list for selected items and push them into the value list
          scope.text = "";
          scope.value = [];

          if (scope.items) {
            angular.forEach(scope.items, function(item, key) {
              if (item[scope.checkedProperty]) {
                scope.text += (scope.text.length === 0 ? "" : ", ") + item[scope.textProperty];
                scope.value[scope.value.length] = item;
              }
            });
          }

        } else {
          // Just use the current item
          scope.text = item[scope.textProperty];
          scope.value = item[scope.valueProperty];

        }

        // If no item has been selected yet
        if (!scope.value) {
          // If a value is required, items are required too
          if (!scope.allowEmpty && scope.items && scope.items.length) {
            var first = scope.items[0];

            scope.value = first;
            scope.text = first[scope.textProperty];

            // So the checked field is set
            if (scope.multiSelect) {
              first[scope.checkedProperty] = true;
            }

          } else {
            scope.text = scope.defaultText;

          }
        }

        scope.hideItems();
      };
    }
  };
})

;
}());
