const Jiffy = {};
Jiffy.enable = function(elt){
  if (typeof elt === "string") elt = document.getElementById(elt);
  elt.clear = function() {
    elt.innerHTML = null;
  };
  elt.print = function(value = "&nbsp;") {
    let div = document.createElement("div");
    div.innerHTML = value;
    elt.appendChild(div);
  };
  elt.input = function(prompt) {
    return new Promise(resolve => {
      if (prompt) elt.print(prompt);
      let div = document.createElement("div");
      div.setAttribute("contenteditable", "true");
      div.addEventListener("paste", function(e){
        e.preventDefault();
        let clipText = event.clipboardData.getData("text/plain");
        document.execCommand("inserttext", false, clipText);
        elt.scrollTop = elt.scrollHeight;
      });
      div.addEventListener("keydown", function(e){
        if (e.key === "Enter") {
          e.preventDefault();
          div.removeAttribute("contenteditable");
          resolve(div.innerText);
        }
      });
      elt.appendChild(div);
      div.focus();
    });
  };
  return Jiffy;
};
