document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Uploading...';
  
    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const text = await response.text();
        resultDiv.innerHTML = `✅ File uploaded successfully!`;
      } else {
        resultDiv.innerHTML = `❌ Error uploading file`;
      }
    } catch (err) {
      resultDiv.innerHTML = `❌ ${err.message}`;
    }
  });
  
  document.getElementById('fetchReport').addEventListener('click', async function () {
    const reportDiv = document.getElementById('reportDisplay');
    reportDiv.innerHTML = 'Fetching report...';
  
    try {
      const response = await fetch('/report');
      const report = await response.json();
  
      const html = Object.entries(report)
        .map(([range, percent]) => `<p><strong>${range}</strong>: ${percent}</p>`)
        .join('');
  
      reportDiv.innerHTML = html;
    } catch (err) {
      reportDiv.innerHTML = `Failed to fetch report`;
    }
  });
  