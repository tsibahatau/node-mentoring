export default function csvJSON(csv) {
  const lines = csv.split("\n");

  let result = [];

  let headers = lines[0].split(",");
  lines.splice(0, 1);
  lines.forEach(function(line) {
    let obj = {};
    let currentline = line.split(",");
    headers.forEach(function(header, i) {
      obj[header] = currentline[i];
    });
    result.push(obj);
  });

  return JSON.stringify(result); //JSON
}
