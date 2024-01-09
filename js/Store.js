var old_store_page = "hq",
new_store_page = "hq",
dl_div = 1;

/*this needs to be redisgned, seperate the number of time x time bought, and its effect
  doing this will allow me to reset all effects or recalculate safly if needed

  When working on it... you need to consider current live save files to migrate to new system!
*/
function reset_all_ol_multi() {
	//online store multis
	Game.impermanent.ol_keyboard_multi = 1
	Game.impermanent.ol_mouse_multi = 1
	Game.impermanent.ol_chair_multi = 1
	Game.impermanent.ol_desk_multi = 1
	Game.impermanent.ol_monitor_multi = 1
	Game.impermanent.ol_router_multi = 1
	Game.impermanent.ol_pc_multi = 1
	Game.impermanent.ol_solar_multi = 1
	Game.impermanent.ol_mag_gen_multi = 1
	Game.impermanent.ol_radio_tower_multi = 1
	Game.impermanent.ol_radar_dish_multi = 1
	Game.impermanent.ol_satellite_multi = 1
	Game.impermanent.ol_click_multi = 1
	Game.impermanent.ol_click_mode_multi = 1
	Game.impermanent.ol_computing_multi = 1
	Game.impermanent.ol_frequency_multi = 1
	Game.impermanent.ol_and_gate_multi = 1
	Game.impermanent.ol_or_gate_multi = 1
	Game.impermanent.ol_not_gate_multi = 1
	Game.impermanent.ol_nand_gate_multi = 1
	Game.impermanent.ol_nor_gate_multi = 1
	Game.impermanent.ol_xor_gate_multi = 1
	Game.impermanent.ol_nxor_gate_multi = 1
	Game.impermanent.ol_pressing_task_multi = 1
	Game.impermanent.ol_math_task_multi = 1
	Game.impermanent.ol_dps_multi = 1
	Game.impermanent.ol_cps_multi = 0
}

/*every item have 13 level, so random 1-13, then change numbers accordingly
  /e --> effect, "Keyboard +/e% cps" --> "Keyboard +1% cps"
  /i --> image, "keyboard_/i" --> "keyboard_1"
*/
function OnlineStore_items_data(item, r) {
	this.id = ""
	this.lvl = r
	this.name = onlineStore_items_data[item].name
	this.des = onlineStore_items_data[item].des
	this.img = onlineStore_items_data[item].img
	this.multi = onlineStore_items_data[item].multi(r)
	this.price = ranged_random(5000000*Math.pow(1.3, Game.impermanent.ol_purchases_count)*(1+r/10),3500000*Math.pow(1.3, Game.impermanent.ol_purchases_count)*(1+r/10))*Game.permanent.ol_prices_discount*r/10
	this.size_end = ranged_random(524288*Math.pow(1.03,Game.impermanent.ol_purchases_count)*(1+r/9),2097152*Math.pow(1.03,Game.impermanent.ol_purchases_count)*(1+r/9))
	this.size_start = 0
	this.downloaded = false
	this.bought = false
	this.cpu = 0
	this.gpu = 0
	this.ram = 0
	this.heat = 0
	if(this.name === "CPU") this.cpu = onlineStore_items_data[item].multi(r)
	else if(this.name === "GPU") this.gpu = onlineStore_items_data[item].multi(r)
	else if(this.name === "RAM") this.ram = onlineStore_items_data[item].multi(r)
	else if(this.name === "FAN") this.heat = onlineStore_items_data[item].multi(r)
	else {
		this.cpu = Math.round(r/Math.floor(1+Math.random()*4))
		this.gpI = Math.round(r/Math.floor(1+Math.random()*4))
		this.ram = -1 * Math.round(r/Math.floor(2+Math.random()*4))
		this.heat = Math.round(r/Math.floor(1+Math.random()*4))
	}
}

function click_hq_btn() {
	$("#store_info_icon").empty()
	create_svg(0, "credit", "store_info_icon")
	check_hqStore_item_price()
}

function click_ol_btn() {
	$("#store_info").html("Download speed:&nbsp;"+con_span(get_connection_speed_with_symbol(nps),"var(--mainClr)"))
	$("#store_info_icon").empty()
	create_svg(0, "wireframe_globe", "store_info_icon")
	check_onlineStore_item_price()
}

