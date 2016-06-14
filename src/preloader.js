var preloader = {
    preload: function () {
        var loadingbar = game.add.sprite(game.world.centerX - 190 / 2, game.world.centerY, 'loadingbar');
        game.load.setPreloadSprite(loadingbar);
        maps = ['level1', 'anotherlevel'];
        tilesets = ['basepack', 'buildingspack', 'candypack', 'extrapack', 'icepack'];
        sprites = ['player', 'slimeBlock'];

        for (i = 0; i < maps.length; i++) {
            game.load.tilemap(maps[i], 'data/maps/' + maps[i] + '.json', null, Phaser.Tilemap.TILED_JSON);
        }
        for (i = 0; i < sprites.length; i++) {
            game.load.image(sprites[i], 'data/graphics/sprites/' + sprites[i] + '.png');
        }
        for (i = 0; i < tilesets.length; i++) {
            game.load.image(tilesets[i], 'data/graphics/tilesets/' + tilesets[i] + '.png');
        }
    },

    create: function () {
        game.state.start("mainstate");
    }
}