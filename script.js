const emailUser = "bijaybeezoe";
const emailDomain = "gmail.com";
document.getElementById("email").textContent =
  emailUser + "@" + emailDomain;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});
