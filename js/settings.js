var sys_color_old_btn = "sysgreen",
sys_color_new_btn = "sysgreen";

//to set players settings when game start
function set_up_settings() {
	if(Game.permanent.settings.idle_report)
		$("#toggle_report_idle").text("TURN OFF")
	else
		$("#toggle_report_idle").text("TURN ON")

	if(Game.permanent.auto_block) {
		$("#auto_icons_section").append('<svg id="auto_block_icon" class="lv0_icon"><use xlink:href="#shieldcomb"></use></svg>')
		$("#auto_block_btn").text("TURN OFF")
	}
	else
		$("#auto_block_btn").text("TURN ON")

	if(Game.permanent.auto_install) {
		$("#auto_icons_section").append('<svg id="auto_install_icon" class="lv0_icon"><use xlink:href="#disc"></use></svg>')
		$("#auto_install_btn").text("TURN OFF")
	}
	else
		$("#auto_install_btn").text("TURN ON")

	//set sys color
	change_system_color(Game.permanent.settings.sys_color, "sys"+Game.permanent.settings.sys_color)
}

function toggle_report_idle() {
	if(Game.permanent.settings.idle_report) {
		Game.permanent.settings.idle_report = false
		$("#toggle_report_idle").text("TURN ON")
		log("<br> > Turned off Idle report", "sys")
	}
	else {
		Game.permanent.settings.idle_report = true
		$("#toggle_report_idle").text("TURN OFF")
		log("<br> > Turned on Idle report", "sys")
	}
}

