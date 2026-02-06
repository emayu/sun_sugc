 @echo off
 echo Cleaning project...

 if exist backend\dist (
   rmdir /s /q backend\dist
   echo backend\dist removed
 )

 if exist frontend\dist (
   rmdir /s /q frontend\dist
   echo frontend\dist removed
 )

 echo Clean finished.