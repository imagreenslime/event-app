let hello = '345 SW Cyber Dr UNIT 105, Bend, OR, United States'
hello = hello.split(',');
hello = hello.splice(-2).join(',');
console.log(hello)