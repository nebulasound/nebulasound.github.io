# NebulaSound

### 1. What is it?

NebulaSound — is a Nebulas based decentralized social network with only one and important feature: music sharing. You can share your favourite songs with the whole nebulas community just via youtube link.

Today, using NebulaSound, you can share, listen and rate music which is uploaded on youtube. In future we are gonna to add API of such music services as soundcloud, last.fm and spotify.


### 2. Functions of mynameis.
```
- Enter an artist, title and youtube link of a song that you wanna share with.
- You can share as many songs as you want.
- If you decide to like the song, remember that you can't take your "like" back.
```

### 3. Smart Contract Instructions for Use

Contract address: n1h656qsWvxa7E9B3MQuWVjaL5MuAqXgi7A

#### 3.1 Using `getSongs`

Function, that gives you an array of objects of all registered songs. Objects properties: id, author, title, songUrl, watchUrl, uploadedBy, Rank. No arguments needed.

#### 3.2 `addSong`
 
This function requiers 3 strings, that will create your song.

To call a smart contract function you should enter an artist name, song title and youtube url:
```js
["Radiohead", "Creep", "https://www.youtube.com/watch?v=XFkzRNyygfk"]
```

#### 3.3 `rateSong`
 
This function allows you to rate any song you want. Remember that you can rate same song only once.

To call a smart contract function you should just enter song id:
```js
["1"]

```

#### 3.4 `getSongsCounter`
 
This function allows you to get a number of all shared songs. No arguments needed.

### Links

- Nebulas: https://nebulas.io/
- NebulaSound: http://nebulasound.github.io/