function click_dl_btn() {
	$("#store_info").html("Download speed:&nbsp;"+con_span(get_connection_speed_with_symbol(nps),"var(--mainClr)"))
	$("#store_info_icon").empty()
	create_svg(0, "wireframe_globe", "store_info_icon")
}

function click_ol_details_btn() {
	//just to change the info view into the ol one
	click_dl_btn()
	
	for(key in Game.impermanent.ol) {
		elmId = key.replace(" ", "_")
		eff = preciseNumber(Game.impermanent.ol[key].multi, 1, "-", 3)
		eff = preciseNumber(eff, 100, "*", 0)
		$("#ol_"+elmId+"_eff").text("+"+simplifyNumber(eff)+"%")
		$("#ol_"+elmId+"_cpu").text(simplifyNumber(Game.impermanent.ol[key].cpu)+"%")
		$("#ol_"+elmId+"_gpu").text(simplifyNumber(Game.impermanent.ol[key].gpu)+"%")
		$("#ol_"+elmId+"_ram").text(key == "RAM" ? get_data_with_symbol(Game.impermanent.ol[key].ram*1048576, 3):get_data_with_symbol((-1*Game.impermanent.ol[key].ram)*1048576, 3))
		$("#ol_"+elmId+"_heat").html(simplifyNumber(Game.impermanent.ol[key].heat)+'<span style="font-size: 100%;">&#8451;</span>')
	}
}

function buy_hq_items(item) {
	if(Game.impermanent.credit >= Game.impermanent.hq_item_price) {
		decrease_credit(Game.impermanent.hq_item_price)
		Game.impermanent.hq_purchases_count += hq_bundle
		Game.permanent.total_hq_purchases_count += hq_bundle
		set_hq_store_item_price(hq_bundle)
		inscrease_hq_itmes_from_store(item)
		check_hqStore_item_price()
		CalResources()
		update_current_performance()
	}
	else
			log("<br>> "+con_span("Insufficient credit", "var(--negativeClr)"), "sys")
}

function buy_ol_item(index) {
	if(Game.impermanent.credit >= Game.impermanent.ol_items[index].price) {
		if(!Game.impermanent.ol_items[index].bought) {
			Game.impermanent.ol_items[index].bought = true
			Game.impermanent.dl_items.push(Game.impermanent.ol_items[index])
			Game.impermanent.ol_items[index].id = Game.impermanent.ol_purchases_count
			cal_dl_div()
			sort_dl_list()
			$("#ol_i"+index).css("filter", "brightness(0.6)")
			decrease_credit(Game.impermanent.ol_items[index].price)
			Game.impermanent.ol_purchases_count++
			Game.permanent.total_ol_purchases_count++
			log("<br>> Transaction completed, Downloading "+Game.impermanent.ol_items[index].name+".", "sys")
			Observer["BUYING_OL_ITEM"]()
		}
		else
			log("<br>> Item already bought", "sys")
	}
	else
		log("<br>> "+con_span("Insufficient credit", "var(--negativeClr)"), "sys")
}

function set_hq_store_item_price(amount) {
	Game.impermanent.hq_item_price = Math.floor((10000*(Math.pow(1.155,Game.impermanent.hq_purchases_count+amount)-1)/0.155)*Game.permanent.hq_prices_discount)
}

