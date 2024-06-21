let animationElements = document.querySelectorAll(".animation");

function isInViewport(element) {
  let rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function showScroll() {
  for (let i = 0; i < animationElements.length; i++) {
    if (isInViewport(animationElements[i])) {
      animationElements[i].style.opacity = 1;
      animationElements[i].classList.add("showUp");
    } else {
      animationElements[i].style.opacity = 0;
      animationElements[i].classList.remove("showUp");
    }
  }
}

window.addEventListener("scroll", () => {
  requestAnimationFrame(showScroll);
});
const modelViewer = document.getElementById("viewer");

document.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;
  const { innerWidth, innerHeight } = window;

  const percentX = clientX / innerWidth;
  const percentY = clientY / innerHeight;

  const orbitY = percentX * 360 - 180; // Map X position to 360 degrees
  const orbitX = percentY * 90 - 45; // Map Y position to 90 degrees (up and down)

  modelViewer.cameraOrbit = `${orbitX}deg ${orbitY}deg auto`;
});
function qs(selector, all = false) {
    return all
      ? document.querySelectorAll(selector)
      : document.querySelector(selector);
  }

  const sections = qs(".time-line-discription", true);
  const timeline = qs(".timeline");
  const line = qs(".line");

  let prevScrollY = window.scrollY;
  let full = false;
  let set = 0;
  const targety = window.innerHeight * 0.8;

  function scrollHandler() {
    const { scrollY } = window;
    const up = scrollY < prevScrollY;
    const down = !up;

    const timelineRect = timeline.getBoundingClientRect();
    const dist = targety - timelineRect.top;

    if (down && !full) {
      set = Math.max(set, dist);
      line.style.bottom = `calc(100% - ${set}px)`;
    }

    if (dist > timeline.offsetHeight + 50 && !full) {
      full = true;
      line.style.bottom = '-50px';
    }

    sections.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top + item.offsetHeight / 5 < targety) {
        item.classList.add("show-me");
      }
    });

    prevScrollY = window.scrollY;
  }

  window.addEventListener("scroll", scrollHandler);

  // Initial call to set up the initial state
  scrollHandler();
  line.style.display = "block";
  window.addEventListener("scroll",scrollHandler);

  document.addEventListener("DOMContentLoaded", function () {
    const email = {
        email: "",
        subject: "",
        message: "",
    };

    const inputEmail = document.querySelector("#email");
    const inputSubject = document.querySelector("#subject");
    const inputMessage = document.querySelector("#message");
    const form = document.querySelector("#form");
    const btnSubmit = document.querySelector('#form button[type="submit"]');
    const btnReset = document.querySelector('#form button[type="reset"]');
    const spinner = document.querySelector("#spinner");

    inputEmail.addEventListener("input", validate);
    inputSubject.addEventListener("input", validate);
    inputMessage.addEventListener("input", validate);
    btnSubmit.addEventListener("click", sendEmail);
    btnReset.addEventListener("click", function (e) {
        e.preventDefault();
        resetForm();
    });

    function sendEmail(e) {
        e.preventDefault();
        spinner.classList.remove("hideSpinner");
        setTimeout(() => {
            spinner.classList.add("hideSpinner");
            resetForm();
            const alertSuccess = document.createElement("p");
            alertSuccess.textContent = "✅ Message sent successfully!";
            alertSuccess.classList.add("message-sent");
            form.appendChild(alertSuccess);
            setTimeout(() => {
                alertSuccess.remove();
            }, 3000);
        }, 3000);
    }

    function validate(e) {
        const { name, value, parentElement, id } = e.target;
        if (value.trim() === "") {
            showAlert(`⚠️ The ${name} field is required.`, parentElement);
            email[name] = "";
            checkEmail();
            return;
        }

        if (id === "email" && !validateEmail(value)) {
            showAlert("❌ Please enter a valid email address.", parentElement);
            email[name] = "";
            checkEmail();
            return;
        }

        cleanAlert(parentElement);
        email[name] = value.trim().toLowerCase();
        checkEmail();
    }

    function showAlert(message, reference) {
        cleanAlert(reference);
        const error = document.createElement("p");
        error.textContent = message;
        error.classList.add("error-form");
        reference.appendChild(error);
    }

    function cleanAlert(reference) {
        const alert = reference.querySelector(".error-form");
        if (alert) {
            alert.remove();
        }
    }

    function validateEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }

    function checkEmail() {
        if (Object.values(email).includes("")) {
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.disabled = false;
    }

    function resetForm() {
        email.email = "";
        email.subject = "";
        email.message = "";
        form.reset();
        checkEmail();
    }
});

document.addEventListener('mousemove', (event) => {
  const modelViewer = document.querySelector('#viewer1');
  const { clientX, clientY } = event;
  const { innerWidth, innerHeight } = window;
  
  const xPercentage = clientX / innerWidth;
  const yPercentage = clientY / innerHeight;
  
  const xOrbit = (xPercentage * 360 - 180).toFixed(2);
  const yOrbit = (yPercentage * 360 - 180).toFixed(2);
  
  modelViewer.cameraOrbit = `${xOrbit}deg ${yOrbit}deg auto`;
});
document.addEventListener('mousemove', (event) => {
  const modelViewer = document.querySelector('#viewer2');
  const { clientX, clientY } = event;
  const { innerWidth, innerHeight } = window;
  
  const xPercentage = clientX / innerWidth;
  const yPercentage = clientY / innerHeight;
  
  const xOrbit = (xPercentage * 360 - 180).toFixed(2);
  const yOrbit = (yPercentage * 360 - 180).toFixed(2);
  
  modelViewer.cameraOrbit = `${xOrbit}deg ${yOrbit}deg auto`;
});

var typed = new Typed(".hero-subheading",{
  strings:["Web Developer","Programmer","UI/UX Designer"],
  typeSpeed:110,
  backSpeed:50,
  backDelay:1500,
  loop:true
})
const spturl = 'https://script.google.com/macros/s/AKfycbyju0k4bfx_KWFIP4tmsDEiZeqQkTiXlnhwJhguYkoPGcsMP22U0rgyiKClqEr8-njbzQ/exec';
const form = document.forms['portfolio-contact'];

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(spturl, {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
      alert("Thank you, we will contact you soon!");
      window.location.reload();
    } else {
      alert("There was an error. Please try again.");
    }
  })
  .catch(error => {
    console.error('Error', error.message);
    alert("There was an error. Please try again.");
  });
});