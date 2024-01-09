let data = 0, pNode, cNode, angle, yPos, xPos, lastID=0, isCreated = false,
temp_format_data_learned = [], temp_used_data = 0, temp_format_cps_multi = 0, h_lvl_pow = 1.45,
responsive_radius = 1, fomat_x_offset = 650, fomat_y_offset = 250;
/*
responsive_radius = 1, responsive_radius = 2, on small screen
each type have for now 10 levels,
h_type_pow = 1.35,
each hardware have two types for now, Mode, Converstoin.
*/

$("#format_menu").on('wheel', function(event){
  if(event.originalEvent.deltaY !== 0){
    if(event.originalEvent.deltaY > 0){
      format_zoom -= 0.1;
		if(format_zoom <= 0.3) format_zoom = 0.3
		$("#nodes_container").css("transform", "scale("+format_zoom+")");
    }
    else {
     	format_zoom += 0.1;
		if(format_zoom >= 1) 
			format_zoom = 1
		$("#nodes_container").css("transform", "scale("+format_zoom+")");
    }
  }
});

function format() {
	isFormatting = true
	//update format_cps_multi
	Game.permanent.format_cps_multi = temp_format_cps_multi/100
	//update total data in last format after calculating new Format CPS bonus
 	Game.permanent.total_data_in_last_format = Game.permanent.total_data
 	Game.permanent.total_formats++
 	temp_format_data_learned.forEach(function(item) {
		Game.permanent.unlocked_format.push(item)
	})
	//increase gaia difficulty
 	Game.permanent.gaia_difficulty++
 	if(Game.permanent.gaia_difficulty > 180)
 		Game.permanent.gaia_difficulty = 180
 	//in case player researshed any, then reloded page, in beforeunload event there is 
 	//increase_data_no_track(temp_used_data), this will make sure player will not
 	//reget his data if he formated.
 	temp_used_data = 0
 	
	restart_game(true)
}

function cancel_format() {
	if(temp_format_data_learned.length > 0) {
		temp_format_data_learned.forEach((id) => {
		$("#"+id).css({
			filter: "brightness(0.5)",
			"box-shadow": "none"
		})
		$("#l"+id).css("filter", "brightness(0.5)")
	})
	temp_format_data_learned = []
	log("<br>> Researches canceled", "sys")
	increase_data_no_track(temp_used_data) 
	temp_used_data = 0
	}	
}

function reset_format_effects() {
	Game.permanent.hibernate_duration = 0
	Game.permanent.offline_credit_multi = 0
	Game.permanent.offline_data_multi = 0
	Game.permanent.offline_materials_multi = 0
	Game.permanent.keyboard_Mode = 0
	Game.permanent.keyboard_conversion = 0
	Game.permanent.mouse_Mode = 0
	Game.permanent.mouse_conversion = 0
	Game.permanent.chair_Mode = 0
	Game.permanent.chair_conversion = 0
	Game.permanent.desk_Mode = 0
	Game.permanent.desk_conversion = 0
	Game.permanent.monitor_Mode = 0
	Game.permanent.monitor_conversion = 0
	Game.permanent.router_Mode = 0
	Game.permanent.router_conversion = 0
	Game.permanent.pc_Mode = 0
	Game.permanent.pc_conversion = 0
	Game.permanent.solar_power_Mode = 0
	Game.permanent.solar_power_conversion = 0
	Game.permanent.magnetic_generator_Mode = 0
	Game.permanent.magnetic_generator_conversion = 0
	Game.permanent.radio_tower_Mode = 0
	Game.permanent.radio_tower_conversion = 0
	Game.permanent.radar_dish_Mode = 0
	Game.permanent.satellite_Mode = 0
	Game.permanent.software_engineering = 1
	Game.permanent.hardware_engineering = 1
	Game.permanent.resources = 0
	Game.permanent.hq_prices_discount = 1
	Game.permanent.ol_prices_discount = 1
	Game.permanent.ol_timer_reduce = 0

	//bot
	Game.permanent.auto_clicker_max_energy = 5
	Game.permanent.network_listener_max_energy = 5
	Game.permanent.auto_pressing_max_energy = 5
	Game.permanent.auto_addition_max_energy = 5
	Game.permanent.auto_sequencer_max_energy = 5
	Game.permanent.auto_clicker_base_effect = 10
	Game.permanent.network_listener_base_effect = 0.5
	Game.permanent.auto_pressing_base_effect = 5
	Game.permanent.auto_addition_base_effect = 5
	Game.permanent.auto_sequencer_base_effect = 5
	Game.permanent.scrapping_max_energy = 50
	Game.permanent.recycling_max_energy = 50
	Game.permanent.mining_max_energy = 50
	Game.permanent.cast_max_energy = 50
	Game.permanent.exploring_max_energy = 50
	Game.permanent.scrapping_base_effect = 1
	Game.permanent.recycling_base_effect = 1
	Game.permanent.mining_base_effect = 1
	Game.permanent.cast_base_effect = 1
	Game.permanent.exploring_base_effect = 1
}

function set_format_tree(argument) {
	for(let key in format_data) {
		if(key === "node0") {
			x = $("#nodes_container").outerWidth(true)/2+fomat_x_offset
			y = $("#nodes_container").outerHeight(true)/2+fomat_y_offset
			$("#node0").css({
				top: "calc("+y+"px - 20px)",
				left: "calc("+x+"px - 20px)"
			})
			$("#format_menu").scrollTop(y-$("#format_menu").height()/2)
			$("#format_menu").scrollLeft(x-$("#format_menu").width()/2)
		}
		else
			createNode(format_data[key], key, false)		
	}
}

function setDragScroll() {
	$("#format_menu").on({
		"mousemove": function(e) {
			if (clicked === "format_menu") {
				c_mouseX = e.pageX
		  		c_mouseY = e.pageY
		  		$("#format_menu").scrollTop(s_mouseY-c_mouseY)
		  		$("#format_menu").scrollLeft(s_mouseX-c_mouseX)
			}
		},
		'mousedown': function(e) {
		    clicked = "format_menu"
			s_mouseX = $("#format_menu").scrollLeft()+e.pageX
			s_mouseY = $("#format_menu").scrollTop()+e.pageY
		},
		'mouseup': function(e) {clicked = ""},
		'mouseleave': () => {clicked = ""}
	})
}


function create_nodes_view() {
	if(!isCreated) {
		$("#format_menu").scrollTop(0)
		x = $('#nodes_container').width()/2+fomat_x_offset
		y = $('#nodes_container	').height()/2+fomat_y_offset
		$("#nodes_container").append('<div id="node0" class="node-main node-dis" style="top: calc('+y+'px - 20px); left: calc('+x+'px - 20px);"></div>')
		create_svg(1, "family_tree", "node0")
		for(let key in format_data) {
			createNode(format_data[key], key, true)
		}
		isCreated = true
		$("#format_menu").scrollLeft(x-$("#format_menu").width()/2)
		$("#format_menu").scrollTop(y-$("#format_menu").height()/2)
		set_listeners_to_nodes()
	}
	checK_node_price()
}

function set_format_tree_brightenss() {
	for(let key in format_data) {
		if(Game.permanent.unlocked_format.includes(key)) {
			$("#"+key).css("filter", "brightness(1)")
			$("#l"+key).css("filter", "brightness(1)")
		}
		else {
			$("#"+key).css("filter", "brightness(0.5)")
			$("#l"+key).css("filter", "brightness(0.5)")
		}
	}
}

function createNode(item, child_id, create) {
	if(create) {
		$("#nodes_container").append('<div id="'+child_id+'" class="node node-dis"></div>')
		create_svg(item.lvl, item.img, child_id)
	}
	pNode = $("#"+item.parant_id)
	degree = item.degree
	radius = item.radius
	radians = degree*Math.PI/180	
	cNode = $("#"+child_id)
	yPos = Math.round(pNode.position().top+(radius/responsive_radius)*Math.sin(radians)+((pNode.height()/2)-(cNode.height()/2)))
	xPos = Math.round(pNode.position().left+(radius/responsive_radius)*Math.cos(radians)+((pNode.width()/2)-(cNode.width()/2)))
	cNode.css("top", yPos+"px")
	cNode.css("left", xPos+"px")
	createLine((pNode.position().left+pNode.width()/2), (pNode.position().top+pNode.height()/2), (cNode.position().left+cNode.width()/2), (cNode.position().top+cNode.height()/2), child_id, create)
}

function createLine(x1, y1, x2, y2, child_id, create) {
	if(create) {
		$("#nodes_container").append('<div id="l'+child_id+'" class="line"></div>')
	}
	let x = x1-x2
	let y = y1-y2
	let xMid = Math.round((x1+x2)/2)
	let yMid = Math.round((y1+y2)/2)
	//get distance
	distance = Math.round(Math.sqrt(x*x+y*y))
	//get slope
	slopeInRadian = Math.atan2(y, x)
	slopeInDegree = Math.round(slopeInRadian*180/Math.PI)

	$("#l"+child_id).css("width", distance+"px")
	$("#l"+child_id).css("top", yMid+"px")
	$("#l"+child_id).css("left", xMid-(distance/2)+"px")
	$("#l"+child_id).css("transform", "rotate("+slopeInDegree+"deg)")
}

function unlock_node(id) {
	if(Game.permanent.data >= format_data[id].price) {
		if(id === "node0") {
			if(Game.permanent.unlocked_format.includes(id) || temp_format_data_learned.includes(id)) {
				log("<br>> ["+format_data[id].name+"] already researched", "sys")
			}
			else {
				$("#"+id).css({
					filter: "brightness(1)",
					"box-shadow": "0 0 10px var(--golden)"
				})
				temp_format_data_learned.push(id)
				log("<br>> Researching ["+format_data[id].name+"]", "sys")
				temp_used_data += format_data[id].price
				decrease_data_no_track(format_data[id].price)
			}
		}
		else if(Game.permanent.unlocked_format.includes(id) || temp_format_data_learned.includes(id)) 
			log("<br>> ["+format_data[id].name+"] already researched", "sys")
		else if(Game.permanent.unlocked_format.includes(format_data[id].parant_id) || temp_format_data_learned.includes(format_data[id].parant_id)) {
			$("#"+id).css({
				filter: "brightness(1)",
				"box-shadow": "0 0 10px var(--golden)"
			})
			$("#l"+id).css("filter", "brightness(1)")
			temp_format_data_learned.push(id)
			log("<br>> Researching ["+format_data[id].name+"]", "sys")
			temp_used_data += format_data[id].price
			decrease_data_no_track(format_data[id].price)
		}
		else log("<br>> "+con_span("Previous research is not done yet", "var(--negativeClr)"), "sys")
	}
	else log("<br>> "+con_span("Not enough data to research", "var(--negativeClr)"), "sys")
}

function set_nodes_effects() {
	Game.permanent.unlocked_format.forEach(function(item) {
		format_data[item].effect()
	})
}

//=========================================

function show_format_info_card(e) {
	info_card = $("#format_info_card")

	nospace = false

	info_card.css("display", "flex")
	$("#nodeName").text(format_data[e.currentTarget.id].name)
	$("#nodeDes").html(format_data[e.currentTarget.id].des)
	$("#nodePrice").text(get_data_with_symbol(format_data[e.currentTarget.id].price, 3))
	if(Game.permanent.unlocked_format.includes(e.currentTarget.id))
		$("#nodePrice").css("text-decoration", "line-through")
	else
		$("#nodePrice").css("text-decoration", "none")

	if(format_data[e.currentTarget.id].price <= Game.permanent.data) 
		$("#nodePrice").css("color", "var(--positiveClr)")
	else 
		$("#nodePrice").css("color", "var(--negativeClr)")

	let node = $("#"+e.currentTarget.id),
	format_menu = $("#format_menu"),
	card_top = node.offset().top+node.height()*format_zoom+16,
	card_left = node.offset().left-info_card.width()/2+node.width()*format_zoom/2


	//cal if card will clip off from bottom
	if(card_top+info_card.height() >= format_menu.offset().top+format_menu.height()) {
		card_top = node.offset().top-info_card.height()-16
		if(card_top < format_menu.offset().top) {
			card_top = node.offset().top
			//cal if card will clip off from bottom
			if(card_top+info_card.height() >= format_menu.offset().top+format_menu.height())
				card_top =format_menu.offset().top+format_menu.height()-info_card.height()-16
			nospace = true
		}
	}

	if(nospace) {
		//cal if card will clip off from right
		card_left = node.offset().left+node.width()*format_zoom+16
		if(card_left+info_card.width() >= format_menu.offset().left+format_menu.width()) {
			card_left = node.offset().left-info_card.width()-16
		}
	}
	//cal if card will clip off from right
	else if(card_left <= format_menu.offset().left) {
		card_left = format_menu.offset().left+8
	}
	//cal if card will clip off from left
	else if(card_left+info_card.width() >= format_menu.offset().left+format_menu.width()) {
		card_left = format_menu.offset().left+format_menu.width()-info_card.width()-8
	}
	

	info_card.offset({
		top: card_top,
  	left: card_left
	})

	node.css("border", "2px solid var(--selectClr)")	
}

function checK_node_price() {
	for(key in format_data) {
		if(key.charAt(0) !== "c") {
			if(key === "node0" && Game.permanent.data >= format_data[key].price && !Game.permanent.unlocked_format.includes(key) && !temp_format_data_learned.includes(key)){
				$("#"+key).css("box-shadow", "0 0 15px var(--mainClr)")
			}
			else if(Game.permanent.data >= format_data[key].price && 
				(!Game.permanent.unlocked_format.includes(key) && !temp_format_data_learned.includes(key)) 
					&& (Game.permanent.unlocked_format.includes(format_data[key].parant_id) || temp_format_data_learned.includes(format_data[key].parant_id))) 
				$("#"+key).css("box-shadow", "0 0 15px var(--mainClr)")
			else if(!temp_format_data_learned.includes(key))
				$("#"+key).css("box-shadow", "none")
		}
	}
}

function set_listeners_to_nodes() {
	//=============for main node only===============
	$("#nodes_container").on("mouseenter", ".node-main", function(e) {
	   show_format_info_card(e)
	})

	$("#nodes_container").on("mouseleave", ".node-main", function(e) {
	    $("#format_info_card").css("display", "none")
	    $("#"+e.currentTarget.id).css("border", "1px solid var(--mainClr)")
	})

	$("#nodes_container").on("click", ".node-main", function(e) {
	   unlock_node(this.id)
	})
	//==============================================

	//=============for all nodes===============
	$("#nodes_container").on("mouseenter", ".node", function(e) {
	   show_format_info_card(e)
	})

	$("#nodes_container").on("mouseleave", ".node", function(e) {
	    $("#format_info_card").css("display", "none")
	    $("#"+e.currentTarget.id).css("border", "1px solid var(--mainClr)")
	})

	$("#nodes_container").on("click", ".node", function(e) {
	   unlock_node(this.id)
	})
}