function inscrease_hq_itmes_from_store(item) {
	if(item == "CPU") {
		Game.impermanent.hq_cpu += hq_bundle
		hq_cpu_inc = Game.impermanent.hq_cpu*(10+Game.permanent.resources)
		log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Improved System CPU by "+((10+Game.permanent.resources)*hq_bundle)+"%", "hq")
	}
	else if(item == "GPU") {
		Game.impermanent.hq_gpu += hq_bundle;
		hq_gpu_inc = Game.impermanent.hq_gpu*(10+Game.permanent.resources)
		log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Improved System GPU by "+((10+Game.permanent.resources)*hq_bundle)+"%", "hq")
	}
	else if(item == "RAM") {
		Game.impermanent.hq_ram += hq_bundle
		hq_ram_inc = Game.impermanent.hq_ram*(8+Game.permanent.resources)
		log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Extened System RAM by "+((8+Game.permanent.resources)*hq_bundle)+"MB", "hq")
	}
	else {
		Game.impermanent.hq_heat += hq_bundle
		hq_heat_inc = Game.impermanent.hq_heat*(10+Game.permanent.resources)
		log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Increased System cooling by "+((10+Game.permanent.resources)*hq_bundle)+"<span style='font-size: 12px;'>&#8451;</span>", "hq")
		if(Game.impermanent.hq_heat >= 3) {
			Events["BUYING_3FAN"]()
		}
	}
}

function inscrease_hq_itmes_from_ad(item) {
	if(item == "CPU") {
		Game.impermanent.hq_cpu += 1
		hq_cpu_inc = Game.impermanent.hq_cpu*(10+Game.permanent.resources)
		log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Improved System CPU by "+(10+Game.permanent.resources)+"%", "hq")
	}
	else if(item == "GPU") {
		Game.impermanent.hq_gpu += 1;
		hq_gpu_inc = Game.impermanent.hq_gpu*(10+Game.permanent.resources)
		log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Improved System GPU by "+(10+Game.permanent.resources)+"%", "hq")
	}
	else if(item == "RAM") {
		Game.impermanent.hq_ram += 1
		hq_ram_inc = Game.impermanent.hq_ram*(8+Game.permanent.resources)
		log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Extened System RAM by "+(8+Game.permanent.resources)+"MB", "hq")
	}
	else {
		Game.impermanent.hq_heat += 1
		hq_heat_inc = Game.impermanent.hq_heat*(10+Game.permanent.resources)
		log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Increased System cooling by "+(10+Game.permanent.resources)+"<span style='font-size: 12px;'>&#8451;</span>", "hq")
	}
}

//generate Online store items
function generate_onlineStore_items() {
	//set locked views
	set_onlineStore_locked_items()
	for(let i = 0; i <= Game.impermanent.ol_items_limit; i++) {
		//r will determaint the type of the item generated below
		let r = weightedRandom(13,1),
		create = false,
		rI = 0;

		//this part to make sure that locked hardwares are not shown in ol store
		while(!create) {
			rI = ranged_random(ol_keys.length-1, 0)
			if(rI == 25 || rI == 26 || rI == 28 || rI == 29 || rI == 30) {
				name = onlineStore_items_data[ol_keys[rI]].name
				switch(name) {
					case "Solar power":
						name = "h8"
						break
					case "Generator":
						name = "h9"
						break
					case "Radio tower":
						name = "h10"
						break
					case "Radar dish":
						name = "h11"
						break
					case "Satellite":
						name = "h12"
						break
				}
				if(Game.impermanent.hardware_in_list.includes(name)) 
					create = true
			}
			else
					create = true
		}

		//pick random one
		let rItem = new OnlineStore_items_data(ol_keys[rI], r)

		$("#ol_i"+i).removeClass("store-items-card-dis")
		rItem.des = rItem.des.replace("/e", rItem.multi)
		$("#ol_img_"+i+" > svg").remove()
		create_svg(r, rItem.img, "ol_img_"+i)
		$("#ol_name"+i).text(rItem.name)
		$("#ol_price"+i).html(simplifyNumber(rItem.price))
		$("#ol_effect"+i).html(rItem.des)
		$("#ol_size"+i).html(get_data_with_symbol(rItem.size_end, 3))
		Game.impermanent.ol_items[i] = rItem
		//set info display
		$("#ol_cpu"+i).text(rItem.cpu+"%")
		$("#ol_gpu"+i).text(rItem.gpu+"%")
		$("#ol_ram"+i).text(rItem.ram+"MB")
		$("#ol_fan"+i).html(rItem.heat+"&#8451;")
	}
	check_onlineStore_item_price()
}

