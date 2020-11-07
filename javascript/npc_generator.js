// https://api.fungenerators.com/name/generate?
/* categories [elf,dragon,pirate,dwarf,demon,angel,medieval,dothraki,valyrian,fairy,warrior,dnd-gnome]
also [shop,bakery,brewery]
parameters [limit, start] */

//available races to generate names from
let raceOptions = ["elf", "pirate", "dwarf"];

//Create selectors for html elements
let button = $("#npcGenButton");
let raceInput = $("#raceInput");

//get array of lists from local storage or create empty array
let listOfListofNames = JSON.parse(localStorage.getItem("listOfListOfNames"));
if (listOfListofNames === null) {
    listOfListofNames = [];
}

button.on("click", function () {
    //set user input
    let userInput = {
        "race": raceInput.val()
    };
    if (userInput.race === "random") {
        userInput.race = raceOptions[Math.floor(Math.random() * raceOptions.length)];
    }
    //check if list is empty
    if (listOfListofNames.length === 0) {
        getName(userInput.race, userInput.gender);
    } else {
        //check if list for race already exists
        if (listOfListofNames.filter(list => list.category === userInput.race).length === 0) {
            //create list if none exists
            getName(userInput.race, userInput.gender);
        } else {
            let index = listOfListofNames.findIndex((listOfNames) => listOfNames.category === userInput.race);
            if (listOfListofNames[index].nextNameIndex === listOfListofNames[index].list.length - 1) {
                listOfListofNames[index].nextNameIndex = 0;
            }
            //get next index of next name in the list
            let nextNameIndex = listOfListofNames[index].nextNameIndex;
            createNPC(listOfListofNames[index].list[nextNameIndex], userInput.race);
            listOfListofNames[index].nextNameIndex++;
            localStorage.setItem("listOfListOfNames", JSON.stringify(listOfListofNames));
        }
    }
})

function getName(race) {
    let api_key = "2ff8BbYOdnIM3EMt6RgYkAeF"
    let queryURL = "https://api.fungenerators.com/name/generate?api_key=" + api_key +"&limit=100&category=" + race;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .fail(function (response) {
            console.log("API call to name generator errored - error code " + response.responseJSON.error.code);
        })
        .done(function (response) {
            console.log("API call made");
            listOfListofNames.push({ "category": race, "nextNameIndex": 0, "list": response.contents.names });
            let index = listOfListofNames.length - 1;
            createNPC(listOfListofNames[index].list[listOfListofNames[index].nextNameIndex],race);
            listOfListofNames[index].nextNameIndex++;
            localStorage.setItem("listOfListOfNames", JSON.stringify(listOfListofNames));
        })
}

