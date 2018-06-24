//how to win
	var	hint = "all the characters can win and lose, but in case you can\'t find a way to win.. here is my hint: no matter which one you picked, make sure to defeat from high HP characters to low HP characters. have fun :D";

//vars
	var chopper_hp;
	var luffy_hp;
	var law_hp;
	var shanks_hp;

	var enemies;

	var yourCharacter;
	var charName;
	var charHP;
	var char_ap;
	var char_old_ap;

	var yourDefender;
	var defName;
	var defHP;
	var def_cp;

// show HP when page loads
	chopper_hp = $('#one_hp').text($('#chopper').attr('data-hp'));
	luffy_hp = $('#two_hp').text($('#luffy').attr('data-hp'));
	law_hp = $('#three_hp').text($('#law').attr('data-hp'));
	shanks_hp = $('#four_hp').text($('#shanks').attr('data-hp'));

// attack button
	$('button').on('click', function() {
		

	//if your character not picked
		if ($('#yourChar').text() == "") {
			$('#msg').text('Choose a Character!');

	//if defender not picked
		}else if ($('#yourChar').text() !== "" && $('#defender').text() == "" && $('#enemAvail').text() !== "") {
			$('#msg').text('Choose a Defender!');
			$('#userAttack').text("");
			$('#defenderAttack').text("");

	//if both are picked, start fighting
		}else if ($('#yourChar').text() !== "" && $('#defender').text() !== "") {
			$('#msg').text("");

		//getting data values 
	        yourCharacter = $('#yourChar').children('div');
	        charName = yourCharacter.attr('data-name');
	        charHP = yourCharacter.attr('data-hp');
	        char_ap = yourCharacter.attr('data-attpower');
        	char_old_ap = yourCharacter.attr('data-oldattpower');

	    	yourDefender = $('#defender').children('div');
	        defName = yourDefender.attr('data-name');
	        defHP = yourDefender.attr('data-hp');
	        def_cp = yourDefender.attr('data-coutpower');			

			if (charHP>0) {

				//updating HP 
					charHP = charHP - def_cp;
					defHP = defHP - char_ap;
					var updateCharHP = yourCharacter.attr('data-hp', charHP);
					var updateDefHP = yourDefender.attr('data-hp', defHP);

					$('#userAttack').text("You attacked " + defName + " for " + char_ap + " damage.");
					$('#defenderAttack').text(defName + " attacked you back for " + def_cp + " damage.");

					chopper_hp = $('#one_hp').text($('#chopper').attr('data-hp'));
					luffy_hp = $('#two_hp').text($('#luffy').attr('data-hp'));
					law_hp = $('#three_hp').text($('#law').attr('data-hp'));
					shanks_hp = $('#four_hp').text($('#shanks').attr('data-hp'));

					// console.log(charName, charHP, char_ap)
					// console.log(defName, defHP, def_cp)
					// console.log('char: '+charHP, 'def: '+defHP)

				//updating character attack power adding every time 
					char_ap = parseInt(char_ap) + parseInt(char_old_ap);
					// console.log('New char ap: '+char_ap);
					var updateChar_ap = yourCharacter.attr('data-attpower', char_ap);

				//win or lose
					if (charHP <= 0 ) {
						$('#userAttack').text("");
						$('#defenderAttack').text("");
						$('#msg').text("You been defeated... GAME OVER!");
						$('#restart').show();

					}else if (defHP <= 0) {
						$('#userAttack').text("");
						$('#defenderAttack').text("");
						$('#defender').text("");
						$('#msg').text("You have defeated " + defName + ", you can choose to fight another enemy.");

						if ($('#enemAvail').text() == "" && $('#defender').text() == "") {
							$('#userAttack').text("");
							$('#defenderAttack').text("");

							$('#msg').text("You have defeated all the enemies! You Won!!! GAME OVER!!");
							$('#restart').show();
						}
					}
			}
		

	//when defeated all the enemies		
		}else if ($('#enemAvail').text() == "" && $('#defender').text() == "") {
			$('#msg').text("No more enemies.");
			$('#restart').show();
		}
	});

// choose Your Character and move the rest to Enemies Avail
	$(document).ready(function(){
	    $(".chooseChar").on("click", function(){
		  	enemies = $(this).siblings().removeClass('chooseChar')
		  	enemies = $(this).siblings().addClass('enem')
		    $('#enemAvail').append(enemies);

		    if ($('#yourChar').text() == "") {
		    	$('#yourChar').append($(this));

		    //after your character is picked, do the following:	
		    	$('.defLoc').show();;
		    	$('.enemLoc').show();
		    	$('.defLoc').removeClass('defLoc');
		    	$('#msgLoc_before').addClass('msgLoc');
		    	$('#fightLoc_before').removeClass('removeFloat');
		    	$('#fightLoc_before').addClass('fightLoc');
		    }
	    });
	});

// chose Defender
	$(document).on('click', '.enem', function(){
		if ($('#defender').text() == "") {
			$(this).addClass('def')
			$(this).removeClass('enem')
			$('#defender').append($(this));
			$('#msg').text("");
		}
	});

//restart game
	$('#restart').on('click', function () {
		location.reload();
	});