//set online store items locked display when achieving router goals or less.
function set_onlineStore_locked_items() {
	Game.impermanent.ol_items_limit=2+Math.floor(Game.impermanent.hardware_count.h6/50)
	if(Game.impermanent.ol_items_limit >= 7)
		Game.impermanent.ol_items_limit = 7
	for(let i = 0; i < 8; i++) {
		if(i <= Game.impermanent.ol_items_limit) {
			$("#ol_il"+i).css("display", "none")
			$("#ol_is"+i).css("display", "flex")
			$("#ol_i"+i).css("border", "1px solid var(--mainClr)")
		}
		else {
			$("#ol_il"+i).css("display", "flex")
			$("#ol_is"+i).css("display", "none")
			$("#ol_i"+i).css({
				border: "1px solid gray", 
			});
			$("#ol_i"+i).removeClass("store-items-card-dis")
			//clear card
			$("#ol_img_"+i+" > svg").remove()
			$("#ol_seller"+i).html("")
			$("#ol_price"+i).html("")
			$("#ol_size"+i).html("")
			$("#ol_name"+i).text("")
			$("#ol_effect"+i).html("")
			$("#ol_cpu"+i).text("")
			$("#ol_gpu"+i).text("")
			$("#ol_ram"+i).text("")
			$("#ol_fan"+i).html("")
		}
	}
	Game.impermanent.ol_items.splice(Game.impermanent.ol_items_limit+1, 8-Game.impermanent.ol_items_limit)
}

//set their views in online store menu when starting game
function set_onlineStore_items() {
	//set locked views
	set_onlineStore_locked_items()
	for(let i = 0; i < Game.impermanent.ol_items.length; i++) {
		rItem = Game.impermanent.ol_items[i]
		$("#ol_img_"+i+" > svg").remove()
		create_svg(rItem.lvl, rItem.img, "ol_img_"+i)
		$("#ol_name"+i).text(rItem.name)
		$("#ol_price"+i).html(simplifyNumber(rItem.price))
		$("#ol_effect"+i).html(rItem.des)
		$("#ol_size"+i).html(get_data_with_symbol(rItem.size_end, 3))
		if(Game.impermanent.ol_items[i].bought == true) 
			$("#ol_i"+i).css("filter", "brightness(0.6)")
		//set info display
		$("#ol_cpu"+i).text(rItem.cpu+"%")
		$("#ol_gpu"+i).text(rItem.gpu+"%")
		$("#ol_ram"+i).text(rItem.ram+"MB")
		$("#ol_fan"+i).html(rItem.heat+"&#8451;")
	}
}

//set HQ current effects when starting game
function set_hqStore_items() {
	$("#hq_CPU_e_t").text("+"+((10+Game.permanent.resources)*hq_bundle)+"% System CPU")
	$("#hq_CPU_ce_t").text(((10+Game.permanent.resources)*hq_bundle)+"%")

	$("#hq_GPU_e_t").text("+"+((10+Game.permanent.resources)*hq_bundle)+"% System GPU")
	$("#hq_GPU_ge_t").text(((10+Game.permanent.resources)*hq_bundle)+"%")

	$("#hq_RAM_e_t").text("+"+((8+Game.permanent.resources)*hq_bundle)+"MB System Ram")
	$("#hq_RAM_re_t").text(((8+Game.permanent.resources)*hq_bundle)+"MB")

	$("#hq_FAN_e_t").html("+"+((10+Game.permanent.resources)*hq_bundle)+"<span style='font-size: 12px;'>&#8451;</span> System cooling")
	$("#hq_FAN_fe_t").html(((10+Game.permanent.resources)*hq_bundle)+"&#8451;")
}

//change price text color in online store if credit less than price
function check_onlineStore_item_price() {
	for(i = 0; i<=Game.impermanent.ol_items_limit; i++) {
		if(Game.impermanent.ol_items[i] == undefined || Game.impermanent.ol_items[i].bought)
			return;
		else if(Game.impermanent.credit >= Game.impermanent.ol_items[i].price) {
			$("#ol_price"+i).css("color", "var(--positiveClr)")
			$("#ol_i"+i).css("filter", "brightness(1)")
		}
		else {
			$("#ol_price"+i).css("color", "var(--negativeClr)")
			$("#ol_i"+i).css("filter", "brightness(0.6)")
		}
	}
}

