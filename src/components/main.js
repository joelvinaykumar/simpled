const input = [2,7,3,4,6,9,2,3,16,23,76,43,13,98,43,123,43,99,56,87,98,65,54,36];
let output = [];
let max = 9999;

for(let i=0; i<6; i++) {
	let min = -9999;
  for(let j of input) {
  	if(j > min && j <= max){
    	min = j;
    }
  }
  max = j;
  output.push(j);
}