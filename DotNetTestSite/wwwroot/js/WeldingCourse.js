jQuery(document).ready(initialise); //Initial set up, ensures table isn't displayed before selections are made

//Initialises the page by assigning event handlers to items and hides the module table initially
function initialise() {
    jQuery('#WeldingCourseWrapper select').change(updateModList);
    jQuery('#WeldingCourseWrapper input:checkbox').change(checkSelections);
    jQuery('#WeldingCourseWrapper input[type=reset]').click(function () { jQuery('input:disabled').removeAttr('disabled'); jQuery('input[type=submit]').remove(); updateModList(); });
    jQuery('#WeldingCourseWrapper input[type=reset]').css('margin-top', '10px');
    jQuery('#WeldingCourseWrapper #modules').hide();
}

//Updates the table of modules based on what the user selects and ensures incorrect combinations can not be selected
function updateModList() {
    jQuery('#WeldingCourseWrapper input:checked').removeAttr('checked');
    jQuery('#WeldingCourseWrapper input:disabled').removeAttr('disabled');
    jQuery('#WeldingCourseWrapper input[type=submit]').remove();
    var modList = document.getElementById('userMod');
    var selectedM = modList.options[modList.selectedIndex].value;
    var expList = document.getElementById('userExp');
    var selectedE = expList.options[expList.selectedIndex].value;

    if ((selectedM == " ") || (selectedE == " ")) //If both options are blank
    {
        jQuery('#WeldingCourseWrapper #modules').hide();
    }
    else if ((selectedM != "Any") && (selectedE == "Yes")) //If an area has been selected and has experience
    {
        jQuery('#WeldingCourseWrapper #modules').show();
        jQuery('#WeldingCourseWrapper tr').hide();
        jQuery('#WeldingCourseWrapper tr.' + selectedM).show();
    }
    else if ((selectedM == "Any") && (selectedE == "Yes")) //If any area and has experience
    {
        jQuery('#WeldingCourseWrapper #modules').show();
        jQuery('#WeldingCourseWrapper tr').show();
    }
    else if ((selectedM != "Any") && (selectedE == "No")) //If an area has been selected but no experience
    {
        jQuery('#WeldingCourseWrapper #modules').show();
        jQuery('#WeldingCourseWrapper tr').hide();
        jQuery('#WeldingCourseWrapper tr.' + selectedM + '.Safe').show();
    }
    else if ((selectedM == "Any") && (selectedE == "No")) //If any area but no experience
    {
        jQuery('#WeldingCourseWrapper #modules').show();
        jQuery('#WeldingCourseWrapper tr').hide();
        jQuery('#WeldingCourseWrapper tr.Safe').show();
    }
    jQuery('#WeldingCourseWrapper #colHead').show();
}

//Checks and ensures that only 3 modules are chosen
function checkSelections() {
    var selections = jQuery('#WeldingCourseWrapper input:checked');

    if (selections.length == 3) //If three modules have been chosen
    {
        jQuery('#WeldingCourseWrapper input[type=checkbox]:not(:checked)').attr('disabled', 'disabled');
    }
    else {
        jQuery('#WeldingCourseWrapper input:disabled').removeAttr('disabled');
        jQuery('#WeldingCourseWrapper input[type=submit]').remove();
        enforcePrerequisite(selections);
    }
}

//Enforces the prerequisite rules on the modules
//@param sel The jQuery object containing all the selected checkboxes
function enforcePrerequisite(sel) {
    var t = document.getElementById('userMod');
    var st = t.options[t.selectedIndex].value;
    var e = document.getElementById('userExp');
    var se = e.options[e.selectedIndex].value;

    if (se == "Yes") //If yes is selected prerequisites aren't needed
    {
        return;
    }
    else if (sel.length == 0 && st == "Any") //If no selections are made and any type is selected
    {
        jQuery('#WeldingCourseWrapper tr').hide();
        jQuery('#WeldingCourseWrapper tr#colHead').show();
        jQuery('#WeldingCourseWrapper tr.Safe').show();
        return;
    }
    else if (sel.length == 0 && st != "Any") //If no selections are made and a specific type is selected
    {
        jQuery('#WeldingCourseWrapper tr').hide();
        jQuery('#WeldingCourseWrapper tr#colHead').show();
        jQuery('#WeldingCourseWrapper tr.' + st + '.Safe').show();
        return;
    }

    var currentlySel = jQuery('#WeldingCourseWrapper td:contains(' + sel[(sel.length - 1)].value + ')').parent().attr('class'); //The class of the most recently selected item
    var type = currentlySel.split(' '); //The [type, class] of the most recently selected item

    if (sel.length == 1 && type[1] == "Safe") //If only one safety module is selected
    {
        jQuery('#WeldingCourseWrapper tr.Adv').hide();
        jQuery('#WeldingCourseWrapper tr.Intro').hide();
        jQuery('#WeldingCourseWrapper tr.' + type[0] + '.Intro').show();
    }
    else if (sel.length == 1 && type[1] != "Safe") //If a safety module is not selected
    {
        jQuery('#WeldingCourseWrapper input:checked').removeAttr('checked');
        checkSelections();
    }
    else if (sel.length == 2) //If two modules have been selected
    {
        var oldSel = jQuery('#WeldingCourseWrapper td:contains(' + sel[0].value + ')').parent().attr('class'); //The class of the previously selected item
        var oldType = oldSel.split(' '); //The [type, class] of the previously selected item
        if (oldType[0] == type[0] && oldType[1] == "Safe" && type[1] != "Adv") //If a safety and intro module have been selected
        {
            jQuery('#WeldingCourseWrapper tr.Intro:not(tr.' + type[0] + ')').hide();
            jQuery('#WeldingCourseWrapper tr.' + type[0] + '.Adv').show();
        }
        else if (oldType[0] != type[0] && type[1] == "Safe") //If two safety modules have been selected
        {
            jQuery('#WeldingCourseWrapper tr.Adv').hide();
            jQuery('#WeldingCourseWrapper tr.Intro').hide();
            jQuery('#WeldingCourseWrapper tr.' + type[0] + '.Intro').show();
            jQuery('#WeldingCourseWrapper tr.' + oldType[0] + '.Intro').show();
        }
        else if (oldType[1] == "Adv") //If a advanced module has been selected without the relevant safety and intro modules
        {
            jQuery('#WeldingCourseWrapper input:checked[value=' + sel[0].value + ']').removeAttr('checked');
            checkSelections();
        }
        else if (type[1] == "Adv") //If a advanced module has been selected without the relevant safety and intro modules
        {
            jQuery('#WeldingCourseWrapper input:checked[value=' + sel[1].value + ']').removeAttr('checked');
            checkSelections();
        }
        else {
            jQuery('#WeldingCourseWrapper input:checked[value=' + sel[1].value + ']').removeAttr('checked');
            checkSelections();
        }
    }
}