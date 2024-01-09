window.addEventListener("wheel", (event) => event.preventDefault(), {
  passive: false,
})

window.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", " "].includes(event.key)) {
    event.preventDefault()
  }
})

const ad_callbacks = {
    adFinished: () => {on_finish_ad()},
    adError: (error) => {on_error_ad()},
    adStarted: () => {on_start_ad()}
};

const adblocker_callback = (error, result) => {
    if (error) {
        console.log("Adblock usage error (callback)", error)
    } else {
        console.log("Adblock usage fetched (callback)", result)
        if(!result)
            ad_str_msg = "Something went wrong!, Could not start AD!."
        else {
            ad_block = true;
            ad_str_msg = "Could not start AD. AD blocker detected!."
        }
        
    }
};

let ad_str_msg = "",
in_ad = false,
ad_block = false,
isValid = false, //for ad_gfit, hardware count > 0, then get it as gift
get_ad_gift = {
    hardware: function() {
        hardware_items_ad(Game.impermanent.ad_gift)
        update_current_performance()
    },
    parts: function() {
        inscrease_hq_itmes_from_ad(Game.impermanent.ad_gift)
        update_current_performance()
    },
    credit: function() {
        increase_credit(Game.impermanent.ad_gift)
        log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Transferred "+simplifyNumber(Game.impermanent.ad_gift)+" Credit from ADS Network", "hq")
    },
    data: function() {
        increase_data(Game.impermanent.ad_gift)
        log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Transferred "+get_data_with_symbol(Game.impermanent.ad_gift)+" Data from ADS Network", "hq")
    },
    materials: function() {
        increase_materials(Game.impermanent.ad_gift)
        log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Transferred "+simplifyNumber(Game.impermanent.ad_gift)+" Materials from ADS Network", "hq")
    },
    coin: function() {
        Game.impermanent.current_crown_cycle = Game.impermanent.ad_gift
        log("<br>> Instant Crown Coin Spawn activated", "sys")
    }
};

