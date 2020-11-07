document.getElementById('gaga').addEventListener('click', function(){
    document.getElementById('large-image').innerHTML = '<img src="'+ document.getElementById('link').value +'" class="imgclass" alt="uploaded image"/>';
    $("#link").val("");
    
  });
