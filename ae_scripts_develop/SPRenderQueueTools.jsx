﻿{// SPRenderQueueTools.jsx// // This script creates and shows a floating palette.// The floating palette contains buttons that launch a variety of// render queue scripts.function SPRenderQueueTools(thisObj){	function buildUI(thisObj) {		var panel = (thisObj instanceof Panel) ? thisObj : new Window("palette","SPRenderQueueTools",undefined, {resizeable:true});		res = "group{orientation:'row',alignment:['center','fill'],\					groupOne: Group{orientation:'column',alignment:['center','fill'],alignChildren:['fill','top'],\						button1: Button{},\						button2: Button{},\						Divider1: Panel{},\						button3: Button{},\						button4: Button{},\						button5: Button{},\						Divider2: Panel{},\						button6: Button{},\						button7: Button{},\						Divider3: Panel{},\						buttonHelp: Button{text:'?'},\					},\				}";				panel.grp = panel.add(res);		return panel;	}	// Called when a button is pressed, to invoke its associated script	function onHelpButtonClick() {		alert("Click a button to run one of the following scripts:\n\n"  +			"Create folder and output for selected comps\n\n"+			"Select some comps in the project window. Press the button. It will ask for a directory. In that directory it will make a folder for each of the selected comps and set the render queue output to that folder. Great for generating pre renders.\n\n"+			"Create folder for sequences in render queue\n\n"+			"Works on every ticked item in the render queue. Only works on the last output module for a render item. If the output module is a file sequence it will make a directory for that sequence and place the output in that directory. Great if you've set a whole lot of sequences in the queue but haven't set or made their output directories.\n\n"+			"Add proxy module for items in render queue\n\n"+			"Works on every ticked item in the render queue. Takes the last output module and duplicates it except adds \"/proxy\" to the directory (and creates the proxy directory). It's up to you to change the resize of the output module. Great for making half res or JPG proxies at the same time as rendering the high res.\n\n"+			"Change directory for items in render queue\n\n"+			"Works on every ticked item in the render queue. It will ask for a directory. It will set the output for every output module to that directory. Great for setting a directory if you've added items to the queue but forgot to set the output correctly first. Be careful that it sets the output of every output module so be careful if you've setup proxies.\n\n"+			"Change directory for items in render queue\n\n"+			"Works on every ticked item in the render queue. Asks which template to use for a given output module. Great for changing the template to something lightweight like JPG after using the \"Add proxy module for items in render queue\" script.\n\n"+			"Create WIP render for selected comps\n\n"+			"Select some comps in the project window. Press the button. For every selected comp it will make a movie in the WIP folder under today's date. Great for generating WIPs!\n\n"+			"Update WIP items in render queue\n\n"+			"Works on every ticked item in the render queue. If the item is a WIP render it will update it for today's date. Great for generating WIPs!\n\n"+			"Written by Daniel Harkness, Spinifex Group.\n\n" +			"https://github.com/spinifexgroup-studio/studio_pipeline/tree/master/ae_scripts_develop\n" +			"\n" +			"", "SPRenderQueueTools"			  );	}	// Called when a button is pressed, to invoke its associated script	function onScriptButtonClick() {		var prevCurrentFolder = Folder.current;		Folder.current = this.currentDirectory;		// The scriptFile variable was set during addButton.		// Run the script by opening it, reading it, and evaluating its contents.		var scriptFile = new File(this.scriptFileName);		scriptFile.open();		eval(scriptFile.read());		scriptFile.close();		Folder.current = prevCurrentFolder;	}	// This function adds a new script-launching button to the palette	function setScriptButton(button, buttonLabel, buttonCurrentDirectory, buttonScriptName) {		// JavaScript has an unusual but useful bit of functionality.		// You can just assign a value to a new variable name and JS will		// store it for you. The lines below create new variables named		// scriptName and currentDirectory within button, and sets them		// to buttonScriptName and myCurrentDirectory.		// Later, in the onButtonClick() callback, the button will first		// re-establish the current directory, then load and		// run that file.		button.text = buttonLabel;		button.scriptFileName  = buttonScriptName;		button.currentDirectory = buttonCurrentDirectory;		button.onClick = onScriptButtonClick;	}	function isSecurityPrefSet() {		var securitySetting = app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");		return (securitySetting == 1);	}	if (isSecurityPrefSet() == true) {		//		// Save the value of the current directory.		// -- In some cases, the current directory value is lost when button and other		// callbacks are invoked from a floating palette.		// -- Some of the buttons in the demo palette need to read other script		// files.  The most convenient notation for the filenames is to specify them		// relative to the current directory. And if the current directory is set wrong,		// then the nested scripts will fail to run correctly.		// -- to fix this, save the current directory now, and make sure to 		// re-establish it during onScriptButtonClick(). This will insure that the 		// files run during onScriptButtonCl		var myDirectory = Folder.current;		var scriptDirectory = new Folder(myDirectory.absoluteURI+"/(SPRenderQueueToolsFunctions)");		// Create and show a floating palette		//		//var myPanel = new Window("palette","SPRenderQueueTools");		var myPanel = buildUI(thisObj);		setScriptButton(myPanel.grp.groupOne.button1, "Create folder and output for selected comps",  scriptDirectory, "SPCreateFolderAndOutputForSelectedComps.jsx");		setScriptButton(myPanel.grp.groupOne.button2, "Create folder for sequences in render queue",  scriptDirectory, "SPCreateFolderForRenderQueueSequences.jsx");		setScriptButton(myPanel.grp.groupOne.button3, "Add proxy module for items in render queue", scriptDirectory, "SPAddProxyModuleToRenderQueueItems.jsx");		setScriptButton(myPanel.grp.groupOne.button4, "Change directory for items in render queue", scriptDirectory, "SPChangeRenderLocations.jsx");		setScriptButton(myPanel.grp.groupOne.button5, "Set template of outputs in render queue", scriptDirectory, "SPSetTemplateOfOutputModuleN.jsx");		setScriptButton(myPanel.grp.groupOne.button6, "Create WIP render for selected comps",  scriptDirectory, "SPCreateWipRenderForSelectedComps.jsx");		setScriptButton(myPanel.grp.groupOne.button7, "Update WIP items in render queue",  scriptDirectory, "SPUpdateWipItemsInRenderQueue.jsx");		myPanel.grp.groupOne.buttonHelp.onClick = onHelpButtonClick;		//Seyp panel resizing		myPanel.layout.layout(true);		myPanel.grp.minimumSize = myPanel.grp.size;				// Make panel resize still		myPanel.layout.resize();		myPanel.onResizing = myPanel.onResize = function(){this.layout.resize()};		if (( myPanel != null) && (myPanel instanceof Window)){			myPanel.center();			myPanel.show();		}		} else {		alert ("This demo requires the scripting security preference to be set.\nGo to the \"General\" panel of your application preferences, and make sure that \"Allow Scripts to Write Files and Access Network\" is checked.", "Demo Palette");	}}SPRenderQueueTools(this);}