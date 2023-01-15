//Using threejs color functions
import { Color } from './Color.js';

function glToHex(glslStr) {
  glslStr = glslStr.replace('vec3(', '');
  glslStr = glslStr.replace(')', '');
  let arr = glslStr.split(',').map(Number);
  for (let val of arr) {
    if (val > 1 || val < 0) {
      return '';
    }
  }
  let col = new Color().fromArray(arr);
  return `#${col.getHexString()}`;
}

function hexToGL(hexStr) {
  console.log('hexToGL');
  //check if valid hex value
  if (/^#([0-9A-F]{3}){1,2}$/i.test(hexStr)) {
    let col = new Color(hexStr);
    let out = col.toArray().map((x) => {
      //to fixed 3
      let conv = Math.round(x * 1000) / 1000;
      //append missing periods
      if (conv.toString().indexOf('.') === -1) conv += '.';
      return conv;
    });
    return `vec3(${out})`;
  } else {
    return '';
  }
}

function convertHex(e) {
  document.querySelector('#text-glsl').value = hexToGL(e.target.value);
}

function convertGLSL(e) {
  document.querySelector('#text-hex').value = glToHex(e.target.value);
}

document.querySelector('#text-hex').addEventListener('change', convertHex);
document.querySelector('#text-glsl').addEventListener('change', convertGLSL);
