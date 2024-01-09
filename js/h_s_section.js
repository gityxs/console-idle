let h_prices = {
	h1: 0,
	h2: 0,
	h3: 0,
	h4: 0,
	h5: 0,
	h6: 0,
	h7: 0,
	h8: 0,
	h9: 0,
	h10: 0,
	h11: 0,
	h12: 0
},
new_s_num = 0,
new_s_anim = [];

//set all hardwares when starting game
function set_hardware_menu_items() {
	Game.impermanent.hardware_in_list.forEach(function(item, index) {
		let img_id,
		multi_nam;
		switch(item) {
			case "h1":
				img_id = "keyboard"
				multi_nam = "keyboard_Mode"
				break
			case "h2":
				img_id = "mouse"
				multi_nam = "mouse_Mode"
				break
			case "h3":
				img_id = "chair"
				multi_nam = "chair_Mode"
				break
			case "h4":
				img_id = "desk"
				multi_nam = "desk_Mode"
				break
			case "h5":
				img_id = "monitor"
				multi_nam = "monitor_Mode"
				break
			case "h6":
				img_id = "router"
				multi_nam = "router_Mode"
				break
			case "h7":
				img_id = "pc"
				multi_nam = "pc_Mode"
				break
			case "h8":
				img_id = "solar_power"
				multi_nam = "solar_power_Mode"
				break
			case "h9":
				img_id = "magnatic_generator"
				multi_nam = "magnetic_generator_Mode"
				break
			case "h10":
				img_id = "radio_tower"
				multi_nam = "radio_tower_Mode"
				break
			case "h11":
				img_id = "radar_dish"
				multi_nam = "radar_dish_Mode"
				break
			case "h12":
				img_id = "satellite"
				multi_nam = "satellite_Mode"
				break
		}
		lvl = 0
		$("#h_items").append("<div id='"+item+"' class='h_s_item' style='filter: brightness(0.6);' data-color='var(--mainClr)'><p id='h_item_"+index+"'' class='h_item_count'>0</p></div>")
		create_svg(0, img_id, item)
		if(Game.permanent[multi_nam] >= 0.6) {
			$("#"+item).css("border-color", "var(--golden)")
			$("#"+item).attr('data-color', "var(--golden)")
			lvl = 104
		}
		else if(Game.permanent[multi_nam] >= 0.5)
			lvl = 103
		else if(Game.permanent[multi_nam] >= 0.4)
			lvl = 102
		else if(Game.permanent[multi_nam] >= 0.3)
			lvl = 101
		else if(Game.permanent[multi_nam] >= 0.2)
			lvl = 100
		else if(Game.permanent[multi_nam] >= 0)
			lvl = 0
		$("#"+item+" > svg").removeClass("lv0_icon")
		$("#"+item+" > svg").addClass("lv"+lvl+"_icon")
		$("#h_item_"+index).text(simplifyNumberSmall(Game.impermanent.hardware_count[item]))
	});
}

function get_hardware_price(item, amount) {
	return Math.ceil((hardwares[item].price*(Math.pow(1.15, Game.impermanent.hardware_count[item]+amount)-1)/0.15)*Game.permanent.hardware_engineering)
}

function set_hardware_prices() {
	for(key in h_prices) {
		h_prices[key] = get_hardware_price(key, h_bundle)
	}
}

//change items brightness
function check_h_item_price() {
	Game.impermanent.hardware_in_list.forEach(function(item) {
		if(Game.impermanent.credit >= h_prices[item]) 
			$("#"+item).css("filter", "brightness(1)")
		else $("#"+item).css("filter", "brightness(0.6)")
	})
}

function check_s_item_price() {
	Game.impermanent.software_in_list.forEach(function(item, index){
		if(Game.impermanent.credit >= softwares[item].price*Game.permanent.software_engineering) $("#"+Game.impermanent.software_in_list[index]).css("filter", "brightness(1)")
		else  $("#"+Game.impermanent.software_in_list[index]).css("filter", "brightness(0.6)")
	})
}

//to set it in info section on main left list
function get_item_info(id){
	let result;
	switch(item_newsel) {
		case "h1":
			result = keyboard_cps
			break
		case "h2":
			result = mouse_cps
			break
		case "h3":
			result = chair_cps
			break
		case "h4":
			result = desk_cps
			break
		case "h5":
			result = monitor_cps
			break;
		case "h6":
			result = router_cps
			break
		case "h7":
			result = pc_cps
			break
		case "h8":
			result = solar_cps
			break
		case "h9":
			result = mag_gen_cps
			break
		case "h10":
			result = radio_tower_cps
			break
		case "h11":
			result = radar_dish_cps
			break
		case "h12":
			result = satellite_cps
			break
		default:
			result = softwares[id].des
	}
	return result;
}

