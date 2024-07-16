chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('fetchHistory', { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'fetchHistory') {
    chrome.history.search({ text: '', maxResults: 10000 }, (data) => {
      const historyData = data.map(item => ({
        title: item.title,
        url: item.url
      }));

      fetch('http://localhost:8080/project/history_receiver.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(historyData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('History data sent successfully');
      })
      .catch(error => {
        console.error('Error sending history data:', error);
      });
    });
  }
});
