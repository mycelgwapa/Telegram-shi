const container = document.querySelector('.container');
const music = document.getElementById('music');

// Play music when container is hovered
container.addEventListener('mouseenter', function() {
  music.play();
});

// Pause music when container is not hovered anymore
container.addEventListener('mouseleave', function() {
  music.pause();
});

// Select all list items in the navigation menu
const listItems = document.querySelectorAll('.nav li');

// Loop through each list item
listItems.forEach(listItem => {
  // Add click event listener to each list item
  listItem.addEventListener('click', function(event) {
    // Check if it's the phone number link
    const link = this.querySelector('a');
    if (link && link.getAttribute('href').startsWith('tel:')) {
      // Ask for confirmation before calling the number
      if (confirm('Are you sure you want to call this number?')) {
        // User confirmed, proceed with default link behavior
      } else {
        // User canceled, prevent default link behavior
        event.preventDefault();
      }
    }
    
    // Add visual click effect (optional)
    listItem.classList.add('clicked');
    setTimeout(() => listItem.classList.remove('clicked'), 200); // Remove effect after 200ms
  });
});
