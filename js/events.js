function run_tutorial(name) {
	$("#tutorial_view").css("display", "flex")
	$("#tutorial_card").css({
		top: tutorial[name].top+"%",
		left: tutorial[name].left+"%"
	})
	$("#tutorial_arrow").css("display", "flex")

	if(tutorial[name].arrow == 0) {
		$("#tutorial_arrow").css({
			top: 25+"%",
			left: 44+"%",
			transform: "rotate(0deg)"
		})
		$("#tutorial_arrow").removeClass()
		$("#tutorial_arrow").addClass("tutorial_arrow tutorial_arrow_anim_0")

	}
	else if(tutorial[name].arrow == 1) {
		$("#tutorial_arrow").css({
			top: 38+"%",
			left: 87.5+"%",
			transform: "rotate(90deg)"
		})
		$("#tutorial_arrow").removeClass()
		$("#tutorial_arrow").addClass("tutorial_arrow tutorial_arrow_anim_1")
	}
	else if(tutorial[name].arrow == 2) {
		$("#tutorial_arrow").css({
			top: 87+"%",
			left: 44+"%",
			transform: "rotate(180deg)"
		})
		$("#tutorial_arrow").css("transform", "rotate(180deg)")
		$("#tutorial_arrow").removeClass()
		$("#tutorial_arrow").addClass("tutorial_arrow tutorial_arrow_anim_2")
	}
	else if(tutorial[name].arrow == 3) {
		$("#tutorial_arrow").css({
			top: 38+"%",
			left: 0+"%",
			transform: "rotate(270deg)"
		})
		$("#tutorial_arrow").css("transform", "rotate(270deg)")
		$("#tutorial_arrow").removeClass()
		$("#tutorial_arrow").addClass("tutorial_arrow tutorial_arrow_anim_3")
	}

	
	$("#toturial_text").html(tutorial[name].text)

	if(tutorial[name].next == "none") 
		$("#tutorial_btn").off("click").click(()=> {
			$("#tutorial_view").css("display", "none")
			$("#tutorial_arrow").css("display", "none")
			$("#tutorial_arrow").stop("arrow_anim",true, true)
		})
	else 
		$("#tutorial_btn").off("click").click(()=> {
			$("#tutorial_view").css("display", "none")
			$("#tutorial_arrow").css("display", "none")
			$("#tutorial_arrow").stop("arrow_anim", true, true)
			run_tutorial(tutorial[name].next)
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial[tutorial[name].next].text, "sys")
		})
}

