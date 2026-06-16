const contactForm = document.getElementById("contactForm");
const contactSubmitBtn = document.getElementById("contactSubmitBtn");
const contactFormStatus = document.getElementById("contactFormStatus");

function showContactStatus(message, type = "success") {
  contactFormStatus.style.display = "block";
  contactFormStatus.textContent = message;

  if (type === "success") {
    contactFormStatus.style.color = "#22c55e";
  } else {
    contactFormStatus.style.color = "#ef4444";
  }
}

function hideContactStatus() {
  contactFormStatus.style.display = "none";
  contactFormStatus.textContent = "";
}

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    hideContactStatus();

    const formData = new FormData(contactForm);

    contactSubmitBtn.disabled = true;
    contactSubmitBtn.innerHTML = `<i class="bi bi-arrow-repeat"></i> Sending...`;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to send message.");
      }

      contactForm.reset();

      contactSubmitBtn.innerHTML = `<i class="bi bi-check-circle-fill"></i> Message Sent`;
      contactSubmitBtn.style.background = "#16A34A";

      showContactStatus("Thank you! Your message has been sent successfully.", "success");

      setTimeout(() => {
        contactSubmitBtn.innerHTML = `<i class="bi bi-send-fill"></i> Send Message`;
        contactSubmitBtn.style.background = "";
        contactSubmitBtn.disabled = false;
        hideContactStatus();
      }, 4000);

    } catch (error) {
      console.error(error);

      showContactStatus("Failed to send message. Please try again.", "error");

      contactSubmitBtn.innerHTML = `<i class="bi bi-send-fill"></i> Send Message`;
      contactSubmitBtn.disabled = false;
    }
  });
}