format_data = {
	node0:{
		name: "root:", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Unlock the path to all other research nods", 
		degree: 0,
		price: 5120, //10KB
		effect: ()=> {Game.impermanent.no_effect += 0},
		radius: 0,
		img: "family_tree",
		lvl: 1,
		parant_id: "node0"
	},
	//==============================
	node1:{
		name: "Hibernate 1",
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Allows to generate 50% of your current CPS & DPS & MPM while system is shutdown up to 10 hours", 
		degree: 270,
		price: 15360, //15KB
		effect: ()=> {
			Game.permanent.hibernate_duration += 10 
			Game.permanent.offline_credit_multi = preciseNumber(Game.permanent.offline_credit_multi, 0.5, "+", 1)
			Game.permanent.offline_data_multi = preciseNumber(Game.permanent.offline_data_multi, 0.5, "+", 1)
			Game.permanent.offline_materials_multi = preciseNumber(Game.permanent.offline_materials_multi, 0.5, "+", 1)
			},
		radius: 550,
		img: "power_button",
		lvl: 1,
		parant_id: "node0"
	},
	node2:{
		name: "Hibernate 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Extend hibernate duration up to 12 hours", 
		degree: 202.5,
		price: 20480, //20KB
		effect: ()=> {Game.permanent.hibernate_duration += 4},
		radius: 120,
		img: "power_button",
		lvl: 2,
		parant_id: "node1"
	},
	node3:{
		name: "Hibernate 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Extend hibernate duration up to 14 hours", 
		degree: 270,
		price: 30720, //30KB
		effect: ()=> {Game.permanent.hibernate_duration += 4},
		radius: 65,
		img: "power_button",
		lvl: 3,
		parant_id: "node2"
	},
	node4:{
		name: "Hibernate 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Extend hibernate duration up to 16 hours", 
		degree: 270,
		price: 40960, //40KB
		effect: ()=> {Game.permanent.hibernate_duration += 4},
		radius: 65,
		img: "power_button",
		lvl: 4,
		parant_id: "node3"
	},
	node5:{
		name: "Hibernate 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Extend hibernate duration up to 20 hours", 
		degree: 270,
		price: 61440, //60KB
		effect: ()=> {Game.permanent.hibernate_duration += 4},
		radius: 65,
		img: "power_button",
		lvl: 5,
		parant_id: "node4"
	},
	node6:{
		name: "Hibernate 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Extend hibernate duration up to 1 day", 
		degree: 270,
		price: 102400, //100KB
		effect: ()=> {Game.permanent.hibernate_duration += 4},
		radius: 65,
		img: "power_button",
		lvl: 6,
		parant_id: "node5"
	},
	node7:{
		name: "Hibernate 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Extend hibernate duration up to 2 days", 
		degree: 270,
		price: 2048000, //2MB
		effect: ()=> {Game.permanent.hibernate_duration += 24},
		radius: 65,
		img: "power_button",
		lvl: 7,
		parant_id: "node6"
	},
	node8:{
		name: "Hibernate 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Extend hibernate duration up to 3 days", 
		degree: 270,
		price: 536870912, //512MB
		effect: ()=> {Game.permanent.hibernate_duration += 24},
		radius: 65,
		img: "power_button",
		lvl: 8,
		parant_id: "node7"
	},
	//==============================

	//==============================
	node9:{
		name: "Offline Credit 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase generated credit while system is shutdown to 60% of current CPS", 
		degree: 245,
		price: 23040, //22.25KB
		effect: ()=> {Game.permanent.offline_credit_multi = preciseNumber(Game.permanent.offline_credit_multi, 0.1, "+", 1)},
		radius: 95,
		img: "swipe_card",
		lvl: 1,
		parant_id: "node1"
	},
	node10:{
		name: "Offline Credit 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase generated credit while system is shutdown to 70% of current CPS", 
		degree: 270,
		price: 34560, //33.75KB
		effect: ()=> {Game.permanent.offline_credit_multi = preciseNumber(Game.permanent.offline_credit_multi, 0.1, "+", 1)},
		radius: 65,
		img: "swipe_card",
		lvl: 2,
		parant_id: "node9"
	},
	node11:{
		name: "Offline Credit 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase generated credit while system is shutdown to 75% of current CPS", 
		degree: 270,
		price: 57600, //56.25KB
		effect: ()=> {Game.permanent.offline_credit_multi = preciseNumber(Game.permanent.offline_credit_multi, 0.05, "+", 2)},
		radius: 65,
		img: "swipe_card",
		lvl: 3,
		parant_id: "node10"
	},
	node12:{
		name: "Offline Credit 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase generated credit while system is shutdown to 80% of current CPS", 
		degree: 270,
		price: 115200, //112.5KB
		effect: ()=> {Game.permanent.offline_credit_multi = preciseNumber(Game.permanent.offline_credit_multi, 0.05, "+", 2)},
		radius: 65,
		img: "swipe_card",
		lvl: 4,
		parant_id: "node11"
	},
	node13:{
		name: "Offline Credit 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase generated credit while system is shutdown to 85% of current CPS", 
		degree: 270,
		price: 589824, //576KB
		effect: ()=> {Game.permanent.offline_credit_multi = preciseNumber(Game.permanent.offline_credit_multi, 0.05, "+", 2)},
		radius: 65,
		img: "swipe_card",
		lvl: 5,
		parant_id: "node12"
	},
	node14:{
		name: "Offline Credit 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase generated credit while system is shutdown to 90% of current CPS", 
		degree: 270,
		price: 2359296, //2,304MB
		effect: ()=> {Game.permanent.offline_credit_multi = preciseNumber(Game.permanent.offline_credit_multi, 0.05, "+", 2)},
		radius: 65,
		img: "swipe_card",
		lvl: 6,
		parant_id: "node13"
	},
	node15:{
		name: "Offline Credit 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase generated credit while system is shutdown to 95% of current CPS", 
		degree: 270,
		price: 37748736, //36MB
		effect: ()=> {Game.permanent.offline_credit_multi = preciseNumber(Game.permanent.offline_credit_multi, 0.05, "+", 2)},
		radius: 65,
		img: "swipe_card",
		lvl: 7,
		parant_id: "node14"
	},
	node16:{
		name: "Offline Credit 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase generated credit while system is shutdown to 100% of current CPS", 
		degree: 270,
		price: 75497472, //72MB
		effect: ()=> {Game.permanent.offline_credit_multi = preciseNumber(Game.permanent.offline_credit_multi, 0.05, "+", 2)},
		radius: 65,
		img: "swipe_card",
		lvl: 8,
		parant_id: "node15"
	},
	//==============================

	//==============================
	node17:{
		name: "Offline Data 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Data decoding while system is shutdown to 60% of current DPS", 
		degree: 295,
		price: 23040, //22.5KB
		effect: ()=> {Game.permanent.offline_data_multi = preciseNumber(Game.permanent.offline_data_multi, 0.1, "+", 2)},
		radius: 95,
		img: "unplugged",
		lvl: 1,
		parant_id: "node1"
	},
	node18:{
		name: "Offline Data 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Data decoding while system is shutdown to 70% of current DPS", 
		degree: 270,
		price: 40320, //39.375KB
		effect: ()=> {Game.permanent.offline_data_multi = preciseNumber(Game.permanent.offline_data_multi, 0.1, "+", 2)},
		radius: 65,
		img: "unplugged",
		lvl: 2,
		parant_id: "node17"
	},
	node19:{
		name: "Offline Data 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Data decoding while system is shutdown to 75% of current DPS", 
		degree: 270,
		price: 80640, //78.75KB
		effect: ()=> {Game.permanent.offline_data_multi = preciseNumber(Game.permanent.offline_data_multi, 0.05, "+", 2)},
		radius: 65,
		img: "unplugged",
		lvl: 3,
		parant_id: "node18"
	},
	node20:{
		name: "Offline Data 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Data decoding while system is shutdown to 80% of current DPS", 
		degree: 270,
		price: 172800, //168.75KB
		effect: ()=> {Game.permanent.offline_data_multi = preciseNumber(Game.permanent.offline_data_multi, 0.05, "+", 2)},
		radius: 65,
		img: "unplugged",
		lvl: 4,
		parant_id: "node19"
	},
	node21:{
		name: "Offline Data 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Data decoding while system is shutdown to 85% of current DPS", 
		degree: 270,
		price: 884736, //864KB
		effect: ()=> {Game.permanent.offline_data_multi = preciseNumber(Game.permanent.offline_data_multi, 0.05, "+", 2)},
		radius: 65,
		img: "unplugged",
		lvl: 5,
		parant_id: "node20"
	},
	node22:{
		name: "Offline Data 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Data decoding while system is shutdown to 90% of current DPS", 
		degree: 270,
		price: 3538944, //3.375MB
		effect: ()=> {Game.permanent.offline_data_multi = preciseNumber(Game.permanent.offline_data_multi, 0.05, "+", 2)},
		radius: 65,
		img: "unplugged",
		lvl: 6,
		parant_id: "node21"
	},
	node23:{
		name: "Offline Data 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Data decoding while system is shutdown to 95% of current DPS", 
		degree: 270,
		price: 56623104, //54MB
		effect: ()=> {Game.permanent.offline_data_multi = preciseNumber(Game.permanent.offline_data_multi, 0.05, "+", 2)},
		radius: 65,
		img: "unplugged",
		lvl: 7,
		parant_id: "node22"
	},
	node24:{
		name: "Offline Data 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Data decoding while system is shutdown to 100% of current DPS", 
		degree: 270,
		price: 113246208, //108MB
		effect: ()=> {Game.permanent.offline_data_multi = preciseNumber(Game.permanent.offline_data_multi, 0.05, "+", 2)},
		radius: 65,
		img: "unplugged",
		lvl: 8,
		parant_id: "node23"
	},
	//==============================

	//==============================
	node390:{
		name: "Offline Materials 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Materials production while system is shutdown to 60% of current MPM", 
		degree: 337.5,
		price: 38477, //37.57KB
		effect: ()=> {Game.permanent.offline_materials_multi = preciseNumber(Game.permanent.offline_materials_multi, 0.1, "+", 1)},
		radius: 120,
		img: "foundry_bucket",
		lvl: 1,
		parant_id: "node1"
	},
	node391:{
		name: "Offline Materials 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Materials production while system is shutdown to 70% of current MPM", 
		degree: 270,
		price: 67335, //65.75KB
		effect: ()=> {Game.permanent.offline_materials_multi = preciseNumber(Game.permanent.offline_materials_multi, 0.1, "+", 1)},
		radius: 65,
		img: "foundry_bucket",
		lvl: 2,
		parant_id: "node390"
	},
	node392:{
		name: "Offline Materials 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Materials production while system is shutdown to 75% of current MPM", 
		degree: 270,
		price: 134669, //131.51KB
		effect: ()=> {Game.permanent.offline_materials_multi = preciseNumber(Game.permanent.offline_materials_multi, 0.05, "+", 2)},
		radius: 65,
		img: "foundry_bucket",
		lvl: 3,
		parant_id: "node391"
	},
	node393:{
		name: "Offline Materials 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Materials production while system is shutdown to 80% of current MPM", 
		degree: 270,
		price: 288576, //281.81KB
		effect: ()=> {Game.permanent.offline_materials_multi = preciseNumber(Game.permanent.offline_materials_multi, 0.05, "+", 2)},
		radius: 65,
		img: "foundry_bucket",
		lvl: 4,
		parant_id: "node392"
	},
	node394:{
		name: "Offline Materials 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Materials production while system is shutdown to 85% of current MPM", 
		degree: 270,
		price: 1477510, //1.4MB
		effect: ()=> {Game.permanent.offline_materials_multi = preciseNumber(Game.permanent.offline_materials_multi, 0.05, "+", 2)},
		radius: 65,
		img: "foundry_bucket",
		lvl: 5,
		parant_id: "node393"
	},
	node395:{
		name: "Offline Materials 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Materials production while system is shutdown to 90% of current MPM", 
		degree: 270,
		price: 5910036, //5.63MB
		effect: ()=> {Game.permanent.offline_materials_multi = preciseNumber(Game.permanent.offline_materials_multi, 0.05, "+", 2)},
		radius: 65,
		img: "foundry_bucket",
		lvl: 6,
		parant_id: "node394"
	},
	node396:{
		name: "Offline Materials 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Materials production while system is shutdown to 95% of current MPM", 
		degree: 270,
		price: 94560584, //90.18MB
		effect: ()=> {Game.permanent.offline_materials_multi = preciseNumber(Game.permanent.offline_materials_multi, 0.05, "+", 2)},
		radius: 65,
		img: "foundry_bucket",
		lvl: 7,
		parant_id: "node395"
	},
	node397:{
		name: "Offline Materials 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Materials production while system is shutdown to 100% of current MPM", 
		degree: 270,
		price: 189121167, //180.35MB
		effect: ()=> {Game.permanent.offline_materials_multi = preciseNumber(Game.permanent.offline_materials_multi, 0.05, "+", 2)},
		radius: 65,
		img: "foundry_bucket",
		lvl: 8,
		parant_id: "node396"
	},
	//==============================

	//==============================
	node25:{
		name: "Keyboard Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 1% more for each none keyboard hardware",
		degree: 225,
		price: 9677,
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.01, "+", 3)},
		radius: 300,
		img: "keyboard",
		lvl: 1,
		parant_id: "node0"
	},
	node158:{
		name: "Keyboard conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 1% more for each Chair, and Chair generates 0.2% more for each Keyboard",
		degree: 215,
		price: 13530,
		effect: ()=> {Game.permanent.keyboard_conversion += 1},
		radius: 65,
		img: "keyboard_conv",
		lvl: 1,
		parant_id: "node25"
	},
	node159:{
		name: "Keyboard conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 2% more for each Chair, and Chair generates 0.4% more for each Keyboard",
		degree: 235,
		price: 13530*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.keyboard_conversion += 1},
		radius: 65,
		img: "keyboard_conv",
		lvl: 2,
		parant_id: "node158"
	},
	node160:{
		name: "Keyboard conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 3% more for each Chair, and Chair generates 0.6% more for each Keyboard",
		degree: 270,
		price: 13530*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.keyboard_conversion += 1},
		radius: 65,
		img: "keyboard_conv",
		lvl: 3,
		parant_id: "node159"
	},
	node161:{
		name: "Keyboard conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 4% more for each Chair, and Chair generates 0.8% more for each Keyboard",
		degree: 0,
		price: 13530*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.keyboard_conversion += 1},
		radius: 65,
		img: "keyboard_conv",
		lvl: 4,
		parant_id: "node160"
	},
	node162:{
		name: "Keyboard conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 5% more for each Chair, and Chair generates 1% more for each Keyboard",
		degree: 270,
		price: 13530*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.keyboard_conversion += 1},
		radius: 65,
		img: "keyboard_conv",
		lvl: 5,
		parant_id: "node161"
	},
	node163:{
		name: "Keyboard conversion 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 6% more for each Chair, and Chair generates 1.2% more for each Keyboard",
		degree: 180,
		price: 13530*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.keyboard_conversion += 1},
		radius: 65,
		img: "keyboard_conv",
		lvl: 6,
		parant_id: "node162"
	},
	node164:{
		name: "Keyboard conversion 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 7% more for each Chair, and Chair generates 1.4% more for each Keyboard",
		degree: 270,
		price: 13530*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.keyboard_conversion += 1},
		radius: 65,
		img: "keyboard_conv",
		lvl: 7,
		parant_id: "node163"
	},
	node165:{
		name: "Keyboard conversion 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 8% more for each Chair, and Chair generates 1.6% more for each Keyboard",
		degree: 0,
		price: 13530*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.keyboard_conversion += 1},
		radius: 65,
		img: "keyboard_conv",
		lvl: 8,
		parant_id: "node164"
	},
	node166:{
		name: "Keyboard conversion 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 9% more for each Chair, and Chair generates 1.8% more for each Keyboard",
		degree: 270,
		price: 13530*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.keyboard_conversion += 1},
		radius: 65,
		img: "keyboard_conv",
		lvl: 9,
		parant_id: "node165"
	},
	node167:{
		name: "Keyboard conversion 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 10% more for each Chair, and Chair generates 2% more for each Keyboard",
		degree: 180,
		price: 13530*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.keyboard_conversion += 1},
		radius: 65,
		img: "keyboard_conv",
		lvl: 10,
		parant_id: "node166"
	},
	node416:{
		name: "Keyboard Prestige conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 14% more for each Chair, and Chair generates 2.8% more for each Keyboard", 
		degree: 270,
		price: 21474836480,
		effect: ()=> {Game.permanent.keyboard_conversion += 4},
		radius: 65,
		img: "keyboard_conv",
		lvl: 100,
		parant_id: "node167"
	},
	node417:{
		name: "Keyboard Prestige conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 18% more for each Chair, and Chair generates 3.6% more for each Keyboard", 
		degree: 0,
		price: 32212254720,
		effect: ()=> {Game.permanent.keyboard_conversion += 4},
		radius: 65,
		img: "keyboard_conv",
		lvl: 101,
		parant_id: "node416"
	},
	node418:{
		name: "Keyboard Prestige conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 22% more for each Chair, and Chair generates 4.4% more for each Keyboard", 
		degree: 270,
		price: 42949672960,
		effect: ()=> {Game.permanent.keyboard_conversion += 4},
		radius: 65,
		img: "keyboard_conv",
		lvl: 102,
		parant_id: "node417"
	},
	node419:{
		name: "Keyboard Prestige conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 26% more for each Chair, and Chair generates 5.2% more for each Keyboard", 
		degree: 180,
		price: 53687091200,
		effect: ()=> {Game.permanent.keyboard_conversion += 4},
		radius: 65,
		img: "keyboard_conv",
		lvl: 103,
		parant_id: "node418"
	},
	node420:{
		name: "Keyboard Prestige conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 30% more for each Chair, and Chair generates 6% more for each Keyboard", 
		degree: 270,
		price: 64424509440,
		effect: ()=> {Game.permanent.keyboard_conversion += 4},
		radius: 65,
		img: "keyboard_conv",
		lvl: 104,
		parant_id: "node419"
	},
	node58:{
		name: "Keyboard Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 2% more for each none Keyboard hardware", 
		degree: 325,
		price: 9677*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 2,
		parant_id: "node25"
	},
	node59:{
		name: "Keyboard Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 3% more for each none Keyboard hardware", 
		degree: 305,
		price: 9677*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 3,
		parant_id: "node58"
	},
	node60:{
		name: "Keyboard Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 4% more for each none Keyboard hardware", 
		degree: 270,
		price: 9677*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 4,
		parant_id: "node59"
	},
	node61:{
		name: "Keyboard Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 5% more for each none Keyboard hardware", 
		degree: 180,
		price: 9677*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 5,
		parant_id: "node60"
	},
	node62:{
		name: "Keyboard Mode 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 6% more for each none Keyboard hardware", 
		degree: 270,
		price: 9677*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 6,
		parant_id: "node61"
	},
	node63:{
		name: "Keyboard Mode 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 7% more for each none Keyboard hardware", 
		degree: 0,
		price: 9677*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 7,
		parant_id: "node62"
	},
	node64:{
		name: "Keyboard Mode 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 8% more for each none Keyboard hardware", 
		degree: 270,
		price: 9677*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 8,
		parant_id: "node63"
	},
	node65:{
		name: "Keyboard Mode 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 9% more for each none Keybarod hardware", 
		degree: 180,
		price: 9677*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 9,
		parant_id: "node64"
	},
	node66:{
		name: "Keyboard Mode 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 10% more for each none keyboard hardware", 
		degree: 270,
		price: 9677*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 10,
		parant_id: "node65"
	},
	node411:{
		name: "Keyboard Prestige Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 20% more for each none keyboard hardware", 
		degree: 270,
		price: 10737418240,
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 100,
		parant_id: "node66"
	},
	node412:{
		name: "Keyboard Prestige Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 30% more for each none keyboard hardware", 
		degree: 270,
		price: 21474836480,
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 101,
		parant_id: "node411"
	},
	node413:{
		name: "Keyboard Prestige Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 40% more for each none keyboard hardware", 
		degree: 270,
		price: 32212254720,
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 102,
		parant_id: "node412"
	},
	node414:{
		name: "Keyboard Prestige Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 50% more for each none keyboard hardware", 
		degree: 270,
		price: 42949672960,
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 103,
		parant_id: "node413"
	},
	node415:{
		name: "Keyboard Prestige Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Keyboard generates 60% more for each none keyboard hardware", 
		degree: 270,
		price: 53687091200,
		effect: ()=> {Game.permanent.keyboard_Mode = preciseNumber(Game.permanent.keyboard_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "keyboard",
		lvl: 104,
		parant_id: "node414"
	},
	node26:{
		name: "Mouse Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 1% more for each Keyboard", 
		degree: 180,
		price: 18895,
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.01, "+", 3)},
		radius: 235,
		img: "mouse",
		lvl: 1,
		parant_id: "node25"
	},
	node67:{
		name: "Mouse Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 2% more for each Keyboard", 
		degree: 325,
		price: 18895*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 2,
		parant_id: "node26"
	},
	node68:{
		name: "Mouse Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 3% more for each Keyboard", 
		degree: 305,
		price: 18895*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 3,
		parant_id: "node67"
	},
	node69:{
		name: "Mouse Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 4% more for each Keyboard", 
		degree: 270,
		price: 18895*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 4,
		parant_id: "node68"
	},
	node70:{
		name: "Mouse Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 5% more for each Keyboard", 
		degree: 180,
		price: 18895*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 5,
		parant_id: "node69"
	},
	node71:{
		name: "Mouse Mode 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 6% more for each Keyboard", 
		degree: 270,
		price: 18895*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 6,
		parant_id: "node70"
	},
	node72:{
		name: "Mouse Mode 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 7% more for each Keyboard", 
		degree: 0,
		price: 18895*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 7,
		parant_id: "node71"
	},
	node73:{
		name: "Mouse Mode 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 8% more for each Keyboard", 
		degree: 270,
		price: 18895*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 8,
		parant_id: "node72"
	},
	node74:{
		name: "Mouse Mode 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 9% more for each Keybarod", 
		degree: 180,
		price: 18895*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 9,
		parant_id: "node73"
	},
	node75:{
		name: "Mouse Mode 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 10% more for each Keyboard", 
		degree: 270,
		price: 18895*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 10,
		parant_id: "node74"
	},
	node27:{
		name: "Mouse conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 1% more for each Desk, and Desk generates 0.2% more for each Mouse", 
		degree: 215,
		price: 26359,
		effect: ()=> {Game.permanent.mouse_conversion += 1},
		radius: 65,
		img: "mouse_conv",
		lvl: 1,
		parant_id: "node26"
	},
	node76:{
		name: "Mouse conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 2% more for each Desk, and Desk generates 0.4% more for each Mouse", 
		degree: 235,
		price: 26359*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.mouse_conversion += 1},
		radius: 65,
		img: "mouse_conv",
		lvl: 2,
		parant_id: "node27"
	},
	node77:{
		name: "Mouse conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 3% more for each Desk, and Desk generates 0.6% more for each Mouse", 
		degree: 270,
		price: 26359*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.mouse_conversion += 1},
		radius: 65,
		img: "mouse_conv",
		lvl: 3,
		parant_id: "node76"
	},
	node78:{
		name: "Mouse conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 4% more for each Desk, and Desk generates 0.8% more for each Mouse", 
		degree: 0,
		price: 26359*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.mouse_conversion += 1},
		radius: 65,
		img: "mouse_conv",
		lvl: 4,
		parant_id: "node77"
	},
	node79:{
		name: "Mouse conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 5% more for each Desk, and Desk generates 1% more for each Mouse", 
		degree: 270,
		price: 26359*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.mouse_conversion += 1},
		radius: 65,
		img: "mouse_conv",
		lvl: 5,
		parant_id: "node78"
	},
	node80:{
		name: "Mouse conversion 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 6% more for each Desk, and Desk generates 1.2% more for each Mouse", 
		degree: 180,
		price: 26359*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.mouse_conversion += 1},
		radius: 65,
		img: "mouse_conv",
		lvl: 6,
		parant_id: "node79"
	},
	node81:{
		name: "Mouse conversion 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 7% more for each Desk, and Desk generates 1.4% more for each Mouse", 
		degree: 270,
		price: 26359*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.mouse_conversion += 1},
		radius: 65,
		img: "mouse_conv",
		lvl: 7,
		parant_id: "node80"
	},
	node82:{
		name: "Mouse conversion 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 8% more for each Desk, and Desk generates 1.6% more for each Mouse", 
		degree: 0,
		price: 26359*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.mouse_conversion += 1},
		radius: 65,
		img: "mouse_conv",
		lvl: 8,
		parant_id: "node81"
	},
	node83:{
		name: "Mouse conversion 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 9% more for each Desk, and Desk generates 1.8% more for each Mouse", 
		degree: 270,
		price: 26359*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.mouse_conversion += 1},
		radius: 65,
		img: "mouse_conv",
		lvl: 9,
		parant_id: "node82"
	},
	node84:{
		name: "Mouse conversion 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 10% more for each Desk, and Desk generates 2% more for each Mouse", 
		degree: 180,
		price: 26359*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.mouse_conversion += 1},
		radius: 65,
		img: "mouse_conv",
		lvl: 10,
		parant_id: "node83"
	},
	node421:{
		name: "Mouse Prestige Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 20% more for each Keybarod", 
		degree: 270,
		price: 21474836480,
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 100,
		parant_id: "node75"
	},
	node422:{
		name: "Mouse Prestige Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 30% more for each Keybarod", 
		degree: 270,
		price: 32212254720,
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 101,
		parant_id: "node421"
	},
	node423:{
		name: "Mouse Prestige Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 40% more for each Keybarod", 
		degree: 270,
		price: 42949672960,
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 102,
		parant_id: "node422"
	},
	node424:{
		name: "Mouse Prestige Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 50% more for each Keybarod", 
		degree: 270,
		price: 53687091200,
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 103,
		parant_id: "node423"
	},
	node425:{
		name: "Mouse Prestige Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 60% more for each Keybarod", 
		degree: 270,
		price: 64424509440,
		effect: ()=> {Game.permanent.mouse_Mode = preciseNumber(Game.permanent.mouse_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "mouse",
		lvl: 104,
		parant_id: "node424"
	},
	node426:{
		name: "Mouse Prestige conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 14% more for each Desk, and Desk generates 2.8% more for each Mouse", 
		degree: 270,
		price: 32212254720,
		effect: ()=> {Game.permanent.mouse_conversion += 4},
		radius: 65,
		img: "mouse_conv",
		lvl: 100,
		parant_id: "node84"
	},
	node427:{
		name: "Mouse Prestige conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 18% more for each Desk, and Desk generates 3.6% more for each Mouse", 
		degree: 0,
		price: 42949672960,
		effect: ()=> {Game.permanent.mouse_conversion += 4},
		radius: 65,
		img: "mouse_conv",
		lvl: 101,
		parant_id: "node426"
	},
	node428:{
		name: "Mouse Prestige conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 22% more for each Desk, and Desk generates 4.4% more for each Mouse", 
		degree: 270,
		price: 53687091200,
		effect: ()=> {Game.permanent.mouse_conversion += 4},
		radius: 65,
		img: "mouse_conv",
		lvl: 102,
		parant_id: "node427"
	},
	node429:{
		name: "Mouse Prestige conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 26% more for each Desk, and Desk generates 5.2% more for each Mouse", 
		degree: 180,
		price: 64424509440,
		effect: ()=> {Game.permanent.mouse_conversion += 4},
		radius: 65,
		img: "mouse_conv",
		lvl: 103,
		parant_id: "node428"
	},
	node430:{
		name: "Mouse Prestige conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Mouse generates 30% more for each Desk, and Desk generates 6% more for each Mouse", 
		degree: 270,
		price: 75161927680,
		effect: ()=> {Game.permanent.mouse_conversion += 4},
		radius: 65,
		img: "mouse_conv",
		lvl: 104,
		parant_id: "node429"
	},
	node28:{
		name: "Chair Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 1% more for each Mouse", 
		degree: 180,
		price: 36733,
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.01, "+", 3)},
		radius: 235,
		img: "chair",
		lvl: 1,
		parant_id: "node26"
	},
	node85:{
		name: "Chair Mode 2",
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 2% more for each Mouse", 
		degree: 325,
		price: 36733*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.01, "+", 3)},
		radius:65,
		img: "chair",
		lvl: 2,
		parant_id: "node28"
	},
	node86:{
		name: "Chair Mode 3",
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 3% more for each Mouse", 
		degree: 305,
		price: 36733*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "chair",
		lvl: 3,
		parant_id: "node85"
	},
	node87:{
		name: "Chair Mode 4",
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 4% more for each Mouse", 
		degree: 270,
		price: 36733*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "chair",
		lvl: 4,
		parant_id: "node86"
	},
	node88:{
		name: "Chair Mode 5",
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 5% more for each Mouse", 
		degree: 180,
		price: 36733*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "chair",
		lvl: 5,
		parant_id: "node87"
	},
	node89:{
		name: "Chair Mode 6",
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 6% more for each Mouse", 
		degree: 270,
		price: 36733*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "chair",
		lvl: 6,
		parant_id: "node88"
	},
	node90:{
		name: "Chair Mode 7",
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 7% more for each Mouse", 
		degree: 0,
		price: 36733*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "chair",
		lvl: 7,
		parant_id: "node89"
	},
	node91:{
		name: "Chair Mode 8",
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 8% more for each Mouse", 
		degree: 270,
		price: 36733*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "chair",
		lvl: 8,
		parant_id: "node90"
	},
	node92:{
		name: "Chair Mode 9",
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 9% more for each Mouse", 
		degree: 180,
		price: 36733*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "chair",
		lvl: 9,
		parant_id: "node91"
	},
	node93:{
		name: "Chair Mode 10",
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 10% more for each Mouse", 
		degree: 270,
		price: 36733*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "chair",
		lvl: 10,
		parant_id: "node92"
	},
	node29:{
		name: "Chair conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 1% more for each Monitor, and Monitor generates 0.2% more for each Chair", 
		degree: 215,
		price: 51139,
		effect: ()=> {Game.permanent.chair_conversion += 1},
		radius: 65,
		img: "chair_conv",
		lvl: 1,
		parant_id: "node28"
	},
	node94:{
		name: "Chair conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 2% more for each Monitor, and Monitor generates 0.4% more for each Chair", 
		degree: 235,
		price: 51139*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.chair_conversion += 1},
		radius: 65,
		img: "chair_conv",
		lvl: 2,
		parant_id: "node29"
	},
	node95:{
		name: "Chair conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 3% more for each Monitor, and Monitor generates 0.6% more for each Chair", 
		degree: 270,
		price: 51139*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.chair_conversion += 1},
		radius: 65,
		img: "chair_conv",
		lvl: 3,
		parant_id: "node94"
	},
	node96:{
		name: "Chair conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 4% more for each Monitor, and Monitor generates 0.8% more for each Chair", 
		degree: 0,
		price: 51139*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.chair_conversion += 1},
		radius: 65,
		img: "chair_conv",
		lvl: 4,
		parant_id: "node95"
	},
	node97:{
		name: "Chair conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 5% more for each Monitor, and Monitor generates 1% more for each Chair", 
		degree: 270,
		price: 51139*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.chair_conversion += 1},
		radius: 65,
		img: "chair_conv",
		lvl: 5,
		parant_id: "node96"
	},
	node98:{
		name: "Chair conversion 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 6% more for each Monitor, and Monitor generates 1.2% more for each Chair", 
		degree: 180,
		price: 51139*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.chair_conversion += 1},
		radius: 65,
		img: "chair_conv",
		lvl: 6,
		parant_id: "node97"
	},
	node99:{
		name: "Chair conversion 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 7% more for each Monitor, and Monitor generates 1.4% more for each Chair", 
		degree: 270,
		price: 51139*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.chair_conversion += 1},
		radius: 65,
		img: "chair_conv",
		lvl: 7,
		parant_id: "node98"
	},
	node100:{
		name: "Chair conversion 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 8% more for each Monitor, and Monitor generates 1.6% more for each Chair", 
		degree: 0,
		price: 51139*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.chair_conversion += 1},
		radius: 65,
		img: "chair_conv",
		lvl: 8,
		parant_id: "node99"
	},
	node101:{
		name: "Chair conversion 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 9% more for each Monitor, and Monitor generates 1.8% more for each Chair", 
		degree: 270,
		price: 51139*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.chair_conversion += 1},
		radius: 65,
		img: "chair_conv",
		lvl: 9,
		parant_id: "node100"
	},
	node102:{
		name: "Chair conversion 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 10% more for each Monitor, and Monitor generates 2% more for each Chair", 
		degree: 180,
		price: 51139*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.chair_conversion += 1},
		radius: 65,
		img: "chair_conv",
		lvl: 10,
		parant_id: "node101"
	},
	node431:{
		name: "Chair Prestige Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 20% more for each Mouse", 
		degree: 270,
		price: 32212254720,
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "chair",
		lvl: 100,
		parant_id: "node93"
	},
	node432:{
		name: "Chair Prestige Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 30% more for each Mouse", 
		degree: 270,
		price: 42949672960,
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "chair",
		lvl: 101,
		parant_id: "node431"
	},
	node433:{
		name: "Chair Prestige Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 40% more for each Mouse", 
		degree: 270,
		price: 53687091200,
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "chair",
		lvl: 102,
		parant_id: "node432"
	},
	node434:{
		name: "Chair Prestige Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 50% more for each Mouse", 
		degree: 270,
		price: 64424509440,
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "chair",
		lvl: 103,
		parant_id: "node433"
	},
	node435:{
		name: "Chair Prestige Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 60% more for each Mouse", 
		degree: 270,
		price: 75161927680,
		effect: ()=> {Game.permanent.chair_Mode = preciseNumber(Game.permanent.chair_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "chair",
		lvl: 104,
		parant_id: "node434"
	},
	node436:{
		name: "Chair Prestige conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 14% more for each Monitor, and Monitor generates 2.8% more for each Chair", 
		degree: 270,
		price: 42949672960,
		effect: ()=> {Game.permanent.chair_conversion += 4},
		radius: 65,
		img: "chair_conv",
		lvl: 100,
		parant_id: "node102"
	},
	node437:{
		name: "Chair Prestige conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 18% more for each Monitor, and Monitor generates 3.6% more for each Chair", 
		degree: 0,
		price: 53687091200,
		effect: ()=> {Game.permanent.chair_conversion += 4},
		radius: 65,
		img: "chair_conv",
		lvl: 101,
		parant_id: "node436"
	},
	node438:{
		name: "Chair Prestige conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 22% more for each Monitor, and Monitor generates 4.4% more for each Chair", 
		degree: 270,
		price: 64424509440,
		effect: ()=> {Game.permanent.chair_conversion += 4},
		radius: 65,
		img: "chair_conv",
		lvl: 102,
		parant_id: "node437"
	},
	node439:{
		name: "Chair Prestige conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 26% more for each Monitor, and Monitor generates 5.2% more for each Chair", 
		degree: 180,
		price: 75161927680,
		effect: ()=> {Game.permanent.chair_conversion += 4},
		radius: 65,
		img: "chair_conv",
		lvl: 103,
		parant_id: "node438"
	},
	node440:{
		name: "Chair Prestige conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Chair generates 30% more for each Monitor, and Monitor generates 6% more for each Chair", 
		degree: 270,
		price: 85899345920,
		effect: ()=> {Game.permanent.chair_conversion += 4},
		radius: 65,
		img: "chair_conv",
		lvl: 104,
		parant_id: "node439"
	},
	node30:{
		name: "Desk Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 1% more for each Chair", 
		degree: 180,
		price: 71130,
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.01, "+", 3)},
		radius: 235,
		img: "desk",
		lvl: 1,
		parant_id: "node28"
	},
	node103:{
		name: "Desk Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 2% more for each Chair", 
		degree: 325,
		price: 71130*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 2,
		parant_id: "node30"
	},
	node104:{
		name: "Desk Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 3% more for each Chair", 
		degree: 305,
		price: 71130*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 3,
		parant_id: "node103"
	},
	node105:{
		name: "Desk Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 4% more for each Chair", 
		degree: 270,
		price: 71130*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 4,
		parant_id: "node104"
	},
	node106:{
		name: "Desk Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 5% more for each Chair", 
		degree: 180,
		price: 71130*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 5,
		parant_id: "node105"
	},
	node107:{
		name: "Desk Mode 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 6% more for each Chair", 
		degree: 270,
		price: 71130*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 6,
		parant_id: "node106"
	},
	node108:{
		name: "Desk Mode 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 7% more for each Chair", 
		degree: 0,
		price: 71130*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 7,
		parant_id: "node107"
	},
	node109:{
		name: "Desk Mode 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 8% more for each Chair", 
		degree: 270,
		price: 71130*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 8,
		parant_id: "node108"
	},
	node110:{
		name: "Desk Mode 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 9% more for each Chair", 
		degree: 180,
		price: 71130*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 9,
		parant_id: "node109"
	},
	node111:{
		name: "Desk Mode 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 10% more for each Chair", 
		degree: 270,
		price: 71130*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 10,
		parant_id: "node110"
	},
	node112:{
		name: "Desk conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 1% more for each Router, and Router generates 0.2% more for each Desk", 
		degree: 215,
		price: 98850,
		effect: ()=> {Game.permanent.desk_conversion += 1},
		radius: 65,
		img: "desk_conv",
		lvl: 1,
		parant_id: "node30"
	},
	node113:{
		name: "Desk conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 2% more for each Router, and Router generates 0.4% more for each Desk", 
		degree: 235,
		price: 98850*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.desk_conversion += 1},
		radius: 65,
		img: "desk_conv",
		lvl: 2,
		parant_id: "node112"
	},
	node114:{
		name: "Desk conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 3% more for each Router, and Router generates 0.6% more for each Desk", 
		degree: 270,
		price: 98850*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.desk_conversion += 1},
		radius: 65,
		img: "desk_conv",
		lvl: 3,
		parant_id: "node113"
	},
	node115:{
		name: "Desk conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 4% more for each Router, and Router generates 0.8% more for each Desk", 
		degree: 0,
		price: 98850*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.desk_conversion += 1},
		radius: 65,
		img: "desk_conv",
		lvl: 4,
		parant_id: "node114"
	},
	node116:{
		name: "Desk conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 5% more for each Router, and Router generates 1% more for each Desk", 
		degree: 270,
		price: 98850*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.desk_conversion += 1},
		radius: 65,
		img: "desk_conv",
		lvl: 5,
		parant_id: "node115"
	},
	node117:{
		name: "Desk conversion 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 6% more for each Router, and Router generates 1.2% more for each Desk", 
		degree: 180,
		price: 98850*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.desk_conversion += 1},
		radius: 65,
		img: "desk_conv",
		lvl: 6,
		parant_id: "node116"
	},
	node118:{
		name: "Desk conversion 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 7% more for each Router, and Router generates 1.4% more for each Desk", 
		degree: 270,
		price: 98850*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.desk_conversion += 1},
		radius:65,
		img: "desk_conv",
		lvl: 7,
		parant_id: "node117"
	},
	node119:{
		name: "Desk conversion 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 8% more for each Router, and Router generates 1.6% more for each Desk", 
		degree: 0,
		price: 98850*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.desk_conversion += 1},
		radius: 65,
		img: "desk_conv",
		lvl: 8,
		parant_id: "node118"
	},
	node120:{
		name: "Desk conversion 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 9% more for each Router, and Router generates 1.8% more for each Desk", 
		degree: 270,
		price: 98850*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.desk_conversion += 1},
		radius: 65,
		img: "desk_conv",
		lvl: 9,
		parant_id: "node119"
	},
	node121:{
		name: "Desk conversion 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 10% more for each Router, and Router generates 2% more for each Desk", 
		degree: 180,
		price: 98850*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.desk_conversion += 1},
		radius: 65,
		img: "desk_conv",
		lvl: 10,
		parant_id: "node120"
	},
	node441:{
		name: "Desk Prestige Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 20% more for each Chair", 
		degree: 270,
		price: 42949672960,
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 100,
		parant_id: "node111"
	},
	node442:{
		name: "Desk Prestige Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 30% more for each Chair", 
		degree: 270,
		price: 53687091200,
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 101,
		parant_id: "node441"
	},
	node443:{
		name: "Desk Prestige Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 40% more for each Chair", 
		degree: 270,
		price: 64424509440,
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 102,
		parant_id: "node442"
	},
	node444:{
		name: "Desk Prestige Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 50% more for each Chair", 
		degree: 270,
		price: 75161927680,
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 103,
		parant_id: "node443"
	},
	node445:{
		name: "Desk Prestige Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 60% more for each Chair", 
		degree: 270,
		price: 85899345920,
		effect: ()=> {Game.permanent.desk_Mode = preciseNumber(Game.permanent.desk_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "desk",
		lvl: 104,
		parant_id: "node444"
	},
	node446:{
		name: "Desk Prestige conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 14% more for each Router, and Router generates 2.8% more for each Desk", 
		degree: 270,
		price: 53687091200,
		effect: ()=> {Game.permanent.desk_conversion += 4},
		radius: 65,
		img: "desk_conv",
		lvl: 100,
		parant_id: "node121"
	},
	node447:{
		name: "Desk Prestige conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 18% more for each Router, and Router generates 3.6% more for each Desk", 
		degree: 0,
		price: 64424509440,
		effect: ()=> {Game.permanent.desk_conversion += 4},
		radius: 65,
		img: "desk_conv",
		lvl: 101,
		parant_id: "node446"
	},
	node448:{
		name: "Desk Prestige conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 22% more for each Router, and Router generates 4.4% more for each Desk", 
		degree: 270,
		price: 75161927680,
		effect: ()=> {Game.permanent.desk_conversion += 4},
		radius: 65,
		img: "desk_conv",
		lvl: 102,
		parant_id: "node447"
	},
	node449:{
		name: "Desk Prestige conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 26% more for each Router, and Router generates 5.2% more for each Desk", 
		degree: 180,
		price: 85899345920,
		effect: ()=> {Game.permanent.desk_conversion += 4},
		radius: 65,
		img: "desk_conv",
		lvl: 103,
		parant_id: "node448"
	},
	node450:{
		name: "Desk Prestige conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Desk generates 30% more for each Router, and Router generates 6% more for each Desk", 
		degree: 270,
		price: 96636764160,
		effect: ()=> {Game.permanent.desk_conversion += 4},
		radius: 65,
		img: "desk_conv",
		lvl: 104,
		parant_id: "node449"
	},
	node32:{
		name: "Monitor Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 1% more for each Desk", 
		degree: 180,
		price: 137260,
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.01, "+", 3)},
		radius: 235,
		img: "monitor",
		lvl: 1,
		parant_id: "node30"
	},
	node122:{
		name: "Monitor Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 2% more for each Desk", 
		degree: 325,
		price: 137260*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 2,
		parant_id: "node32"
	},
	node123:{
		name: "Monitor Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 3% more for each Desk", 
		degree: 305,
		price: 137260*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 3,
		parant_id: "node122"
	},
	node124:{
		name: "Monitor Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 4% more for each Desk", 
		degree: 270,
		price: 137260*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 4,
		parant_id: "node123"
	},
	node125:{
		name: "Monitor Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 5% more for each Desk", 
		degree: 180,
		price: 137260*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 5,
		parant_id: "node124"
	},
	node126:{
		name: "Monitor Mode 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 6% more for each Desk", 
		degree: 270,
		price: 137260*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 6,
		parant_id: "node125"
	},
	node127:{
		name: "Monitor Mode 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 7% more for each Desk", 
		degree: 0,
		price: 137260*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 7,
		parant_id: "node126"
	},
	node128:{
		name: "Monitor Mode 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 8% more for each Desk", 
		degree: 270,
		price: 137260*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 8,
		parant_id: "node127"
	},
	node129:{
		name: "Monitor Mode 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 9% more for each Desk", 
		degree: 180,
		price: 137260*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 9,
		parant_id: "node128"
	},
	node130:{
		name: "Monitor Mode 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 10% more for each Desk", 
		degree: 270,
		price: 137260*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 10,
		parant_id: "node129"
	},
	node33:{
		name: "Monitor conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 1% more for each PC, and PC generates 0.2% more for each Monitor", 
		degree: 215,
		price: 190449,
		effect: ()=> {Game.permanent.monitor_conversion += 1},
		radius: 65,
		img: "monitor_conv",
		lvl: 1,
		parant_id: "node32"
	},
	node131:{
		name: "Monitor conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 2% more for each PC, and PC generates 0.4% more for each Monitor", 
		degree: 235,
		price: 190449*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.monitor_conversion += 1},
		radius: 65,
		img: "monitor_conv",
		lvl: 2,
		parant_id: "node33"
	},
	node132:{
		name: "Monitor conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 3% more for each PC, and PC generates 0.6% more for each Monitor", 
		degree: 270,
		price: 190449*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.monitor_conversion += 1},
		radius: 65,
		img: "monitor_conv",
		lvl: 3,
		parant_id: "node131"
	},
	node133:{
		name: "Monitor conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 4% more for each PC, and PC generates 0.8% more for each Monitor", 
		degree: 0,
		price: 190449*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.monitor_conversion += 1},
		radius: 65,
		img: "monitor_conv",
		lvl: 4,
		parant_id: "node132"
	},
	node134:{
		name: "Monitor conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 5% more for each PC, and PC generates 1% more for each Monitor", 
		degree: 270,
		price: 190449*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.monitor_conversion += 1},
		radius: 65,
		img: "monitor_conv",
		lvl: 5,
		parant_id: "node133"
	},
	node135:{
		name: "Monitor conversion 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 6% more for each PC, and PC generates 1.2% more for each Monitor", 
		degree: 180,
		price: 190449*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.monitor_conversion += 1},
		radius: 65,
		img: "monitor_conv",
		lvl: 6,
		parant_id: "node134"
	},
	node136:{
		name: "Monitor conversion 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 7% more for each PC, and PC generates 1.4% more for each Monitor", 
		degree: 270,
		price: 190449*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.monitor_conversion += 1},
		radius: 65,
		img: "monitor_conv",
		lvl: 7,
		parant_id: "node135"
	},
	node137:{
		name: "Monitor conversion 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 8% more for each PC, and PC generates 1.6% more for each Monitor", 
		degree: 0,
		price: 190449*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.monitor_conversion += 1},
		radius: 65,
		img: "monitor_conv",
		lvl: 8,
		parant_id: "node136"
	},
	node138:{
		name: "Monitor conversion 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 9% more for each PC, and PC generates 1.8% more for each Monitor", 
		degree: 270,
		price: 190449*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.monitor_conversion += 1},
		radius: 65,
		img: "monitor_conv",
		lvl: 9,
		parant_id: "node137"
	},
	node139:{
		name: "Monitor conversion 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 10% more for each PC, and PC generates 2% more for each Monitor", 
		degree: 180,
		price: 190449*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.monitor_conversion += 1},
		radius: 65,
		img: "monitor_conv",
		lvl: 10,
		parant_id: "node138"
	},
	node451:{
		name: "Monitor Prestige Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 20% more for each Desk", 
		degree: 270,
		price: 53687091200,
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 100,
		parant_id: "node130"
	},
	node452:{
		name: "Monitor Prestige Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 30% more for each Desk", 
		degree: 270,
		price: 64424509440,
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 101,
		parant_id: "node451"
	},
	node453:{
		name: "Monitor Prestige Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 40% more for each Desk", 
		degree: 270,
		price: 75161927680,
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 102,
		parant_id: "node452"
	},
	node454:{
		name: "Monitor Prestige Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 50% more for each Desk", 
		degree: 270,
		price: 85899345920,
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 103,
		parant_id: "node453"
	},
	node455:{
		name: "Monitor Prestige Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 60% more for each Desk", 
		degree: 270,
		price: 96636764160,
		effect: ()=> {Game.permanent.monitor_Mode = preciseNumber(Game.permanent.monitor_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "monitor",
		lvl: 104,
		parant_id: "node454"
	},
	node456:{
		name: "Monitor Prestige conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 14% more for each PC, and PC generates 2.8% more for each Monitor", 
		degree: 270,
		price: 64424509440,
		effect: ()=> {Game.permanent.monitor_conversion += 4},
		radius: 65,
		img: "monitor_conv",
		lvl: 100,
		parant_id: "node139"
	},
	node457:{
		name: "Monitor Prestige conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 18% more for each PC, and PC generates 3.6% more for each Monitor", 
		degree: 0,
		price: 75161927680,
		effect: ()=> {Game.permanent.monitor_conversion += 4},
		radius: 65,
		img: "monitor_conv",
		lvl: 101,
		parant_id: "node456"
	},
	node458:{
		name: "Monitor Prestige conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 22% more for each PC, and PC generates 4.4% more for each Monitor", 
		degree: 270,
		price: 85899345920,
		effect: ()=> {Game.permanent.monitor_conversion += 4},
		radius: 65,
		img: "monitor_conv",
		lvl: 102,
		parant_id: "node457"
	},
	node459:{
		name: "Monitor Prestige conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 26% more for each PC, and PC generates 5.2% more for each Monitor", 
		degree: 180,
		price: 96636764160,
		effect: ()=> {Game.permanent.monitor_conversion += 4},
		radius: 65,
		img: "monitor_conv",
		lvl: 103,
		parant_id: "node458"
	},
	node460:{
		name: "Monitor Prestige conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Monitor generates 30% more for each PC, and PC generates 6% more for each Monitor", 
		degree: 270,
		price: 107374182400,
		effect: ()=> {Game.permanent.monitor_conversion += 4},
		radius: 65,
		img: "monitor_conv",
		lvl: 104,
		parant_id: "node459"
	},
	node34:{
		name: "Router Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 1% more for each Monitor", 
		degree: 180,
		price: 264055,
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.01, "+", 3)},
		radius: 235,
		img: "router",
		lvl: 1,
		parant_id: "node32"
	},
	node140:{
		name: "Router Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 2% more for each Monitor", 
		degree: 325,
		price: 264055*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 2,
		parant_id: "node34"
	},
	node141:{
		name: "Router Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 3% more for each Monitor", 
		degree: 305,
		price: 264055*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 3,
		parant_id: "node140"
	},
	node142:{
		name: "Router Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 4% more for each Monitor", 
		degree: 270,
		price: 264055*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 4,
		parant_id: "node141"
	},
	node143:{
		name: "Router Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 5% more for each Monitor", 
		degree: 180,
		price: 264055*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 5,
		parant_id: "node142"
	},
	node144:{
		name: "Router Mode 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 6% more for each Monitor", 
		degree: 270,
		price: 264055*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 6,
		parant_id: "node143"
	},
	node145:{
		name: "Router Mode 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 7% more for each Monitor", 
		degree: 0,
		price: 264055*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 7,
		parant_id: "node144"
	},
	node146:{
		name: "Router Mode 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 8% more for each Monitor", 
		degree: 270,
		price: 264055*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 8,
		parant_id: "node145"
	},
	node147:{
		name: "Router Mode 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 9% more for each Monitor", 
		degree: 180,
		price: 264055*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 9,
		parant_id: "node146"
	},
	node148:{
		name: "Router Mode 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 10% more for each Monitor", 
		degree: 270,
		price: 264055*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 10,
		parant_id: "node147"
	},
	node168:{
		name: "Router conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 1% more for each Solar power, and Solar power generates 0.2% more for each Router",
		degree: 215,
		price: 365855,
		effect: ()=> {Game.permanent.router_conversion += 1},
		radius: 65,
		img: "router_conv",
		lvl: 1,
		parant_id: "node34"
	},
	node169:{
		name: "Router conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 2% more for each Solar power, and Solar power generates 0.4% more for each Router",
		degree: 235,
		price: 365855*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.router_conversion += 1},
		radius: 65,
		img: "router_conv",
		lvl: 2,
		parant_id: "node168"
	},
	node170:{
		name: "Router conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 3% more for each Solar power, and Solar power generates 0.6% more for each Router",
		degree: 270,
		price: 365855*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.router_conversion += 1},
		radius: 65,
		img: "router_conv",
		lvl: 3,
		parant_id: "node169"
	},
	node171:{
		name: "Router conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 4% more for each Solar power, and Solar power generates 0.8% more for each Router",
		degree: 0,
		price: 365855*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.router_conversion += 1},
		radius: 65,
		img: "router_conv",
		lvl: 4,
		parant_id: "node170"
	},
	node172:{
		name: "Router conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 5% more for each Solar power, and Solar power generates 1% more for each Router",
		degree: 270,
		price: 365855*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.router_conversion += 1},
		radius: 65,
		img: "router_conv",
		lvl: 5,
		parant_id: "node171"
	},
	node173:{
		name: "Router conversion 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 6% more for each Solar power, and Solar power generates 1.2% more for each Router",
		degree: 180,
		price: 365855*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.router_conversion += 1},
		radius: 65,
		img: "router_conv",
		lvl: 6,
		parant_id: "node172"
	},
	node174:{
		name: "Router conversion 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 7% more for each Solar power, and Solar power generates 1.4% more for each Router",
		degree: 270,
		price: 365855*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.router_conversion += 1},
		radius: 65,
		img: "router_conv",
		lvl: 7,
		parant_id: "node173"
	},
	node175:{
		name: "Router conversion 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 8% more for each Solar power, and Solar power generates 1.6% more for each Router",
		degree: 0,
		price: 365855*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.router_conversion += 1},
		radius: 65,
		img: "router_conv",
		lvl: 8,
		parant_id: "node174"
	},
	node176:{
		name: "Router conversion 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 9% more for each Solar power, and Solar power generates 1.8% more for each Router",
		degree: 270,
		price: 365855*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.router_conversion += 1},
		radius: 65,
		img: "router_conv",
		lvl: 9,
		parant_id: "node175"
	},
	node177:{
		name: "Router conversion 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 10% more for each Solar power, and Solar power generates 2% more for each Router",
		degree: 180,
		price: 365855*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.router_conversion += 1},
		radius: 65,
		img: "router_conv",
		lvl: 10,
		parant_id: "node176"
	},
	node461:{
		name: "Router Prestige Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 20% more for each Monitor", 
		degree: 270,
		price: 64424509440,
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 100,
		parant_id: "node148"
	},
	node462:{
		name: "Router Prestige Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 30% more for each Monitor", 
		degree: 270,
		price: 75161927680,
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 101,
		parant_id: "node461"
	},
	node463:{
		name: "Router Prestige Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 40% more for each Monitor", 
		degree: 270,
		price: 85899345920,
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 102,
		parant_id: "node462"
	},
	node464:{
		name: "Router Prestige Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 50% more for each Monitor", 
		degree: 270,
		price: 96636764160,
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 103,
		parant_id: "node463"
	},
	node465:{
		name: "Router Prestige Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 60% more for each Monitor", 
		degree: 270,
		price: 107374182400,
		effect: ()=> {Game.permanent.router_Mode = preciseNumber(Game.permanent.router_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "router",
		lvl: 104,
		parant_id: "node464"
	},
	node466:{
		name: "Router Prestige conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 14% more for each Solar power, and Solar power generates 2.8% more for each Router", 
		degree: 270,
		price: 75161927680,
		effect: ()=> {Game.permanent.router_conversion += 4},
		radius: 65,
		img: "router_conv",
		lvl: 100,
		parant_id: "node177"
	},
	node467:{
		name: "Router Prestige conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 18% more for each Solar power, and Solar power generates 3.6% more for each Router", 
		degree: 0,
		price: 85899345920,
		effect: ()=> {Game.permanent.router_conversion += 4},
		radius: 65,
		img: "router_conv",
		lvl: 101,
		parant_id: "node466"
	},
	node468:{
		name: "Router Prestige conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 22% more for each Solar power, and Solar power generates 4.4% more for each Router", 
		degree: 270,
		price: 96636764160,
		effect: ()=> {Game.permanent.router_conversion += 4},
		radius: 65,
		img: "router_conv",
		lvl: 102,
		parant_id: "node467"
	},
	node469:{
		name: "Router Prestige conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 26% more for each Solar power, and Solar power generates 5.2% more for each Router", 
		degree: 180,
		price: 107374182400,
		effect: ()=> {Game.permanent.router_conversion += 4},
		radius: 65,
		img: "router_conv",
		lvl: 103,
		parant_id: "node468"
	},
	node470:{
		name: "Router Prestige conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Router generates 30% more for each Solar power, and Solar power generates 6% more for each Router", 
		degree: 270,
		price: 118111600640,
		effect: ()=> {Game.permanent.router_conversion += 4},
		radius: 65,
		img: "router_conv",
		lvl: 104,
		parant_id: "node469"
	},
	node35:{
		name: "PC Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 1% more for each Router", 
		degree: 180,
		price: 506569,
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.01, "+", 3)},
		radius: 235,
		img: "pc",
		lvl: 1,
		parant_id: "node34"
	},
	node149:{
		name: "PC Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 2% more for each Router", 
		degree: 325,
		price: 506569*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "pc",
		lvl: 2,
		parant_id: "node35"
	},
	node150:{
		name: "PC Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 3% more for each Router", 
		degree: 305,
		price: 506569*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "pc",
		lvl: 3,
		parant_id: "node149"
	},
	node151:{
		name: "PC Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 4% more for each Router", 
		degree: 270,
		price: 506569*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "pc",
		lvl: 4,
		parant_id: "node150"
	},
	node152:{
		name: "PC Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 5% more for each Router", 
		degree: 180,
		price: 506569*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "pc",
		lvl: 5,
		parant_id: "node151"
	},
	node153:{
		name: "PC Mode 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 6% more for each Router", 
		degree: 270,
		price: 506569*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "pc",
		lvl: 6,
		parant_id: "node152"
	},
	node154:{
		name: "PC Mode 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 7% more for each Router", 
		degree: 0,
		price: 506569*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "pc",
		lvl: 7,
		parant_id: "node153"
	},
	node155:{
		name: "PC Mode 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 8% more for each Router", 
		degree: 270,
		price: 506569*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.01, "+", 3)},	
		radius: 65,
		img: "pc",
		lvl: 8,
		parant_id: "node154"
	},
	node156:{
		name: "PC Mode 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 9% more for each Router", 
		degree: 180,
		price: 506569*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "pc",
		lvl: 9,
		parant_id: "node155"
	},
	node157:{
		name: "PC Mode 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 10% more for each Router", 
		degree: 270,
		price: 506569*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "pc",
		lvl: 10,
		parant_id: "node156"
	},
	node178:{
		name: "PC conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 1% more for each Magnetic generator, and Magnetic generator generates 0.2% more for each PC",
		degree: 215,
		price: 700965,
		effect: ()=> {Game.permanent.pc_conversion += 1},
		radius: 65,
		img: "pc_conv",
		lvl: 1,
		parant_id: "node35"
	},
	node179:{
		name: "PC conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 2% more for each Magnetic generator, and Magnetic generator generates 0.4% more for each PC",
		degree: 235,
		price: 700965*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.pc_conversion += 1},
		radius: 65,
		img: "pc_conv",
		lvl: 2,
		parant_id: "node178"
	},
	node180:{
		name: "PC conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 3% more for each Magnetic generator, and Magnetic generator generates 0.6% more for each PC",
		degree: 270,
		price: 700965*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.pc_conversion += 1},
		radius: 65,
		img: "pc_conv",
		lvl: 3,
		parant_id: "node179"
	},
	node181:{
		name: "PC conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 4% more for each Magnetic generator, and Magnetic generator generates 0.8% more for each PC",
		degree: 0,
		price: 700965*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.pc_conversion += 1},
		radius: 65,
		img: "pc_conv",
		lvl: 4,
		parant_id: "node180"
	},
	node182:{
		name: "PC conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 5% more for each Magnetic generator, and Magnetic generator generates 1% more for each PC",
		degree: 270,
		price: 700965*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.pc_conversion += 1},
		radius: 65,
		img: "pc_conv",
		lvl: 5,
		parant_id: "node181"
	},
	node183:{
		name: "PC conversion 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 6% more for each Magnetic generator, and Magnetic generator generates 1.2% more for each PC",
		degree: 180,
		price: 700965*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.pc_conversion += 1},
		radius: 65,
		img: "pc_conv",
		lvl: 6,
		parant_id: "node182"
	},
	node184:{
		name: "PC conversion 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 7% more for each Magnetic generator, and Magnetic generator generates 1.4% more for each PC",
		degree: 270,
		price: 700965*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.pc_conversion += 1},
		radius: 65,
		img: "pc_conv",
		lvl: 7,
		parant_id: "node183"
	},
	node185:{
		name: "PC conversion 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 8% more for each Magnetic generator, and Magnetic generator generates 1.6% more for each PC",
		degree: 0,
		price: 700965*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.pc_conversion += 1},
		radius: 65,
		img: "pc_conv",
		lvl: 8,
		parant_id: "node184"
	},
	node186:{
		name: "PC conversion 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 9% more for each Magnetic generator, and Magnetic generator generates 1.8% more for each PC",
		degree: 270,
		price: 700965*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.pc_conversion += 1},
		radius: 65,
		img: "pc_conv",
		lvl: 9,
		parant_id: "node185"
	},
	node187:{
		name: "PC conversion 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 10% more for each Magnetic generator, and Magnetic generator generates 2% more for each PC",
		degree: 180,
		price: 700965*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.pc_conversion += 1},
		radius: 65,
		img: "pc_conv",
		lvl: 10,
		parant_id: "node186"
	},
	node471:{
		name: "PC Prestige Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 20% more for each Router", 
		degree: 270,
		price: 75161927680,
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "pc",
		lvl: 100,
		parant_id: "node157"
	},
	node472:{
		name: "PC Prestige Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 30% more for each Router", 
		degree: 270,
		price: 85899345920,
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "pc",
		lvl: 101,
		parant_id: "node471"
	},
	node473:{
		name: "PC Prestige Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 40% more for each Router", 
		degree: 270,
		price: 96636764160,
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "pc",
		lvl: 102,
		parant_id: "node472"
	},
	node474:{
		name: "PC Prestige Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 50% more for each Router", 
		degree: 270,
		price: 107374182400,
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "pc",
		lvl: 103,
		parant_id: "node473"
	},
	node475:{
		name: "PC Prestige Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 60% more for each Router", 
		degree: 270,
		price: 118111600640,
		effect: ()=> {Game.permanent.pc_Mode = preciseNumber(Game.permanent.pc_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "pc",
		lvl: 104,
		parant_id: "node474"
	},
	node476:{
		name: "PC Prestige conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 14% more for each Magnetic generator, and Magnetic generator generates 2.8% more for each PC", 
		degree: 270,
		price: 85899345920,
		effect: ()=> {Game.permanent.pc_conversion += 4},
		radius: 65,
		img: "pc_conv",
		lvl: 100,
		parant_id: "node187"
	},
	node477:{
		name: "PC Prestige conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 18% more for each Magnetic generator, and Magnetic generator generates 3.6% more for each PC", 
		degree: 0,
		price: 96636764160,
		effect: ()=> {Game.permanent.pc_conversion += 4},
		radius: 65,
		img: "pc_conv",
		lvl: 101,
		parant_id: "node476"
	},
	node478:{
		name: "PC Prestige conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 22% more for each Magnetic generator, and Magnetic generator generates 4.4% more for each PC", 
		degree: 270,
		price: 107374182400,
		effect: ()=> {Game.permanent.pc_conversion += 4},
		radius: 65,
		img: "pc_conv",
		lvl: 102,
		parant_id: "node477"
	},
	node479:{
		name: "PC Prestige conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 26% more for each Magnetic generator, and Magnetic generator generates 5.2% more for each PC", 
		degree: 180,
		price: 118111600640,
		effect: ()=> {Game.permanent.pc_conversion += 4},
		radius: 65,
		img: "pc_conv",
		lvl: 103,
		parant_id: "node478"
	},
	node480:{
		name: "PC Prestige conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>PC generates 30% more for each Magnetic generator, and Magnetic generator generates 6% more for each PC", 
		degree: 270,
		price: 128849018880,
		effect: ()=> {Game.permanent.pc_conversion += 4},
		radius: 65,
		img: "pc_conv",
		lvl: 104,
		parant_id: "node479"
	},
	node188:{
		name: "Solar power Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 1% more for each PC",
		degree: 180,
		price: 969383,
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.01, "+", 3)},
		radius: 235,
		img: "solar_power",
		lvl: 1,
		parant_id: "node35"
	},
	node189:{
		name: "Solar power Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 2% more for each PC",
		degree: 325,
		price: 969383*Math.pow(h_lvl_pow, 2),
		multi: "solar_power_Mode",
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 2,
		parant_id: "node188"
	},
	node190:{
		name: "Solar power Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 3% more for each PC",
		degree: 305,
		price: 969383*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 3,
		parant_id: "node189"
	},
	node191:{
		name: "Solar power Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 4% more for each PC",
		degree: 270,
		price: 969383*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 4,
		parant_id: "node190"
	},
	node192:{
		name: "Solar power Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 5% more for each PC",
		degree: 180,
		price: 969383*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 5,
		parant_id: "node191"
	},
	node193:{
		name: "Solar power Mode 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 6% more for each PC",
		degree: 270,
		price: 969383*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 6,
		parant_id: "node192"
	},
	node194:{
		name: "Solar power Mode 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 7% more for each PC",
		degree: 0,
		price: 969383*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 7,
		parant_id: "node193"
	},
	node195:{
		name: "Solar power Mode 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 8% more for each PC",
		degree: 270,
		price: 969383*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 8,
		parant_id: "node194"
	},
	node196:{
		name: "Solar power Mode 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 9% more for each PC",
		degree: 180,
		price: 969383*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 9,
		parant_id: "node195"
	},
	node197:{
		name: "Solar power Mode 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 10% more for each PC",
		degree: 270,
		price: 969383*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 10,
		parant_id: "node196"
	},
	node267:{
		name: "Solar power conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 1% more for each Radio tower, and Radio tower generates 0.2% more for each Solar power",
		degree: 215,
		price: 1339827,
		effect: ()=> {Game.permanent.solar_power_conversion += 1},
		radius: 65,
		img: "solar_power_conv",
		lvl: 1,
		parant_id: "node188"
	},
	node268:{
		name: "Solar power conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 2% more for each Radio tower, and Radio tower generates 0.4% more for each Solar power",
		degree: 235,
		price: 1339827*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.solar_power_conversion += 1},
		radius: 65,
		img: "solar_power_conv",
		lvl: 2,
		parant_id: "node267"
	},
	node269:{
		name: "Solar power conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 3% more for each Radio tower, and Radio tower generates 0.6% more for each Solar power",
		degree: 270,
		price: 1339827*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.solar_power_conversion += 1},
		radius: 65,
		img: "solar_power_conv",
		lvl: 3,
		parant_id: "node268"
	},
	node270:{
		name: "Solar power conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 4% more for each Radio tower, and Radio tower generates 0.8% more for each Solar power",
		degree: 0,
		price: 1339827*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.solar_power_conversion += 1},
		radius: 65,
		img: "solar_power_conv",
		lvl: 4,
		parant_id: "node269"
	},
	node271:{
		name: "Solar power conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 5% more for each Radio tower, and Radio tower generates 1% more for each Solar power",
		degree: 270,
		price: 1339827*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.solar_power_conversion += 1},
		radius: 65,
		img: "solar_power_conv",
		lvl: 5,
		parant_id: "node270"
	},
	node272:{
		name: "Solar power conversion 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 6% more for each Radio tower, and Radio tower generates 1.2% more for each Solar power",
		degree: 180,
		price: 1339827*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.solar_power_conversion += 1},
		radius: 75,
		img: "solar_power_conv",
		lvl: 6,
		parant_id: "node271"
	},
	node273:{
		name: "Solar power conversion 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 7% more for each Radio tower, and Radio tower generates 1.4% more for each Solar power",
		degree: 270,
		price: 1339827*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.solar_power_conversion += 1},
		radius: 65,
		img: "solar_power_conv",
		lvl: 7,
		parant_id: "node272"
	},
	node274:{
		name: "Solar power conversion 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 8% more for each Radio tower, and Radio tower generates 1.6% more for each Solar power",
		degree: 0,
		price: 1339827*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.solar_power_conversion += 1},
		radius: 65,
		img: "solar_power_conv",
		lvl: 8,
		parant_id: "node273"
	},
	node275:{
		name: "Solar power conversion 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 9% more for each Radio tower, and Radio tower generates 1.8% more for each Solar power",
		degree: 270,
		price: 1339827*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.solar_power_conversion += 1},
		radius: 65,
		img: "solar_power_conv",
		lvl: 9,
		parant_id: "node274"
	},
	node276:{
		name: "Solar power conversion 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 10% more for each Radio tower, and Radio tower generates 2% more for each Solar power",
		degree: 180,
		price: 1339827*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.solar_power_conversion += 1},
		radius: 65,
		img: "solar_power_conv",
		lvl: 10,
		parant_id: "node275"
	},
	node481:{
		name: "Solar power Prestige Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 20% more for each PC", 
		degree: 270,
		price: 85899345920,
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 100,
		parant_id: "node197"
	},
	node482:{
		name: "Solar power Prestige Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 30% more for each PC", 
		degree: 270,
		price: 96636764160,
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 101,
		parant_id: "node481"
	},
	node483:{
		name: "Solar power Prestige Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 40% more for each PC", 
		degree: 270,
		price: 107374182400,
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 102,
		parant_id: "node482"
	},
	node484:{
		name: "Solar power Prestige Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 50% more for each PC", 
		degree: 270,
		price: 118111600640,
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 103,
		parant_id: "node483"
	},
	node485:{
		name: "Solar power Prestige Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 60% more for each PC", 
		degree: 270,
		price: 128849018880,
		effect: ()=> {Game.permanent.solar_power_Mode = preciseNumber(Game.permanent.solar_power_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "solar_power",
		lvl: 104,
		parant_id: "node484"
	},
	node486:{
		name: "Solar power Prestige conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 14% more for each Radio tower, and Radio tower generates 2.8% more for each Solar power", 
		degree: 270,
		price: 96636764160,
		effect: ()=> {Game.permanent.solar_power_conversion += 4},
		radius: 65,
		img: "solar_power_conv",
		lvl: 100,
		parant_id: "node276"
	},
	node487:{
		name: "Solar power Prestige conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 18% more for each Radio tower, and Radio tower generates 3.6% more for each Solar power", 
		degree: 0,
		price: 107374182400,
		effect: ()=> {Game.permanent.solar_power_conversion += 4},
		radius: 65,
		img: "solar_power_conv",
		lvl: 101,
		parant_id: "node486"
	},
	node488:{
		name: "Solar power Prestige conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 22% more for each Radio tower, and Radio tower generates 4.4% more for each Solar power", 
		degree: 270,
		price: 118111600640,
		effect: ()=> {Game.permanent.solar_power_conversion += 4},
		radius: 65,
		img: "solar_power_conv",
		lvl: 102,
		parant_id: "node487"
	},
	node489:{
		name: "Solar power Prestige conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 26% more for each Radio tower, and Radio tower generates 5.2% more for each Solar power", 
		degree: 180,
		price: 128849018880,
		effect: ()=> {Game.permanent.solar_power_conversion += 4},
		radius: 65,
		img: "solar_power_conv",
		lvl: 103,
		parant_id: "node488"
	},
	node490:{
		name: "Solar power Prestige conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Solar power generates 30% more for each Radio tower, and Radio tower generates 6% more for each Solar power", 
		degree: 270,
		price: 139586437120,
		effect: ()=> {Game.permanent.solar_power_conversion += 4},
		radius: 65,
		img: "solar_power_conv",
		lvl: 104,
		parant_id: "node489"
	},
	node198:{
		name: "Magnetic generator Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 1% more for each Solar power",
		degree: 180,
		price: 1850830,
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.01, "+", 3)},
		radius: 235,
		img: "magnatic_generator",
		lvl: 1,
		parant_id: "node188"
	},
	node199:{
		name: "Magnetic generator Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 2% more for each Solar power",
		degree: 325,
		price: 1850830*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "magnatic_generator",
		lvl: 2,
		parant_id: "node198"
	},
	node200:{
		name: "Magnetic generator Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 3% more for each Solar power",
		degree: 305,
		price: 1850830*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "magnatic_generator",
		lvl: 3,
		parant_id: "node199"
	},
	node201:{
		name: "Magnetic generator Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 4% more for each Solar power",
		degree: 270,
		price: 1850830*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "magnatic_generator",
		lvl: 4,
		parant_id: "node200"
	},
	node202:{
		name: "Magnetic generator Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 5% more for each Solar power",
		degree: 180,
		price: 1850830*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "magnatic_generator",
		lvl: 5,
		parant_id: "node201"
	},
	node203:{
		name: "Magnetic generator Mode 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 6% more for each Solar power",
		degree: 270,
		price: 1850830*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "magnatic_generator",
		lvl: 6,
		parant_id: "node202"
	},
	node204:{
		name: "Magnetic generator Mode 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 7% more for each Solar power",
		degree: 0,
		price: 1850830*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "magnatic_generator",
		lvl: 7,
		parant_id: "node203"
	},
	node205:{
		name: "Magnetic generator Mode 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 8% more for each Solar power",
		degree: 270,
		price: 1850830*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "magnatic_generator",
		lvl: 8,
		parant_id: "node204"
	},
	node206:{
		name: "Magnetic generator Mode 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 9% more for each Solar power",
		degree: 180,
		price: 1850830*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "magnatic_generator",
		lvl: 9,
		parant_id: "node205"
	},
	node207:{
		name: "Magnetic generator Mode 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 10% more for each Solar power",
		degree: 270,
		price: 1850830*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "magnatic_generator",
		lvl: 10,
		parant_id: "node206"
	},
	node277:{
		name: "Magnetic generator conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 1% more for each Radar dish, and Radar dish generates 0.2% more for each Magnetic generator",
		degree: 215,
		price: 2555408,
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 1},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 1,
		parant_id: "node198"
	},
	node278:{
		name: "Magnetic generator conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 2% more for each Radar dish, and Radar dish generates 0.4% more for each Magnetic generator",
		degree: 235,
		price: 2555408*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 1},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 2,
		parant_id: "node277"
	},
	node279:{
		name: "Magnetic generator conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 3% more for each Radar dish, and Radar dish generates 0.6% more for each Magnetic generator",
		degree: 270,
		price: 2555408*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 1},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 3,
		parant_id: "node278"
	},
	node280:{
		name: "Magnetic generator conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 4% more for each Radar dish, and Radar dish generates 0.8% more for each Magnetic generator",
		degree: 0,
		price: 2555408*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 1},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 4,
		parant_id: "node279"
	},
	node281:{
		name: "Magnetic generator conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 5% more for each Radar dish, and Radar dish generates 1% more for each Magnetic generator",
		degree: 270,
		price: 2555408*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 1},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 5,
		parant_id: "node280"
	},
	node282:{
		name: "Magnetic generator conversion 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 6% more for each Radar dish, and Radar dish generates 1.2% more for each Magnetic generator",
		degree: 180,
		price: 2555408*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 1},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 6,
		parant_id: "node281"
	},
	node283:{
		name: "Magnetic generator conversion 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 7% more for each Radar dish, and Radar dish generates 1.4% more for each Magnetic generator",
		degree: 270,
		price: 2555408*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 1},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 7,
		parant_id: "node282"
	},
	node284:{
		name: "Magnetic generator conversion 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 8% more for each Radar dish, and Radar dish generates 1.6% more for each Magnetic generator",
		degree: 0,
		price: 2555408*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 1},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 8,
		parant_id: "node283"
	},
	node285:{
		name: "Magnetic generator conversion 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 9% more for each Radar dish, and Radar dish generates 1.8% more for each Magnetic generator",
		degree: 270,
		price: 2555408*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 1},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 9,
		parant_id: "node284"
	},
	node286:{
		name: "Magnetic generator conversion 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 10% more for each Radar dish, and Radar dish generates 2% more for each Magnetic generator",
		degree: 180,
		price: 2555408*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 1},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 10,
		parant_id: "node285"
	},
	node491:{
		name: "Magnetic generator Prestige Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 20% more for each Solar power", 
		degree: 270,
		price: 96636764160,
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "magnatic_generator",
		lvl: 100,
		parant_id: "node207"
	},
	node492:{
		name: "Magnetic generator Prestige Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 30% more for each Solar power", 
		degree: 270,
		price: 107374182400,
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "magnatic_generator",
		lvl: 101,
		parant_id: "node491"
	},
	node493:{
		name: "Magnetic generator Prestige Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 40% more for each Solar power", 
		degree: 270,
		price: 118111600640,
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "magnatic_generator",
		lvl: 102,
		parant_id: "node492"
	},
	node494:{
		name: "Magnetic generator Prestige Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 50% more for each Solar power", 
		degree: 270,
		price: 128849018880,
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "magnatic_generator",
		lvl: 103,
		parant_id: "node493"
	},
	node495:{
		name: "Magnetic generator Prestige Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 60% more for each Solar power", 
		degree: 270,
		price: 139586437120,
		effect: ()=> {Game.permanent.magnetic_generator_Mode = preciseNumber(Game.permanent.magnetic_generator_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 104,
		parant_id: "node494"
	},
	node496:{
		name: "Magnetic generator Prestige conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 14% more for each Radar dish, and Radar dish generates 2.8% more for each Magnetic generator", 
		degree: 270,
		price: 107374182400,
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 4},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 100,
		parant_id: "node286"
	},
	node497:{
		name: "Magnetic generator Prestige conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 18% more for each Radar dish, and Radar dish generates 3.6% more for each Magnetic generator", 
		degree: 0,
		price: 118111600640,
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 4},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 101,
		parant_id: "node496"
	},
	node498:{
		name: "Magnetic generator Prestige conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 22% more for each Radar dish, and Radar dish generates 4.4% more for each Magnetic generator", 
		degree: 270,
		price: 128849018880,
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 4},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 102,
		parant_id: "node497"
	},
	node499:{
		name: "Magnetic generator Prestige conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 26% more for each Radar dish, and Radar dish generates 5.2% more for each Magnetic generator", 
		degree: 180,
		price: 139586437120,
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 4},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 103,
		parant_id: "node498"
	},
	node500:{
		name: "Magnetic generator Prestige conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Magnetic generator generates 30% more for each Radar dish, and Radar dish generates 6% more for each Magnetic generator", 
		degree: 270,
		price: 150323855360,
		effect: ()=> {Game.permanent.magnetic_generator_conversion += 4},
		radius: 65,
		img: "magnatic_generator_conv",
		lvl: 104,
		parant_id: "node499"
	},
	node237:{
		name: "Radio tower 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 1% more for each Magnetic generator",
		degree: 180,
		price: 3526463,
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.01, "+", 3)},
		radius: 235,
		img: "radio_tower",
		lvl: 1,
		parant_id: "node198"
	},
	node238:{
		name: "Radio tower Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 2% more for each Magnetic generator",
		degree: 325,
		price: 3526463*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 2,
		parant_id: "node237"
	},
	node239:{
		name: "Radio tower Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 3% more for each Magnetic generator",
		degree: 305,
		price: 3526463*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 3,
		parant_id: "node238"
	},
	node240:{
		name: "Radio tower Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 4% more for each Magnetic generator",
		degree: 270,
		price: 3526463*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 4,
		parant_id: "node239"
	},
	node241:{
		name: "Radio tower Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 5% more for each Magnetic generator",
		degree: 180,
		price: 3526463*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 5,
		parant_id: "node240"
	},
	node242:{
		name: "Radio tower Mode 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 6% more for each Magnetic generator",
		degree: 270,
		price: 3526463*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 6,
		parant_id: "node241"
	},
	node243:{
		name: "Radio tower Mode 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 7% more for each Magnetic generator",
		degree: 0,
		price: 3526463*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 7,
		parant_id: "node242"
	},
	node244:{
		name: "Radio tower Mode 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 8% more for each Magnetic generator",
		degree: 270,
		price: 3526463*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 8,
		parant_id: "node243"
	},
	node245:{
		name: "Radio tower Mode 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 9% more for each Magnetic generator",
		degree: 180,
		price: 3526463*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 9,
		parant_id: "node244"
	},
	node246:{
		name: "Radio tower Mode 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 10% more for each Magnetic generator",
		degree: 270,
		price: 3526463*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 10,
		parant_id: "node245"
	},
	node290:{
		name: "Radio tower conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 1% more for each Satellite, and Satellite generates 0.2% more for each Radio tower",
		degree: 215,
		price: 4864220,
		effect: ()=> {Game.permanent.radio_tower_conversion += 1},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 1,
		parant_id: "node237"
	},
	node291:{
		name: "Radio tower conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 2% more for each Satellite, and Satellite generates 0.4% more for each Radio tower",
		degree: 235,
		price: 4864220*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.radio_tower_conversion += 1},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 2,
		parant_id: "node290"
	},
	node292:{
		name: "Radio tower conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 3% more for each Satellite, and Satellite generates 0.6% more for each Radio tower",
		degree: 270,
		price: 4864220*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.radio_tower_conversion += 1},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 3,
		parant_id: "node291"
	},
	node293:{
		name: "Radio tower conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 4% more for each Satellite, and Satellite generates 0.8% more for each Radio tower",
		degree: 0,
		price: 4864220*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.radio_tower_conversion += 1},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 4,
		parant_id: "node292"
	},
	node294:{
		name: "Radio tower conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 5% more for each Satellite, and Satellite generates 1% more for each Radio tower",
		degree: 270,
		price: 4864220*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.radio_tower_conversion += 1},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 5,
		parant_id: "node293"
	},
	node295:{
		name: "Radio tower conversion 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 6% more for each Satellite, and Satellite generates 1.2% more for each Radio tower",
		degree: 180,
		price: 4864220*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.radio_tower_conversion += 1},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 6,
		parant_id: "node294"
	},
	node296:{
		name: "Radio tower conversion 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 7% more for each Satellite, and Satellite generates 1.4% more for each Radio tower",
		degree: 270,
		price: 4864220*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.radio_tower_conversion += 1},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 7,
		parant_id: "node295"
	},
	node297:{
		name: "Radio tower conversion 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 8% more for each Satellite, and Satellite generates 1.6% more for each Radio tower",
		degree: 0,
		price: 4864220*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.radio_tower_conversion += 1},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 8,
		parant_id: "node296"
	},
	node298:{
		name: "Radio tower conversion 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 9% more for each Satellite, and Satellite generates 1.8% more for each Radio tower",
		degree: 270,
		price: 4864220*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.radio_tower_conversion += 1},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 9,
		parant_id: "node297"
	},
	node299:{
		name: "Radio tower conversion 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 10% more for each Satellite, and Satellite generates 2% more for each Radio tower",
		degree: 180,
		price: 4864220*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.radio_tower_conversion += 1},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 10,
		parant_id: "node298"
	},
	node501:{
		name: "Radio tower Prestige Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 20% more for each Magnetic generator", 
		degree: 270,
		price: 107374182400,
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 100,
		parant_id: "node246"
	},
	node502:{
		name: "Radio tower Prestige Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 30% more for each Magnetic generator", 
		degree: 270,
		price: 118111600640,
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 101,
		parant_id: "node501"
	},
	node503:{
		name: "Radio tower Prestige Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 40% more for each Magnetic generator", 
		degree: 270,
		price: 128849018880,
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 102,
		parant_id: "node502"
	},
	node504:{
		name: "Radio tower Prestige Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 50% more for each Magnetic generator", 
		degree: 270,
		price: 139586437120,
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 103,
		parant_id: "node503"
	},
	node505:{
		name: "Radio tower Prestige Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 60% more for each Magnetic generator", 
		degree: 270,
		price: 150323855360,
		effect: ()=> {Game.permanent.radio_tower_Mode = preciseNumber(Game.permanent.radio_tower_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "radio_tower",
		lvl: 104,
		parant_id: "node504"
	},
	node506:{
		name: "Radio tower Prestige conversion 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 14% more for each Satellite, and Satellite generates 2.8% more for each Radio tower", 
		degree: 270,
		price: 118111600640,
		effect: ()=> {Game.permanent.radio_tower_conversion += 4},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 100,
		parant_id: "node299"
	},
	node507:{
		name: "Radio tower Prestige conversion 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 18% more for each Satellite, and Satellite generates 3.6% more for each Radio tower", 
		degree: 0,
		price: 128849018880,
		effect: ()=> {Game.permanent.radio_tower_conversion += 4},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 101,
		parant_id: "node506"
	},
	node508:{
		name: "Radio tower Prestige conversion 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 22% more for each Satellite, and Satellite generates 4.4% more for each Radio tower", 
		degree: 270,
		price: 139586437120,
		effect: ()=> {Game.permanent.radio_tower_conversion += 4},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 102,
		parant_id: "node507"
	},
	node509:{
		name: "Radio tower Prestige conversion 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 26% more for each Satellite, and Satellite generates 5.2% more for each Radio tower", 
		degree: 180,
		price: 150323855360,
		effect: ()=> {Game.permanent.radio_tower_conversion += 4},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 103,
		parant_id: "node508"
	},
	node510:{
		name: "Radio tower Prestige conversion 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radio tower generates 30% more for each Satellite, and Satellite generates 6% more for each Radio tower", 
		degree: 270,
		price: 161061273600,
		effect: ()=> {Game.permanent.radio_tower_conversion += 4},
		radius: 65,
		img: "radio_tower_conv",
		lvl: 104,
		parant_id: "node509"
	},
	node247:{
		name: "Radar dish Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 1% more for each Radio tower",
		degree: 90,
		price: 6737133,
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.01, "+", 3)},
		radius: 75,
		img: "radar_dish",
		lvl: 1,
		parant_id: "node237"
	},
	node248:{
		name: "Radar dish Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 2% more for each Radio tower",
		degree: 35,
		price: 6737133*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 2,
		parant_id: "node247"
	},
	node249:{
		name: "Radar dish Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 3% more for each Radio tower",
		degree: 55,
		price: 6737133*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 3,
		parant_id: "node248"
	},
	node250:{
		name: "Radar dish Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 4% more for each Radio tower",
		degree: 90,
		price: 6737133*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 4,
		parant_id: "node249"
	},
	node251:{
		name: "Radar dish Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 5% more for each Radio tower",
		degree: 180,
		price: 6737133*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 5,
		parant_id: "node250"
	},
	node252:{
		name: "Radar dish Mode 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 6% more for each Radio tower",
		degree: 90,
		price: 6737133*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 6,
		parant_id: "node251"
	},
	node253:{
		name: "Radar dish Mode 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 7% more for each Radio tower",
		degree: 0,
		price: 6737133*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 7,
		parant_id: "node252"
	},
	node254:{
		name: "Radar dish Mode 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 8% more for each Radio tower",
		degree: 90,
		price: 6737133*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 8,
		parant_id: "node253"
	},
	node255:{
		name: "Radar dish Mode 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 9% more for each Radio tower",
		degree: 180,
		price: 6737133*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 9,
		parant_id: "node254"
	},
	node256:{
		name: "Radar dish Mode 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 10% more for each Radio tower",
		degree: 90,
		price: 6737133*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 10,
		parant_id: "node255"
	},
	node511:{
		name: "Radar dish Prestige Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 20% more for each Radio tower", 
		degree: 90,
		price: 118111600640,
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 100,
		parant_id: "node256"
	},
	node512:{
		name: "Radar dish Prestige Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 30% more for each Radio tower", 
		degree: 90,
		price: 128849018880,
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 101,
		parant_id: "node511"
	},
	node513:{
		name: "Radar dish Prestige Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 40% more for each Radio tower", 
		degree: 90,
		price: 139586437120,
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 102,
		parant_id: "node512"
	},
	node514:{
		name: "Radar dish Prestige Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 50% more for each Radio tower", 
		degree: 90,
		price: 150323855360,
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 103,
		parant_id: "node513"
	},
	node515:{
		name: "Radar dish Prestige Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Radar dish generates 60% more for each Radio tower", 
		degree: 90,
		price: 161061273600,
		effect: ()=> {Game.permanent.radar_dish_Mode = preciseNumber(Game.permanent.radar_dish_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "radar_dish",
		lvl: 104,
		parant_id: "node514"
	},
	node257:{
		name: "Satellite Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 1% more for each Radar dish",
		degree: 0,
		price: 12731709,
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.01, "+", 3)},
		radius: 235,
		img: "satellite",
		lvl: 1,
		parant_id: "node247"
	},
	node258:{
		name: "Satellite Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 2% more for each Radar dish",
		degree: 35,
		price: 12731709*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 2,
		parant_id: "node257"
	},
	node259:{
		name: "Satellite Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 3% more for each Radar dish",
		degree: 55,
		price: 12731709*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 3,
		parant_id: "node258"
	},
	node260:{
		name: "Satellite Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 4% more for each Radar dish",
		degree: 90,
		price: 12731709*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 4,
		parant_id: "node259"
	},
	node261:{
		name: "Satellite Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 5% more for each Radar dish",
		degree: 180,
		price: 12731709*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 5,
		parant_id: "node260"
	},
	node262:{
		name: "Satellite Mode 6", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 6% more for each Radar dish",
		degree: 90,
		price: 12731709*Math.pow(h_lvl_pow, 6),
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 6,
		parant_id: "node261"
	},
	node263:{
		name: "Satellite Mode 7", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 7% more for each Radar dish",
		degree: 0,
		price: 12731709*Math.pow(h_lvl_pow, 7),
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 7,
		parant_id: "node262"
	},
	node264:{
		name: "Satellite Mode 8", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 8% more for each Radar dish",
		degree: 90,
		price: 12731709*Math.pow(h_lvl_pow, 8),
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 8,
		parant_id: "node263"
	},
	node265:{
		name: "Satellite Mode 9", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 9% more for each Radar dish",
		degree: 180,
		price: 12731709*Math.pow(h_lvl_pow, 9),
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 9,
		parant_id: "node264"
	},
	node266:{
		name: "Satellite Mode 10", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 10% more for each Radar dish",
		degree: 90,
		price: 12731709*Math.pow(h_lvl_pow, 10),
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.01, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 10,
		parant_id: "node265"
	},
	node516:{
		name: "Satellite Prestige Mode 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 20% more for each Radar dish", 
		degree: 90,
		price: 128849018880,
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 100,
		parant_id: "node266"
	},
	node517:{
		name: "Satellite Prestige Mode 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 30% more for each Radar dish", 
		degree: 90,
		price: 139586437120,
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 101,
		parant_id: "node516"
	},
	node518:{
		name: "Satellite Prestige Mode 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 40% more for each Radar dish", 
		degree: 90,
		price: 150323855360,
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 102,
		parant_id: "node517"
	},
	node519:{
		name: "Satellite Prestige Mode 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 50% more for each Radar dish", 
		degree: 90,
		price: 161061273600,
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 103,
		parant_id: "node518"
	},
	node520:{
		name: "Satellite Prestige Mode 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Satellite generates 60% more for each Radar dish", 
		degree: 90,
		price: 171798691840,
		effect: ()=> {Game.permanent.satellite_Mode = preciseNumber(Game.permanent.satellite_Mode, 0.1, "+", 3)},
		radius: 65,
		img: "satellite",
		lvl: 104,
		parant_id: "node519"
	},
	//==============================

	//==============================
	node37:{
		name: "Solar power", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Hardware<br><br>Unlock Solar power hardware and its softwares", 
		degree: 150,
		price: 524288, //512KB
		effect: ()=> {
			if(!Game.impermanent.hardware_in_list.includes("h8"))
				Game.impermanent.hardware_in_list.push("h8")},
		radius: 85,
		img: "solar_power",
		lvl: 1,
		parant_id: "node0"
	},
	node38:{
		name: "Magnetic generator", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Hardware<br><br>Unlock Magnetic Generator hardware and its softwares", 
		degree: 180,
		price: 1048576, //1MB
		effect: ()=> {
			if(!Game.impermanent.hardware_in_list.includes("h9"))
				Game.impermanent.hardware_in_list.push("h9")},
		radius: 65,
		img: "magnatic_generator",
		lvl: 1,
		parant_id: "node37"
	},
	node234:{
		name: "Radio tower", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Hardware<br><br>Unlock Radio tower hardware and its softwares", 
		degree: 90,
		price: 2097152, //2MB
		effect: ()=> {
			if(!Game.impermanent.hardware_in_list.includes("h10"))
				Game.impermanent.hardware_in_list.push("h10")},
		radius: 65,
		img: "radio_tower",
		lvl: 1,
		parant_id: "node38"
	},
	node235:{
		name: "Radar dish", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Hardware<br><br>Unlock Radar dish hardware and its softwares", 
		degree: 90,
		price: 4194304, //4MB
		effect: ()=> {
			if(!Game.impermanent.hardware_in_list.includes("h11"))
				Game.impermanent.hardware_in_list.push("h11")},
		radius: 65,
		img: "radar_dish",
		lvl: 1,
		parant_id: "node234"
	},
	node236:{
		name: "Satellite", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Hardware<br><br>Unlock Satellite hardware and its softwares", 
		degree: 90,
		price: 8388608, //8MB
		effect: ()=> {
			if(!Game.impermanent.hardware_in_list.includes("h12"))
				Game.impermanent.hardware_in_list.push("h12")},
		radius: 65,
		img: "satellite",
		lvl: 1,
		parant_id: "node235"
	},
	//==============================

	//==============================
	node39:{
		name: "Bot Manager:_root:", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Gain accsess to Bot Manager research nodes", 
		degree: 348.5,
		price: 5120, //5KB
		effect: ()=> {Game.impermanent.no_effect += 0},
		radius: 450,
		img: "robot_",
		lvl: 1,
		parant_id: "node0"
	},
	node398:{
		name: "Battle Bots", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Gain accsess to Battle Bots research nodes<br>"+con_span("Important: ", "var(--negativeClr)")+"Will be implemented in future updates", 
		degree: 0,
		price: Infinity, 
		effect: ()=> {Game.permanent.no_effect += 0},
		radius: 750,
		img: "battle_bot",
		lvl: 1,
		parant_id: "node39"
	},
	node300:{
		name: "Scrapping energy 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Scrapping maximum energy capacity by +50", 
		degree: 270,
		price: 262656000,
		effect: ()=> {Game.permanent.scrapping_max_energy += 50},
		radius: 500,
		img: "scrap_energy",
		lvl: 1,
		parant_id: "node39"
	},
	node301:{
		name: "Scrapping energy 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Scrapping maximum energy capacity by +100", 
		degree: 0,
		price: 262656000*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.scrapping_max_energy += 100},
		radius: 75,
		img: "scrap_energy",
		lvl: 2,
		parant_id: "node300"
	},
	node302:{
		name: "Scrapping energy 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Scrapping maximum energy capacity by +100", 
		degree: 0,
		price: 262656000*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.scrapping_max_energy += 100},
		radius: 75,
		img: "scrap_energy",
		lvl: 3,
		parant_id: "node301"
	},
	node303:{
		name: "Scrapping energy 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Scrapping maximum energy capacity by +100", 
		degree: 0,
		price: 262656000*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.scrapping_max_energy += 100},
		radius: 75,
		img: "scrap_energy",
		lvl: 4,
		parant_id: "node302"
	},
	node304:{
		name: "Scrapping energy 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Scrapping maximum energy capacity by +100", 
		degree: 0,
		price: 262656000*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.scrapping_max_energy += 100},
		radius: 75,
		img: "scrap_energy",
		lvl: 5,
		parant_id: "node303"
	},
	node305:{
		name: "Scrapping production 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Scrapping base production by +0.2", 
		degree: 45,
		price: 354585600,
		effect: ()=> {Game.permanent.scrapping_base_effect = preciseNumber(Game.permanent.scrapping_base_effect, 0.2, "+", 1)},
		radius: 105,
		img: "scrap_effect",
		lvl: 1,
		parant_id: "node300"
	},
	node306:{
		name: "Scrapping production 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Scrapping base production by +0.2", 
		degree: 0,
		price: 354585600*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.scrapping_base_effect = preciseNumber(Game.permanent.scrapping_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "scrap_effect",
		lvl: 2,
		parant_id: "node305"
	},
	node307:{
		name: "Scrapping production 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Scrapping base production by +0.2", 
		degree: 0,
		price: 354585600*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.scrapping_base_effect = preciseNumber(Game.permanent.scrapping_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "scrap_effect",
		lvl: 3,
		parant_id: "node306"
	},
	node308:{
		name: "Scrapping production 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Scrapping base production by +0.2", 
		degree: 0,
		price: 354585600*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.scrapping_base_effect = preciseNumber(Game.permanent.scrapping_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "scrap_effect",
		lvl: 4,
		parant_id: "node307"
	},
	node309:{
		name: "Scrapping production 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Scrapping base production by +0.2", 
		degree: 315,
		price: 354585600*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.scrapping_base_effect = preciseNumber(Game.permanent.scrapping_base_effect, 0.2, "+", 1)},
		radius: 105,
		img: "scrap_effect",
		lvl: 5,
		parant_id: "node308"
	},
	node310:{
		name: "Recycling energy 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Recycling maximum energy capacity by +50", 
		degree: 270,
		price: 872413545,
		effect: ()=> {Game.permanent.recycling_max_energy += 50},
		radius: 65,
		img: "recycle_energy",
		lvl: 1,
		parant_id: "node300"
	},
	node311:{
		name: "Recycling energy 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Recycling maximum energy capacity by +100", 
		degree: 0,
		price: 872413545*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.recycling_max_energy += 100},
		radius: 75,
		img: "recycle_energy",
		lvl: 2,
		parant_id: "node310"
	},
	node312:{
		name: "Recycling energy 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Recycling maximum energy capacity by +100", 
		degree: 0,
		price: 872413545*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.recycling_max_energy += 100},
		radius: 75,
		img: "recycle_energy",
		lvl: 3,
		parant_id: "node311"
	},
	node313:{
		name: "Recycling energy 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Recycling maximum energy capacity by +100", 
		degree: 0,
		price: 872413545*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.recycling_max_energy += 100},
		radius: 75,
		img: "recycle_energy",
		lvl: 4,
		parant_id: "node312"
	},
	node314:{
		name: "Recycling energy 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Recycling maximum energy capacity by +100", 
		degree: 0,
		price: 872413545*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.recycling_max_energy += 100},
		radius: 75,
		img: "recycle_energy",
		lvl: 5,
		parant_id: "node313"
	},
	node315:{
		name: "Recycling production 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Recycling base production by +0.2", 
		degree: 315,
		price: 1177758286,
		effect: ()=> {Game.permanent.recycling_base_effect = preciseNumber(Game.permanent.recycling_base_effect, 0.2, "+", 1)},
		radius: 105,
		img: "recycle_effect",
		lvl: 1,
		parant_id: "node310"
	},
	node316:{
		name: "Recycling production 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Recycling base production by +0.2", 
		degree: 0,
		price: 1177758286*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.recycling_base_effect = preciseNumber(Game.permanent.recycling_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "recycle_effect",
		lvl: 2,
		parant_id: "node315"
	},
	node317:{
		name: "Recycling production 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Recycling base production by +0.2", 
		degree: 0,
		price: 1177758286*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.recycling_base_effect = preciseNumber(Game.permanent.recycling_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "recycle_effect",
		lvl: 3,
		parant_id: "node316"
	},
	node318:{
		name: "Recycling production 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Recycling base production by +0.2", 
		degree: 0,
		price: 1177758286*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.recycling_base_effect = preciseNumber(Game.permanent.recycling_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "recycle_effect",
		lvl: 4,
		parant_id: "node317"
	},
	node319:{
		name: "Recycling production 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Recycling base production by +0.2", 
		degree: 45,
		price: 1177758286*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.recycling_base_effect = preciseNumber(Game.permanent.recycling_base_effect, 0.2, "+", 1)},
		radius: 105,
		img: "recycle_effect",
		lvl: 5,
		parant_id: "node318"
	},
	node320:{
		name: "Mining energy 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Mining maximum energy capacity by +50", 
		degree: 270,
		price: 2897727044,
		effect: ()=> {Game.permanent.mining_max_energy += 50},
		radius: 205,
		img: "mine_energy",
		lvl: 1,
		parant_id: "node310"
	},
	node321:{
		name: "Mining energy 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Mining maximum energy capacity by +100", 
		degree: 0,
		price: 2897727044*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.mining_max_energy += 100},
		radius: 75,
		img: "mine_energy",
		lvl: 2,
		parant_id: "node320"
	},
	node322:{
		name: "Mining energy 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Mining maximum energy capacity by +100", 
		degree: 0,
		price: 2897727044*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.mining_max_energy += 100},
		radius: 75,
		img: "mine_energy",
		lvl: 3,
		parant_id: "node321"
	},
	node323:{
		name: "Mining energy 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Mining maximum energy capacity by +100", 
		degree: 0,
		price: 2897727044*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.mining_max_energy += 100},
		radius: 75,
		img: "mine_energy",
		lvl: 4,
		parant_id: "node322"
	},
	node324:{
		name: "Mining energy 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Mining maximum energy capacity by +100", 
		degree: 0,
		price: 2897727044*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.mining_max_energy += 100},
		radius: 75,
		img: "mine_energy",
		lvl: 5,
		parant_id: "node323"
	},
	node325:{
		name: "Mining production 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Mining base production by +0.2", 
		degree: 45,
		price: 3911931509,
		effect: ()=> {Game.permanent.mining_base_effect = preciseNumber(Game.permanent.mining_base_effect, 0.2, "+", 1)},
		radius: 105,
		img: "mine_effect",
		lvl: 1,
		parant_id: "node320"
	},
	node326:{
		name: "Mining production 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Mining base production by +0.2", 
		degree: 0,
		price: 3911931509*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.mining_base_effect = preciseNumber(Game.permanent.mining_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "mine_effect",
		lvl: 2,
		parant_id: "node325"
	},
	node327:{
		name: "Mining production 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Mining base production by +0.2", 
		degree: 0,
		price: 3911931509*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.mining_base_effect = preciseNumber(Game.permanent.mining_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "mine_effect",
		lvl: 3,
		parant_id: "node326"
	},
	node328:{
		name: "Mining production 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Mining base production by +0.2", 
		degree: 0,
		price: 3911931509*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.mining_base_effect = preciseNumber(Game.permanent.mining_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "mine_effect",
		lvl: 4,
		parant_id: "node327"
	},
	node329:{
		name: "Mining production 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Mining base production by +0.2", 
		degree: 315,
		price: 3911931509*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.mining_base_effect = preciseNumber(Game.permanent.mining_base_effect, 0.2, "+", 1)},
		radius: 105,
		img: "mine_effect",
		lvl: 5,
		parant_id: "node328"
	},
	node330:{
		name: "Casting energy 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Casting maximum energy capacity by +50", 
		degree: 270,
		price: 9624818488,
		effect: ()=> {Game.permanent.cast_max_energy += 50},
		radius: 65,
		img: "casting_energy",
		lvl: 1,
		parant_id: "node320"
	},
	node331:{
		name: "Casting energy 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Casting maximum energy capacity by +100", 
		degree: 0,
		price: 9624818488*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.cast_max_energy += 100},
		radius: 75,
		img: "casting_energy",
		lvl: 2,
		parant_id: "node330"
	},
	node332:{
		name: "Casting energy 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Casting maximum energy capacity by +100", 
		degree: 0,
		price: 9624818488*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.cast_max_energy += 100},
		radius: 75,
		img: "casting_energy",
		lvl: 3,
		parant_id: "node331"
	},
	node333:{
		name: "Casting energy 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Casting maximum energy capacity by +100", 
		degree: 0,
		price: 9624818488*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.cast_max_energy += 100},
		radius: 75,
		img: "casting_energy",
		lvl: 4,
		parant_id: "node332"
	},
	node334:{
		name: "Casting energy 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Casting maximum energy capacity by +100", 
		degree: 0,
		price: 9624818488*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.cast_max_energy += 100},
		radius: 75,
		img: "casting_energy",
		lvl: 5,
		parant_id: "node333"
	},
	node335:{
		name: "Casting production 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Casting base production by +0.2", 
		degree: 315,
		price: 12993504962,
		effect: ()=> {Game.permanent.cast_base_effect = preciseNumber(Game.permanent.cast_base_effect, 0.2, "+", 1)},
		radius: 105,
		img: "casting_effect",
		lvl: 1,
		parant_id: "node330"
	},
	node336:{
		name: "Casting production 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Casting base production by +0.2", 
		degree: 0,
		price: 12993504962*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.cast_base_effect = preciseNumber(Game.permanent.cast_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "casting_effect",
		lvl: 2,
		parant_id: "node335"
	},
	node337:{
		name: "Casting production 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Casting base production by +0.2", 
		degree: 0,
		price: 12993504962*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.cast_base_effect = preciseNumber(Game.permanent.cast_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "casting_effect",
		lvl: 3,
		parant_id: "node336"
	},
	node338:{
		name: "Casting production 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Casting base production by +0.2", 
		degree: 0,
		price: 12993504962*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.cast_base_effect = preciseNumber(Game.permanent.cast_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "casting_effect",
		lvl: 4,
		parant_id: "node337"
	},
	node339:{
		name: "Casting production 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Casting base production by +0.2", 
		degree: 45,
		price: 12993504962*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.cast_base_effect = preciseNumber(Game.permanent.cast_base_effect, 0.2, "+", 1)},
		radius: 105,
		img: "casting_effect",
		lvl: 5,
		parant_id: "node338"
	},
	node340:{
		name: "Exploring energy 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Exploring maximum energy capacity by +50", 
		degree: 270,
		price: 31968894760,
		effect: ()=> {Game.permanent.exploring_max_energy += 50},
		radius: 205,
		img: "explor_energy",
		lvl: 1,
		parant_id: "node330"
	},
	node341:{
		name: "Exploring energy 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Exploring maximum energy capacity by +100", 
		degree: 0,
		price: 31968894760*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.exploring_max_energy += 100},
		radius: 75,
		img: "explor_energy",
		lvl: 2,
		parant_id: "node340"
	},
	node342:{
		name: "Exploring energy 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Exploring maximum energy capacity by +100", 
		degree: 0,
		price: 31968894760*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.exploring_max_energy += 100},
		radius: 75,
		img: "explor_energy",
		lvl: 3,
		parant_id: "node341"
	},
	node343:{
		name: "Exploring energy 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Exploring maximum energy capacity by +100", 
		degree: 0,
		price: 31968894760*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.exploring_max_energy += 100},
		radius: 75,
		img: "explor_energy",
		lvl: 4,
		parant_id: "node342"
	},
	node344:{
		name: "Exploring energy 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Exploring maximum energy capacity by +100", 
		degree: 0,
		price: 31968894760*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.exploring_max_energy += 100},
		radius: 75,
		img: "explor_energy",
		lvl: 5,
		parant_id: "node343"
	},
	node345:{
		name: "Exploring production 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Exploring base production by +0.2", 
		degree: 45,
		price: 43158007930,
		effect: ()=> {Game.permanent.exploring_base_effect = preciseNumber(Game.permanent.exploring_base_effect, 0.2, "+", 1)},
		radius: 105,
		img: "explor_effect",
		lvl: 1,
		parant_id: "node340"
	},
	node346:{
		name: "Exploring production 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Exploring base production by +0.2", 
		degree: 0,
		price: 43158007930*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.exploring_base_effect = preciseNumber(Game.permanent.exploring_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "explor_effect",
		lvl: 2,
		parant_id: "node345"
	},
	node347:{
		name: "Exploring production 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Exploring base production by +0.2", 
		degree: 0,
		price: 43158007930*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.exploring_base_effect = preciseNumber(Game.permanent.exploring_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "explor_effect",
		lvl: 3,
		parant_id: "node346"
	},
	node348:{
		name: "Exploring production 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Exploring base production by +0.2", 
		degree: 0,
		price: 43158007930*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.exploring_base_effect = preciseNumber(Game.permanent.exploring_base_effect, 0.2, "+", 1)},
		radius: 75,
		img: "explor_effect",
		lvl: 4,
		parant_id: "node347"
	},
	node349:{
		name: "Exploring production 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Exploring base production by +0.2", 
		degree: 315,
		price: 43158007930*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.exploring_base_effect = preciseNumber(Game.permanent.exploring_base_effect, 0.2, "+", 1)},
		radius: 105,
		img: "explor_effect",
		lvl: 5,
		parant_id: "node348"
	},
	node350:{
		name: "Auto clicker energy 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto clicker maximum energy capacity by +5", 
		degree: 345,
		price: 478690560,
		effect: ()=> {Game.permanent.auto_clicker_max_energy += 5},
		radius: 154,
		img: "clicker_energy",
		lvl: 1,
		parant_id: "node39"
	},
	node351:{
		name: "Auto clicker energy 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto clicker maximum energy capacity by +10", 
		degree: 270,
		price: 478690560*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.auto_clicker_max_energy += 10},
		radius: 65,
		img: "clicker_energy",
		lvl: 2,
		parant_id: "node350"
	},
	node352:{
		name: "Auto clicker energy 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto clicker maximum energy capacity by +10", 
		degree: 270,
		price: 478690560*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.auto_clicker_max_energy += 10},
		radius: 65,
		img: "clicker_energy",
		lvl: 3,
		parant_id: "node351"
	},
	node353:{
		name: "Auto clicker energy 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto clicker maximum energy capacity by +10", 
		degree: 270,
		price: 478690560*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.auto_clicker_max_energy += 10},
		radius: 65,
		img: "clicker_energy",
		lvl: 4,
		parant_id: "node352"
	},
	node354:{
		name: "Auto clicker energy 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto clicker maximum energy capacity by +10", 
		degree: 270,
		price: 478690560*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.auto_clicker_max_energy += 10},
		radius: 65,
		img: "clicker_energy",
		lvl: 5,
		parant_id: "node353"
	},
	node355:{
		name: "Auto clicker effect 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto clicker base effect by +3%", 
		degree: 225,
		price: 646232256,
		effect: ()=> {Game.permanent.auto_clicker_base_effect += 3},
		radius: 95,
		img: "clicker_effect",
		lvl: 1,
		parant_id: "node350"
	},
	node356:{
		name: "Auto clicker effect 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto clicker base effect by +3%", 
		degree: 270,
		price: 646232256*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.auto_clicker_base_effect += 3},
		radius: 65,
		img: "clicker_effect",
		lvl: 2,
		parant_id: "node355"
	},
	node357:{
		name: "Auto clicker effect 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto clicker base effect by +3%", 
		degree: 270,
		price: 646232256*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.auto_clicker_base_effect += 3},
		radius: 65,
		img: "clicker_effect",
		lvl: 3,
		parant_id: "node356"
	},
	node358:{
		name: "Auto clicker effect 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto clicker base effect by +3%", 
		degree: 270,
		price: 646232256*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.auto_clicker_base_effect += 3},
		radius: 65,
		img: "clicker_effect",
		lvl: 4,
		parant_id: "node357"
	},
	node359:{
		name: "Auto clicker effect 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto clicker base effect by +3%", 
		degree: 315,
		price: 646232256*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.auto_clicker_base_effect += 3},
		radius: 95,
		img: "clicker_effect",
		lvl: 5,
		parant_id: "node358"
	},
	node360:{
		name: "Network listener energy 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Network listener maximum energy capacity by +5", 
		degree: 0,
		price: 1589973687,
		effect: ()=> {Game.permanent.network_listener_max_energy += 5},
		radius: 75,
		img: "data_energy",
		lvl: 1,
		parant_id: "node350"
	},
	node361:{
		name: "Network listener energy 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Network listener maximum energy capacity by +10", 
		degree: 270,
		price: 1589973687*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.network_listener_max_energy += 10},
		radius: 65,
		img: "data_energy",
		lvl: 2,
		parant_id: "node360"
	},
	node362:{
		name: "Network listener energy 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Network listener maximum energy capacity by +10", 
		degree: 270,
		price: 1589973687*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.network_listener_max_energy += 10},
		radius: 65,
		img: "data_energy",
		lvl: 3,
		parant_id: "node361"
	},
	node363:{
		name: "Network listener energy 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Network listener maximum energy capacity by +10", 
		degree: 270,
		price: 1589973687*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.network_listener_max_energy += 10},
		radius: 65,
		img: "data_energy",
		lvl: 4,
		parant_id: "node362"
	},
	node364:{
		name: "Network listener energy 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Network listener maximum energy capacity by +10", 
		degree: 270,
		price: 1589973687*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.network_listener_max_energy += 10},
		radius: 65,
		img: "data_energy",
		lvl: 5,
		parant_id: "node363"
	},
	node365:{
		name: "Network listener effect 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Network listener base effect by +0.2%", 
		degree: 315,
		price: 2146464477,
		effect: ()=> {Game.permanent.network_listener_base_effect = preciseNumber(Game.permanent.network_listener_base_effect, 0.2, "+", 1)},
		radius: 95,
		img: "data_effect",
		lvl: 1,
		parant_id: "node360"
	},
	node366:{
		name: "Network listener effect 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Network listener base effect by +0.2%", 
		degree: 270,
		price: 2146464477*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.network_listener_base_effect = preciseNumber(Game.permanent.network_listener_base_effect, 0.2, "+", 1)},
		radius: 65,
		img: "data_effect",
		lvl: 2,
		parant_id: "node365"
	},
	node367:{
		name: "Network listener effect 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Network listener base effect by +0.2%", 
		degree: 270,
		price: 2146464477*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.network_listener_base_effect = preciseNumber(Game.permanent.network_listener_base_effect, 0.2, "+", 1)},
		radius: 65,
		img: "data_effect",
		lvl: 3,
		parant_id: "node366"
	},
	node368:{
		name: "Network listener effect 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Network listener base effect by +0.2%", 
		degree: 270,
		price: 2146464477*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.network_listener_base_effect = preciseNumber(Game.permanent.network_listener_base_effect, 0.2, "+", 1)},
		radius: 65,
		img: "data_effect",
		lvl: 4,
		parant_id: "node367"
	},
	node369:{
		name: "Network listener effect 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Network listener base effect by +0.2%", 
		degree: 225,
		price: 2146464477*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.network_listener_base_effect = preciseNumber(Game.permanent.network_listener_base_effect, 0.2, "+", 1)},
		radius: 95,
		img: "data_effect",
		lvl: 5,
		parant_id: "node368"
	},
	node370:{
		name: "Auto pressing energy 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto pressing maximum energy capacity by +5", 
		degree: 0,
		price: 5281107537,
		effect: ()=> {Game.permanent.auto_pressing_max_energy += 5},
		radius: 195,
		img: "pressing_energy",
		lvl: 1,
		parant_id: "node360"
	},
	node371:{
		name: "Auto pressing energy 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto pressing maximum energy capacity by +10", 
		degree: 270,
		price: 5281107537*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.auto_pressing_max_energy += 10},
		radius: 65,
		img: "pressing_energy",
		lvl: 2,
		parant_id: "node370"
	},
	node372:{
		name: "Auto pressing energy 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto pressing maximum energy capacity by +10", 
		degree: 270,
		price: 5281107537*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.auto_pressing_max_energy += 10},
		radius: 65,
		img: "pressing_energy",
		lvl: 3,
		parant_id: "node371"
	},
	node373:{
		name: "Auto pressing energy 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto pressing maximum energy capacity by +10", 
		degree: 270,
		price: 5281107537*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.auto_pressing_max_energy += 10},
		radius: 65,
		img: "pressing_energy",
		lvl: 4,
		parant_id: "node372"
	},
	node374:{
		name: "Auto pressing energy 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto pressing maximum energy capacity by +10", 
		degree: 270,
		price: 5281107537*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.auto_pressing_max_energy += 10},
		radius: 65,
		img: "pressing_energy",
		lvl: 5,
		parant_id: "node373"
	},
	node375:{
		name: "Auto pressing effect 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto pressing base effect by +1%", 
		degree: 225,
		price: 7129495176,
		effect: ()=> {Game.permanent.auto_pressing_base_effect += 1},
		radius: 95,
		img: "pressing_effect",
		lvl: 1,
		parant_id: "node370"
	},
	node376:{
		name: "Auto pressing effect 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto pressing base effect by +1%", 
		degree: 270,
		price: 7129495176*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.auto_pressing_base_effect += 1},
		radius: 65,
		img: "pressing_effect",
		lvl: 2,
		parant_id: "node375"
	},
	node377:{
		name: "Auto pressing effect 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto pressing base effect by +1%", 
		degree: 270,
		price: 7129495176*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.auto_pressing_base_effect += 1},
		radius: 65,
		img: "pressing_effect",
		lvl: 3,
		parant_id: "node376"
	},
	node378:{
		name: "Auto pressing effect 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto pressing base effect by +1%", 
		degree: 270,
		price: 7129495176*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.auto_pressing_base_effect += 1},
		radius: 65,
		img: "pressing_effect",
		lvl: 4,
		parant_id: "node377"
	},
	node379:{
		name: "Auto pressing effect 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto pressing base effect by +1%", 
		degree: 315,
		price: 7129495176*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.auto_pressing_base_effect += 1},
		radius: 95,
		img: "pressing_effect",
		lvl: 5,
		parant_id: "node378"
	},
	node380:{
		name: "Auto addition energy 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto addition maximum energy capacity by +5", 
		degree: 0,
		price: 5281107537,
		effect: ()=> {Game.permanent.auto_addition_max_energy += 5},
		radius: 75,
		img: "calculator_energy",
		lvl: 1,
		parant_id: "node370"
	},
	node381:{
		name: "Auto addition energy 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto addition maximum energy capacity by +10", 
		degree: 270,
		price: 5281107537*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.auto_addition_max_energy += 10},
		radius: 65,
		img: "calculator_energy",
		lvl: 2,
		parant_id: "node380"
	},
	node382:{
		name: "Auto addition energy 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto addition maximum energy capacity by +10", 
		degree: 270,
		price: 5281107537*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.auto_addition_max_energy += 10},
		radius: 65,
		img: "calculator_energy",
		lvl: 3,
		parant_id: "node381"
	},
	node383:{
		name: "Auto addition energy 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto addition maximum energy capacity by +10", 
		degree: 270,
		price: 5281107537*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.auto_addition_max_energy += 10},
		radius: 65,
		img: "calculator_energy",
		lvl: 4,
		parant_id: "node382"
	},
	node384:{
		name: "Auto addition energy 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto addition maximum energy capacity by +10", 
		degree: 270,
		price: 5281107537*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.auto_addition_max_energy += 10},
		radius: 65,
		img: "calculator_energy",
		lvl: 5,
		parant_id: "node383"
	},
	node385:{
		name: "Auto addition effect 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto addition base effect by +1%", 
		degree: 315,
		price: 7129495176,
		effect: ()=> {Game.permanent.auto_addition_base_effect += 1},
		radius: 95,
		img: "calculator_effect",
		lvl: 1,
		parant_id: "node380"
	},
	node386:{
		name: "Auto addition effect 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto addition base effect by +1%", 
		degree: 270,
		price: 7129495176*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.auto_addition_base_effect += 1},
		radius: 65,
		img: "calculator_effect",
		lvl: 2,
		parant_id: "node385"
	},
	node387:{
		name: "Auto addition effect 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto addition base effect by +1%", 
		degree: 270,
		price: 7129495176*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.auto_addition_base_effect += 1},
		radius: 65,
		img: "calculator_effect",
		lvl: 3,
		parant_id: "node386"
	},
	node388:{
		name: "Auto addition effect 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto addition base effect by +1%", 
		degree: 270,
		price: 7129495176*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.auto_addition_base_effect += 1},
		radius: 65,
		img: "calculator_effect",
		lvl: 4,
		parant_id: "node387"
	},
	node389:{
		name: "Auto addition effect 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto addition base effect by +1%", 
		degree: 225,
		price: 7129495176*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.auto_addition_base_effect += 1},
		radius: 95,
		img: "calculator_effect",
		lvl: 5,
		parant_id: "node388"
	},
	node399:{
		name: "Auto sequencer energy 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto sequencer maximum energy capacity by +5", 
		degree: 0,
		price: 5281107537,
		effect: ()=> {Game.permanent.auto_sequencer_max_energy += 5},
		radius: 195,
		img: "sequence_energy",
		lvl: 1,
		parant_id: "node380"
	},
	node400:{
		name: "Auto sequencer energy 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto sequencer maximum energy capacity by +10", 
		degree: 270,
		price: 5281107537*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.auto_sequencer_max_energy += 10},
		radius: 65,
		img: "sequence_energy",
		lvl: 2,
		parant_id: "node399"
	},
	node401:{
		name: "Auto sequencer energy 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto sequencer maximum energy capacity by +10", 
		degree: 270,
		price: 5281107537*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.auto_sequencer_max_energy += 10},
		radius: 65,
		img: "sequence_energy",
		lvl: 3,
		parant_id: "node400"
	},
	node402:{
		name: "Auto sequencer energy 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto sequencer maximum energy capacity by +10", 
		degree: 270,
		price: 5281107537*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.auto_sequencer_max_energy += 10},
		radius: 65,
		img: "sequence_energy",
		lvl: 4,
		parant_id: "node401"
	},
	node403:{
		name: "Auto sequencer energy 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto sequencer maximum energy capacity by +10", 
		degree: 270,
		price: 5281107537*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.auto_pressing_max_energy += 10},
		radius: 65,
		img: "sequence_energy",
		lvl: 5,
		parant_id: "node402"
	},
	node404:{
		name: "Auto sequencer effect 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto sequencer base effect by +1%", 
		degree: 225,
		price: 7129495176,
		effect: ()=> {Game.permanent.auto_sequencer_base_effect += 1},
		radius: 95,
		img: "sequence_effect",
		lvl: 1,
		parant_id: "node399"
	},
	node405:{
		name: "Auto sequencer effect 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto sequencer base effect by +1%", 
		degree: 270,
		price: 7129495176*Math.pow(h_lvl_pow, 2),
		effect: ()=> {Game.permanent.auto_sequencer_base_effect += 1},
		radius: 65,
		img: "sequence_effect",
		lvl: 2,
		parant_id: "node404"
	},
	node406:{
		name: "Auto sequencer effect 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto sequencer base effect by +1%", 
		degree: 270,
		price: 7129495176*Math.pow(h_lvl_pow, 3),
		effect: ()=> {Game.permanent.auto_sequencer_base_effect += 1},
		radius: 65,
		img: "sequence_effect",
		lvl: 3,
		parant_id: "node405"
	},
	node407:{
		name: "Auto sequencer effect 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto sequencer base effect by +1%", 
		degree: 270,
		price: 7129495176*Math.pow(h_lvl_pow, 4),
		effect: ()=> {Game.permanent.auto_sequencer_base_effect += 1},
		radius: 65,
		img: "sequence_effect",
		lvl: 4,
		parant_id: "node406"
	},
	node408:{
		name: "Auto sequencer effect 5", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Increase Auto sequencer base effect by +1%", 
		degree: 315,
		price: 7129495176*Math.pow(h_lvl_pow, 5),
		effect: ()=> {Game.permanent.auto_sequencer_base_effect += 1},
		radius: 95,
		img: "sequence_effect",
		lvl: 5,
		parant_id: "node407"
	},
	//==============================

	//==============================
	node208:{
		name: "Software engineering 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>With better Software engineering, Softwares are 2.5% cheaper", 
		degree: 315,
		price: 10485760, //10MB
		effect: ()=> {Game.permanent.software_engineering = preciseNumber(Game.permanent.software_engineering, 0.025, "-", 3)},
		radius: 155,
		img: "disc",
		lvl: 1,
		parant_id: "node0"
	},
	node209:{
		name: "Software engineering 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>With better Software engineering, Softwares are 2.5% cheaper", 
		degree: 270,
		price: 104857600, //100MB
		effect: ()=> {Game.permanent.software_engineering = preciseNumber(Game.permanent.software_engineering, 0.025, "-", 3)},
		radius: 65,
		img: "disc",
		lvl: 2,
		parant_id: "node208"
	},
	node210:{
		name: "Software engineering 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>With better Software engineering, Softwares are 2.5% cheaper", 
		degree: 270,
		price: 1073741824, //1GB
		effect: ()=> {Game.permanent.software_engineering = preciseNumber(Game.permanent.software_engineering, 0.025, "-", 3)},
		radius: 65,
		img: "disc",
		lvl: 3,
		parant_id: "node209"
	},
	node211:{
		name: "Software engineering 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>With better Software engineering, Softwares are 2.5% cheaper", 
		degree: 270,
		price: 10737418240, //10GB
		effect: ()=> {Game.permanent.software_engineering = preciseNumber(Game.permanent.software_engineering, 0.025, "-", 3)},
		radius: 65,
		img: "disc",
		lvl: 4,
		parant_id: "node210"
	},
	//==============================
		node40:{
		name: "World Map", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Gain accsess to World Map research nodes<br>"+con_span("Important: ", "var(--negativeClr)")+"Will be implemented in future updates", 
		degree: 40,
		price: Infinity,
		effect: ()=> {Game.impermanent.no_effect += 0},
		radius: 250,
		img: "world",
		lvl: 1,
		parant_id: "node0"
	},
	//==============================
	node41:{
		name: "Firewall v1.3.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Firewall v1.3.0 software. Increase Firewall chance to automatically block Hacks attempts by +5%", 
		degree: 315,
		price: 15728640, //15MB
		effect: ()=> {fire_wall_marks.push(["s4fw", 90])},
		radius: 95,
		img: "shieldcomb",
		lvl: 4,
		parant_id: "node208"
	},
	node42:{
		name: "Firewall v1.4.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Firewall v1.4.0 software. Increase Firewall chance to automatically block Hacks attempts by +5%", 
		degree: 270,
		price: 31457280, //30MB
		effect: ()=> {fire_wall_marks.push(["s5fw", 120])},
		radius: 65,
		img: "shieldcomb",
		lvl: 5,
		parant_id: "node41"
	},
	node43:{
		name: "Firewall v1.5.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Firewall v1.5.0 software. Increase Firewall chance to automatically block Hacks attempts by +5%", 
		degree: 270,
		price: 62914560, //60MB
		effect: ()=> {fire_wall_marks.push(["s6fw", 150])},
		radius: 65,
		img: "shieldcomb",
		lvl: 6,
		parant_id: "node42"
	},
	node44:{
		name: "Firewall v1.6.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Firewall v1.6.0 software. Increase Firewall chance to automatically block Hacks attempts by +5%", 
		degree: 270,
		price: 125829120, //120MB
		effect: ()=> {fire_wall_marks.push(["s7fw", 180])},
		radius: 65,
		img: "shieldcomb",
		lvl: 7,
		parant_id: "node43"
	},
	//==============================

	//==============================
	node45:{
		name: "Advanced Decoding algorithms v1.3.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Advanced Decoding algorithms v1.3.0 software. Data decoding is twice as efficient", 
		degree: 225,
		price: 15728640, //15MB
		effect: ()=> {adv_dcd_marks.push(["s4adv", 1000000000])},
		radius: 95,
		img: "data",
		lvl: 4,
		parant_id: "node208"
	},
	node46:{
		name: "Advanced Decoding algorithms v1.4.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Advanced Decoding algorithms v1.4.0 software. Data decoding is twice as efficient", 
		degree: 270,
		price: 31457280, //30MB
		effect: ()=> {adv_dcd_marks.push(["s5adv", 10000000000])},
		radius: 65,
		img: "data",
		lvl: 5,
		parant_id: "node45"
	},
	node47:{
		name: "Advanced Decoding algorithms v1.5.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Advanced Decoding algorithms v1.5.0 software. Data decoding is twice as efficient", 
		degree: 270,
		price: 62914560, //60MB
		effect: ()=> {adv_dcd_marks.push(["s6adv", 100000000000])},
		radius: 65,
		img: "data",
		lvl: 6,
		parant_id: "node46"
	},
	node48:{
		name: "Advanced Decoding algorithms v1.6.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Advanced Decoding algorithms v1.6.0 software. Data decoding is twice as efficient", 
		degree: 270,
		price: 125829120, //120MB
		effect: ()=> {adv_dcd_marks.push(["s7adv", 10000000000000])},
		radius: 65,
		img: "data",
		lvl: 7,
		parant_id: "node47"
	},
	node409:{
		name: "Advanced Decoding algorithms v1.6.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Advanced Decoding algorithms v1.7.0 software. Data decoding is twice as efficient", 
		degree: 270,
		price: 419430400, //400MB
		effect: ()=> {adv_dcd_marks.push(["s8adv", 1000000000000000])},
		radius: 65,
		img: "data",
		lvl: 8,
		parant_id: "node48"
	},
	node410:{
		name: "Advanced Decoding algorithms v1.6.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Advanced Decoding algorithms v1.8.0 software. Data decoding is twice as efficient", 
		degree: 270,
		price: 996147200, //950MB
		effect: ()=> {adv_dcd_marks.push(["s9adv", 100000000000000000])},
		radius: 65,
		img: "data",
		lvl: 9,
		parant_id: "node409"
	},
	//==============================

	//==============================
	node212:{
		name: "Hardware engineering 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>With better hardware engineering, hardwares are 2.5% cheaper", 
		degree: 341,
		price: 10485760, //10MB
		effect: ()=> {Game.permanent.hardware_engineering = preciseNumber(Game.permanent.hardware_engineering, 0.025, "-", 3)},
		radius: 335,
		img: "system",
		lvl: 1,
		parant_id: "node0"
	},
	node213:{
		name: "Hardware engineering 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>With better hardware engineering, hardwares are 2.5% cheaper", 
		degree: 270,
		price: 104857600, //100MB
		effect: ()=> {Game.permanent.hardware_engineering = preciseNumber(Game.permanent.hardware_engineering, 0.025, "-", 3)},
		radius: 65,
		img: "system",
		lvl: 2,
		parant_id: "node212"
	},
	node214:{
		name: "Hardware engineering 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>With better hardware engineering, hardwares are 2.5% cheaper", 
		degree: 270,
		price: 1073741824, //1GB
		effect: ()=> {Game.permanent.hardware_engineering = preciseNumber(Game.permanent.hardware_engineering, 0.025, "-", 3)},
		radius: 65,
		img: "system",
		lvl: 3,
		parant_id: "node213"
	},
	node215:{
		name: "Hardware engineering 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>With better hardware engineering, hardwares are 2.5% cheaper", 
		degree: 270,
		price: 10737418240, //10GB
		effect: ()=> {Game.permanent.hardware_engineering = preciseNumber(Game.permanent.hardware_engineering, 0.025, "-", 3)},
		radius: 65,
		img: "system",
		lvl: 4,
		parant_id: "node214"
	},

	//========================
	node216:{
		name: "Multithreding v1.3.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Multithreding v1.3.0 software, allows to decode data on fifth core. Base data decoding speed is multiplied up to 5", 
		degree: 315,
		price: 15728640, //15MB
		effect: ()=> {multi_thr_marks.push(["s4mthr", 1000])},
		radius: 95,
		img: "processor",
		lvl: 4,
		parant_id: "node212"
	},
	node217:{
		name: "Multithreding v1.4.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Multithreding v1.4.0 software, allows to decode data on sixth core. Base data decoding speed is multiplied up to 6", 
		degree: 270,
		price: 31457280, //30MB
		effect: ()=> {multi_thr_marks.push(["s5mthr", 1250])},
		radius: 65,
		img: "processor",
		lvl: 5,
		parant_id: "node216"
	},
	node218:{
		name: "Multithreding v1.5.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Multithreding v1.5.0 software, allows to decode data on seventh core. Base data decoding speed is multiplied up to 7", 
		degree: 270,
		price: 62914560, //60MB
		effect: ()=> {multi_thr_marks.push(["s6mthr", 1500])},
		radius: 65,
		img: "processor",
		lvl: 6,
		parant_id: "node217"
	},
	node219:{
		name: "Multithreding v1.6.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Multithreding v1.6.0 software, allows to decode data on eighth core. Base data decoding speed is multiplied up to 8", 
		degree: 270,
		price: 125829120, //120MB >> increase more after this level not x2
		effect: ()=> {multi_thr_marks.push(["s7mthr", 1800])},
		radius: 65,
		img: "processor",
		lvl: 7,
		parant_id: "node218"
	},
	node220:{
		name: "Resources 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>CPU, GPU, RAM, and FAN bought from HQ or Online store are 1 unit more powerful", 
		degree: 225,
		price: 53687091200, //50GB
		effect: ()=> {Game.permanent.resources += 1},
		radius: 95,
		img: "resources",
		lvl: 1,
		parant_id: "node212"
	},
	node221:{
		name: "Resources 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>CPU, GPU, RAM, and FAN bought from HQ or Online store are 1 unit more powerful", 
		degree: 270,
		price: 107374182400, //100GB
		effect: ()=> {Game.permanent.resources += 1},
		radius: 65,
		img: "resources",
		lvl: 2,
		parant_id: "node220"
	},
	node222:{
		name: "Resources 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>CPU, GPU, RAM, and FAN bought from HQ or Online store are 1 unit more powerful", 
		degree: 270,
		price: 214748364800, //200GB
		effect: ()=> {Game.permanent.resources += 1},
		radius: 65,
		img: "resources",
		lvl: 3,
		parant_id: "node221"
	},
	node223:{
		name: "Resources 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>CPU, GPU, RAM, and FAN bought from HQ or Online store are 1 unit more powerful", 
		degree: 270,
		price: 429496729600, //400GB
		effect: ()=> {Game.permanent.resources += 1},
		radius: 65,
		img: "resources",
		lvl: 4,
		parant_id: "node222"
	},
	//==============================

	//==============================
	node49:{
		name: "HQ price 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>HQ store prices are 2.5% cheaper", 
		degree: 90,
		price: 104857600, //100MB
		effect: ()=> {Game.permanent.hq_prices_discount = preciseNumber(Game.permanent.hq_prices_discount, 0.025, "-", 3)},
		radius: 350,
		img: "hq",
		lvl: 1,
		parant_id: "node0"
	},
	node50:{
		name: "Online store price 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Online store prices are 2.5% cheaper", 
		degree: 0,
		price: 209715200, //200MB
		effect: ()=> {Game.permanent.ol_prices_discount = preciseNumber(Game.permanent.ol_prices_discount, 0.025, "-", 3)},
		radius: 75,
		img: "price",
		lvl: 1,
		parant_id: "node49"
	},
	node51:{
		name: "Online store time 1", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Reduce Online store refresh timer by 20 seconds", 
		degree: 0,
		price: 314572800, //300MB,
		effect: ()=> {Game.permanent.ol_timer_reduce += 20},
		radius: 75,
		img: "duration",
		lvl: 1,
		parant_id: "node50"
	},
	node52:{
		name: "HQ price 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>HQ store prices are 2.5% cheaper", 
		degree: 90,
		price: 1073741824, //1GB
		effect: ()=> {Game.permanent.hq_prices_discount = preciseNumber(Game.permanent.hq_prices_discount, 0.025, "-", 3)},
		radius: 75,
		img: "hq",
		lvl: 2,
		parant_id: "node49"
	},
	node53:{
		name: "Online store price 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Online store prices are 2.5% cheaper", 
		degree: 90,
		price: 2147483648, //2GB
		effect: ()=> {Game.permanent.ol_prices_discount = preciseNumber(Game.permanent.ol_prices_discount, 0.025, "-", 3)},
		radius: 75,
		img: "price",
		lvl: 2,
		parant_id: "node50"
	},
	node54:{
		name: "Online store time 2", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Reduce Online store refresh timer by 20 seconds", 
		degree: 90,
		price: 3221225472, //3GB
		effect: ()=> {Game.permanent.ol_timer_reduce += 20},
		radius: 75,
		img: "duration",
		lvl: 2,
		parant_id: "node51"
	},
	node55:{
		name: "HQ price 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>HQ store prices are 2.5% cheaper", 
		degree: 90,
		price: 10737418240, //10GB
		effect: ()=> {Game.permanent.hq_prices_discount = preciseNumber(Game.permanent.hq_prices_discount, 0.025, "-", 3)},
		radius: 75,
		img: "hq",
		lvl: 3,
		parant_id: "node52"
	},
	node56:{
		name: "Online store price 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Online store prices are 2.5% cheaper", 
		degree: 90,
		price: 21474836480, //20GB
		effect: ()=> {Game.permanent.ol_prices_discount = preciseNumber(Game.permanent.ol_prices_discount, 0.025, "-", 3)},
		radius: 75,
		img: "price",
		lvl: 3,
		parant_id: "node53"
	},
	node57:{
		name: "Online store time 3", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Reduce Online store refresh timer by 20 seconds", 
		degree: 90,
		price: 32212254720, //30GB
		effect: ()=> {Game.permanent.ol_timer_reduce += 20},
		radius: 75,
		img: "duration",
		lvl: 3,
		parant_id: "node54"
	},
	node287:{
		name: "HQ price 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>HQ store prices are 2.5% cheaper", 
		degree: 90,
		price: 107374182400, //100GB
		effect: ()=> {Game.permanent.hq_prices_discount = preciseNumber(Game.permanent.hq_prices_discount, 0.025, "-", 3)},
		radius: 75,
		img: "hq",
		lvl: 4,
		parant_id: "node55"
	},
	node288:{
		name: "Online store price 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Online store prices are 2.5% cheaper", 
		degree: 90,
		price: 214748364800, //200GB
		effect: ()=> {Game.permanent.ol_prices_discount = preciseNumber(Game.permanent.ol_prices_discount, 0.025, "-", 3)},
		radius: 75,
		img: "price",
		lvl: 4,
		parant_id: "node56"
	},
	node289:{
		name: "Online store time 4", 
		des: con_span("Effect: ", "var(--selectClr)")+"Passive<br><br>Reduce Online store refresh timer by 20 seconds", 
		degree: 90,
		price: 322122547200, //300GB
		effect: ()=> {Game.permanent.ol_timer_reduce += 20},
		radius: 75,
		img: "duration",
		lvl: 4,
		parant_id: "node57"
	},
	//==============================
	node224:{
		name: "Crown coin v1.4.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Crown coin v1.4.0 software, Increase Crown coin visibility duration by 10%, and appear 10% more frequently", 
		degree: 0,
		price: 1048576, //1MB
		effect: ()=> {crown_coin_marks.push(["s4cr", 10000000000000])},
		radius: 205,
		img: "coin",
		lvl: 4,
		parant_id: "node0"
	},
	node225:{
		name: "Crown coin v1.5.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Crown coin v1.5.0 software, Increase Crown coin effect by 30%", 
		degree: 0,
		price: 2097152, //2MB
		effect: ()=> {crown_coin_marks.push(["s5cr", 1000000000000000])},
		radius: 95,
		img: "coin",
		lvl: 5,
		parant_id: "node224"
	},
	node226:{
		name: "Crown coin v1.6.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Crown coin v1.6.0 software, Increase Crown coin effect duration by 30%", 
		degree: 0,
		price: 4194304, //4MB
		effect: ()=> {crown_coin_marks.push(["s6cr", 100000000000000000])},
		radius: 95,
		img: "coin",
		lvl: 6,
		parant_id: "node225"
	},
	node227:{
		name: "Crown coin v1.7.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Crown coin v1.7.0 software, Increase Crown coin visibility duration by 10%, and appear 10% more frequently", 
		degree: 0,
		price: 8388608, //8MB
		effect: ()=> {crown_coin_marks.push(["s7cr", 10000000000000000000])},
		radius: 95,
		img: "coin",
		lvl: 7,
		parant_id: "node226"
	},
	node228:{
		name: "Crown coin v1.8.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Crown coin v1.8.0 software, Increase Crown coin effect by 30%", 
		degree: 0,
		price: 16777216, //16MB,
		effect: ()=> {crown_coin_marks.push(["s8cr", 1000000000000000000000])},
		radius: 95,
		img: "coin",
		lvl: 8,
		parant_id: "node227"
	},
	node229:{
		name: "Crown coin v1.9.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Crown coin v1.9.0 software, Increase Crown coin effect duration by 30%", 
		degree: 0,
		price: 33554432, //32MB
		effect: ()=> {crown_coin_marks.push(["s9cr", 100000000000000000000000])},
		radius: 95,
		img: "coin",
		lvl: 9,
		parant_id: "node228"
	},
	node230:{
		name: "Crown coin v1.10.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Crown coin v1.10.0 software, Increase Crown coin visibility duration by 10%, and appear 10% more frequently", 
		degree: 0,
		price: 67108864, //64MB
		effect: ()=> {crown_coin_marks.push(["s10cr", 10000000000000000000000000])},
		radius: 95,
		img: "coin",
		lvl: 10,
		parant_id: "node229"
	},
	node231:{
		name: "Crown coin v1.11.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Crown coin v1.11.0 software, Increase Crown coin effect by 30%", 
		degree: 0,
		price: 134217728, //128MB
		effect: ()=> {crown_coin_marks.push(["s11cr", 1000000000000000000000000000])},
		radius: 95,
		img: "coin",
		lvl: 11,
		parant_id: "node230"
	},
	node232:{
		name: "Crown coin v1.12.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Crown coin v1.12.0 software, Increase Crown coin effect duration by 30%", 
		degree: 0,
		price: 268435456, //256MB
		effect: ()=> {crown_coin_marks.push(["s12cr", 100000000000000000000000000000])},
		radius: 95,
		img: "coin",
		lvl: 12,
		parant_id: "node231"
	},
	node233:{
		name: "Crown coin v1.13.0", 
		des: con_span("Effect: ", "var(--selectClr)")+"As Software<br><br>Unlock Crown coin v1.13.0 software, Increase Crown coin visibility duration by 10%, and appear 10% more frequently", 
		degree: 0,
		price: 536870912, //512MB
		effect: ()=> {crown_coin_marks.push(["s13cr", 10000000000000000000000000000000])},
		radius: 95,
		img: "coin",
		lvl: 13,
		parant_id: "node232"
	}
	//==============================
}