function change_system_color(color, btn) {
	Game.permanent.settings.sys_color = color
	sys_color_old_btn = sys_color_new_btn
	sys_color_new_btn = btn

	$("#"+sys_color_old_btn).css({"border": "1px solid var(--mainClr)", "background-color": ""})
	$("#"+sys_color_new_btn).css({"border": "2px solid var(--selectClr)", "background-color": "var(--secondClr)"})

	if(color == "green") {
    	document.documentElement.style.setProperty("--sys_stroke_clr", "#81ce77")
		document.documentElement.style.setProperty("--sys_fill_clr", "#477547")
		document.documentElement.style.setProperty("--mainBackgroundClr", "#0e2409")
		document.documentElement.style.setProperty("--mainClr", "#6bbd54")
		document.documentElement.style.setProperty("--secondClr", "#213e15")
		document.documentElement.style.setProperty("--backgroundClr", "#133003")
		document.documentElement.style.setProperty("--hoverClr", "#1b5b01")
    	document.documentElement.style.setProperty("--table_head", "#274a26")
		document.documentElement.style.setProperty("--table_stripe", "#051a02")
		document.documentElement.style.setProperty("--selectClr", "#c7c197")
		document.documentElement.style.setProperty("--positiveClr", "#6bbd54")
		document.documentElement.style.setProperty("--negativeClr", "#f44336")
		document.documentElement.style.setProperty("--blockedClr", "#c7c197")
		document.documentElement.style.setProperty("--olRefreshClr", "#a400e6")
		document.documentElement.style.setProperty("--hqClr", "#c8c8c8")
		document.documentElement.style.setProperty("--gaiaClr", "#ed7e07")
		document.documentElement.style.setProperty("--golden", "#FFD700")
		document.documentElement.style.setProperty("--def_curr", "#133003")
		document.documentElement.style.setProperty("--def_solv", "#403604")
		document.documentElement.style.setProperty("--def_fail_high", "#f4433640")
		document.documentElement.style.setProperty("--def_fail_low", "#1f1f1f40")
	}
	else if(color == "red") {
		document.documentElement.style.setProperty("--sys_stroke_clr", "#bb6c6c")
		document.documentElement.style.setProperty("--sys_fill_clr", "#6a1919")
		document.documentElement.style.setProperty("--mainBackgroundClr", "#170000")
		document.documentElement.style.setProperty("--mainClr", "#df4040")
		document.documentElement.style.setProperty("--secondClr", "#702424")
		document.documentElement.style.setProperty("--backgroundClr", "#4d0c07")
		document.documentElement.style.setProperty("--table_head", "#5e1f1f")
		document.documentElement.style.setProperty("--table_stripe", "#372121")
		document.documentElement.style.setProperty("--hoverClr", "#510700")
		document.documentElement.style.setProperty("--selectClr", "#ff99a2")
		document.documentElement.style.setProperty("--positiveClr", "#ff4251")
		document.documentElement.style.setProperty("--negativeClr", "#b3b1b1")
		document.documentElement.style.setProperty("--blockedClr", "#ff99a2")
		document.documentElement.style.setProperty("--olRefreshClr", "#a400e6")
		document.documentElement.style.setProperty("--hqClr", "#c8c8c8")
		document.documentElement.style.setProperty("--gaiaClr", "#ed7e07")
		document.documentElement.style.setProperty("--golden", "#FFD700")
		document.documentElement.style.setProperty("--def_curr", "#380a06")
		document.documentElement.style.setProperty("--def_solv", "#524604")
		document.documentElement.style.setProperty("--def_fail_high", "#b3b1b140")
		document.documentElement.style.setProperty("--def_fail_low", "#1f1f1f40")
	}
	else {
		document.documentElement.style.setProperty("--sys_stroke_clr", "#669ad2")
		document.documentElement.style.setProperty("--sys_fill_clr", "#174a79")
		document.documentElement.style.setProperty("--mainBackgroundClr", "#091524")
		document.documentElement.style.setProperty("--mainClr", "#5496bd")
		document.documentElement.style.setProperty("--secondClr", "#152b3e")
		document.documentElement.style.setProperty("--backgroundClr", "#004e75")
		document.documentElement.style.setProperty("--table_head", "#1f4b66")
		document.documentElement.style.setProperty("--table_stripe", "#003140")
		document.documentElement.style.setProperty("--hoverClr", "#005680")
		document.documentElement.style.setProperty("--selectClr", "#E1F5FE")
		document.documentElement.style.setProperty("--positiveClr", "#5496bd")
		document.documentElement.style.setProperty("--negativeClr", "#F44336")
		document.documentElement.style.setProperty("--blockedClr", "#E1F5FE")
		document.documentElement.style.setProperty("--olRefreshClr", "#a400e6")
		document.documentElement.style.setProperty("--hqClr", "#c8c8c8")
		document.documentElement.style.setProperty("--gaiaClr", "#ed7e07")
		document.documentElement.style.setProperty("--golden", "#FFD700")
		document.documentElement.style.setProperty("--def_curr", "#002a66")
		document.documentElement.style.setProperty("--def_solv", "#524604")
		document.documentElement.style.setProperty("--def_fail_high", "#F4433640")
		document.documentElement.style.setProperty("--def_fail_low", "#1f1f1f40")
	}
}

function export_save_file() {
	$("#export_text").val("")
	Game.impermanent.unlocked_software = JSON.stringify(Array.from(Game.impermanent.unlocked_software))
	text = JSON.stringify(Game)
	Game.impermanent.unlocked_software = new Map(JSON.parse(Game.impermanent.unlocked_software))
	text = obfuscate(text)
  	$("#export_text").val(text)
  	log("<br>> Copy save file from 'Exported save file' text area, and paste it somewhere safe.<br>To play on different computer/browser, paste save file in 'Import' in main menu.<br><span style='color: var(--negativeClr);'>Important: </span>Modifying the data might corrupt/lose some or all the data.", "sys")
}

//Text run for now...
function import_save_file() {
	deobfuscate()
}

// Obfuscation function
function obfuscate(text) {
    text = '@MangoFlavor'+ text
    return btoa(text)
}