//change price text color in HQ store if credit less than price
function check_hqStore_item_price() {
	if(Game.impermanent.credit >= Game.impermanent.hq_item_price) {
		simplifyNumber(Game.impermanent.hq_item_price)
		$("#store_info").html("Item Price:&nbsp;"+con_span(simplifyNumber(Game.impermanent.hq_item_price),"var(--positiveClr)"))
		$("#hq_items_ul > .store_items_card").css("filter", "brightness(1)")
	}
	else {
		$("#store_info").html("Item Price:&nbsp;"+con_span(simplifyNumber(Game.impermanent.hq_item_price),"var(--negativeClr)"))
		$("#hq_items_ul > .store_items_card").css("filter", "brightness(0.6)")
	}
}

function sort_dl_list() {
	Game.impermanent.dl_items.sort((a, b) => {
    sizeA = (a.size_end-a.size_start)/nps/dl_div/8
    sizeB = (b.size_end-b.size_start)/nps/dl_div/8

    return sizeA - sizeB
	})

	$("#dl_items_list").empty()
	Game.impermanent.dl_items.forEach((item)=> {
		$("#dl_items_list").append('<li id="dl_item'+item.id+'" class="store_items_card_dl"><div id="svg_dl_item'+item.id+'" class="store_items_card_img_dl"></div><div class="store_dl_section"><p>'+item.name+'.exe</p><div class="store_dl_bar"><div id="dl_bar_value'+item.id+'" class="store_dl_bar-value"></div></div><p id="'+"dl_t_i"+item.id+'" class="store_dl_text">Speed ... (0/'+get_data_with_symbol(item.size_end, 3)+'), estemated time ...s</p></div></li>')
		create_svg(item.lvl, item.img, "svg_dl_item"+item.id)
	})
}

//when game start set dl view from game save
function set_dl_items() {
	Game.impermanent.dl_items.forEach((item)=> {
		$("#dl_items_list").append('<li id="dl_item'+item.id+'" class="store_items_card_dl"><div id="svg_dl_item'+item.id+'" class="store_items_card_img_dl"></div><div class="store_dl_section"><p>'+item.name+'.exe</p><div class="store_dl_bar"><div id="dl_bar_value'+item.id+'" class="store_dl_bar-value"></div></div><p id="'+"dl_t_i"+item.id+'" class="store_dl_text">Speed ... (0/'+get_data_with_symbol(item.size_end, 3)+'), estemated time ...s</p></div></li>')
		create_svg(item.lvl, item.img, "svg_dl_item"+item.id)
		$("#dl_bar_value"+item.id).css("width", parseInt(item.size_start/item.size_end*100)+"%")
	})
	cal_dl_div()
}

function cal_dl_div() {
	dl_div = 0;
	Game.impermanent.dl_items.forEach((item, index)=> {
		if(item.downloaded == false) {
			dl_div++
		}
	})
}

function add_downloaded_item(item) {
	if(check_ram_space(item.ram, 1)) {
		if(item.name === "CPU" || item.name === "GPU" || item.name === "RAM" || item.name === "FAN") {
			Game.impermanent.ol[item.name].cpu += item.cpu
			Game.impermanent.ol[item.name].gpu += item.gpu
			Game.impermanent.ol[item.name].ram += item.ram
			Game.impermanent.ol[item.name].heat += item.heat
			Game.impermanent.ol_cpu_inc += item.cpu
			Game.impermanent.ol_gpu_inc += item.gpu
			Game.impermanent.ol_ram_inc += item.ram
			Game.impermanent.ol_heat_inc += item.heat
		}
		else {
			Game.impermanent.ol[item.name].multi = preciseNumber(Game.impermanent.ol[item.name].multi, 1+item.multi/100, "*", 3)
			Game.impermanent.ol[item.name].cpu += item.cpu
			Game.impermanent.ol[item.name].gpu += item.gpu
			Game.impermanent.ol[item.name].ram += item.ram
			Game.impermanent.ol[item.name].heat += item.heat
			Game.impermanent.ol_cpu_con += item.cpu
			Game.impermanent.ol_gpu_con += item.gpu
			Game.impermanent.ol_ram_con += item.ram
			Game.impermanent.ol_heat_con += item.heat
		}
		item.downloaded = true
		$("#dl_item"+item.id).remove()
		Game.impermanent.dl_items.splice(i, 1)
		cal_dl_div()
		sort_dl_list()
		log("<br>> Download complated, "+item.name+" installed successfully.", "sys")
		CalResources()
		update_current_performance()
	} 
	else {
		item.downloaded = true;
		$("#dl_t_i"+item.id).text("Download complated. Can't instal, not enugh RAM space, need "+item.ram*(-1)+"MB.");
	}
}

