let bool = true
let bool1 = true
let thumb = false
let darkMode = true;
let thisScreen = $('#desktop-icon')

$(document).ready(function () {
    $('.buttonScreens').hide();
    $(thisScreen).show()
    thisScreen.css('color', '#C7C7C7')
    console.log($('#fram_radius'))
    $('#fram_divLabel').hide();
    $('#fram_moreApp').hide()

    $('#fram_radius').hover(function () {
        $('#fram_divLabel').show();

        $('#fram_radius').addClass('bgOnOpen')

    })
    $('#group_radius').mouseleave(function () {
        $('#fram_divLabel').hide();
        $('#fram_radius').removeClass('bgOnOpen')


    })

    $(".fram_settingImg").click(function () {
        $(".fram_sidebarLeft").toggle()
        $("#section").toggle()
        $("#adding").toggle()

    })
    $("#dark").click(function () {
        $("#ligth").toggle()
        $("#dark").toggle()
        $("#settingImgligth").toggle()
        $("#settingImgdark").toggle()
        $(".a").toggle()
        $(".b").toggle()
        $(".fram_editor").toggle()
        $(".fram_editor1").toggle()
        $(".fram_pSetting").removeClass("fram_BorderColor_purple").addClass("fram_BorderColor_black")
        $(".fram_fontButton").removeClass("fram_color_white").addClass("fram_color_black")
        $(".fram_sidebarRight").removeClass("fram_colorBackground-purple").addClass("fram_colorBackground_white")
        $(".fram_publish").removeClass("fram_colorBackground-purple1").addClass("fram_colorBackground_white")
        $(".fram_publishText").removeClass("fram_color_white").addClass("fram_color_black")


    })
    $("#ligth").click(function () {
        $("#ligth").toggle()
        $("#dark").toggle()
        $("#settingImgligth").toggle()
        $("#settingImgdark").toggle()
        $(".a").toggle()
        $(".b").toggle()
        $(".fram_editor").toggle()
        $(".fram_editor1").toggle()

        $(".fram_pSetting").removeClass("fram_BorderColor_black").addClass("fram_BorderColor_purple")
        $(".fram_fontButton").removeClass("fram_color_black").addClass("fram_color_white")
        $(".fram_sidebarRight").removeClass("fram_colorBackground_white").addClass("fram_colorBackground-purple")
        $(".fram_publish").removeClass("fram_colorBackground_white").addClass("fram_colorBackground-purple1")
        $(".fram_publishText").removeClass("fram_color_black").addClass("fram_color_white")


    })

    $("#thumbtack").click(function () {
        if (bool == true) {
            $("#thumbtack1").toggle()
            $("#thumbtack").toggle()
            thumb = true
        }

    })
    $("#thumbtack1").click(function () {
        if (bool == true) {
            thumb = false
            $("#thumbtack1").toggle()
            $("#thumbtack").toggle()
        }
    })

    //בלחיצת הנבבר הימני

    $("#menu2").click(function () {
        if (thumb === false) {
            $(".fram_sidebarRight").toggle()
            if (bool1 == true) { //כשהנבבר בצד  השמאלי סגור
                if (bool == true) {
                    $("#content").css('width', '97%')
                    $("#content").css('margin-left', '3%')
                    bool = false
                } else if (bool == false) { //כשרוצים לפתוח את הנבר בצד
                    $("#content").css('width', '81%')
                    $("#content").css('margin-left', '3%')


                    $("#content1").css('width', '0%')
                    bool = true
                }
            }
            if (bool1 == false) {
                if (bool == true) {
                    $("#content").css('width', '90%')
                    $("#content").css('margin-left', '14%')

                    bool = false
                } else if (bool == false) {
                    $("#content").css('width', '70%')
                    $("#content").css('margin-left', '14%')

                    bool = true
                }
            }
        }
    });

    //בלחיצת הנבבר השמאלי
    $("#menu1").click(function () {
        $(".fram_sidebarLeft").toggle()
        if (bool == true) {


            if (bool1 == true) {
                $(".fram_sidebarLeft1").removeClass("fram_none");
                // $("#sideLeft1").css('width', '9%')
                // $('#sideLeftClose')
                // $('#sideLeftOpen').css('width', '9%')
                $("#content").css('margin-left', '14%')

                $("#content").css('width', '70%')

                bool1 = false
            } else if (bool1 == false) {

                $(".fram_sidebarLeft1").addClass("fram_none");
                // $("#sideLeft1").css('width', '3%')
                // $('#sideLeftClose').css('width', '3%')
                $("#content").css('margin-left', '3%')
                $("#content").css('width', '81%')


                bool1 = true
            }
        }
        //כשהנבר בר בצד הימני סגור
        if (bool == false) {


            if (bool1 == true) { //לפתיחת נבבר מורחב בצד השמאלי
                $(".fram_sidebarLeft1").removeClass("fram_none");
                // $("#sideLeft1").css('width', '9%')
                $("#content").css('margin-left', '14%')

                $("#content").css('width', '90%')


                bool1 = false
            } else if (bool1 == false) {

                $(".fram_sidebarLeft1").addClass("fram_none");
                // $("#sideLeft1").css('width', '3%')
                $("#content").css('margin-left', '3%')

                $("#content").css('width', '97%')


                bool1 = true
            }
        }
    });


});
function changeMode() {

    darkMode = !darkMode;
    if (darkMode)
        $('#wrap-configurator').removeClass('wrap-con-dark-mode');
    else
        $('#wrap-configurator').addClass('wrap-con-dark-mode');
        event.stopPropagation();

}
function listApp() {
    $('#fram_moreApp').toggle()

}

function previewScreens(screen) {


    // let page;
    // if (path.includes("view")) {
    //   page = $("#landingPage_view");
    // } else {
    //   page = $("#landingPage");
    // }
    // page.attr("class", function (i, c) {
    //   return c.replace(/(^|\s)landingPage-in-\S+/g, "");
    // });
    // page.addClass("landingPage-in-" + screen + "");





    //     $('.buttonScreens').show()
    if (thisScreen[0] === $(`#${screen}-icon`)[0]) {
        $('.buttonScreens').show()
        return
    }
    let page = $("#landingPage");
    // if (path.includes('view')) {
    //     page = $('#readyForm');
    // }
    // else {
    //     page = $('#form');
    // }
    page.attr("class", function (i, c) {
        return c.replace(/(^|\s)landingPage-in-\S+/g, "");
    });
    console.log(screen)
    page.addClass("landingPage-in-" + screen + "");
    if (screen === "tablet" || "phone") {
        page.addClass("mx-auto")
    }
    if (screen === "desktop") {
        page.removeClass("mx-auto")
    }

    $('.buttonScreens').hide();
    $('.buttonScreens').css('color', '')
    thisScreen = $(`#${screen}-icon`)
    thisScreen.show();
    thisScreen.css('color', '#C7C7C7')
}