function h_items_hover() {
	$("#item_name").text(hardwares[item_newsel].name)
	$("#item_price").text(simplifyNumber(h_prices[item_newsel]*Game.permanent.hardware_engineering))
	if(Game.impermanent.credit >= h_prices[item_newsel]*Game.permanent.hardware_engineering)
		$("#item_price").css("color", "var(--positiveClr)")
	else 
		$("#item_price").css("color", "var(--negativeClr)")

	let desc = hardwares[item_newsel].des
	item_info = get_item_info()
	desc = desc.replace("/e", simplifyNumber(item_info))
	$("#item_des").html(desc)
	$("#total_cps").text("CPS: "+simplifyNumber(item_info*Game.impermanent.hardware_count[item_newsel]))
	percentage = (item_info*Game.impermanent.hardware_count[item_newsel])/cps*100
	if (isNaN(percentage) || percentage === undefined || percentage === Infinity)
		percentage = 0
	$("#total_cps_per").text("Generating "+simplifyNumber(percentage)+"% of total CPS")

	$("#item_cpu").html(hardwares[item_newsel].cpu*h_bundle+"%")
	$("#item_gpu").html(hardwares[item_newsel].gpu*h_bundle+"%")
	$("#item_ram").html(hardwares[item_newsel].ram*h_bundle+"MB")
	$("#item_heat").html(hardwares[item_newsel].heat*h_bundle+"&#8451;")
}

function hardware_items_click(count_id) {
	if(Game.impermanent.credit >= h_prices[item_newsel]) {
		if(check_ram_space(hardwares[item_newsel].ram, h_bundle)) {
			log("<br> > Installed "+h_bundle+" "+ hardwares[item_newsel].name, "sys")
			decrease_credit(h_prices[item_newsel])
			Game.impermanent.hardware_count[item_newsel] += h_bundle
			h_prices[item_newsel] = get_hardware_price(item_newsel, h_bundle)
			$("#item_price").text(simplifyNumber(h_prices[item_newsel]))
			$("#"+count_id).text(simplifyNumberSmall(Game.impermanent.hardware_count[item_newsel]))
			let txt = hardwares[item_newsel].des,
			item_info = get_item_info();
			txt = txt.replace("/e", simplifyNumber(item_info))
			$("#item_des").html(txt)
			$("#total_cps").text("CPS: +"+simplifyNumber(item_info*Game.impermanent.hardware_count[item_newsel]))
			Game.impermanent.total_hardware = 0
			for(key in Game.impermanent.hardware_count) {
				Game.impermanent.total_hardware += Game.impermanent.hardware_count[key]
			}
			Observer["BUYING_HARDWARE"](item_newsel)
			if(Game.impermanent.credit >= h_prices[item_newsel]) 
				$("#item_price").css("color", "var(--positiveClr)")
			else 
				$("#item_price").css("color", "var(--negativeClr)")
			CalResources()
			update_current_performance()
			check_h_item_price()
			$("#total_cps_per").text("Generating "+simplifyNumber((item_info*Game.impermanent.hardware_count[item_newsel])/cps*100)+"% of total CPS")
		} else log("<br>> "+con_span("Not enough Memory space.", "var(--negativeClr)"), "sys")
	} else log("<br>> "+con_span("Insufficient credit", "var(--negativeClr)"), "sys")
}

function hardware_items_ad(id) {
	Game.impermanent.hardware_count[id]++
	Game.impermanent.total_hardware++
	$("#"+$("#"+id+" > p").attr("id")).text(simplifyNumberSmall(Game.impermanent.hardware_count[id]))
	Observer["BUYING_HARDWARE"](id)
	log("<br> > Installed 1 "+hardwares[id].name, "sys")
}

//unlock_software
function unlock_software(software) {
	//check if it is already unlocked
	if(Game.impermanent.unlocked_software.has(software)) 
		return;

	//if not
	new_s_num++
	new_s_anim.push(software)
	Game.impermanent.unlocked_software.set(software, false)

	//when unlocking new software, sort it by its price
	let isLast = false
	if(Game.impermanent.software_in_list.length == 0) 
		Game.impermanent.software_in_list.push(software)
	else {
		for (const [index, item] of Game.impermanent.software_in_list.entries()) {
	  	if(softwares[item].price > softwares[software].price) {
				Game.impermanent.software_in_list.splice(index, 0 ,software)
				isLast = false
				break
			}
			else isLast = true
		}
	}
	if(isLast) Game.impermanent.software_in_list.push(software)
	set_software_menu_items()
	check_s_item_price()

	if(h_s_nsel != "s_section") {
		$("#new_s").css("display", "flex")
		$("#new_s_text").text(new_s_num)
	}
}

//set items in software menu to be displayed when unlocking new after storing.
function set_software_menu_items() {
	$("#s_items").empty()
	Game.impermanent.software_in_list.forEach((item)=> {
		if(new_s_anim.includes(item)) {
			$("#s_items").append("<div id='"+item+"' class='h_s_item achievements-glow' style='filter: brightness(0.6);'></div>")
		}
		else
			$("#s_items").append("<div id='"+item+"' class='h_s_item' style='filter: brightness(0.6);'></div>")
		create_svg(softwares[item].lvl, softwares[item].img, item)
	})
}

