var mainState = {
    create: function () {
        map = game.add.tilemap('level1');
        for (i = 0; i < tilesets.length; i++) {
            map.addTilesetImage(tilesets[i], tilesets[i]);
        }
        
        map.createLayer('tile_layer').resizeWorld();

        buttons = game.input.keyboard.createCursorKeys();

        game.physics.startSystem(Phaser.Physics.ARCADE);

        walls = game.add.physicsGroup();
        solids = game.add.physicsGroup();

        // Object handling
        for (var i = 0; i < map.objects['object_layer'].length; i++) {
            var object = map.objects['object_layer'][i];
            object.properties = object.properties||{};
            console.log(object);
            switch (object.type) {
            case 'start':
                player = new Player(object.x,object.y);
                break;
            case 'slime':
                new Slime(object.x,object.y);
                break;                    
            case 'collision':
                new Wall(object.x, object.y, object.width, object.height);
                break;
            default:
                console.warn("Object type not found:", object.type, "\nOn object:", object.name);
            }
        }
    },

    update: function () {
        game.physics.arcade.collide(solids, walls);
        game.physics.arcade.collide(solids, solids);
        solids.forEach(function(item){
            item.body.y = Math.round(item.body.y);
        }, this);
    },
    
    render: function(){
    
    }
};