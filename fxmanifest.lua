fx_version 'cerulean'
game 'gta5'

author 'Ardent Development'
description 'ADT Notification System'
version '0.1'

ui_page 'ui/index.html'

files {
    'ui/index.html',
    'ui/style.css',
    'ui/script.js',
    'ui/sounds/*.mp3'
}

shared_scripts {
    'config.lua'
}

client_scripts {
    'client/main.lua'
}

server_scripts {
    'server/main.lua'
}

export 'Notify'

