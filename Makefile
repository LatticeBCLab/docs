
HOST = 192.168.2.61
PORT = 8000

SPHINXOPTS    ?=
SPHINXBUILD   = sphinx-autobuild
SOURCEDIR     = source
OUTPUTDIR     = ./build/html
#BUILDDIR      = build
#ENVCOMMAND = $(shell if command -v yum &> /dev/null; then echo "yum" elif command -v apt-get &> /dev/null; then echo "apt" fi)
# Put it first so that "make" without argument is like "make help".
#help:
#	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
#
#.PHONY: help Makefile
#
## Catch-all target: route all unknown targets to Sphinx using the new
## "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
#%: Makefile
#	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
build:
	@$(SPHINXBUILD) $(SOURCEDIR) $(OUTPUTDIR) $(SPHINXOPTS) --host $(HOST) --port $(PORT) & \
	echo "Sphinx is running at http://$(HOST):$(PORT)"
	sh ./autsync.sh & \
	echo "Auto sync is running"