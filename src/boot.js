var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

var i;

// Objects
var player;

// Map content
var map;

// Inputs
var buttons;

// Physics groups
var walls;
var solids;

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