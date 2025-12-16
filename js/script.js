// const API_URL = 'https://student-management-lilac-seven.vercel.app/api/users'


// const loginForm = document.getElementById("loginForm")
// const registerForm = document.getElementById("registerForm")

// if(registerForm){
//     registerForm.addEventListener("submit", async (e) => {
//         e.preventDefault()
//         const username = document.getElementById("registerUser").value
//         const email = document.getElementById("registerEmail").value
//         const password = document.getElementById("registerPassword").value
//         try {
//             const response = await fetch(`${API_URL}/register`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     username,
//                     email,
//                     password,
//                 }),
//             })
//             const data = await response.json()
//             if(response.ok){
//                 alert("User registered successfully")
//                 window.location.href = "index.html"
//             } else {
//                 alert(data.message)
//             }
//         } catch (err) {
//             alert(err.message)
//         }
//     })
// }

// if(loginForm){
//     loginForm.addEventListener("submit", async (e) => {
//         e.preventDefault()
//         const username = document.getElementById("loginUser").value
//         const password = document.getElementById("loginPassword").value
//         try {
//             const response = await fetch(`${API_URL}/login`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     username,
//                     password,
//                 }),
//             })
//             const data = await response.json()
//             if(response.ok){
//                 localStorage.setItem("token", data.token)
//                 // alert("User logged in successfully")
//                 window.location.href = "students.html"
//             } else {
//                 alert(data.message || "Login failed")
//             }
//         } catch (err) {
//             alert(err.message)
//         }
//     })
// }

const API_URL = 'https://student-management-lilac-seven.vercel.app/api/users';

// ================= LOGIN =================
if (window.location.pathname.endsWith('index.html')) {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("loginUser").value;
      const password = document.getElementById("loginPassword").value;

      try {
        const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          window.location.href = "students.html";
        } else {
          alert(data.message || "Login failed");
        }
      } catch (err) {
        alert(err.message);
      }
    });
  }
}

// ================= REGISTER =================
if (window.location.pathname.endsWith('register.html')) {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("registerUser").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;

      try {
        const response = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("User registered successfully");
          window.location.href = "index.html";
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert(err.message);
      }
    });
  }
}




// Profile Page
if(window.location.pathname.endsWith('profile.html')) {
    const token = localStorage.getItem('token');
    if(!token) {
        window.location.href = 'index.html';
    }

    const fetchProfile = async () => {
        const response = await fetch(`${API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        document.getElementById('username').value = data.username;
        document.getElementById('email').value = data.email;
    }

    fetchProfile();

    document.getElementById('update-profile-btn').addEventListener('click', async () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const response = await fetch(`${API_URL}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, email })
        });
        const data = await response.json();
        if(response.ok) {
            alert('Profile updated successfully');
            localStorage.setItem('token', data.token);
            fetchProfile();
        } else {
            alert('Failed to update profile');
        }
    });

    document.getElementById('password-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if(newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
        }

        const response = await fetch(`${API_URL}/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ currentPassword, newPassword })
        });

        if(response.ok) {
            alert('Password updated successfully');
            e.target.reset();
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to update password');
        }
    });
}

const logoutButton = document.getElementById('logout');
if(logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });
}