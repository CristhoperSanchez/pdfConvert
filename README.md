11/2/23 
	DrawIO -> PDF Automation Project
	GitHub Repository to Source Code:
		https://github.com/rlespinasse/docker-drawio-desktop-headless
	Breakdown of the Source Code:
		Running: 
			$ docker run -it -w /data -v $(pwd):/data rlespianasse/drawio-desktop-headless

				-w /data is a shared volume
				-v volume to be shared
			
				What we need the program to export:
						-x -f pdf -o /data/out/ /data/files

				Express server will need to execute a command to decompress the drawio string and export it.	

