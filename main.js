// Code for toggle list in specialties part
window.addEventListener("load", () => {
    for (let i of document.querySelectorAll(".collapse ul")) {
      let trigger = document.createElement("div");
      trigger.innerHTML = i.previousSibling.textContent;
      trigger.className = "toggle";
      trigger.onclick = () => trigger.classList.toggle("show");
      i.parentElement.removeChild(i.previousSibling);
      i.parentElement.insertBefore(trigger, i);
    }
});