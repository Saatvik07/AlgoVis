const fib = (n) => {
  if (n === 0 || n === 1) {
    return n;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const fibonacci = async (add) => {
  if (add === 1) {
    document.getElementById("fibTree-container").style.display = "block";
    for (let i = 1; i <= 17; i++) {
      if (i !== 14 && i !== 15) {
        document.getElementById(`fibNode${i}`).style = "visibility:visible;animation: appear 0.5s linear;";
        if (document.getElementById(`fibSvg${Math.floor(i / 2)}-${i}`)) {
          document.getElementById(`fibSvg${Math.floor(i / 2)}-${i}`).style = "visibility:visible;animation: appear 0.5s linear;";
        }
        await sleep(500);
      }
    }
  } else {
    for (let i = 17; i >= 1; i--) {
      if (i !== 14 && i !== 15) {
        const node = document.getElementById(`fibNode${i}`);
        const num = Number.parseInt(node.innerText.slice(4, -1), 10);
        node.innerText = fib(num);
        node.style = "visibility:visible;background-color:green;color:yellow;font-weight:bold;animation: disappearFib 0.5s linear;";
        /*if (document.getElementById(`fibSvg${Math.floor(i / 2)}-${i}`)) {
            document.getElementById(`fibSvg${Math.floor(i / 2)}-${i}`).style = "visibility:hidden;animation:disappearSvg 1s linear;";
          }*/
        await sleep(700);
      }
    }
  }
};
