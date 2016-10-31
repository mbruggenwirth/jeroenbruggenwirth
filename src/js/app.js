$ = require('jquery');
_ = require('lodash');
imagesLoaded = require('imagesloaded');
require('gsap');

{
    var Slider = function(el){
        const slider = this.slider = document.getElementById('slider');

        if (slider) {
            const container = this.container = document.getElementById('slider').querySelector('.slider__container');
            const items = this.items = Array.from(slider.querySelectorAll('.slider__item'));
            const self = this;
            const begin = this.begin = 1;
            this.nextBtn = document.querySelector('.slider__nav--next');
            this.prevBtn = document.querySelector('.slider__nav--prev');
            this.current = 0;
            this.sliderOffset = 0;

            console.log(items.length);
            if( items.length <= 1 ){
                document.querySelector('.slider__navigation').classList += ' hidden';
            }

            imagesLoaded( items, function( instance ) {
                self._setHeight();
                self._setWidth();
                self._bindEvents();
                TweenMax.to(slider, .5, { alpha: 1, delay: 1 } );
            });

            window.addEventListener('resize', _.debounce(function(){
                self._setWidth();
                self._setHeight();
            }, 200 ))
        }
    }

    Slider.prototype._bindEvents = function () {
        const self = this;

        this.nextBtn.addEventListener('click', function(){
            self._nextItem();
        })

        this.prevBtn.addEventListener('click', function(){
            self._prevItem();
        })
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

    Slider.prototype._nextItem = function() {
        if(this.current < this.items.length - 1 ){
            const current = document.querySelector('[data-id="'+ this.current +'"]')
            const nextId = this.current + 1;
            const target = document.querySelector('[data-id="'+ nextId +'"]')
            this.sliderOffset = this.sliderOffset + current.offsetWidth;
            TweenMax.to(this.container, .2, { x: -(this.sliderOffset + 20) });

            this.current = nextId;
        }
    };

    Slider.prototype._prevItem = function() {
        if(this.current > 0 ){
            const current = document.querySelector('[data-id="'+ this.current +'"]')
            const prevId = this.current - 1;
            const target = document.querySelector('[data-id="'+ prevId +'"]')
            this.sliderOffset = this.sliderOffset - current.offsetWidth;
            TweenMax.to(this.container, .2, { x: -(this.sliderOffset + 20) });
            this.current = prevId;
        }
    };

    new Slider('slider');
}

var hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', function(){
    let menu = document.querySelector('.navigation__container');
    this.classList.toggle('is-open');
    menu.classList.toggle('is-open');
})

$('.navigation--has-children > a').click(function(e){
    e.preventDefault();
})
