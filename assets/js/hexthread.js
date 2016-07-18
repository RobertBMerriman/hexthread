var main = function() {

	// Get user Color
	var userColor = generateHexColor();

	// Generate user's signature
	var $userSig = $("<span class=\"sig\">").text(" -- #" + userColor); // Puts the sig between spans so it can be styled correctly

	// Add sig to title
	$("#title").append($userSig);

	// Recolors page elements to the userColor
	recolorElements(userColor);


	// Populate with comments
	// TODO add function

	// Capture button submit event
	$("form").submit(function(event) {

		// Get input
		var $input = $(event.target).find("input");
		var comment = $input.val(); // Get actual string
		comment = comment.trim(); // Trin whitespace

		if (comment !== "") {
			// Put the comment in a list element with the class "self"
			var $fullComment = $("<li class=\"self\">").text(comment);

			$fullComment.append($userSig.clone()); // Adds signature to end of comment

			$fullComment.prependTo("#comments"); // Place new comment at the top of the comment stack
		}

		$input.val(""); // Empty comment box

		return false;
	});

};

function generateHexColor() {
	var hexString = "";

	for (i = 0; i < 6; i++) {

		var rand = Math.floor(Math.random() * 16);

		switch (rand) {
			case 10:
				hexString = hexString + "a";
				break;
			case 11:
				hexString = hexString + "b";
				break;
			case 12:
				hexString = hexString + "c";
				break;
			case 13:
				hexString = hexString + "d";
				break;
			case 14:
				hexString = hexString + "e";
				break;
			case 15:
				hexString = hexString + "f";
				break;
			default:
				hexString = hexString + (i + "");
		}

	}

	// TODO Check to see if the color is being used

	return hexString;

}

function recolorElements(userColor) {

	var sheet = document.createElement('style'); // create new style element for color changes
	sheet.id = "recoloring";

	// Change all static elements and li.self styling
	var style = "h1 { border-left: 8px solid #" + userColor + "; }\nform input:focus { border-left: 8px solid #" + userColor + "; }\nbutton.btn { color: #" + userColor + "; }\nbutton.btn:hover { background: #" + userColor + "; }\nli.self { border-left: 8px solid #" + userColor + " ; }\n";

	// Generate CSS for existing comments
	var colors = ["01cf45", "d12345", "0ddbfe"]; // Array of colors. To be retrived from database
	for (i = 0; i < colors.length; i++) {
		style = style + "li.hex" + colors[i] + " { border-left: 6px solid #" + colors[i] + "; }\n"; // Set border-left CSS for that color
	}

	// Set style and add to the document
	//alert(style);
	sheet.innerHTML = style;
	document.body.appendChild(sheet);
}

$(document).ready(main);
