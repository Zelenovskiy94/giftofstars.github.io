'use strict'

const particles = document.querySelector('#particles-js')
// animation background
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 355,
      "density": {
        "enable": true,
        "value_area": 789.1476416322727
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.7,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 0.2,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 10,
        "size_min": 0,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 4,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 83.91608391608392,
        "size": 4,
        "duration": 3,
        "opacity": 1,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

// animation end
  let btnAnimation = document.querySelector('.off-on-animation')
  function isAnimationStars() {
          if(btnAnimation.classList.contains('active-animation')) {
              particles.style.display  = 'block';
              console.log('on', particles)
          } else {
            particles.style.display  = 'none'
            console.log('off', particles)
          }
  }isAnimationStars()
    btnAnimation.addEventListener('click', function (e) {
          btnAnimation.classList.toggle('active-animation');
          isAnimationStars()
    })


const body = document.querySelector('body')
const aboutBlock = document.querySelector('.about')
function scrollTo(from, to, f) {
let a = document.getElementById(to);
let b = document.getElementById(from);
return function(event){
  if(b.contains(event.target)){
  a.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
  f()
  }
}
}
document.addEventListener('click', scrollTo('to-bottom', 'about-block', setCurtains),false)

//   if(pageYOffset == 0){
//     body.style.overflow = 'hidden';
//   }
// window.addEventListener('scroll', function() {
//   if(pageYOffset == 0){
//     body.style.overflow = 'hidden';
//   } else {
//     body.style.overflow = 'auto'
//   }
// });

function setCurtains() {
  let curtainsTop = document.querySelector('.curtains-top')
  let curtainsBot = document.querySelector('.curtains-bottom')
  let img = document.querySelector('.about img')
  let aboutDesc = document.querySelector('.about_desc')
    setTimeout(function () {
    curtainsTop.style.transform = 'rotate(20deg) translateX(250px) translateY(-350px)'
    curtainsBot.style.transform = 'rotate(20deg) translateX(-200px) translateY(450px)'
    img.style.transform = 'scale(1)'
    img.style.opacity = '0.9'
    aboutDesc.style.transform = 'translateX(0)'
    aboutDesc.style.opacity = '1'
    }, 300)
    setTimeout(function () {
        curtainsBot.style.transform = 'rotate(20deg) translateX(-200px) translateY(280px)'
        curtainsBot.style.zIndex = '-1'
        curtainsTop.style.zIndex = '-1'
      
    }, 1350)
};

let isSetCurtains = false
$(window).scroll(function(){
  var wt = $(window).scrollTop();
  var wh = $(window).height();
  var et = $('.about').offset().top;
  var eh = $('.about').outerHeight();
  var dh = $(document).height();   
  if (wt + wh >= et || wh + wt == dh || eh + et < wh){
    if(!isSetCurtains){
      setCurtains()
      isSetCurtains = true
    }
    
  }
});

let isShowHowItWorkBlock = false
$(window).scroll(function(){
  var wt = $(window).scrollTop();
  var wh = $(window).height();
  var et = $('.how-it-work').offset().top;
  var eh = $('.how-it-work').outerHeight();
  var dh = $(document).height();   
  if (wt + wh >= et || wh + wt == dh || eh + et < wh){
    if(!isShowHowItWorkBlock){
      showHowItWorkBlock(0)
      isShowHowItWorkBlock = true;
    }
  }
});

function showHowItWorkBlock(i){
  let li = document.querySelectorAll('.how-it-work ul li')
  if(i == li.length) {
    return
  }
  setTimeout(function(){
    li[i].style.opacity = '1';
    showHowItWorkBlock(i+1);
  }, 300)
}


baguetteBox.run('.gallery', {
    animation: 'fadeIn',
    noScrollbars: true
});