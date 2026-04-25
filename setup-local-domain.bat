@echo off
:: Batch script to add skarduspring.local to the Windows Hosts file
:: MUST BE RUN AS ADMINISTRATOR

echo Checking for Administrator privileges...
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Administrator privileges confirmed.
) else (
    echo [ERROR] This script must be run as Administrator.
    echo Please right-click this file and select "Run as administrator".
    pause
    exit /b 1
)

set HOSTS_FILE=%WINDIR%\System32\drivers\etc\hosts
set DOMAIN1=skarduspring.local
set DOMAIN2=skarduspring.com

echo.
echo Adding %DOMAIN1% and %DOMAIN2% to %HOSTS_FILE%...

:: Check and add skarduspring.local
findstr /C:"%DOMAIN1%" "%HOSTS_FILE%" >nul
if %errorLevel% neq 0 (
    echo 127.0.0.1 %DOMAIN1% >> "%HOSTS_FILE%"
    echo Added %DOMAIN1%
) else (
    echo %DOMAIN1% is already in the hosts file.
)

:: Check and add skarduspring.com
findstr /C:"%DOMAIN2%" "%HOSTS_FILE%" >nul
if %errorLevel% neq 0 (
    echo 127.0.0.1 %DOMAIN2% >> "%HOSTS_FILE%"
    echo Added %DOMAIN2%
) else (
    echo %DOMAIN2% is already in the hosts file.
)

echo.
echo Flushing DNS cache to apply changes immediately...
ipconfig /flushdns

echo.
echo DONE! You can now run your Next.js server (npm run dev)
echo and visit http://skarduspring.local:3000 in your browser!
echo.
pause
