# FileAtlas Privacy Notice

**Last updated: 21 June 2026**

FileAtlas is a local Windows desktop application for visualizing disk usage, finding duplicate files, and reviewing files before deletion.

## Summary

FileAtlas processes filesystem information locally on the user’s device.

The publisher does not remotely collect, receive, upload, sell, or share the user’s filenames, file contents, paths, hashes, directory structures, scan results, settings, or usage data.

FileAtlas does not require an account.

## Information FileAtlas Reads

FileAtlas may read local filesystem information required to provide its features, including:

- file and folder names;
- file and folder paths;
- file sizes;
- creation or modification dates where available;
- folder contents;
- mounted-drive information;
- filesystem identifiers used to verify queued items before deletion.

When duplicate scanning is enabled, FileAtlas may read file contents locally to calculate cryptographic hashes. These hashes are used to confirm whether files have identical content.

## Information FileAtlas Stores

FileAtlas stores settings and cache data locally under:

```text
%LOCALAPPDATA%\FileAtlas
```

This may include:

- theme and interface preferences;
- live-refresh settings;
- scan exclusions;
- folder-size cache data;
- local scan or cache database files;
- duplicate-scan metadata, if enabled by the application.

FileAtlas does not intentionally create or retain copies of the user’s personal files.

## Information FileAtlas Transmits

FileAtlas does not transmit the following to the publisher or to any third party:

- filenames;
- file contents;
- file hashes;
- file or folder paths;
- directory structures;
- scan results;
- application settings;
- analytics;
- telemetry;
- usage data.

FileAtlas does not require an internet connection and does not contact a FileAtlas server during normal operation.

## Retention and Removal

Local settings and cache data remain on the user’s device until they are cleared through FileAtlas, removed manually, or deleted from:

```text
%LOCALAPPDATA%\FileAtlas
```

Removing cached data does not delete the user’s original files.

## Deletion

Normal deletion attempts to move selected files and folders to the Windows Recycle Bin whenever supported.

If an item cannot be moved safely, FileAtlas reports the failure. FileAtlas does not silently fall back to permanent deletion.

Files may become unrecoverable if the user later empties the Recycle Bin or removes them by another method.

## Support Email

If a user contacts support by email, any information voluntarily included in the message is transmitted through the user’s email provider and the recipient’s email provider.

Support email:

```text
iakobidzesab@gmail.com
```

## Third-Party Components

FileAtlas includes or is built with third-party software components.

See:

```text
THIRD-PARTY-NOTICES.txt
```
