export function connect(onmessage: (evt: MessageEvent) => void) {
  var ws = new WebSocket('ws://localhost:8080');
  ws.onopen = function() {

  };

  ws.onmessage = onmessage;

  ws.onclose = function(e) {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    setTimeout(function() {
      connect(onmessage);
    }, 1000);
  };

  ws.onerror = function(err) {
    console.error('Socket encountered error: ', (err as any).message, 'Closing socket');
    ws.close();
  };
}
