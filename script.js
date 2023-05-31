const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get("name");
  const code = new QRCode("code");

  code.makeCode(name);
  let p = document.createElement("p");
  p.id = "code-label";
  p.innerText = `Name: ${name}`;
  document.getElementById("code").appendChild(p);
}

function handleClick() {
  const video = document.getElementById("video");
  const pName = document.getElementById("name");
  const pQuantity = document.getElementById("quantity");

  video.style.display = "block";

  const qrScanner = new QrScanner(
    video,
    (scan) => {
      qrScanner.stop();
      video.style.display = "none";

      const name = scan.data;
      let quantity = localStorage.getItem(name);
      if (quantity === null) {
        quantity = 0;
        localStorage.setItem(name, 0);
      }

      pName.innerText = name;
      pQuantity.innerText = quantity;
    },
    {
      returnDetailedScanResult: true,
    }
  );
  qrScanner.start();
}

function handlePlus() {
  const name = document.getElementById("name").innerText;
  addStock(name);
}

function handleMinus() {
  const name = document.getElementById("name").innerText;
  takeStock(name);
}

function addStock(name) {
  let count = localStorage.getItem(name);
  count++;
  localStorage.setItem(name, count);
  document.getElementById("quantity").innerText = count;
}

function takeStock(name) {
  let count = localStorage.getItem(name);
  count--;
  localStorage.setItem(name, count);
  document.getElementById("quantity").innerText = count;
}
