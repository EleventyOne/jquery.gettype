/*
    "gettype" jQuery plugin

    Quick method to help detect a variable's type.

    Dependencies:
    -------------

    * http://jquery.com/

    Methods:
    --------

    $.gettype(obj)

    Returns:
    --------

        Object
        - `.base` is the basic Javascript type ("array","Date","object","NaN","null","number","string","undefined")
        - `.extended` supports user-defined class types, through the `.__class_types[]` array (if present)

    Example:
    --------

        <script src='http://eleventyone.github.io/jquery.gettype/src/jquery.gettype.js'></script>

        var c = new MyClass({name:"EleventyOne",age:99,blob:null});
        console.log($.gettype(c));
        console.log($.gettype(c.name).base);
        console.log($.gettype(c.age).base);
        console.log($.gettype(c.blob).base);
        console.log($.gettype(c.superhero).base);
        
        // PRINTS:
        //
        // Object { base : "object", extended: "MyClass" }
        // string
        // number
        // null
        // undefined

    Notes:
    ------
    
        Source of inspiration: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612

*/

(function($) {

    ///////////////////////////////////////////////////////////////////////
    // Return the type(s) of the object
    ///////////////////////////////////////////////////////////////////////

    $.gettype = function __gettype(obj) {     

        function base(obj) {
            return Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        }

        var r = {};
        var b = base(obj);

        // this returns "number" for NaN, so let's double check that
        // right here.

        if ( b === "number" ) {
            b = ( isNaN(obj) ? "NaN" : "number" );
        }

        // look for extended info in `.__class_types`.

        if ( ( b === "object" ) && ( base(obj.__class_types) === "array" ) && ( obj.__class_types.length ) ) {
            r.extended = obj.__class_types[obj.__class_types.length-1];
        }

        r.base = b;
        return r;
    
    };

}(jQuery));