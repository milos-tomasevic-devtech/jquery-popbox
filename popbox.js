(function(){

    $.fn.popbox = function(options){
        var settings = $.extend({
            selector      : this.selector,
            open          : '.open',
            box           : '.box',
            arrow         : '.arrow',
            arrow_border  : '.arrow-border',
            close         : '.close'
        }, options);

        var methods = {
            open: function(event){
                event.preventDefault();

                var pop = $(this);
                var box = $(this).parent().find(settings['box']);

                box.find(settings['arrow']).css({'left': box.width()/2 - 10});
                box.find(settings['arrow_border']).css({'left': box.width()/2 - 10});

                if(box.css('display') == 'block'){
                    methods.close();
                } else {
                    box.css({'display': 'block', 'top': 10, 'left': ((pop.parent().width()/2) -box.width()/2 )});
                }
            },

            close: function(){
                $(settings['box']).fadeOut( 2600, "linear");
            }
        };

        $(document).bind('keyup', function(event){
            if(event.keyCode == 27){
                methods.close();
            }
        });



        return this.each(function(){
            $(this).css({'width': $(settings['box']).width()}); // Width needs to be set otherwise popbox will not move when window resized.
            $(settings['open'], this).mouseover(methods.open);
            $('.box').mouseleave(function(event) {
                if($('.box').is(":visible")) {
                    event.preventDefault();
                    setTimeout(methods.close, 2000);

                }
            });

        });


    }

}).call(this);