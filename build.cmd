@echo off
@REM CMD UTILS FOR BUILD PROJECT ON WINDOWS
echo Building project...

call npm run --prefix backend build
echo.

call npm run --prefix frontend build

call link.cmd

echo Build and link finished...