function createNPC(fullName, race) {
    let npcCharacter = {
        "firstName": fullName.split(" ")[0],
        "lastName": fullName.split(" ")[fullName.split(" ").length - 1],
        "race": race==="pirate" ? "human" : race,
        "wealth": getWealth(),
    };
    if (npcCharacter.race === "elf") {
        npcCharacter = createElf(npcCharacter);
    } else if (npcCharacter.race === "dwarf"){
        npcCharacter = createDwarf(npcCharacter);
    } else {
        npcCharacter = createHuman(npcCharacter);
    };
    npcCharacter = addDescription(npcCharacter);
    $("#npcContainer").removeClass("hidden");
    $("#npcName").text(npcCharacter.firstName + " " + npcCharacter.lastName);
    $("#npcRace").text(npcCharacter.race);
    $("#npcAge").text(npcCharacter.age.year);
    $("#npcHeight").text(npcCharacter.height);
    $("#npcWeight").text(npcCharacter.weight);
    $("#npcWealth").text(npcCharacter.wealth);
    $("#npcDescription").text(npcCharacter.description);

    function createElf(npcCharacter) {
        let elfMaxAge = 750;
        let age = Math.floor(Math.random() * elfMaxAge);
        let minHeight = 64;
        let maxHeight = 80;
        let height = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
        let minWeight = 110;
        let maxWeight = 158;
        let weight = Math.floor(Math.random() * (maxWeight - minWeight) + minWeight);

        if (age < 100) {
            npcCharacter.age = { "year": age, "category": "child" };
        } else if (age < 405) {
            npcCharacter.age = { "year": age, "category": "young adult" };
        } else if (age < 650) {
            npcCharacter.age = { "year": age, "category": "adult" };
        } else {
            npcCharacter.age = { "year": age, "category": "elder" };
        }
        npcCharacter.height = height;
        let heightScore = Math.floor(((height - minHeight) / (maxHeight - minHeight)) * 100);
        npcCharacter.heightScore = heightScore
        npcCharacter.weight = weight;
        let weightScore = Math.floor(((weight - minWeight) / (maxWeight - minWeight)) * 100);
        npcCharacter.weightScore = weightScore
        return npcCharacter
    }

    function createDwarf(npcCharacter) {
        let dwarfMaxAge = 350;
        let age = Math.floor(Math.random() * dwarfMaxAge);
        let minHeight = 47;
        let maxHeight = 53;
        let height = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
        let minWeight = 134;
        let maxWeight = 176;
        let weight = Math.floor(Math.random() * (maxWeight - minWeight) + minWeight);

        if (age < 18) {
            npcCharacter.age = { "year": age, "category": "child" };
        } else if (age < 50) {
            npcCharacter.age = { "year": age, "category": "young adult" };
        } else if (age < 200) {
            npcCharacter.age = { "year": age, "category": "adult" };
        } else {
            npcCharacter.age = { "year": age, "category": "elder" };
        }
        npcCharacter.height = height;
        let heightScore = Math.floor(((height - minHeight) / (maxHeight - minHeight)) * 100);
        npcCharacter.heightScore = heightScore
        npcCharacter.weight = weight;
        let weightScore = Math.floor(((weight - minWeight) / (maxWeight - minWeight)) * 100);
        npcCharacter.weightScore = weightScore
        return npcCharacter
    }

    function createHuman(npcCharacter) {
        let humanMaxAge = 350;
        let age = Math.floor(Math.random() * humanMaxAge);
        let minHeight = 60;
        let maxHeight = 80;
        let height = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
        let minWeight = 100;
        let maxWeight = 300;
        let weight = Math.floor(Math.random() * (maxWeight - minWeight) + minWeight);

        if (age < 14) {
            npcCharacter.age = { "year": age, "category": "child" };
        } else if (age < 22) {
            npcCharacter.age = { "year": age, "category": "young adult" };
        } else if (age < 50) {
            npcCharacter.age = { "year": age, "category": "adult" };
        } else {
            npcCharacter.age = { "year": age, "category": "elder" };
        }
        npcCharacter.height = height;
        let heightScore = Math.floor(((height - minHeight) / (maxHeight - minHeight)) * 100);
        npcCharacter.heightScore = heightScore
        npcCharacter.weight = weight;
        let weightScore = Math.floor(((weight - minWeight) / (maxWeight - minWeight)) * 100);
        npcCharacter.weightScore = weightScore
        return npcCharacter
    }
}

function getWealth() {
    let wealthLevels = ["destitute", "poor", "modest", "well-off", "wealthy", "ultra-rich"];
    let rndWealth = Math.floor(Math.random() * 100);
    if (rndWealth < 5) { //destitute
        return wealthLevels[0];
    } else if (rndWealth < 15) { //poor
        return wealthLevels[1];
    } else if (rndWealth < 65) { //modest
        return wealthLevels[2];
    } else if (rndWealth < 80) { //well-off
        return wealthLevels[3];
    } else if (rndWealth < 95) { //wealthy
        return wealthLevels[4];
    } else {                    //ultra-rich
        return wealthLevels[5];
    }
}

