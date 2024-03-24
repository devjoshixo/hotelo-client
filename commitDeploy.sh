#! /bin/bash

function addcommitpush () {

current=$(git branch | grep "*" | cut -b 3-)

message=\'"$@"\'
git add . && git commit -m "$message"
git push 

}

addcommitpush $1
