# long pulling using /tool/fetch in ros
A Work arround long pulling in routeros (Mikrotik devices)

## Development Elysia with Bun runtime
To start the development server run:
```bash
bun run dev
```
Open http://ip:8080/ with your browser to see the result.

> Load this function on router (execute is in console directly):
```ros
:global CommandAgent do={
    :local ip $1;
    execute script={/tool/fetch url="http://$ip:8080/input" mode=http output=file dst-path=fetch.txt}
    :do {
        :do {
            :local data [:tostr [/file/read file=fetch.txt chunk-size=10004 as-value]];
            :local cmd [:pick $data ([:find $data "data: " ([:len $data]-50)]+6) [:len $data]];
            :local output [:execute script=$cmd as-string];
            /tool/fetch url="http://$ip:8080/output" mode=http http-method=post http-data=$output;
        } on-error={
            :put "-\n";
        }
    } while=(true)
}
```
> then call it:
```ros
[admin@routerbord] > [$CommandAgent 192.168.88.254]
```
- 192.168.88.254 is where you api is running to make long pulling possible