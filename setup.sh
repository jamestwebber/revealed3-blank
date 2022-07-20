ln -s ~/projects/reveal reveal.js
ln -s reveal.js/node_modules node_modules
ln -s reveal.js/package.json package.json
mkdir figures data misc
conda activate node
gulp css
