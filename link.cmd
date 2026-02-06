@echo off
@REM CMD UTILS FOR BUILD PROJECT ON WINDOWS
echo Linking frontend build to backend...

if not exist backend\dist\public (
   mkdir backend\dist\public
)

xcopy frontend\dist\* backend\dist\public\ /E /I /Y

echo Link finished.
