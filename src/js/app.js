_ = require('lodash');
imagesLoaded = require('imagesloaded');
require('gsap');

{
    var Slider = function(el){
        const slider = this.slider = document.getElementById('slider');
        const container = this.container = document.getElementById('slider').querySelector('.slider__container');
        const items = this.items = Array.from(slider.querySelectorAll('.slider__item'));
        const self = this;
        const begin = this.begin = 1;

        imagesLoaded( items, function( instance ) {
            self._setWidth();
            self._setHeight();
            self._bindEvents();
            TweenMax.to(slider, .5, { alpha: 1, delay: 1 } );
        });

        window.addEventListener('resize', _.debounce(function(){
            self._setWidth();
            self._setHeight();
        }, 200 ))
    }

    Slider.prototype._bindEvents = function () {
        const self = this;
        this.items.forEach(function(item, key) {
            item.addEventListener('click', function(){
                self._nextItem(this);
            })
          }, this);
    };

    Slider.prototype._setWidth = function () {
        this.container.style.width = (this.items.map( items => items.offsetWidth ).reduce(( width, container ) => width + container, 0) + 40 ) + "px";
    };

    Slider.prototype._setHeight = function () {
        this.items.forEach(function(item, key) {
            let img = item.querySelector('img');
            img.style.height = this.slider.offsetHeight + "px";
        }, this);
    }

    Slider.prototype._nextItem = function( el) {
        document.querySelector('.is-current').classList.remove('is-current');
        const margin = ((window.innerWidth / 100) * 2);
        const id = el.dataset.id;
        const width = el.offsetWidth;

        var move = width - margin;
        if( id == 1 ) {
            var move = width - 100;
        }
        el.className += ' is-current';
        TweenMax.to(this.container, .2, { x: -( move * (el.dataset.id )) });
    };

    new Slider('slider');
}
