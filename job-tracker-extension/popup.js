const WEB_APP_URL = "[INSTERT_YOUR_WEB_APP_URL_HERE]";

const companyInput = document.getElementById("companyNameInput");
const statusSelector = document.getElementById("statusSelector");
const submitBtn = document.getElementById("submitBtn");
const statusMsg = document.getElementById("statusMsg");

function saveLink() {
  const companyName = companyInput.value.trim();
  if (!companyName) {
    statusMsg.innerText = "Please enter a company name.";
    setTimeout(() => statusMsg.innerText = "", 2500);
    return; 
  }

  const status = statusSelector.value;

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const link = tabs[0].url;

    const payload = {
      link: link,
      status: status,
      company: companyName
    };

    fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    }).catch(err => {
      statusMsg.innerText = "Error: " + err;
      return;
    });

    statusMsg.innerText = "Saved!";
    companyInput.value = "";
    setTimeout(() => statusMsg.innerText = "", 2000);
  });
}

submitBtn.addEventListener("click", saveLink);

companyInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    saveLink();
  }
});