function addDescription(npcCharacter) {
    let description = ""
    let heightDescriptor = {
        "short": ["short", "diminutive", "tiny"],
        "tall": ["tall", "huge", "towering"]
    }
    let weightDescriptor = {
        "thin": ["very thin", "thin and wirey","light but muscular","rather light", "noticeably slender","skinny","bony","noticeably weak and skinny"],
        "average":["oddly proportioned","healthy looking","sickly looking","athletic looking","well-toned","easily forgetable","hard to miss"],
        "heavy": ["very heavy set", "big-boned", "rather portly", "exceedingly rotund","heavy set but muscular"]
    }
    let clothingDescriptor = {
        "destitute":["tatted rags covered in what you hope is mud","a dingy shirt that has been patched in several places","a torn pair of pants and no shirt"],
        "poor":["clothes that don't quite fit","clothes made of a wrough fabric that likely hasn't been washed in weeks","a simple outfit"],
        "modest":["muted colors","a simple embroidered shirt that has seen some wear","a fine pair of boots and a simple outfit"],
        "wellOff":["bright colors with a simple sache across their front","a suit and dark grey bowler hat","dark colors with red embroidery on the shoulders"],
        "wealthy":["fine silky clothing with a few shiny bobbles afixed in places","a noticably bright white shirt with a touch of green trim"],
        "ultraRich":["the finest fabrics, adjorned in jewels","a austentacious showing of wealth","like a peacock"]
    }
    let feature = ["a sharp chin", "a scar across one eye", "a button nose", "piercing blue eyes", "dark brown eyes", "flashing emerald eyes", "scars on both cheeks", "tattoos covering their arms","a pencil this mustache","a huge bushy beard","a think braid drapped over their shoulder","a massive mess of hair on top of their head"];

    let addHeightDescriptor = function () {
        if (npcCharacter.heightScore < 25) {
            let heightText = heightDescriptor.short[Math.floor(Math.random() * heightDescriptor.short.length)] + " even for a " + npcCharacter.race + ".";
            return heightText;
        } else if (npcCharacter.heightScore < 75) {
            let selectedFeature = feature[Math.floor(Math.random() * feature.length)];
            let heightText = "accentuated by "+selectedFeature+".";
            feature = feature.filter(x => x != selectedFeature);
            return heightText;
        } else {
            let heightText = heightDescriptor.tall[Math.floor(Math.random() * heightDescriptor.tall.length)] + " even for a " + npcCharacter.race + ".";
            return heightText;
        }
    }

    let addClothingDescriptor = function () {
        switch (npcCharacter.wealth){
            case "destitute":
                return clothingDescriptor.destitute[Math.floor(Math.random()*clothingDescriptor.destitute.length)];
            case "poor":
                return clothingDescriptor.poor[Math.floor(Math.random()*clothingDescriptor.poor.length)];
            case "modest":
                return clothingDescriptor.modest[Math.floor(Math.random()*clothingDescriptor.modest.length)];
            case "well-off":
                return clothingDescriptor.wellOff[Math.floor(Math.random()*clothingDescriptor.wellOff.length)];
            case "wealthy":
                return clothingDescriptor.wealthy[Math.floor(Math.random()*clothingDescriptor.wealthy.length)];
            case "ultra-rich":
                return clothingDescriptor.ultraRich[Math.floor(Math.random()*clothingDescriptor.ultraRich.length)];
            default:
                return "god knows what...";
        }
    }

    let addWeightDescriptor = function () {
        if (npcCharacter.weightScore < 25) {
            let weightText = weightDescriptor.thin[Math.floor(Math.random() * weightDescriptor.thin.length)];
            return weightText;
        } else if (npcCharacter.weightScore < 75) {
            let selectedFeature = feature[Math.floor(Math.random() * feature.length)];
            feature = feature.filter(x => x != selectedFeature);
            let weightText = "accentuated by "+selectedFeature+".";
            return weightText;
        } else {
            let weightText = weightDescriptor.heavy[Math.floor(Math.random() * weightDescriptor.heavy.length)];
            return weightText;
        }
    }

    let addFeature = function () {
        let selectedFeature = feature[Math.floor(Math.random() * feature.length)];
        feature = feature.filter(x => x != selectedFeature);
        return selectedFeature;
    }

    description += npcCharacter.firstName + " is " + addHeightDescriptor();
    description += " Dressed in "+addClothingDescriptor()+".";
    description += " They are "+addWeightDescriptor()+" with "+addFeature()+".";
    npcCharacter.description = description;
    return npcCharacter;
}