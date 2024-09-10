const $cursor = document.querySelector('.cursor');
const link = document.querySelectorAll('a');

document.addEventListener('mousemove', function(e) {
  $cursor.style.left = -10 + e.clientX + 'px';
  $cursor.style.top = -10+ e.clientY + 'px';
  $cursor.style.cursor = 'none';
  document.body.style.cursor = 'none';

});

link.forEach( link =>
    link.addEventListener("mouseover",function(){
        $cursor.style.transform = "scale(3)";
    }))
link.forEach( link =>
    link.addEventListener("mouseleave",function(){
        $cursor.style.transform = "scale(1)";
}))