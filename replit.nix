{pkgs}: {
  deps = [
    pkgs.lsof
    pkgs.sqlite.bin
    pkgs.python311Packages.pyngrok
    pkgs.wget
   ];
}
