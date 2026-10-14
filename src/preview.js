const params = new URLSearchParams(window.location.search);

if (params.get('view') === 'game') {
  import('./main.jsx');
} else {
  // The iframe creates a real mobile viewport, including media queries and
  // fixed-position dialogs; narrowing a desktop wrapper alone would not.
  const style = document.createElement('style');
  style.textContent = `
    html, body { margin: 0; min-height: 100%; background: #e5e7eb; }
    #root { display: flex; flex-direction: column; align-items: center; padding: 20px 0; gap: 12px; }
    .preview-label { margin: 0; font: 14px/1.5 system-ui, sans-serif; color: #475569; }
    .phone-preview { display: block; width: 390px; height: 844px; max-width: 100vw; border: 0; background: #f5f2ec; box-shadow: 0 8px 32px #0002; }
    @media (max-width: 390px) {
      #root { padding: 0; gap: 0; }
      .preview-label { display: none; }
      .phone-preview { height: 100dvh; box-shadow: none; }
    }
  `;
  document.head.append(style);
  const label = document.createElement('p');
  label.className = 'preview-label';
  label.textContent = '手机竖屏预览 · 390 × 844';
  const frame = document.createElement('iframe');
  frame.className = 'phone-preview';
  frame.title = '390 × 844 手机竖屏游戏';
  const gameUrl = new URL(window.location.href);
  gameUrl.searchParams.set('view', 'game');
  frame.src = gameUrl.href;
  document.getElementById('root').append(label, frame);
}