var Events = {
	NEW_ACC0: ()=>{
		if(!Game.permanent.events.FIRST_FORMAT) {
			setArrayTimeout(()=>{
				log("<br>> "+con_span("G.A.I.A: ", "var(--gaiaClr)")+"Unauthorized Machine detected, Install your R certificate, or legal actions will be taken against you", "sys")
			}, 10000)
			Game.permanent.events.FIRST_FORMAT = true
		}
	},
	NEW_ACC1: ()=> {
		setArrayTimeout(function() {
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Welcome to the crew Agent, do not be afraid of that warning message", "sys")
		}, 20000)
		setArrayTimeout(function() {
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"This system will decode Data mined from "+con_span("G.A.I.A ", "var(--gaiaClr)")+"A.I Network in order to find a way to erase it once and for good and save the world", "sys")
		}, 37500)
		setArrayTimeout(function() {
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+con_span("G.A.I.A ", "var(--gaiaClr)")+"is an A.I that was built to help manage World resources, but things got out of control so fast, and the A.I considered us (Humans) as a resources too", "sys")
		}, 45000)
		setArrayTimeout(function() {
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+con_span("G.A.I.A ", "var(--gaiaClr)")+"started to eliminate Humans, and it took control over everything in order to fulfill its main goal, which is to find balance", "sys")
		}, 52500)
		setArrayTimeout(function() {
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+con_span("G.A.I.A ", "var(--gaiaClr)")+"will attempt to Hack the System continuously to take control over it, your job is to keep this system running for as long as possible", "sys")
		}, 60000)
		setArrayTimeout(function() {
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Keep up the good work Agent, further information will be given soon", "sys")
			run_tutorial("console")
		}, 67500)	
	},
	CPU_100: ()=> {
		if(!Game.permanent.events.CPU_100) {
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.cpu_0.text, "sys")
			Game.permanent.events.CPU_100 = true
			run_tutorial('cpu_0')
		}
	},
	GPU_100: ()=> {
		if(!Game.permanent.events.GPU_100) {
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.gpu_0.text, "sys")
			Game.permanent.events.GPU_100 = true
			run_tutorial('gpu_0')
		}
	},
	RAM_0: ()=> {
		if(!Game.permanent.events.RAM_0) {
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.ram_0.text, "sys")
			Game.permanent.events.RAM_0 = true
			run_tutorial('ram_0')
		}
	},
	HEAT_0: ()=> {
		if(!Game.permanent.events.HEAT_0) {
			run_tutorial('heat_0')
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.heat_0.text, "sys")
			Game.permanent.events.HEAT_0 = true
		}
	},
	HEAT_50: ()=> {
		if(!Game.permanent.events.HEAT_50) {
			run_tutorial('heat_2')
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.heat_2.text, "sys")
			Game.permanent.events.HEAT_50 = true
		}
	},
	HEAT_95: ()=> {
		if(!Game.permanent.events.HEAT_95) {
			run_tutorial('heat_4')
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.heat_4.text, "sys")
			Game.permanent.events.HEAT_95 = true
		}
	},
	HARDWARE: ()=> {
		if(!Game.permanent.events.HARDWARE) {
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"buying Hardwares will increase your CPS (Credit Per Second). Some Hardwares enhance other functionalities of the System", "sys")
			Game.permanent.events.HARDWARE = true
		}
	},
	SOFTWARE: ()=> {
		if(!Game.permanent.events.SOFTWARE) {
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"buying Softwares will updrade different functionalities of the System", "sys")
			Game.permanent.events.SOFTWARE = true
		}
	},
	OPEN_FORMAT: ()=> {
		if(!Game.permanent.events.OPEN_FORMAT) {
			run_tutorial('format_0')
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.format_0.text, "sys")
			Game.permanent.events.OPEN_FORMAT = true
		}
	}, 
	STORE_HQ: ()=> {
		if(!Game.permanent.events.STORE_HQ) {
			run_tutorial('store_1')
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.store_1.text, "sys")
			Game.permanent.events.STORE_HQ = true
		}
	},
	STORE_OL: ()=> {
		if(!Game.permanent.events.STORE_OL) {
			run_tutorial('store_2')
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.store_2.text, "sys")
			Game.permanent.events.STORE_OL = true
		}
	},
	OPEN_ACHIEVEMENTS: ()=> {
		if(!Game.permanent.events.OPEN_ACHIEVEMENTS) {
			run_tutorial('achievement_0')
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.achievement_0.text, "sys")
			Game.permanent.events.OPEN_ACHIEVEMENTS = true
		}
	},
	BOT_WHEREHOUSE: ()=> {
		if(!Game.permanent.events.BOT_WHEREHOUSE) {
			run_tutorial('bot_0')
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.bot_0.text, "sys")
			Game.permanent.events.BOT_WHEREHOUSE = true
		}
	},
	BOT_ASSEMBLE: ()=> {
		if(!Game.permanent.events.BOT_ASSEMBLE) {
			run_tutorial('bot_1')
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.bot_1.text, "sys")
			Game.permanent.events.BOT_ASSEMBLE = true
		}
	},
	BOT_PRODUCTION: ()=> {
		if(!Game.permanent.events.BOT_PRODUCTION) {
			run_tutorial('bot_3')
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.bot_3.text, "sys")
			Game.permanent.events.BOT_PRODUCTION = true
		}
	},
	BOT_PROCEDURE: ()=> {
		if(!Game.permanent.events.BOT_PROCEDURE) {
			run_tutorial('bot_5')
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.bot_5.text, "sys")
			Game.permanent.events.BOT_PROCEDURE = true
		}
	},
	STORE0: ()=> {
		if(!Game.permanent.events.STORE0) {
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Good job agent, now you have access to the Online Store", "sys")
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Now you can buy and download different useful System parts or Softwares enhancers", "sys")
			}, 5000)
			Game.permanent.events.STORE0 = true
		}
	},
	GAIA_FIRST_HACK: ()=> {
		if(!Game.permanent.events.GAIA_FIRST_HACK) {
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Looks like "+con_span("G.A.I.A ", "var(--gaiaClr)")+"doesn't play around, It is already in the process of trying to take over the system", "sys")
			}, 5000)
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"This will happen frequently, so don't panic and handle the situation properly next time", "sys")
			}, 10000)
			Game.permanent.events.GAIA_FIRST_HACK = true
		}
	},
	GAIA_FIRST_HACKED: ()=> {
		if(!Game.permanent.events.GAIA_FIRST_HACKED) {
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"When "+con_span("G.A.I.A ", "var(--gaiaClr)")+"successfully Hack you, it will sabotage random System's functionality and rises 'Threat'", "sys")
			}, 20000)
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"When 'Threat' reaches 100%, "+con_span("G.A.I.A ", "var(--gaiaClr)")+"will take control over the System", "sys")
			}, 30000)
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Which makes you unable to access the it, and the only way to gain back access, is vaia Formatting it", "sys")
			}, 40000)
			Game.permanent.events.GAIA_FIRST_HACKED = true
		}
	},
	GAIA_FIRST_BLOCK: ()=> {
		if(!Game.permanent.events.GAIA_FIRST_BLOCK) {
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Good job agent!. Blocking "+con_span("G.A.I.A ", "var(--gaiaClr)")+"Hack attempt will grants you Credit and Data", "sys")
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"When "+con_span("G.A.I.A ", "var(--gaiaClr)")+"Hack you, it will establish connection between it and the System", "sys")
			}, 20000)
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"By taking advantage of this connection, we can trace it back and take as much Credit and Data as we can from the source", "sys")
			}, 30000)
			Game.permanent.events.GAIA_FIRST_BLOCK = true
		}
	},
	FIRST_BLOCKER: ()=> {
		if(!Game.permanent.events.FIRST_BLOCKER) {
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"In blocker, arrow signal moves automatically, direct it using arrow keys in the keyboard", "sys")
			}, 60000)
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Keep the signal until the hack ends without hitting walls or the boundary", "sys")
			}, 70000)
			Game.permanent.events.FIRST_BLOCKER = true
		}
	},
	FIRST_CRACK_PASSWORD: ()=> {
		if(!Game.permanent.events.FIRST_CRACK_PASSWORD) {
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"In Crack Password, solve for "+con_span("? ", "var(--golden)")+"Mark using the given problem", "sys")
			}, 60000)
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Solve all given problems before time runs out", "v")
			}, 70000)
			Game.permanent.events.FIRST_CRACK_PASSWORD = true
		}
	},
	FIRST_FAKE_CERTIFICATE: ()=> {
		if(!Game.permanent.events.FIRST_FAKE_CERTIFICATE) {
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"In fake certificate, type in given fake certificate before time runs out", "sys")
			}, 60000)
			Game.permanent.events.FIRST_FAKE_CERTIFICATE = true
		}
	},
	FIRST_FORMAT: ()=> {
		if(!Game.permanent.events.FIRST_FORMAT && Game.permanent.total_formats == 1) {
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Welcome Back agent!, When Formatting, you will start over from the beginning", "sys")
			}, 15000)
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Permanent data such as Collected Data or achievements will not reset", "sys")
			}, 20000)
			setArrayTimeout(function() {
				log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Progressing should be faster now, since 'Format' CPS bonus is applied", "sys")
			}, 25000)
			Game.permanent.events.FIRST_FORMAT = true
		}
	},
	BUYING_3FAN: ()=> {
		if(!Game.permanent.events.BUYING_3FAN) {
			run_tutorial('fans_0')
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.fans_0.text, "sys")
			Game.permanent.events.BUYING_3FAN = true
		}
	},
	IDLE_0: ()=> {
		if(!Game.permanent.events.IDLE_0) {
			run_tutorial('idle_0')
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+tutorial.idle_0.text, "sys")
			Game.permanent.events.IDLE_0 = true
		}
	}
}