let rightbut = document.getElementById('right-btn');
rightbut.addEventListener ('click', function() {
  let ban1 = document.getElementById('ban1');
  let ban2 = document.getElementById('ban2');

  if (ban1.style.display == 'block') {
      ban1.style.display = 'none';
      ban2.style.display = 'block';
    }
})
