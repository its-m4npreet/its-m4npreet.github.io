import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAumQNQpLWSll-9Zuf74J93fvmV8ykE4HQ",
  authDomain: "comment-box-1b61e.firebaseapp.com",
  projectId: "comment-box-1b61e",
  storageBucket: "comment-box-1b61e.appspot.com",
  messagingSenderId: "167034835541",
  appId: "1:167034835541:web:98828fdcf3649c174c7adc",
  measurementId: "G-L7QTPK805N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('commentForm');
const commentContainer = document.getElementById('posted-comments');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = form['commenter-name'].value;
  const message = form['comment'].value;

  if (!name || !message) return;

  try {
    await addDoc(collection(db, "comments"), {
      name,
      message,
      timestamp: serverTimestamp()
    });

    showSuccess(name);
    form.reset();
    loadComments(); // Reload all comments
  } catch (err) {
    alert("❌ Error sending comment: " + err.message);
  }
});

// Load Comments
async function loadComments() {
  commentContainer.innerHTML = "";

  const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement('div');
    div.className = "user-comment";
    // Helper to format time as "x min ago"
    function timeAgo(date) {
      const now = new Date();
      const seconds = Math.floor((now - date) / 1000);
      if (seconds < 60) return "just now";
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes} min ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    let commentTime = "";
    if (data.timestamp?.toDate) {
      commentTime = timeAgo(data.timestamp.toDate());
    }

    div.innerHTML = `
      <div class="comment-header">
      <span class="avatar">${data.name ? data.name.charAt(0).toUpperCase() : "?"}</span>
      <strong class="commenter-name">${data.name || "Anonymous"}</strong>
      <span class="comment-time">${commentTime}</span>
      </div>
      <div class="comment-body">
      <p>${data.message}</p>
      </div>
    `;
    commentContainer.appendChild(div);
  });
}

function showSuccess(name) {
  const div = document.createElement("div");
  div.className = "success-msg";
  div.textContent = `✅ ${name}, your comment was posted!`;
  form.parentElement.prepend(div);
  setTimeout(() => div.remove(), 3000);
}

window.addEventListener('DOMContentLoaded', loadComments);




document.addEventListener('DOMContentLoaded', function () {
  // Active link highlighting
  const navLinks = document.querySelectorAll('.nav .links a');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Remove 'active' id from all links
      navLinks.forEach(l => l.removeAttribute('id'));
      // Add 'active' id to the clicked link
      this.setAttribute('id', 'active');
    });
  });

  // Mobile menu toggle
  const menuIcon = document.getElementById('menu-icon');
  const navList = document.getElementById('nav-links');

  if (menuIcon && navList) {
    menuIcon.addEventListener('click', () => {
      navList.classList.toggle('show');
      
    });
  }
});


  setTimeout(() => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");

    // Completely remove welcome screen from layout after fade animation
    welcomeScreen.style.display = "none";

    // Optional: show main content
    if (mainContent) {
      mainContent.style.display = "block";
    }
  }, 5000);



  // email
// script.js
// (function () {
//   emailjs.init("public_t59WzyfRLZqn8FQGN"); // Use your actual public key
// })();
emailjs.init("t59WzyfRLZqn8FQGN");

  // Handle contact form submission using EmailJS
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('service_zi44onk', 'template_zze3grt', this)
      .then(() => {
        alert("Message sent successfully!");
        this.reset();
      }, (error) => {
        alert("Failed to send message.\n" + JSON.stringify(error));
      });
  });

  // Load comments from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const commentBox = document.getElementById('posted-comments');
  const savedComments = JSON.parse(localStorage.getItem('comments')) || [];

  savedComments.reverse().forEach(({ name, comment }) => {
    const newComment = document.createElement('div');
    newComment.classList.add('user-comment');
    newComment.innerHTML = `<strong>${name}:</strong> <p>${comment}</p>`;
    commentBox.appendChild(newComment);
  });
});

// to get the comment message  in email
// To send comment via email when the comment form is submitted
// Ensure EmailJS is initialized (replace 'YOUR_USER_ID' with your actual EmailJS user ID)
emailjs.init('t59WzyfRLZqn8FQGN');

// Add event listener to the comment form
document.getElementById('commentForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Correctly select input elements using querySelector or getElementById
  const name = document.querySelector('#commentForm #name').value.trim();
  const comment = document.querySelector('#commentForm #message').value.trim();

  // Send email using EmailJS
  emailjs.send('service_zi44onk', 'template_zze3grt', {
    name: name,
    comment: comment
  })
  .then(function(response) {
    // Show success message and reset form
    alert('Comment sent successfully!'); // Replace with better UI feedback
    console.log('SUCCESS!', response.status, response.text);
    document.getElementById('commentForm').reset(); // Clear form
  }, function(error) {
    // Show specific error message
    alert('Failed to send comment: ' + (error.text || 'Unknown error'));
    console.log('FAILED...', error);
  });
});



Array.from(document.getElementsByClassName('project-btn')).forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    const projectName = card.querySelector('.project-title').textContent;
    const projectDescription = card.querySelector('.project-desc').textContent;
        const linkElement = card.querySelector('.project-link');
    const link = linkElement ? linkElement.getAttribute('data-link') || '' : '';
    const image = card.querySelector('img')?.src || '';

    // Store as a history list
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    savedProjects.push({
      name: projectName,
      description: projectDescription,
      link: link,
      image: image
    });
    localStorage.setItem('projects', JSON.stringify(savedProjects));

    // Store the selected project for the second page
    const selectedProject = {
      name: projectName,
      description: projectDescription,
      link: link,
      image: image
    };
    localStorage.setItem('selectedProject', JSON.stringify(selectedProject));

    // Redirect to the second page
    window.location.href = '/html/p2.html';
  });
});







