var mainState = {
    create: function () {
        map = game.add.tilemap('level1');
        for (let i = 0; i < tilesets.length; i++) {
            map.addTilesetImage(tilesets[i], tilesets[i]);
        }
        layer = map.createLayer('tile_layer');
        layer.resizeWorld();

        buttons = game.input.keyboard.createCursorKeys();

        game.physics.startSystem(Phaser.Physics.ARCADE);

        walls = game.add.physicsGroup();
        solids = game.add.physicsGroup();
        slimes = game.add.physicsGroup();

        // Object handling
        for (var i = 0; i < map.objects['object_layer'].length; i++) {
            var object = map.objects['object_layer'][i];
            if (object.properties == null) {
                object.properties = {};
            }
            console.log(object);
            switch (object.type) {
            case 'start':
                player = game.add.sprite(object.x, object.y, 'player');
                game.physics.arcade.enable(player);
                game.camera.follow(player);
                player.body.gravity.y = 2048;
                break;
            case 'collision':
                var rect = walls.create(object.x, object.y, null);
                rect.body.immovable = true;
                rect.body.setSize(object.width, object.height, 0, 0);
                break;
            case 'slime':
                var slime = slimes.create(object.x, object.y, 'slimeBlock');
                slime.body.gravity.y = 2048;
            default:
                console.warn("Object type not found:", object.type, "\nOn object:", object.name);
                game.add.sprite(object.x, object.y, 'basepack_spritesheet', object.gid - 1);
            }
        }
    },

    update: function () {
        slimes.forEach(function (slime) {
            slime.body.velocity.x = Math.max(slime.body.velocity.x - 16, -256);
            if (slime.overlap(player)) {
                slime.body.velocity.x = 200;
            }
        });

        // Collisions
        game.physics.arcade.collide(player, walls);
        game.physics.arcade.collide(player, solids);
        game.physics.arcade.collide(solids, solids);
        game.physics.arcade.collide(solids, walls);
        game.physics.arcade.collide(slimes, player);
        game.physics.arcade.collide(slimes, solids);
        game.physics.arcade.collide(slimes, walls);
        game.physics.arcade.collide(slimes, slimes);

        // Controls
        if (player.body.onFloor() || player.body.touching.down) {
            // Controls on floor
            if (buttons.left.isDown) {
                if (player.body.velocity.x > 0) {
                    player.body.velocity.x = -1;
                }
                player.body.velocity.x -= 32;
            } else if (buttons.right.isDown) {
                if (player.body.velocity.x < 0) {
                    player.body.velocity.x = 1;
                }
                player.body.velocity.x += 32;
            } else {
                player.body.velocity.x *= 0.8;
            }
            if (buttons.up.isDown) {
                player.body.velocity.y = -768;
            }
        } else {
            //Controls on air
            if (buttons.left.isDown) {
                player.body.velocity.x -= 16;
            } else if (buttons.right.isDown) {
                player.body.velocity.x += 16;
            }
        }

        player.y = Math.floor(player.y);

        // Speed cap
        player.body.velocity.x = Math.min(Math.max(player.body.velocity.x, -386), 386);
    }
};