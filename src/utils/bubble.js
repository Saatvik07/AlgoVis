import { Sort } from "../Components/Board/Sort/Sort";
const mainBubbleBody = async (i, j, last, width, svgArray) => {
  if (height[i] > height[j]) {
    exchange++;
    console.log(i, j);
    const arr = svgArray;
    arr[i] = (
      <svg width={width} height={height[j]}>
        <rect width={width} height={height[j]} className='rectangle' id={String(j)}></rect>;
      </svg>
    );
    if (j === last) {
      arr[j] = (
        <svg width={width} height={height[i]}>
          <rect width={width} height={height[i]} className='rectangle' id={String(i)}></rect>;
        </svg>
      );
    } else {
      arr[j] = (
        <svg width={width} height={height[i]}>
          <rect width={width} height={height[i]} className='rectangle' id={String(i)}></rect>;
        </svg>
      );
    }

    let temp = height[i];
    height[i] = height[j];
    height[j] = temp;
    Sort.setSvg(arr);
  }
  await sleep(5 / speed);
};
export const bubble = async (length, width, svgArray, speed) => {
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      await mainBubbleBody(j, j + 1, length - i - 1, width, svgArray, speed);
    }
  }
};
