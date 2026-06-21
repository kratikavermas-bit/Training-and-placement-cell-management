// Check if user is logged in
document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("userEmail");
  
  // If no user logged in, redirect to login page
  if (!user && !window.location.href.includes("login.html") && !window.location.href.includes("signup.html")) {
    window.location.href = "login.html";
  }
});

// Logout function
function logout() {
  localStorage.removeItem("userEmail");
  alert("Logged out successfully!");
  window.location.href = "login.html";
}
