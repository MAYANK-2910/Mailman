export default defineBackground(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch(console.error);

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url?.includes('mail.google.com')) {
      chrome.sidePanel.setOptions({
        tabId,
        path: 'sidepanel.html',
        enabled: true,
      }).catch(console.error);
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_AUTH_STATUS') {
      chrome.identity.getAuthToken({ interactive: false }, (token) => {
        sendResponse({ authenticated: !!token });
      });
      return true;
    }

    if (message.type === 'GET_UNREAD_COUNT') {
      sendResponse({ count: message.count ?? 0 });
      return true;
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'UPDATE_BADGE') {
      const count = message.count ?? 0;
      chrome.action.setBadgeText({
        text: count > 0 ? String(count > 99 ? '99+' : count) : '',
      });
      chrome.action.setBadgeBackgroundColor({ color: '#6366f1' });
    }
  });
});
