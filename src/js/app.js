$ = require('jquery');
_ = require('lodash');
imagesLoaded = require('imagesloaded');
require('gsap');

{
    var Slider = function(el){
        const slider = this.slider = document.getElementById('slider');
        const self = this;
        if (slider) {
            this.init();
        }

        window.addEventListener('resize', _.debounce(function(){
            self.init();
        }, 200 ))
    }

    Slider.prototype.init = function() {
        const slider = this.container = document.getElementById('slider');
        const flexMainHeight = document.querySelector('.flex-main ').offsetHeight;
        const container = this.container = slider.querySelector('.slider__container');
        const items = this.items = Array.from(slider.querySelectorAll('.slider__item'));
        const self = this;
        const begin = this.begin = 1;

        document.querySelector('.project').classList.remove('is-loading');

        this.sliderHeight = flexMainHeight;
        this.nextBtn = document.querySelector('.slider__nav--next');
        this.prevBtn = document.querySelector('.slider__nav--prev');
        this.current = 0;
        this.sliderOffset = 0;

        if( items.length < 2 ){
            document.querySelector('.slider__navigation').classList.add('hidden');
        }

        var imgLoad = imagesLoaded( items );

        imgLoad.on('done', function(){
            self._setHeight();
            self._setWidth();
            self._bindEvents();
            TweenMax.to(slider, .5, { alpha: 1, delay: 1 } );
        })
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
            img.style.height = this.sliderHeight + "px";
            img.style.width = "auto";

            console.log(img.offsetWidth, this.container.offsetWidth);
            if(img.offsetWidth > this.container.offsetWidth){
                img.style.height = "auto";
                img.style.width = (this.container.offsetWidth - 50) + "px";
            }
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
            console.log(current);
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
