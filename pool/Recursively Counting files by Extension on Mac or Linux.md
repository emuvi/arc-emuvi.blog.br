![Count Files by extension](https://www.petefreitag.com/images/blog/count-files-by-extension-amartino20-unsplash.jpg)

Back [in 2004](https://www.petefreitag.com/item/162.cfm) I wrote up a blog entry showing how to get a count of files by a specific extension. For example you want to know how many js files are in a directory, you can run this:

```
find /some/dir | fgrep -c '.js'
```

The `-c` in grep tells it to count the matches, I'm using `fgrep` here because I'm not using a regex (to avoid escaping the dot).

The above would also match a file, or a directory had `.js` anywhere in the path, so we could improve that script by using a [regular expression](https://www.petefreitag.com/cheatsheets/regex/) `$` character, for example:

```
find /some/dir | grep -c '\.js$'
```

Now we are limiting the .js to show up only at the end of the file.

**What if you want a listing of all file extensions and the count of files in a directory?**

Here's one way to print out a list of extensions and the number of files of each type:

```
find /some/dir -type f | grep -o ".[^.]\+$" | sort | uniq -c
```

This will print out a nice list like this:

```
5 .js
3 .html
1 .css

```

**How it works**

First we have `find /some/dir -type f` which just limits find to output all the files in the directory recursively. The `-type f` omits directories from showing up in the list.

Next we have `grep -o ".[^.]\+$"` the `-o` tells grep to only output lines that match the pattern, and only output the match. The pattern is just a regex that says look for a dot followed by one or more chars that are not a dot `[^.]\+`, at the end of a line `$`.

Next we pipe into the `sort` command which just puts every thing in order.

Finally we pipe into `uniq -c` which counts each unique line (the file extensions) and prints out the results. Cool!

_Recursively Counting files by Extension on Mac or Linux_ was first published on October 09, 2019.