function cal_dl_items() {
	for(i = 0; i < Game.impermanent.dl_items.length; i++) {
		item = Game.impermanent.dl_items[i]
		if(item.size_start>=item.size_end) {
			add_downloaded_item(item)
			i--
		}
		else {
			item.size_start += nps/dl_div/8;
			if(item.size_start >= item.size_end) item.size_start = item.size_end
			$("#dl_t_i"+item.id).text('Speed '+get_data_with_symbol(nps/dl_div/8, 3)+
				' ('+get_data_with_symbol(item.size_start, 3)+'/'+get_data_with_symbol(item.size_end, 3)+
				'), estemated time '+formatTime(Math.floor((item.size_end-item.size_start)/(nps/dl_div/8))))
			$("#dl_bar_value"+item.id).css("width", parseInt(item.size_start/item.size_end*100)+"%")
		}
	}
}

function cal_store_after_idle(time) {
	//cal dl list
	for(i = 0; i < Game.impermanent.dl_items.length; i++) {
		item = Game.impermanent.dl_items[i]
		item.size_start += (nps/dl_div/8)*time
		if(item.size_start >= item.size_end) {
			add_downloaded_item(item)
			i--
		}
		else {
			$("#dl_t_i"+item.id).text('Speed '+get_data_with_symbol(nps/dl_div/8, 3)+
				' ('+get_data_with_symbol(item.size_start, 3)+'/'+get_data_with_symbol(item.size_end, 3)+
				'), estemated time '+formatTime(Math.floor((item.size_end-item.size_start)/(nps/dl_div/8))))
			$("#dl_bar_value"+item.id).css("width", parseInt(item.size_start/item.size_end*100)+"%")
		}
	}

	if(Game.impermanent.online_store_cycle - time < 0) {
		generate_onlineStore_items()
		if(time%(600-Game.permanent.ol_timer_reduce) > 0)
			Game.impermanent.online_store_cycle = 600-Game.permanent.ol_timer_reduce-(time%(600-Game.permanent.ol_timer_reduce))
		else
			Game.impermanent.online_store_cycle -= time
	}
}

