function classify() {
  var dataset = document.getElementById('selectDataset').value;
  var inputAttr1 = parseFloat(document.getElementById('inputAttr1').value);
  var inputAttr2 = parseFloat(document.getElementById('inputAttr2').value);
  var inputAttr3 = parseFloat(document.getElementById('inputAttr3').value);

  var trainData;
  var trainLabels;

  // Define different datasets
  if (dataset === 'dataset1') {
    trainData = [
      [1.0, 2.0, 3.0],
      [4.0, 5.0, 6.0],
      [7.0, 8.0, 9.0],
      [10.0, 11.0, 12.0]
    ];
    trainLabels = ['A', 'A', 'B', 'B'];
  } else if (dataset === 'dataset2') {
    trainData = [
      [0.5, 1.5, 2.5],
      [3.5, 4.5, 5.5],
      [6.5, 7.5, 8.5],
      [9.5, 10.5, 11.5]
    ];
    trainLabels = ['X', 'X', 'Y', 'Y'];
  }
  // Add more datasets as needed

  // Calculate distances between the input data and training data
  var distances = [];
  for (var i = 0; i < trainData.length; i++) {
    var distance = euclideanDistance([inputAttr1, inputAttr2, inputAttr3], trainData[i]);
    distances.push({ index: i, distance: distance });
  }

  // Sort distances in ascending order
  distances.sort((a, b) => a.distance - b.distance);

  // Get the class labels of the k nearest neighbors
  var classCounts = {};
  var k = 3; // Fixed k value
  for (var i = 0; i < k; i++) {
    var label = trainLabels[distances[i].index];
    classCounts[label] = classCounts[label] ? classCounts[label] + 1 : 1;
  }

  // Find the most common class label among the k nearest neighbors
  var predictedLabel = '';
  var maxCount = 0;
  for (var label in classCounts) {
    if (classCounts[label] > maxCount) {
      predictedLabel = label;
      maxCount = classCounts[label];
    }
  }

  // Display the predicted label
  var resultContainer = document.getElementById('resultContainer');
  resultContainer.textContent = 'Classification Result: ' + predictedLabel;
}

function euclideanDistance(a, b) {
  var sum = 0;
  for (var i = 0; i < a.length; i++) {
    sum += Math.pow(a[i] - b[i], 2);
  }
  return Math.sqrt(sum);
}
