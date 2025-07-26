const fs = require('fs');
const path = require('path');

function buildNestedObject(keys, value) {
  return keys.reduceRight((acc, key) => ({ [key]: acc }), value);
}

function deepMerge(target, source) {
  for (let key in source) {
    if (
      source[key] instanceof Object &&
      target[key] &&
      typeof target[key] === 'object'
    ) {
      source[key] = deepMerge(target[key], source[key]);
    }
  }
  return { ...target, ...source };
}

function parseCSV(filePath) {
  const content = fs.readFileSync(path.resolve(filePath), 'utf-8');
  const [headerLine, ...lines] = content.split('\n').filter(line => line.trim() !== '');

  const headers = headerLine.split(',').map(h => h.trim());
  const users = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const values = lines[lineIndex].split(',').map(v => v.trim());

    let name = '', age = null, address = {}, additional = {};
    let hasFirst = false, hasLast = false;

    for (let i = 0; i < headers.length; i++) {
      const keyParts = headers[i].split('.');
      const val = values[i];

      if (headers[i] === 'name.firstName') {
        name = val;
        hasFirst = true;
      } else if (headers[i] === 'name.lastName') {
        name += ' ' + val;
        hasLast = true;
      } else if (headers[i] === 'age') {
        age = parseInt(val);
        if (isNaN(age)) age = null;
      } else if (headers[i].startsWith('address.')) {
        address = deepMerge(address, buildNestedObject(keyParts.slice(1), val));
      } else {
        additional = deepMerge(additional, buildNestedObject(keyParts, val));
      }
    }

    
    if (!hasFirst || !hasLast || age === null) {
      console.warn(`Skipping invalid row ${lineIndex + 2}`);
      continue;
    }

    users.push({
      name,
      age,
      address,
      additional_info: additional
    });
  }

  return users;
}

module.exports = parseCSV;
