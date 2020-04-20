(() => {

	// Variables are defined here

	const songs = ["stp", "faded", "slimshady", "eminem"];
	var songSelector = document.querySelectorAll("#iconSelect img");
	var iconDisplay = document.querySelector("#icons");
	let resetbutton = document.querySelector("#resetButton");
	let music = document.querySelectorAll("audio");
	let dropZones = document.querySelectorAll(".drop-zone");

	// Functions go here

	function displayVariants (iconIndex) {
		// Display variants of each instrument on the left side
		songs.forEach((song, index) => {
			let songIcon = `<img draggable id="${songs[iconIndex] + index}" class="songVariant" src="images/${songs[iconIndex] + index}.svg" alt="song Variants">`;

			iconDisplay.innerHTML += songIcon; 
		});

		initDrag();
	}

	// Drag and Drop code

	function initDrag() {
		iconDisplay.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e) {

				e.dataTransfer.setData("text/plain", this.id);
			});
		});
	}

	// Drag-Over and Drop functions

	dropZones.forEach(zone => {
		zone.addEventListener("dragover", function(e) {
			e.preventDefault();
		});

		zone.addEventListener("drop", function(e) {
			// Prevents adding multiple instruments to same dropzone
			if (!zone.innerHTML) {
				let song = e.dataTransfer.getData("text/plain");
				e.target.appendChild(document.querySelector(`#${song}`));

				// Adding animation to icons that are in dropzone to indicate they are playing
				let playingsong = zone.querySelector(".songVariant");
				playingsong.classList.add("DiskRotation");

				// Plays audio if the icon dropped has a corresponding audio file with the same id
					let musictool = zone.querySelector('img');
					let musicid = musictool.id;
					let audio = document.querySelector(`audio[data-id="${musicid}"]`);

					// If no audio file is present, a message is logged in the console
					if (!audio) {alert("Oops! This icon does not have audio yet!"); return;}

					audio.loop = true;
					audio.play();
				//end of audio code
			}
			else {
				e.preventDefault();
			}
			});
		});

	function resetVariants() {
		// removes the instrument variants to display new ones
		iconDisplay.innerHTML = "";
		displayVariants(this.dataset.songref);
	};

	function resetplayBoard() {
		dropZones.forEach(zone => {
			zone.innerHTML = "";
		});

		music.forEach(audio => {
			audio.currentTime = 0;
			audio.pause();
		});

		iconDisplay.innerHTML = "";
		displayVariants(0);
	};

	// Event Handling below this

	songSelector.forEach(song => song.addEventListener("click", resetVariants));
	resetbutton.addEventListener("click", resetplayBoard)

	displayVariants(0);

})();