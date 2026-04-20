@echo off
title Signal Scout Local Server
echo Signal Scout local server is starting on http://127.0.0.1:4173
echo Keep this window open while you test document uploads.
set "NODE=C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
"%NODE%" server.js
