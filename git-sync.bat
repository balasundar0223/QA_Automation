@echo off
REM Git sync script for QA_Automation repository
REM Run this script to connect remote, stash, pull, pop, and push

echo ========================================
echo Git Sync Script - QA_Automation
echo ========================================
echo.

cd /d "D:\QA updated code 2507\QA updated code 2507"

echo Checking Git status...
git --version
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/download/win
    pause
    exit /b 1
)
echo.

echo Current remotes:
git remote -v
echo.

echo Setting origin remote to https://github.com/jagadheesang17/QA_Automation.git
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Adding origin remote...
    git remote add origin https://github.com/jagadheesang17/QA_Automation.git
) else (
    echo Updating origin remote...
    git remote set-url origin https://github.com/jagadheesang17/QA_Automation.git
)
echo.

echo Verifying remote:
git remote -v
echo.

echo Stashing local changes...
git stash push -m "Auto-stash before sync %date% %time%"
echo.

echo Fetching from origin...
git fetch origin
echo.

echo Pulling changes from origin/main...
git pull origin main --rebase
if errorlevel 1 (
    echo.
    echo WARNING: Pull failed. You may need to resolve conflicts.
    echo Run 'git status' to see what needs attention.
    pause
    exit /b 1
)
echo.

echo Applying stashed changes...
git stash pop
if errorlevel 1 (
    echo.
    echo WARNING: Stash pop had conflicts. Resolve them and commit.
    echo Run 'git status' to see conflicted files.
    pause
    exit /b 1
)
echo.

echo Checking status before push...
git status
echo.

set /p CONFIRM="Push to origin/main? (Y/N): "
if /i "%CONFIRM%"=="Y" (
    echo Pushing to origin/main...
    git push origin main
    if errorlevel 1 (
        echo.
        echo ERROR: Push failed. Check permissions and try again.
        pause
        exit /b 1
    )
    echo.
    echo ========================================
    echo SUCCESS: Repository synced!
    echo ========================================
) else (
    echo Push cancelled. Run 'git push origin main' when ready.
)

echo.
pause
