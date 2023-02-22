
   
  
$( document ).ready(function() {
  //login
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');
  if(signUpButton){
  signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
  });
}
if(signInButton){
  signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
  });
}
  //end

    const button = document.querySelector('.menu__button');
    const menu = document.querySelector('.menu__body');
    const close = document.querySelector('.menu__header button');
    const overlay = document.querySelector('.menu__overlay');
    
    function showMenu() {
      button.setAttribute('hidden', '');
      menu.removeAttribute('hidden');
      overlay.removeAttribute('hidden');
    };
    
    function hideMenu() {
      menu.setAttribute('hidden', '');
      overlay.setAttribute('hidden', '');
      button.removeAttribute('hidden');
    };
    
    button.addEventListener('click', showMenu);
    close.addEventListener('click', hideMenu);
    overlay.addEventListener('click', hideMenu);

});

$(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
    //onclick search
    var searchIcon = document.querySelector('.fa-searchs');
    var searchBox = document.querySelector('.search-box');

    searchIcon.addEventListener('click', () => {
    searchBox.classList.toggle('show-search');
    });
    //end onclick
    //brand heder
    
    //end brand header
});
$(document).ready(function() {
    $('.notification-container').hide();
    $('.cart-container').hide();
    $('.notification-btn').click(function(e) {
           e.stopPropagation();
      $('.notification-container').show();
    });
    $('.cart-btn').click(function(e) {
        e.stopPropagation();
   $('.cart-container').show();
 });
    $(document).click(function() {
      $('.notification-container').hide(500);
      $('.cart-container').hide(500);
    });
  });
  
document.addEventListener('DOMContentLoaded', function () {
    var modeSwitch = document.querySelector('.mode-switch');
  if(modeSwitch){
    modeSwitch.addEventListener('click', function () {                    
     document.documentElement.classList.toggle('dark');
      modeSwitch.classList.toggle('active');
    });
  }
    /*
    var listView = document.querySelector('.list-view');
    var gridView = document.querySelector('.grid-view');
    var projectsList = document.querySelector('.project-boxes');
    if (listView) {
    listView.addEventListener('click', function () {
      gridView.classList.remove('active');
      listView.classList.add('active');
      projectsList.classList.remove('jsGridView');
      projectsList.classList.add('jsListView');
    });
}
if (gridView) {
    gridView.addEventListener('click', function () {
      gridView.classList.add('active');
      listView.classList.remove('active');
      projectsList.classList.remove('jsListView');
      projectsList.classList.add('jsGridView');
    });
}
if (document.querySelector('.messages-btn')) {
    document.querySelector('.messages-btn').addEventListener('click', function () {
      document.querySelector('.messages-section').classList.add('show');
    });
}
if (document.querySelector('.messages-close')) {
    document.querySelector('.messages-close').addEventListener('click', function() {
      document.querySelector('.messages-section').classList.remove('show');
    });
}
*/
  });
  