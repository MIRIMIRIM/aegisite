AegiSite
========

AegiSite is built with [Lunet](https://github.com/lunet-io/lunet), documents of [AmusementClub/Aegisub](https://github.com/AmusementClub/Aegisub).

## Requirements

- .NET SDK 10.x
- Lunet CLI

Install Lunet:

```bash
dotnet tool install --global lunet
```

## Development

```bash
lunet -o .lunet/build/www serve --no-threads
```

## Build

```bash
lunet -o .lunet/build/www build --no-threads
```

The generated site is written to `.lunet/build/www`.

## Documentation

- [Lunet](https://lunet.io)
