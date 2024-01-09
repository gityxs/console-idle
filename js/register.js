let selected_File = "",
oldselected_File = "",
console_idle = {},
confirm_del = false,
imported_file = "";

function reset_latplayed() {
	for (let savefile in console_idle) {
		value = console_idle[savefile]
		$("#lastp"+savefile).html(formatTime((new Date().getTime()-value.permanent.file_last_time_played)/1000))
	}
}


//after 0.9.9.9 version, read from console_idle obejct, but check it is exist or not
//for old players who plyed 0.9.9.9 and before to migerate to new save location
function create_savefile_row() {
	$("#login_table_body").empty()
	var table_body = $("#login_table_body")

	if (localStorage.getItem("console_idle") !== null) {
		console_idle = JSON.parse(localStorage.getItem("console_idle"))

		for (let savefile in console_idle) {
			value = console_idle[savefile]
			//Create a new row
			row = $("<tr>")
			row.attr("id", savefile)
			row.addClass("login_tr")
			table_body.append(row)

			// Add the key and value to the row
			row.append($("<td>").addClass("login_td").html(savefile))
			row.append($("<td id='lastp"+savefile+"'>").addClass("login_td").html(formatTime((new Date().getTime()-value.permanent.file_last_time_played)/1000)))
			row.append($("<td>").addClass("login_td").html(value.permanent.file_creation_date))
		}
	}
	//for 0.9.9.9 and older, if yes, first read from it, then create console_idle
	//and move to it for next time
	else {
		// Loop through all the keys in localStorage
		for (var i = 0; i < localStorage.length; i++) {
			key = localStorage.key(i)
			try {
				value = JSON.parse(localStorage.getItem(key))

				if (!key.includes("File")) {
					localStorage.removeItem(key)
					key = generate_savefile_name()
					value.permanent.file_name = key
					value.permanent.file_creation_date = generate_savefile_creation_date()
					value.permanent.file_last_time_played = new Date().getTime()
					localStorage.setItem(key, JSON.stringify(value))
				}
				else if(key.includes("File")) {
					console_idle[key] = deepCopy(value)
					//Create a new row
					row = $("<tr")
					row.attr("id", key)
					table_body.append(row)

					// Add the key and value to the row
					row.append($("<td>").html(key))
					row.append($("<td id='lastp"+key+"'>").html(formatTime((new Date().getTime()-value.permanent.file_last_time_played)/1000)))
					row.append($("<td>").html(value.permanent.file_creation_date))
				}
			} 
			catch (error) {
			    console.log(error)
			}
		}
		//set new creared console_idle to localstorage, now in the next game start
		//save file are read from console_idle object, and should never enter this block again
		localStorage.setItem("console_idle", JSON.stringify(console_idle))
	}
  	
	if(imported_file != "") {
		$("#"+imported_file).css("box-shadow", "inset 0px 0px 20px var(--golden)")
		imported_file = ""
	}

	//hover hardware items
	$(".login_tr").off("click").on("click", function() {
		cancel_delete()
		if(oldselected_File == "") {
			oldselected_File = this.id
			selected_File = this.id
		}
		else{
			oldselected_File = selected_File
			selected_File = this.id
		}
		$("#"+oldselected_File).css("box-shadow", "")
		$("#"+selected_File).css("box-shadow", "inset 0px 0px 20px var(--selectClr)")

		$("#main_menu_log").text("Selected File: "+selected_File)
		$("#main_menu_log").css("color", "var(--positiveClr)")
	});

	$(".login_tr").off("dblclick").on("dblclick", function() {
		logIn()
	});
}

function generate_savefile_name() {
	date = new Date()
	day = date.getDate().toString().padStart(2, '0')
	month = (date.getMonth() + 1).toString().padStart(2, '0')
	year = date.getFullYear().toString()
	hour = date.getHours().toString().padStart(2, '0')
	minute = date.getMinutes().toString().padStart(2, '0')
	second = date.getSeconds().toString().padStart(2, '0')
	filename = "File" + day + month + year + hour + minute + second
	return filename
}