function generate_ad_gift() {
    isValid = false
    r = ranged_random(100, 0)
    if(r <= 60) //60% hardware
        r = 1
    else if(r <= 75) //15% parts
        r = 2
    else if(r <= 85) //10% credit
        r = 3
    else if(r <= 91) //6% data
        r = 4
    else if(r <= 97) //6% materials
        r = 5
    else //3% coin
        r = 6
    txt_info = ""
    $("#ad_gift_icon").empty()
    switch(r) {
    case 1:
        Game.impermanent.ad_gift_type = "hardware"
        total = Game.impermanent.hardware_count["h1"]+Game.impermanent.hardware_count["h2"]+
            Game.impermanent.hardware_count["h3"]+Game.impermanent.hardware_count["h4"]+
            Game.impermanent.hardware_count["h5"]+Game.impermanent.hardware_count["h6"]+
            Game.impermanent.hardware_count["h7"]+Game.impermanent.hardware_count["h8"]+
            Game.impermanent.hardware_count["h9"]+Game.impermanent.hardware_count["h10"]+
            Game.impermanent.hardware_count["h11"]+Game.impermanent.hardware_count["h12"]
        if(total == 0) {
            r = 0
        }
        else {
            while(!isValid) {
                r = ranged_random(Game.impermanent.hardware_in_list.length, 0)
                if(Game.impermanent.hardware_count[Game.impermanent.hardware_in_list[r]] > 0)
                    isValid = true
            }
        }

        Game.impermanent.ad_gift = Game.impermanent.hardware_in_list[r]
        switch(Game.impermanent.ad_gift) {
        case "h1":
            Game.impermanent.gift_icon = "keyboard"
            txt_info = "Keyboard"
            break
        case "h2":
            Game.impermanent.gift_icon = "mouse"
            txt_info = "Mouse"
            break
        case "h3":
            Game.impermanent.gift_icon = "chair"
            txt_info = "Chair"
            break
        case "h4":
            Game.impermanent.gift_icon = "desk"
            txt_info = "Desk"
            break
        case "h5":
            Game.impermanent.gift_icon = "monitor"
            txt_info = "Monitor"
            break
        case "h6":
            Game.impermanent.gift_icon = "router"
            txt_info = "Router"
            break
        case "h7":
            Game.impermanent.gift_icon = "pc"
            txt_info = "PC"
            break
        case "h8":
            Game.impermanent.gift_icon = "solar_power"
            txt_info = "Solar power"
            break
        case "h9":
            Game.impermanent.gift_icon = "magnatic_generator"
            txt_info = "Magnatic generator"
            break
        case "h10":
            Game.impermanent.gift_icon = "radio_tower"
            txt_info = "Radio tower"
            break
        case "h11":
            Game.impermanent.gift_icon = "radar_dish"
            txt_info = "Radar dish"
            break
        case "h12":
            Game.impermanent.gift_icon = "satellite"
            txt_info = "Satellite"
            break
        }
        Game.impermanent.gift_text = "x1 "+txt_info
        $("#ad_gift_text").text(Game.impermanent.gift_text)
        create_svg(0, Game.impermanent.gift_icon, "ad_gift_icon")
        break
    case 2:
        Game.impermanent.ad_gift_type = "parts"
        r = ranged_random(3, 0)
        switch(r){
        case 0 :
            Game.impermanent.ad_gift = "CPU"
            Game.impermanent.gift_icon = "cpu"
            txt_info = "CPU"
            break
        case 1:
            Game.impermanent.ad_gift = "GPU"
            Game.impermanent.gift_icon = "gpu"
            txt_info = "GPU"
            break
        case 2:
            Game.impermanent.ad_gift = "RAM"
            Game.impermanent.gift_icon = "ram"
            txt_info = "RAM"
            break
        case 3:
            Game.impermanent.ad_gift = "FAN"
            Game.impermanent.gift_icon = "fan"
            txt_info = "FAN"
            break
        }
        Game.impermanent.gift_text = "x1 "+txt_info
        $("#ad_gift_text").text(Game.impermanent.gift_text)
        create_svg(0, Game.impermanent.gift_icon, "ad_gift_icon")
        break
    case 3:
        Game.impermanent.ad_gift_type = "credit"
        Game.impermanent.ad_gift = Math.floor((77+cps)*300)
        Game.impermanent.gift_icon = "credit"
        Game.impermanent.gift_text = "+"+simplifyNumber(Game.impermanent.ad_gift)+" Credit"
        $("#ad_gift_text").text(Game.impermanent.gift_text)
        create_svg(0, Game.impermanent.gift_icon, "ad_gift_icon")
        break
    case 4:
        Game.impermanent.ad_gift_type = "data"
        Game.impermanent.ad_gift = Math.floor((dps+1) * 450)
        Game.impermanent.gift_icon = "data"
        Game.impermanent.gift_text = "+"+get_data_with_symbol(Game.impermanent.ad_gift)+" Data"
        $("#ad_gift_text").text(Game.impermanent.gift_text)
        create_svg(0, Game.impermanent.gift_icon, "ad_gift_icon")
        break
    case 5:
        Game.impermanent.ad_gift_type = "materials"
        Game.impermanent.ad_gift = Math.floor(1+(mpm)*7.5)
        Game.impermanent.gift_icon = "materials"
        Game.impermanent.gift_text = "+"+simplifyNumber(Game.impermanent.ad_gift)+" Materials"
        $("#ad_gift_text").text(Game.impermanent.gift_text)
        create_svg(0, Game.impermanent.gift_icon, "ad_gift_icon")
        break
    case 6:
        Game.impermanent.ad_gift_type = "coin"
        Game.impermanent.ad_gift = 1
        Game.impermanent.gift_icon = "coin"
        Game.impermanent.gift_text = "Crown coin instant Spawn"
        $("#ad_gift_text").text(Game.impermanent.gift_text)
        create_svg(0, Game.impermanent.gift_icon, "ad_gift_icon")
        break
    }
}

//pause game
function on_start_ad() {
    start_idle()
    in_ad = true
}

