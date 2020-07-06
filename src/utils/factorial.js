const fact = (n) => {
  if (n === 0) {
    return 1;
  } else {
    return n * fact(n - 1);
  }
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const factorial = async (n) => {
  if (n === 0) {
    await sleep(500);
    return n;
  } else {
    const a = document.getElementById(`recur-div`);
    let div = document.createElement("div");
    div.id = n;
    div.className = "recur-individual-fact";
    div.innerHTML = `${n} * factorial(${n - 1})`;
    a.appendChild(div);
    await sleep(500);
    return n * (await factorial(n - 1));
  }
};
export const removeFactorial = async (n) => {
  const parent = document.getElementById(`recur-div`);
  for (let i = 1; i <= n; i++) {
    const remove = document.getElementById(`${i}`);
    remove.innerHTML = `return ${fact(i)}`;
    remove.className = "recur-individual-leaving";
    await sleep(500);
  }
  await sleep(1000);
  let div = document.createElement("div");
  div.id = n;
  div.className = "recur-individual-fact";
  div.innerHTML = `Factorial(${n})=${fact(n)}`;
  parent.innerHTML = "";
  parent.appendChild(div);
};