function s_items_hover() {
	$("#item_name").text(softwares[item_newsel].name)
	$("#item_price").text(simplifyNumber(softwares[item_newsel].price*Game.permanent.software_engineering))
	if(Game.impermanent.credit >= softwares[item_newsel].price*Game.permanent.software_engineering)
		$("#item_price").css("color", "var(--positiveClr)")
	else 
		$("#item_price").css("color", "var(--negativeClr)")
	$("#item_des").html(softwares[item_newsel].des)
	$("#total_cps").html("")
	$("#total_cps_per").html("")
	$("#item_cpu").text(softwares[item_newsel].cpu+"%")
	$("#item_gpu").text(softwares[item_newsel].gpu+"%")
	$("#item_ram").text(softwares[item_newsel].ram+"MB")
	$("#item_fan").html(softwares[item_newsel].heat+"&#8451;")
}

function software_items_click() {
	if(Game.impermanent.credit >= softwares[item_newsel].price*Game.permanent.software_engineering) {
		if(check_ram_space(softwares[item_newsel].ram, 1)) {
			Game.impermanent.total_software++
			Game.impermanent.unlocked_software.set(item_newsel, true)
			let index = $.inArray(item_newsel, Game.impermanent.software_in_list)
			Game.impermanent.software_in_list.splice(index, 1)
			set_software_multiplier(item_newsel)
			$("#"+item_newsel).remove()
			if(Game.impermanent.software_in_list.length == 0)
				$("#item_info_card").css("display", "none")
			decrease_credit(softwares[item_newsel].price*Game.permanent.software_engineering)
			log("<br>> Installed "+softwares[item_newsel].name+" update.", "sys")
			Observer["BUYING_SOFTWARE"](item_newsel)
			CalResources()
			update_current_performance()
			check_s_item_price()
		} else log("<br>> "+con_span("Not enough Memory space", "var(--negativeClr)"), "sys")
	} else log("<br>> "+con_span("Insufficient credit", "var(--negativeClr)"), "sys")
}


function auto_install_softwares() {
	installed = false
	while(Game.impermanent.software_in_list.length > 0) {
		item_oldsel = item_newsel
		item_newsel = Game.impermanent.software_in_list[0]
		if(Game.impermanent.credit >= softwares[item_newsel].price*Game.permanent.software_engineering && check_ram_space(softwares[item_newsel].ram, 1)) {
			Game.impermanent.total_software++
			Game.impermanent.unlocked_software.set(item_newsel, true)
			Game.impermanent.software_in_list.splice(0, 1)
			set_software_multiplier(item_newsel)
			$("#"+item_newsel).remove()
			decrease_credit(softwares[item_newsel].price*Game.permanent.software_engineering)
			log("<br>> Installed "+softwares[item_newsel].name+" update.", "sys")
			new_s_num--
			$("#new_s_text").text(new_s_num)
			installed = true
		}
		else
			break
	}
	if(new_s_num <= 0) 
		$("#new_s").css("display", "none")
	if(installed) {
		Observer["BUYING_SOFTWARE"](item_newsel)
		CalResources()
		update_current_performance()
		check_s_item_price()
	}
}

function install_all_softwares() {
	installed = false
	while(Game.impermanent.software_in_list.length > 0) {
		item_oldsel = item_newsel
		item_newsel = Game.impermanent.software_in_list[0]
		if(Game.impermanent.credit >= softwares[item_newsel].price*Game.permanent.software_engineering) {
			if(check_ram_space(softwares[item_newsel].ram, 1)) {
				Game.impermanent.total_software++
				Game.impermanent.unlocked_software.set(item_newsel, true)
				Game.impermanent.software_in_list.splice(0, 1)
				set_software_multiplier(item_newsel)
				$("#"+item_newsel).remove()
				decrease_credit(softwares[item_newsel].price*Game.permanent.software_engineering)
				log("<br>> Installed "+softwares[item_newsel].name+" update.", "sys")
				new_s_num--
				$("#new_s_text").text(new_s_num)
				installed = true
			}
			else {
				log("<br>> "+con_span("Not enough Memory space", "var(--negativeClr)"), "sys")
				break
			}
		}
		else {
			log("<br>> "+con_span("Insufficient credit", "var(--negativeClr)"), "sys")
			break
		}
	}
	if(new_s_num <= 0) 
		$("#new_s").css("display", "none")
	if(installed) {
		Observer["BUYING_SOFTWARE"](item_newsel)
		CalResources()
		update_current_performance()
		check_s_item_price()
	}
}

function get_software_name_parts(str) {
  regex = /s(\d+)(.+)/
  match = regex.exec(str)
  
  if (match && match[1] && match[2]) {
    number = parseInt(match[1])
    characters = match[2]
    return [number, characters]
  }
  
  return null // If no match found
}