var stream = require('stream');

const { Transform } = require('stream');

const reverse = str => {
    return str.split('').reverse().join('') + '\n\n\n'
}

const reverseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(reverse(chunk.toString().trim()));
    callback();
  }
});

process.stdin.pipe(reverseTransform).pipe(process.stdout)