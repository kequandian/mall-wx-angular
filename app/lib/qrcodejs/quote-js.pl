#!/usr/bin/perl

if(@ARGV == 0){
   print "Usage:\n";
   print "   $0 <js>\n";
   exit(0);
}

my $js = shift @ARGV;
if( ! -f $js){
   print "$js not exists\n";
   exit(0);
}

## read js
my @lines;
open my $fh, "<", $js;
@lines = <$fh>;
close $fh;

foreach(@lines){
   s/[\s\n\r]+$//;
   s/\'/\\\'/g;
   print '\'';
   print;
   print '\' +';
   print "\n";
}