// De-obfuscation function
function deobfuscate() {
	text = $("#importData").val()
	//check if text is empty
	if(text == "")
		$("#main_menu_log").html("<span style='color: var(--negativeClr);'>Field is empty, please paste in save file data.</span>")
	else {
		//if not then check it is a valid base64 format
		try {
		    text = atob(text);
			if(text.indexOf("@MangoFlavor") === -1) {
				$("#main_menu_log").html("<span style='color: var(--negativeClr);'>Invalid data, please paste in save file data.</span>")
			}
			else {
				//if true then check if it is a valid JSON format after it was decoded
				text = text.replace('@MangoFlavor', '')
				try {
				  	let game = JSON.parse(text)
				  	//if true then check if it is Game obect
				  	if(game.hasOwnProperty("_V1VCK_")){
				  		name = generate_savefile_name()
				  		game.permanent.file_name = name
				  		game.permanent.file_creation_date = generate_savefile_creation_date()
				  		game.permanent.file_last_time_played = new Date().getTime()
				  		console_idle[name] = deepCopy(game)
				  		localStorage.setItem("console_idle", JSON.stringify(console_idle))
				  		imported_file = name
				  		$("#main_menu_log").html("Imported file: "+con_span(name, "var(--golden)"))
				  		$("#importData").val("")
				  		create_savefile_row()
				  		imported_file = ""
				  	}
				}
				catch (err) {
				  	$("#main_menu_log").html("<span style='color: var(--negativeClr);'>Invalid data, please paste in save file data.</span>")
				}
			}
		}
		catch(err) {
		  	$("#main_menu_log").html("<span style='color: var(--negativeClr);'>Invalid data, please paste in save file data.</span>")
		}
	}
}

function del_save_file() {
	modify_acc = true
	try {
		$("#"+Game.permanent.file_name).remove()
	}
	catch (err) {

	}
	delete console_idle[selected_File]
	localStorage.setItem("console_idle", JSON.stringify(console_idle))
	restart_game(true)
}

function del_savefile_from_mainMenu(argument) {
	if(selected_File == "") {
		$("#main_menu_log").text("No Selected File to delete")
		$("#main_menu_log").css("color", "var(--negativeClr)")
	}
	else if(!confirm_del) {
		confirm_del = true
		$("#del_btn").css({
			"border": "1px solid var(--negativeClr)",
			"color": "var(--negativeClr)"
		})
		$("#del_btn").text("Confirm")
		$("#main_menu_log").text("Are you sure to PERMANENTLY delete "+selected_File+" ?")
	}
	else {
		delete console_idle[selected_File]
		localStorage.setItem("console_idle", JSON.stringify(console_idle))
		selected_File = ""
		oldselected_File = ""
		confirm_del = false
		$("#main_menu_log").text("Select a File")
		cancel_delete()
		create_savefile_row()
	}
}

function cancel_delete() {
	confirm_del = false
	$("#del_btn").css({
		"border": "1px solid var(--mainClr)",
		"color": "var(--mainClr)"
	});
	$("#del_btn").text("Delete")
}

function res_save_file() {
	file_name = Game.permanent.file_name
	file_creation_date = Game.permanent.file_creation_date
	//make sure to remove eff animations before copying, because effects are saved in Game
	for(i = 0; i < Game.impermanent.g_eff.effects.length; i++) {
		remove_view_multi_state(i)
	}
	Game = deepCopy(ORIGINAL_DATA)
	Game.permanent.file_name = file_name
	Game.permanent.file_creation_date = file_creation_date
	restart_game(true)
}

function reset_tutorials() {
	Game.permanent.events.CPU_100 = false
	Game.permanent.events.GPU_100 = false
	Game.permanent.events.RAM_0 = false
	Game.permanent.events.HEAT_0 = false
	Game.permanent.events.HEAT_50 = false
	Game.permanent.events.HEAT_95 = false
	Game.permanent.events.OPEN_FORMAT = false
	Game.permanent.events.OPEN_ACHIEVEMENTS = false
	Game.permanent.events.BOT_WHEREHOUSE = false
	Game.permanent.events.BOT_ASSEMBLE = false
	Game.permanent.events.BOT_PROCEDURE = false
	Game.permanent.events.BOT_PRODUCTION = false
	Game.permanent.events.STORE_HQ = false
	Game.permanent.events.STORE_OL = false
	Game.permanent.events.BUYING_3FAN = false
	Game.permanent.events.IDLE_0 = false

	log("<br>> Reset all pop-up Tutorials messages", "sys")

	setArrayTimeout(function() {
		log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"To generate Credit, use the Clicker program, or complete Tasks", "hq")
		run_tutorial("console")
	}, 3000)
}