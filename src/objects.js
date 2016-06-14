function Player(x, y){
    var player = solids.create(x, y, 'player');
    player.body.gravity.y = 1024;
    game.camera.follow(player);
    
    player.update = function(){
        // Controls
        if (player.body.onFloor() || player.body.touching.down) {
            // Controls on floor
            if (buttons.left.isDown) {
                if (player.body.velocity.x > 0) {
                    player.body.velocity.x = -1;
                }
                player.body.velocity.x -= 64;
            } else if (buttons.right.isDown) {
                if (player.body.velocity.x < 0) {
                    player.body.velocity.x = 1;
                }
                player.body.velocity.x += 64;
            } else {
                player.body.drag.x = 4096;
            }
            if (buttons.up.isDown) {
                player.body.velocity.y = -768;
            }
        } else {
            //Controls on air
            player.body.drag.x = 0;
            if (buttons.left.isDown) {
                player.body.velocity.x -= 32;
            } else if (buttons.right.isDown) {
                player.body.velocity.x += 32;
            }
        }

        // Speed cap
        player.body.velocity.x = Math.min(Math.max(player.body.velocity.x, -386), 386);
        
    }
    return player;
}

function Wall(x, y, w, h){
    var rect = walls.create(x, y, null);
    rect.body.immovable = true;
    rect.body.setSize(w, h, 0, 0);
    return rect;
}

function Slime(x, y){
    var sprite = solids.create(x,y,"slimeBlock");
    sprite.body.gravity.y = 2048;
    sprite.body.drag.x = 512;
    
    sprite.update = function(){
    
    }
    
    return sprite;
}