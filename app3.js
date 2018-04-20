document.addEventListener('DOMContentLoaded', () => {
	const body = document.querySelector('body');
	const form = document.getElementById('sizePicker');
	const table = document.getElementById('pixelCanvas');
	const tableHtml = JSON.parse(localStorage.getItem('savedTable'));


/* ================== Create the grid ================================ */

	function makeGrid() {
		const gridRows = document.querySelector('#inputHeight').value;
		const gridCols = document.querySelector('#inputWidth').value;

		while (table.firstChild) {
			table.removeChild(table.firstChild);
		}

		/*
		for (let r = 0; r < gridRows; r++) {
			const tr = document.createElement('tr');
			table.appendChild(tr);
			for (let c = 0; c < gridCols; c++) {
				const td = document.createElement('td');
				tr.appendChild(td);
			}
		}
		*/
		for (let r = 0; r < gridRows; r++) {
			const tr = table.insertRow()
			for (let c = 0; c < gridCols; c++) {
				const td = tr.insertCell()
			}
		}

		// save the updates to the storage 
		saveToStorage();
	}


/* ================== Save and retrieve from localStorage ======================== */

	function saveToStorage() {
		const saved = table.innerHTML;
		localStorage.setItem('savedTable', JSON.stringify(saved));
	}	

	function addHtml() {
		table.innerHTML = tableHtml;
	}

	addHtml();

/* ================== Events section ================================ */
	// ceate the grid on from submit
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		makeGrid();
	});

	const tbody = document.querySelector('tbody');
	// clear the grid
	const clearbutton = document.querySelector('#clearGrid');
	const cells = document.getElementsByTagName('td');
	clearbutton.addEventListener('click', ()=> {
		Array.from(cells).forEach(cell => {cell.style.backgroundColor = "transparent"});
		tbody.style.backgroundColor = "transparent";
		saveToStorage();
	});

	// color the canvas background
	const gridBackground = document.querySelector('#gridBackground');
	gridBackground.addEventListener('click', () => {
		const color = document.getElementById('colorPicker').value;
		tbody.style.backgroundColor = color;
		table.style.backgroundColor = color;
		saveToStorage();
	});

	// coloring the cells on the user click
	table.addEventListener('click', (e) => {
		const color = document.getElementById('colorPicker').value;
		if(e.target.tagName === 'TD'){
			e.target.style.backgroundColor = color;
		}
		saveToStorage();
	});

	// clear the cell color on dblclick or right mouse click
	table.addEventListener('dblclick', (e) => {
		if(e.target.tagName === 'TD'){
			e.target.style.backgroundColor = 'transparent';
		}
		saveToStorage();
	});
	table.addEventListener('mousedown', (e) => {
		if(e.target.tagName === 'TD' && e.buttons == '2'){
			e.target.style.backgroundColor = 'transparent';
		}
		saveToStorage();
	});


	// Drag to color
	let isDown = false;
	
	// disable the context menu
	table.addEventListener('contextmenu', (e) => {
		e.preventDefault();
	});

	// color on left_mouse_key drag and clear on right_mouse_drag
	table.addEventListener('mousedown', () => {
		isDown = true;
	});

	table.addEventListener('mouseleave', () => {
		isDown = false;
	});

	table.addEventListener('mouseup', () => {
		isDown = false;
	});

	table.addEventListener('mousemove', (e) => {
		const color = document.getElementById('colorPicker').value;
		if (isDown) {
			if(e.target.tagName === 'TD') {
				if (e.buttons == 1) {
					e.target.style.backgroundColor = color;
				} else {
					e.target.style.backgroundColor = 'transparent';
				}
			}
		}
		saveToStorage();
	});

	

/* =============================================================== */
/* ================== Next featurs =============================== */
/* =============================================================== */

$("#instructions").click(function(){
	//Show the overlay.
	$('#overlay').show();
});
  
$('#overlay').click(function(){
	$('#overlay').hide();
});


// save and restore buttons 
/*
	var saveButton = document.querySelector('#laterSave');
	var restoreButton = document.querySelector('#restore');

	saveButton.addEventListener('click', function(e){
		e.preventDefault();
		const saved = table.innerHTML;
		localStorage.setItem('savedTable1', JSON.stringify(saved));
	});


	restoreButton.addEventListener('click', function(e){
		e.preventDefault();
		const html =JSON.parse(localStorage.getItem('savedTable1'));
		table.innerHTML = html;
	});

*/

}); // Last line closing the DOMContentLoaded