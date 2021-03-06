###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

activate :external_pipeline,
         name: :webpack,
         command: build? ?
         "./node_modules/webpack/bin/webpack.js --bail -p" :
         "./node_modules/webpack/bin/webpack.js --watch -d --progress --color",
         source: ".tmp/dist",
         latency: 1

set :css_dir, "assets/stylesheets"
set :js_dir, "assets/javascripts"
set :img_dir, "assets/images"

# Build-specific configuration
configure :build do
  set :trailing_slash, false
  # set :protocol, "https://"
  # Minify CSS on build
  # activate :minify_css
  # Minify Javascript on build
  # activate :minify_javascript
  # activate :gzip, exts: %w(.js .css .html .htm .svg .ttf .otf .woff .eot)
end

configure :development do
  set :protocol, "http://"
  set :host, "localhost"
  set :port, "4567"
  set :debug_assets, true
  # Hot reload
  activate :livereload
end
