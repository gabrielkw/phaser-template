var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

// Objects
var player;

// Map content
var map;
var layer;

// Inputs
var buttons;

// Physics groups
var walls;
var solids;
var slimes;

// Load lists
var tilesets;
var maps;
var sprites;

var boot = {
    preload: function() {
        game.load.image('loadingbar', 'data/graphics/sprites/loadingbar.png')
    },

    create: function() {
        game.state.start('preloader');
    }
}