onlineStore_items_data = {
	os_00001: {
		name: "CPU",
		des: "+/e% System CPU",
		img: "cpu",
		multi: function(r) {return (10+r+Game.permanent.resources)}, 
	},
	os_00002: {
		name: "GPU",
		des: "+/e% System GPU",
		img: "gpu",
		multi: function(r) {return (10+r+Game.permanent.resources)},
	},
	os_00003: {
		name: "RAM",
		des: "+/eMB System RAM",
		img: "ram",
		multi: function(r) {return (10+r+Game.permanent.resources)},
	},
	os_00004: {
		name: "FAN",
		des: "+/e&#8451 system Cooling",
		img: "fan",
		multi: function(r) {return (10+r+Game.permanent.resources)},
	},
	os_00005: {
		name: "Keyboard",
		des: "Generate +/e% more",
		img: "keyboard",
		multi: function(r) {return r*12},
	},
	os_00006: {
		name: "Mouse",
		des: "Generate +/e% more",
		img: "mouse",
		multi: function(r) {return r*11},
	},
	os_00007: {
		name: "Chair",
		des: "Generate +/e% more",
		img: "chair",
		multi: function(r) {return r*10},
	},
	os_00008: {
		name: "Desk",
		des: "Generate +/e% more",
		img: "desk",
		multi: function(r) {return r*9},
	},
	os_00009: {
		name: "Monitor",
		des: "Generate +/e% more",
		img: "monitor",
		multi: function(r) {return r*8},
	},
	os_00010: {
		name: "Router",
		des: "Generate +/e% more",
		img: "router",
		multi: function(r) {return r*7},
	},
	os_00011: {
		name: "PC",
		des: "Generate +/e% more",
		img: "pc",
		multi: function(r) {return r*6},
	},
	os_00012: {
		name: "Computing",
		des: "Increase effect by +/e%",
		img: "computing",
		multi: function(r) {return r*9},
	},
	os_00013: {
		name: "Frequency",
		des: "Increase effect by +/e%",
		img: "frequency",
		multi: function(r) {return r*8},
	},
	os_00014: {
		name: "AND Gate",
		des: "Increase effect by +/e%",
		img: "and_gate",
		multi: function(r) {return r*7},
	},
	os_00015: {
		name: "OR Gate",
		des: "Increase effect by +/e%",
		img: "or_gate",
		multi: function(r) {return r*6},
	},
	os_00016: {
		name: "NOT Gate",
		des: "Increase effect by +/e%",
		img: "not_gate",
		multi: function(r) {return r*5},
	},
	os_00017: {
		name: "NAND Gate",
		des: "Increase effect by +/e%",
		img: "nand_gate",
		multi: function(r) {return r*4},
	},
	os_00018: {
		name: "NOR Gate",
		des: "Increase effect by +/e%",
		img: "nor_gate",
		multi: function(r) {return r*3},
	},
	os_00019: {
		name: "XOR Gate",
		des: "Increase effect by +/e%",
		img: "xor_gate",
		multi: function(r) {return r*2},
	},
	os_00020: {
		name: "NXOR Gate",
		des: "Increase effect by +/e%",
		img: "nxor_gate",
		multi: function(r) {return r},
	},
	os_00021: {
		name: "Click",
		des: "Generate +/e% more",
		img: "click",
		multi: function(r) {return r*3},
	},
	os_00022: {
		name: "Click mode",
		des: "Increase effect by +/e%",
		img: "cursor",
		multi: function(r) {return r*3},
	},
	os_00023: {
		name: "Pressing",
		des: "Gain +/e% more rewareds",
		img: "pressing",
		multi: function(r) {return r*4},
	},
	os_00024: {
		name: "Add",
		des: "Gain +/e% more rewareds",
		img: "calculator",
		multi: function(r) {return r*4},
	},
	os_00025: {
		name: "Data",
		des: "Increase Total DPS by +/e%",
		img: "data",
		multi: function(r) {return r*5},
	},
	os_00026: {
		name: "Solar power",
		des: "Generate +/e% more",
		img: "solar_power",
		multi: function(r) {return r*5},
	},
	os_00027: {
		name: "Generator",
		des: "Generate +/e% more",
		img: "magnatic_generator",
		multi: function(r) {return r*4},
	},
	os_00028: {
		name: "Credit",
		des: "Increase Total CPS by +/e%",
		img: "credit",
		multi: function(r) {return r*3},
	},
	os_00029: {
		name: "Radio tower",
		des: "Generate +/e% more",
		img: "radio_tower",
		multi: function(r) {return r*3},
	},
	os_00030: {
		name: "Radar dish",
		des: "Generate +/e% more",
		img: "radar_dish",
		multi: function(r) {return r*2},
	},
	os_00031: {
		name: "Satellite",
		des: "Generate +/e% more",
		img: "satellite",
		multi: function(r) {return r},
	},
	os_00032: {
		name: "Sequence",
		des: "Gain +/e% more rewareds",
		img: "sequence",
		multi: function(r) {return r*3},
	},
	os_00033: {
		name: "Filtering",
		des: "Increase effect by +/e%",
		img: "histogram",
		multi: function(r) {return r*3},
	},
	os_00034: {
		name: "Analysis",
		des: "Increase effect by +/e%",
		img: "pie_chart",
		multi: function(r) {return r*2},
	},
	os_00035: {
		name: "Sorting",
		des: "Increase effect by +/e%",
		img: "sort",
		multi: function(r) {return r},
	}
}

ol_keys = Object.keys(onlineStore_items_data);