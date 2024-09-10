const header = document.querySelector("header");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hamburgerNav =document.querySelector(".hamburger-nav");

function headerClick(){
    hamburgerNav.classList.toggle("active");
    hamburgerBtn.classList.toggle("active");
    header.classList.toggle("active");
}
function headerResize(){
    var windowWidth = window.innerWidth;
    if(windowWidth>=1023){
      hamburgerNav.classList.remove("active");
  }else{
      header.classList.add("active");
  }
}


  
  hamburgerBtn.addEventListener("click", headerClick);
  window.addEventListener("resize", headerResize)