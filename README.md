# AngularJS with Material Design Example

## Links
[AngularJS website](http://angularjs.org)    
[Angular Material website](https://material.angularjs.org)    
[Icons](https://www.google.com/design/icons)    
[Many TodoMVC samples](http://todomvc.com)    

## Possible implementation improvements

1. All dependencies (JS, CSS, etc) should be combined, minified and loaded with minimum requests from some CDN 
   (using RequireJS + Gulp / Grunt, for example)
   
2. Products directive implementation should encapsulate not just presentation of products list (view), but also should call some 
products service to validate, store & retrive available products (such service should be created in addition to existed storage service,
which is used currently only to store / load whole products list into / from the browser localStorage). In addition some actions, e.g. remove product should 
also be implemented inside directive itself and not call parent controller action (this improvement will make directive more reuseble)

3. The way how product delete icon used is not really material design way...

4. It might be good idea to wrap products list into some 'material' list with build-in scrolling (with touch on mobiles),
still not clear how to handle that exactly with Angular material so I leave it as is
  
5. App has "delete" product form list feature, but no edit product feature (which obviously nice to have and "easy" to make, see TodoMVC samples)

6. There is no "Add" button in the product input box. According to material design principles there is 'Done' button when you enter something in the input field 
which will make sure data is submited (on mobile). In the browser it's just more easy to type text and hit Enter button (especially if it's single line of text, not multi-line input),
so again no "Add" button required.   

7. Pie chart code is modified and adapted to AngularJS version from http://bl.ocks.org/Guerino1/2295263