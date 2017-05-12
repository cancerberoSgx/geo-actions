# for development: 
watchify src/index.js -t brfs -o dist/bundle.js

# for production :
# browserify src/index.js -t brfs > dist/bundle.js ; cat dist/bundle.js | uglifyjs > dist/bundle.min.js