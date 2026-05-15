const WEB_APP_URL = "YOUR_WEB_APP_URL_HERE";

const companyInput = document.getElementById("companyNameInput");
const statusSelector = document.getElementById("statusSelector");
const jdInput = document.getElementById("jdInput");
const resumeInput = document.getElementById("resumeInput");
const submitBtn = document.getElementById("submitBtn");
const statusMsg = document.getElementById("statusMsg");

async function getFileData(file) {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({
      base64: reader.result.split(',')[1],
      name: file.name,
      type: file.type,
      hash: hashHex
    });
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

async function saveLink() {
  const companyName = companyInput.value.trim();
  if (!companyName) {
    statusMsg.innerText = "Please enter a company name.";
    setTimeout(() => statusMsg.innerText = "", 2500);
    return; 
  }

  const status = statusSelector.value;
  const jd = jdInput.value.trim();
  let resumeData = null;

  if (resumeInput.files.length > 0) {
    try {
      resumeData = await getFileData(resumeInput.files[0]);
    } catch (err) {
      statusMsg.innerText = "Error reading file.";
      return;
    }
  }

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const link = tabs[0].url;

    const payload = {
      company: companyName,
      link: link,
      status: status,
      jd: jd,
      resume: resumeData
    };

    console.log("Sending payload:", payload);

    fetch(WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    }).then(response => {
      if (response.ok || response.type === 'opaque') {
        statusMsg.innerText = "Saved!";
        companyInput.value = "";
        jdInput.value = "";
        resumeInput.value = "";
        setTimeout(() => statusMsg.innerText = "", 2000);
      } else {
        statusMsg.innerText = "Error: " + response.statusText;
      }
    }).catch(err => {
      statusMsg.innerText = "Error: " + err;
    });
  });
}

submitBtn.addEventListener("click", saveLink);

companyInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    saveLink();
  }
});