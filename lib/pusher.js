import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: '1755461',
  key: 'bc3cd5f96ac2aa50831b',
  secret: '4c288665a486dbfeca29',
  cluster: "ap2",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  'bc3cd5f96ac2aa50831b',
  {
    cluster: "ap2",
  }
);
