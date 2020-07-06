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
const call = [1, 2, 4, 8, 16, 17, 9, 5, 10, 11, 3, 6, 12, 13, 7];
const remove = [16, 17, 8, 9, 4, 10, 11, 5, 2, 12, 13, 6, 7, 3];
export const fibonacci = async (add) => {
  if (add === 1) {
    document.getElementById("fibTree-container").style.display = "block";
    for (let i = 0; i <= call.length; i++) {
      console.log(call[i]);
      document.getElementById(`fibNode${call[i]}`).style = "visibility:visible;animation: appear 0.5s linear;";
      if (document.getElementById(`fibSvg${Math.floor(call[i] / 2)}-${call[i]}`)) {
        document.getElementById(`fibSvg${Math.floor(call[i] / 2)}-${call[i]}`).style = "visibility:visible;animation: appear 0.5s linear;";
      }
      await sleep(500);
    }
  } else {
    for (let i = 0; i <= remove.length; i++) {
      const node = document.getElementById(`fibNode${remove[i]}`);
      const num = Number.parseInt(node.innerText.slice(4, -1), 10);
      node.innerText = fib(num);
      node.style = "visibility:visible;background-color:green;color:yellow;font-weight:bold;animation: disappearFib 0.5s linear;";
      /*if (document.getElementById(`fibSvg${Math.floor(i / 2)}-${i}`)) {
            document.getElementById(`fibSvg${Math.floor(i / 2)}-${i}`).style = "visibility:hidden;animation:disappearSvg 1s linear;";
          }*/
      await sleep(700);
    }
  }
};
