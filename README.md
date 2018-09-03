# Calliflower Recordings Downloader

> Download all recordings made in your Calliflower account

If you have a Calliflower audio conferencing account and later want to cancel it, the support staff would tell you there's no way to download all of your past recordings at once. Well, now there is.

## Usage

Get a copy of the project:

```
git clone git@github.com:phillipadsmith/Calliflower-Recordings-Downloader.git
```

In the project directory, create an `.env` file with the following variables:

```
USERNAME=jane@doe.com
PASSWORD=abc123xyz
DIRECTORY=downloads
```

Install the NPM dependencies:

```
npm install
```

Then run the project:

```
node index.js
```

You'll see output from the script as it runs, including how many recordings it finds and which one it's working on downloading.

Shout with questions!



