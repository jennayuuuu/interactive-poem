// main.js
document.addEventListener("DOMContentLoaded", function () {
    let divs = document.querySelectorAll(".grid-container div");

    function hop(el) {
        el.classList.remove("hop");
        void el.offsetWidth; 
        el.classList.add("hop");
        el.addEventListener("animationend", () => el.classList.remove("hop"), { once: true });
    }


    function wrapWords(el) {
        Array.from(el.childNodes).forEach(function (node) {
            if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) return;
            let frag = document.createDocumentFragment();
            node.textContent.split(/(\s+)/).forEach(function (part) {
                if (!part) return;
                if (/^\s+$/.test(part)) {
                    frag.appendChild(document.createTextNode(part));
                } else {
                    let span = document.createElement("span");
                    span.className = "word";
                    span.textContent = part;
                    frag.appendChild(span);
                }
            });
            el.replaceChild(frag, node);
        });
    }

    divs.forEach(wrapWords);

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("word")) hop(e.target); 
    });
    
});
