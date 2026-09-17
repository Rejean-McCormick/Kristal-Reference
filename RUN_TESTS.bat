@echo off
cd /d "%~dp0"
node --version
call npm test
pause
