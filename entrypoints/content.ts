export default defineContentScript({
  matches: ['https://mail.google.com/*'],
  runAt: 'document_idle',
  main() {
    let observer: MutationObserver | null = null;

    function addMailmanIndicator() {
      if (document.getElementById('mailman-indicator')) return;

      const indicator = document.createElement('div');
      indicator.id = 'mailman-indicator';
      indicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #818cf8);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        font-size: 20px;
      `;
      indicator.textContent = '📬';
      indicator.title = 'Open Mailman (click extension icon)';

      indicator.addEventListener('mouseenter', () => {
        indicator.style.transform = 'scale(1.1)';
        indicator.style.boxShadow = '0 6px 24px rgba(99, 102, 241, 0.5)';
      });

      indicator.addEventListener('mouseleave', () => {
        indicator.style.transform = 'scale(1)';
        indicator.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
      });

      indicator.addEventListener('click', () => {
        chrome.runtime.sendMessage({ type: 'OPEN_SIDE_PANEL' });
      });

      document.body.appendChild(indicator);
    }

    function init() {
      addMailmanIndicator();

      observer = new MutationObserver(() => {
        addMailmanIndicator();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: false,
      });
    }

    if (document.readyState === 'complete') {
      init();
    } else {
      window.addEventListener('load', init);
    }
  },
});
