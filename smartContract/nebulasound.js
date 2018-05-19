"use strict";
var nebulaSound = function() {
    LocalContractStorage.defineMapProperty(this, "songs")
    LocalContractStorage.defineMapProperty(this, "ranks")
    LocalContractStorage.defineProperty(this, "songsCounter", null)
    LocalContractStorage.defineProperty(this, "ranksCounter", null)
}

nebulaSound.prototype = {
    init: function() {
        this.songsCounter = 0
        this.ranksCounter = 0
    },
    addSong: function(author, title, songUrl) {
        if (this.songsCounter > 0) {
            for (var i = 1; i <= this.songsCounter; i++) {
                if (author === this.songs.get(i).author && title === this.songs.get(i).title || songUrl === this.songs.get(i).songUrl) {
                    throw new Error("This song is already exists.");
                }
            }
        }


        if (author === "" || title === "" || songUrl === "") {
            throw new Error("Please enter all needed data.");
        }
        var from = Blockchain.transaction.from;
        var songsCounter = new BigNumber(this.songsCounter).plus(1)
        var re = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;
        if (re.test(songUrl)) {
            var watchUrl = songUrl.replace(/.*v=/, "");
            watchUrl = "https://www.youtube.com/embed/" + watchUrl

        } else {
            throw new Error("Enter valid youtube song url.");
        }

        this.songs.set(songsCounter, { id: songsCounter, author: author, title: title, songUrl: songUrl, watchUrl: watchUrl, uploadedBy: from, rank: 0 })
        this.songsCounter = songsCounter
        return true
    },
    rateSong: function(songId) {
        var from = Blockchain.transaction.from;
        if (this.songs.get(songId)) {
            if (this.ranksCounter > 0) {
                for (var i = 1; i <= this.ranksCounter; i++) {
                    if (from === this.ranks.get(i).from && songId === this.ranks.get(i).songId) {
                        throw new Error("You have already liked this song.");
                    }
                }

            }
            var currentRank = this.songs.get(songId).rank
            var currentAuthor = this.songs.get(songId).author
            var currentTitle = this.songs.get(songId).title
            var currentFrom = this.songs.get(songId).uploadedBy
            var currentUrl = this.songs.get(songId).songUrl
            var currentId = this.songs.get(songId).id
            var currentWatchUrl = this.songs.get(songId).watchUrl
            var ranksCounter = new BigNumber(this.ranksCounter).plus(1)
            this.ranksCounter = ranksCounter
            var newRank = currentRank + 1
            this.songs.del(songId)
            this.songs.set(currentId, { id: currentId, author: currentAuthor, title: currentTitle, songUrl: currentUrl, watchUrl: currentWatchUrl, uploadedBy: currentFrom, rank: newRank })
            this.ranks.set(ranksCounter, { from: from, songId: songId })
            return true
        } else {
            throw new Error("Song with this ID doesn't exist.");
        }


    },
    getSongs: function() {
        if (this.songsCounter > 0) {
            var allSongs = []
            for (var i = 1; i <= this.songsCounter; i++) {
                allSongs.push(this.songs.get(i))
            }
            return allSongs
        } else {
            throw new Error("No songs were registered yet");
        }

    },
    getSongsCounter: function() {
        return +this.songsCounter
    }
}

module.exports = nebulaSound

n1h656qsWvxa7E9B3MQuWVjaL5MuAqXgi7A
e8ae8b85e3857c99732bc247befb3bf65fc205bc726d490079cc364eed182608