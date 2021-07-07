var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if(xhr.readyState === 4) {
		xhr.responseText;
	}
};
xhr.open('GET', 'data/employees.json');
xhr.send();