const out = document.getElementById("output");
fetch((import.meta.env.VITE_API_URL || "/api") + "/hello")
  .then(r => r.json())
  .then(j => out.innerText = JSON.stringify(j));