function generate_savefile_creation_date() {
	date = new Date()
	day = date.getDate().toString().padStart(2, '0')
	month = (date.getMonth() + 1).toString().padStart(2, '0')
	year = date.getFullYear().toString()
	hour = date.getHours().toString().padStart(2, '0')
	minute = date.getMinutes().toString().padStart(2, '0')
	second = date.getSeconds().toString().padStart(2, '0')
	creationDate = + month+"/"+day+"/"+year
	return creationDate
}

//login
function logIn() {
	//get saved game data on local machine
	if(selected_File == "") {
		$("#main_menu_log").text("Select a File")
		$("#main_menu_log").css("color", "var(--negativeClr)")
	}
	else {
		Game = JSON.parse(localStorage.getItem("console_idle"))[selected_File]
		Game.impermanent.unlocked_software = new Map(JSON.parse(Game.impermanent.unlocked_software))
		//check if game is updated
		if(VERSION !== Game.VERSION) {
			update_save_file()
			Game.permanent.show_updates = true
		}
		log("<br>> Welcome back Agent.", "sys")
		start_game()
		if(Game.permanent.show_updates) {
			$("#update_menu").css("display", "block")
			Game.permanent.show_updates = false
		}
	}
}

//new_game >> make key in localstorage
function new_game() {
	//disable all buttons to prevent multie new games, or other bugs!
	$("#new_game_btn").off("click")
	$("#login_btn").off("click")
	$("#import_btn").off("click")
	$("#new_game_btn").css("filter" , "brightness(0.6)")
	$("#login_btn").css("filter" , "brightness(0.6)")
	$("#import_btn").css("filter" , "brightness(0.6)")

	$("#main_menu_log").html("Registering new user into the <span style='color: var(--gaiaClr);'>G.A.I.A</span> Network, Please wait...")
	setTimeout(function() {
		Game.permanent.file_creation_date = generate_savefile_creation_date()
		Game.permanent.file_last_time_played = new Date().getTime()
		Game.permanent.file_name = generate_savefile_name()
		log("> Registration complate, Welcome Agent.", "sys")
		start_game()
		//reset_contribution_rewards()
		//make sure save file is saved after regestering
		UpdateSave()
		Events["NEW_ACC0"]()
		Events["NEW_ACC1"]()
		//regenerate rows to include new save file
		create_savefile_row()
	}, 5000);
}

//save update localstorage key (Game.permanent.file_name)
function UpdateSave() {
	log("<br>> saving...", "sys")
    Game.impermanent.unlocked_software = JSON.stringify(Array.from(Game.impermanent.unlocked_software.entries()))
	Game.permanent.file_last_time_played = new Date().getTime()
	console_idle[Game.permanent.file_name] = deepCopy(Game)
	localStorage.setItem("console_idle", JSON.stringify(console_idle))
	Game.impermanent.unlocked_software = new Map(JSON.parse(Game.impermanent.unlocked_software))
	log("<br>> Save complete.", "sys")
}

//show login view when pressing login button
function showlogInView() {
	$("#Welcome").css("display", "none")
	$("#login").css("display", "flex")
	if(selected_File == "")
		$("#main_menu_log").text("Select a File")
	else
		$("#main_menu_log").text("Selected File: "+selected_File)
}

//show register view when pressing register button
function showImportView() {
	$("#Welcome").css("display", "none")
	$("#import").css("display", "flex")
	$("#main_menu_log").text("Importing...")
}

function show_Welcome_view() {
	$("#Welcome").css("display", "flex")
	$("#register").css('display', 'none')
	$("#login").css("display", "none")
	$("#import").css('display', 'none')
	$("#main_menu_log").text("Welcome")
	$("#main_menu_log").css("color", "var(--mainClr)")
	cancel_delete()
}