//get reward and resume game
function on_finish_ad() {
    if(ad_btn == "ad_cps") {
        if(Game.impermanent.g_eff.ad_credit == 1) {
            generate_effect(600, "ad_credit", "-", "+", "q_cps", "play", 1, "CPS AD Multiplier x2 for /e", 3)
            $("#ad_cps_text").html("&times;4 CPS")
            log("<br>> x2 CPS AD Multiplier activated for 10 minutes", "sys")
        }
        else if(Game.impermanent.g_eff.ad_credit == 2) {
            index = Game.impermanent.g_eff.effects.findIndex(obj => obj["multi_name"] === "ad_credit")
            Game.impermanent.g_eff.ad_credit += 2
            Game.impermanent.g_eff.effects[index].time += 300
            Game.impermanent.g_eff.effects[index].effect += 2
            Game.impermanent.g_eff.effects[index].des = "CPS AD Multiplier x4 for /e"
            $("#ad_cps_text").html("&times;8 CPS")
            log("<br>> CPS AD Multiplier duration extended by 5 minutes, and effect inscreased to x4", "sys")
        }
        else if(Game.impermanent.g_eff.ad_credit == 4) {
            index = Game.impermanent.g_eff.effects.findIndex(obj => obj["multi_name"] === "ad_credit")
            Game.impermanent.g_eff.ad_credit += 4
            Game.impermanent.g_eff.effects[index].time += 300
            Game.impermanent.g_eff.effects[index].effect += 4
            Game.impermanent.g_eff.effects[index].des = "CPS AD Multiplier x8 for /e"
            $("#ad_cps_can").css("display", "none")
            $("#ad_cps_max").css("display", "flex")
            $("#ad_cps").off("click")
            log("<br>> CPS AD Multiplier duration extended by 5 minutes, and effect inscreased to x8", "sys")
        }
    }   
    else if(ad_btn == "ad_dps") {
        if(Game.impermanent.g_eff.ad_data == 1) {
            generate_effect(600, "ad_data", "-", "+", "q_dps", "play", 1, "DPS AD Multiplier x2 for /e", 3)
            $("#ad_dps_text").html("&times;4 DPS")
            log("<br>> x2 DPS AD Multiplier activated for 10 minutes", "sys")
        }
        else if(Game.impermanent.g_eff.ad_data == 2) {
            index = Game.impermanent.g_eff.effects.findIndex(obj => obj["multi_name"] === "ad_data")
            Game.impermanent.g_eff.ad_data += 2
            Game.impermanent.g_eff.effects[index].time += 300
            Game.impermanent.g_eff.effects[index].effect += 2
            Game.impermanent.g_eff.effects[index].des = "DPS AD Multiplier x8 for /e"
            $("#ad_dps_text").html("&times;8 DPS")
            log("<br>> DPS AD Multiplier duration extended by 5 minutes, and effect inscreased to x4", "sys")
        }
        else if(Game.impermanent.g_eff.ad_data == 4) {
            index = Game.impermanent.g_eff.effects.findIndex(obj => obj["multi_name"] === "ad_data")
            Game.impermanent.g_eff.ad_data += 4
            Game.impermanent.g_eff.effects[index].time += 300
            Game.impermanent.g_eff.effects[index].effect += 4
            Game.impermanent.g_eff.effects[index].des = "DPS AD Multiplier x8 for /e"
            $("#ad_dps_can").css("display", "none")
            $("#ad_dps_max").css("display", "flex")
            $("#ad_dps").off("click")
            log("<br>> DPS AD Multiplier duration extended by 5 minutes, and effect inscreased to x8", "sys")
        }
    }
    else {
        Game.impermanent.ad_gift_taken = true
        Game.impermanent.ad_gift_timer = 300
        $("#ad_gift_refresh_timer").text("05m:00s")
        $("#ad_gift_timer").css("display", "flex")
        get_ad_gift[Game.impermanent.ad_gift_type]()
        generate_ad_gift()
    }
    
    CalResources()
    if(document.visibilityState === 'visible') {
        stop_idle()
    }

    in_ad = false
}

//handle error
function on_error_ad() {
    log("<br>> "+con_span(ad_str_msg, "var(--negativeClr)"), "sys")
}