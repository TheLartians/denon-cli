# Denon-CLI

A simple command line interface for controlling Denon AVR receivers.

## Installation

Until this repo is added to npm, the CLI must be installed manually. To do so, clone this repo and run the following from inside the repos' root directory.

```bash
yarn install
yarn build
yarn global install $(pwd)
```

## Usage

```bash
Usage: denon-cli [options]

Options:
  -V, --version            output the version number
  -d, --debug              output extra debugging
  -m, --mode <mode>        sets the surround mode (choices: "mstereo", "dolby", "dts", "rock", "jazz", "stereo", "direct")
  -c, --command <command>  send a command to the receiver (choices: "on", "off", "play", "pause", "stop", "next", "prev")
  -v, --volume <value>     sets the volume mode
  -h, --help               display help for command
```



