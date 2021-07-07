var isHere = new XMLHttpRequest();
isHere.onreadystatechange = function() {
	if(isHere.readyState === 4) {
		var employees = JSON.parse(isHere.responseText);
		var statusHTML = '<ul class="bulleted">';
		for (var i = 0; i < employees.length; i++) {
			if (employees[i].inoffice === true) {
				statusHTML += '<li class="in">';
			} else {
				statusHTML += '<li class="out">';
			}
			statusHTML += employees[i].name;
			statusHTML += '</li>';
		}
		statusHTML += '</ul>';
		document.getElementById('employeeList').innerHTML = statusHTML;
	}
};
isHere.open('GET', 'data/employees.json');
isHere.send();

var roomRequest = new XMLHttpRequest();
roomRequest.onreadystatechange = function() {
	if(roomRequest.readyState === 4) {
		var rooms = JSON.parse(roomRequest.responseText);
		var statusHTML = '<ul class="rooms">';
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i].available === true) {
				statusHTML += '<li class="empty">';
			} else {
				statusHTML += '<li class="full">';
			}
			statusHTML += rooms[i].room;
			statusHTML += '</li>';
		}
		statusHTML += '</ul>';
		document.getElementById('roomList').innerHTML = statusHTML;
	}
};
roomRequest.open('GET', 'data/rooms.json');
roomRequest.send();