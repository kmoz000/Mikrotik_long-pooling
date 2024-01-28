import { Elysia } from "elysia";
import { Stream } from '@elysiajs/stream'
//@ts-ignore
import { ip } from "elysia-ip";
// import { rateLimit } from 'elysia-rate-limit'
const app = new Elysia()
  .use(ip())
  .get('/input', ({ ip }:any) => new Stream(async (stream) => {
    console.log("new connection:", ip);
    
    const routerCommands = [
      '/system/routerboard/print',
      '/system/resource/print',
      '/interface/print',
      '/ip/address/print',
      '/ip/route/print',
      '/ip/firewall/nat/print',
      '/ip/firewall/filter/print',
      '/interface/wireless/print'
    ];
    for (const cmd of routerCommands) {
      stream.send(cmd)
      await stream.wait(3000)
    }
    stream.close()
  }))
  .post("/output", ({ body, ip }:any) => {
    console.log({
      ip,
      body
    });
  })
  .listen(8080)
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
