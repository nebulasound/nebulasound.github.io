var dappAddress = "n1h656qsWvxa7E9B3MQuWVjaL5MuAqXgi7A";

var NebPay = require("nebpay");
var nebPay = new NebPay();

//to check if the extension is installed
//if the extension is installed, var "webExtensionWallet" will be injected in to web page
if (typeof webExtensionWallet === "undefined") {
    $("#noExtension").removeClass("hide");
}

/** Preload shared songs */
function getNameOf() {
    var args = '';
    var func = "getSongs";
    nebPay.simulateCall(dappAddress, 0, func, args, {
        listener: getNameOfResp
    });
}

function getNameOfResp(resp) {
    var result = eval(JSON.parse(resp.result));
    Vue.set(app, 'songs', result)
}
getNameOf()

var args = ""
var rateItem = ''

function clickRateSong(id) {
    rateItem = '#'+id
    args = id
    rateSong();
}

function rateSong() {
    var args2 = '["' + args + '"]';
    var func = "rateSong";
    nebPay.simulateCall(dappAddress, 0, func, args2, {
        listener: rateSongResp
    });
}

function rateSongTrue() {
    var args2 = '["' + args + '"]';
    var func = "rateSong";
    nebPay.call(dappAddress, 0, func, args2, {
        listener: rateSongRespTrue
    });
}

function rateSongResp(resp) {
    $(rateItem).removeClass('hide')
    if (
        resp.result === "Error: You have already liked this song." ||
        resp.result === "Error: Song with this ID doesn't exist."
    ) {
        $(rateItem).addClass('--fail')
        $(rateItem).text(resp.result);
    } else {
        rateSongTrue();
    }
}

function rateSongRespTrue(resp) {
    $(rateItem).removeClass('hide')
    $(rateItem).removeClass('--fail')
    $(rateItem).text("You like it!");
}

function clickAddSong() {

    addSong();
}

function addSong() {
    var artist = $(".artist").val()
    var title = $(".title").val()
    var url = $(".url").val()
    var args2 = '[' + '"' + artist + '",' + '"' + title + '",' + '"' + url + '"' + ']';
    var func = "addSong";
    nebPay.simulateCall(dappAddress, 0, func, args2, {
        listener: addSongResp
    });
}

function addSongTrue() {
    var artist = $(".artist").val()
    var title = $(".title").val()
    var url = $(".url").val()
    var args2 = '[' + '"' + artist + '",' + '"' + title + '",' + '"' + url + '"' + ']';
    var func = "addSong";
    nebPay.call(dappAddress, 0, func, args2, {
        listener: addSongRespTrue
    });
}

function addSongResp(resp) {
    $('.add-tooltip').removeClass('hide')
    if (
        resp.result === "Error: This song is already exists." ||
        resp.result === "Error: Please enter all needed data." ||
        resp.result === "Enter valid youtube song url."
    ) {

        $('.add-tooltip').addClass('--fail')
        $(".add-tooltip").text(resp.result);
    } else {
        addSongTrue();
    }
}

function addSongRespTrue(resp) {
    $('.add-tooltip').removeClass('hide')
    $('.add-tooltip').removeClass('--fail')
    $(".add-tooltip").text("You have succefully shared the song.");
}

Vue.use(VueMaterial.default)

var app = new Vue({

    beforeMount() {


    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false
        }, 1500)
    },

    data: {
        songs: []
    },

    methods: {

    }
})

app.$mount("#app")