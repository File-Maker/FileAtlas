# FileAtlas Privacy

FileAtlas is a local Windows desktop application for visualizing disk usage.

## Summary

FileAtlas does not collect, upload, sell, or share personal data.

FileAtlas runs locally on your computer. It scans the folders and files you open so it can display disk usage, calculate folder sizes, detect duplicate files, and manage the cleanup queue.

FileAtlas also installs FAFS, the local FileAtlas background foundation. FAFS watches mounted drives for filesystem changes and provides local storage-flow data to FileAtlas Analytics.

FileAtlas Dev is an optional local diagnostic tool. It is intended for inspecting local FAFS health, internal files, FAStore/filetype counts, and debug reports on the same computer. Privileged Dev features require a local FileAtlas Dev `.falicense` certificate that FAFS validates on this computer.

FileAtlas LicenseManager is a separate owner-only local tool for issuing and inspecting FileAtlas Dev licenses. Normal users do not need it.

FileAtlas Benchmark is a separate local benchmark/report tool. It creates isolated dummy test data and local reports so FileAtlas components can be stress tested without using normal FileAtlas history as benchmark noise.

## Data FileAtlas Reads

FileAtlas may read local filesystem metadata, including:

- file and folder names;
- file and folder paths;
- file sizes;
- modified dates;
- folder contents;
- mounted drive information;
- file identifiers used to verify queued items before deletion.
- local filesystem event history, including creates, deletes, renames, moves, Recycle Bin movement, and folder activity;
- local event classification, such as user activity, system activity, and background/cache activity;
- local saved filesystem baselines used to detect changes that happened while FileAtlas was not running;
- local file identity, hash, chunk, lazy parity-shard, and disk extent metadata used to support future recovery features.
- local FAFS internal files, including FAStore catalog/history files, binary `.faconfig` settings, `.falog` event segments, `.fasnap` catalog snapshots, `.farm` recovery metadata, `.fapar` parity metadata, `.fasec` safety policy, and `.fachk` checkpoint files.
- local FileAtlas Dev license state, including an installation ID, local public/private installation key pair protected on this computer, imported `.falicense` files, and activation state used by FAFS.
- local FileAtlas LicenseManager private owner keys, if the owner-only LicenseManager is used on this computer.
- local FileAtlas Benchmark report folders, raw metrics, charts, PDFs, and dummy benchmark files, if the Benchmark tool is used.

Current FileAtlas-native storage generations use authenticated encrypted binary envelopes for settings, history, snapshots, checkpoints, parity/recovery metadata, and FAStore structures. Supported older local generations may be read and atomically migrated by FAFS. Encryption is used for local integrity and access separation; it does not cause any data to be uploaded.

When duplicate scanning is enabled, FileAtlas may read file contents locally to calculate cryptographic hashes. FAFS may also calculate hashes for smaller files and store recovery-oriented metadata locally. FileAtlas does not upload these hashes or metadata.

## Data FileAtlas Stores

FileAtlas stores local settings and cache data under:

```text
%LOCALAPPDATA%\FileAtlas
```

This may include:

- theme and settings preferences;
- scan exclusions;
- folder-size cache data;
- local scan/cache files;
- FAStore catalog/history/index files owned by FAFS;
- FAFS internal files such as `.faconfig` settings, `.falog` timestamped event logs, `.fasnap` catalog snapshots, `.farm` recovery metadata, `.fapar` parity metadata, `.fasec` safety policy, and `.fachk` checkpoints;
- FileAtlas Dev debug reports with the `.fadev` extension, if the user chooses to save them;
- Analytics status files;
- local event history and storage-flow summaries.
- optional FileAtlas Dev license request files (`.fareq`) and debug reports only when the user chooses to create or save them.
- optional FileAtlas LicenseManager key backups (`.fakeybackup`) and issued license files (`.falicense`) only when the owner chooses to create or save them.
- optional FileAtlas Benchmark reports under the selected benchmark output folder, by default `Documents\FileAtlas Benchmarks`.
- bounded encrypted Base and Analytics last-known caches used to keep completed views visible while FAFS starts or restarts. These caches remain local and do not replace the authoritative FAFS catalog or history.

FileAtlas does not intentionally store copies of your files.

FAFS may lazily store small recovery parity shards for future FileAtlas recovery tools. Users can limit recovery and parity metadata to priority folders in FileAtlas Analytics settings. FAFS records identities, hashes, chunk records, parity groups, event history, catalog snapshots, and local catalog progress, but it does not provide file recovery by itself and does not intentionally store full backup copies of file contents.

## Data FileAtlas Transmits

FileAtlas does not transmit file names, file contents, scan results, settings, analytics, telemetry, or usage data to the publisher or to any third party.

FileAtlas does not require an internet connection.

FAFS exposes a local-only API on `127.0.0.1` for FileAtlas components on the same computer. Privileged FileAtlas Dev requests use an authenticated encrypted local session and short-lived FAFS capability; they are not sent over the internet.

FileAtlas Dev can create an offline license request file (`.fareq`). That request contains an installation ID and public key so a license can be issued for this installation. FileAtlas does not send the request anywhere automatically; the user must manually choose to share it.

FileAtlas LicenseManager does not upload requests, licenses, customer names, notes, or owner keys. It opens and saves local files only when the owner chooses those files.

FileAtlas Benchmark does not upload benchmark results. It writes local raw data, charts, PDFs, and sandboxed dummy files only to the benchmark output folder selected by the user.

## Deletion

Normal delete actions use the Windows Recycle Bin whenever supported.

FAFS records when files or folders are moved to the Recycle Bin and when items appear to be removed from the Recycle Bin.

If you delete items with FileAtlas and later empty the Recycle Bin, those files may no longer be recoverable. Use FileAtlas responsibly.

When uninstalling FileAtlas, users can choose to remove only the application, all local FileAtlas data, or selected local data categories such as settings, history/catalog, logs/caches, recovery/parity metadata, installed licenses, and private owner keys.

When uninstalling FileAtlas Benchmark, users can optionally remove saved benchmark reports from `Documents\FileAtlas Benchmarks`.

## Support Email

If you contact support by email, any information you choose to include in that email is sent through your email provider.

Support email:

```text
iakobidzesab@gmail.com
```

## Third-Party Components

FileAtlas includes third-party software components. See:

```text
THIRD-PARTY-NOTICES.txt
```
