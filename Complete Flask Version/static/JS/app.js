let currentid ='none'


function submitForm(task) {
  document.getElementById('task').value = task;
  document.getElementById('uploadForm').submit();
}


function direct(url){
  document.location=url
}



function handleClick(id) {
  task = id;
  document.getElementById('task').value = task;
  document.getElementById('uploadForm').submit();
}

function handleClick2(id) {
  task = id;
  document.getElementById('task').value = task;
  let a = document.getElementById('temp').value;
  document.getElementById('factor').value = a;
  document.getElementById('uploadForm').submit();
}

function handleClick3(id) {
  task = id;
  document.getElementById('task').value = task;
  let a = document.getElementById('temp2').value;
  let b = document.getElementById('temp3').value;
  let c = document.getElementById('temp4').value;
  
  document.getElementById('textt').value = a;
  document.getElementById('n1').value = b;
  document.getElementById('n2').value = c;
  document.getElementById('uploadForm').submit();
}




function change(torem , toadd){
  document.getElementById(torem).classList.add('none')
  document.getElementById(toadd).classList.remove('none')
}