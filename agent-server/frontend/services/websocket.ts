const WS_URL = "ws://localhost:4747/ws";

export class WebSocketManager {
  private ws: WebSocket | null = null;

  connect(
    onOpen?: () => void,
    onMessage?: (data: any) => void,
    onClose?: () => void
  ) {
    this.ws = new WebSocket(WS_URL);

    this.ws.onopen = () => {
      console.log("Connected to Agent Server");
      onOpen?.();
    };

    this.ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  console.log("Received:", data);

  if (data.type === "PING") {
    this.send({
      type: "PONG",
      echo: data.challenge,
    });

    console.log("PONG sent");
  }

  if (data.type === "TOOL_CALL") {
    this.send({
      type: "TOOL_ACK",
      call_id: data.call_id,
    });

    console.log("TOOL_ACK sent:", data.call_id);
  }

  onMessage?.(data);
};

    this.ws.onclose = () => {
      console.log("Disconnected");

      onClose?.();
    };

    this.ws.onerror = (err) => {
      console.error(err);
    };
  }

  send(data: any) {
    this.ws?.send(JSON.stringify(data));
  }
}