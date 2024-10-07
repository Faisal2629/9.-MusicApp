// Accessing DOM elements
const songList = document.getElementById('song-list');
const addSongBtn = document.getElementById('add-song-btn');
const searchBar = document.getElementById('search-bar');
const sortOptions = document.getElementById('sort-options');

// Playlist array
let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

// Function to render the playlist
function renderPlaylist() {
  songList.innerHTML = ''; // Clear existing songs
  playlist.forEach((song, index) => {
    const li = document.createElement('li');
    li.className = 'song-item';
    li.innerHTML = `
      <span>${song.title} by ${song.artist} - ${song.duration} min [${song.genre}]</span>
      <button onclick="deleteSong(${index})">Delete</button>
    `;
    songList.appendChild(li);
  });
}

// Add song to the playlist
addSongBtn.addEventListener('click', () => {
  const title = document.getElementById('song-title').value;
  const artist = document.getElementById('song-artist').value;
  const duration = document.getElementById('song-duration').value;
  const genre = document.getElementById('song-genre').value;

  if (title && artist && duration && genre) {
    playlist.push({ title, artist, duration, genre });
    localStorage.setItem('playlist', JSON.stringify(playlist));
    renderPlaylist();
  }
});

// Delete song from the playlist
function deleteSong(index) {
  playlist.splice(index, 1);
  localStorage.setItem('playlist', JSON.stringify(playlist));
  renderPlaylist();
}

// Search functionality
searchBar.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filteredSongs = playlist.filter(song =>
    song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
  );
  renderFilteredSongs(filteredSongs);
});

// Render filtered songs based on search
function renderFilteredSongs(songs) {
  songList.innerHTML = ''; // Clear existing songs
  songs.forEach((song) => {
    const li = document.createElement('li');
    li.className = 'song-item';
    li.innerHTML = `
      <span>${song.title} by ${song.artist} - ${song.duration} min [${song.genre}]</span>
    `;
    songList.appendChild(li);
  });
}

// Sorting functionality
sortOptions.addEventListener('change', (e) => {
  const sortBy = e.target.value;
  playlist.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  renderPlaylist();
});

// Initial render
renderPlaylist();
