const topInputs = ["background",  "foreground", "cursor"];
const bottomInputs = [];
for (let i = 0; i < 16; i++) bottomInputs.push("color" + i);

const topWrapper = document.querySelector(".top-wrapper")
const bottomWrapper = document.querySelector(".bottom-wrapper")

const values = new Proxy({}, {
  set(target, prop, val) {
    target[prop] = val;

    const textarea = document.querySelector(".color-scheme");
    const value = Object.entries(target).map(([k, v]) => {
      return k + "=" + v + "\n";
    }).join("");

    textarea.value = value;
    
    return true;
  }
});

function randomCol() {
  const comp = () => (~~(Math.random() * 255)).toString(16).padStart("0", 2);
  return `#${comp()}${comp()}${comp()}`;
}

function createInput(name) {
  const el = document.createElement("div");
  const inp = document.createElement("input");
  const text = document.createElement("span");

  const value = randomCol()

  inp.type = "color";
  inp.name = name;
  inp.id = name;
  inp.value = value;

  text.innerText = name;
  el.append(inp, text);

  values[name] = value;

  return el;
}

topInputs.forEach(inp => {
  const el = createInput(inp);
  const input = el.querySelector("input");

  input.addEventListener("change", () => {
    values[inp] = input.value;
  });

  topWrapper.append(el);
});

bottomInputs.forEach(inp => {
  const el = createInput(inp);
  const input = el.querySelector("input");

  input.addEventListener("change", () => {
    values[inp] = input.value;
  });

  bottomWrapper.append(el);
});
