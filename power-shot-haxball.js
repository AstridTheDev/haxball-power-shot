// power shot template
// modifique o codigo para implementar na sua sala
// by Astrid, 2026
// 1.0.0v


const room = HBInit({
    roomName: "Power Shot",
    maxPlayers: 16,
    public: false,
    noPlayer: true
});

room.setDefaultStadium("Classic");
room.setScoreLimit(5);
room.setTimeLimit(0);


// configuraçoes
const powertime = 5000; // tempo que o player precisa conduzir a bola (em milesimos), 1000 = 1s
const power = 2.3; // força do chute
const ballcontacttolerance = 3; // tolerancia da distancia do player pra bola, maior tolerancia = maior distancia aceita

let ballcarrierid = null;
let ballcarrierstart = 0;
const poweredplayers = new Set();

function getDistance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);
}


function getBallCarrier() {

    const ball = room.getDiscProperties(0);

    if (!ball) return null;

    const players = room.getPlayerList();

    let closestplayer = null;
    let closestdistance = Infinity;

    for (const player of players) {

        if (!player.position)
            continue;

        if (player.team === 0)
            continue;

        const playerdisc = room.getPlayerDiscProperties(player.id);

        if (!playerdisc)
            continue;

        const distance = getDistance(
            player.position.x,
            player.position.y,
            ball.x,
            ball.y
        );

        const contactdistance =
            playerdisc.radius +
            ball.radius +
            ballcontacttolerance;

        if (
            distance <= contactdistance &&
            distance < closestdistance
        ) {
            closestdistance = distance;
            closestplayer = player;
        }
    }

    return closestplayer;
}


room.onPlayerJoin = function (player) {

    room.sendAnnouncement(
        "Power-Shot 1.0v loaded, by astrid",
        player.id,
        0xFFFFFF,
        "normal",
        1
    );
};


room.onGameTick = function () {

    const carrier = getBallCarrier();

    if (!carrier) {

        ballcarrierid = null;
        ballcarrierstart = 0;

        return;
    }


    if (carrier.id !== ballcarrierid) {

        ballcarrierid = carrier.id;
        ballcarrierstart = Date.now();

        return;
    }


    if (poweredplayers.has(carrier.id))
        return;


    const timeholdingball =
        Date.now() - ballcarrierstart;


    if (timeholdingball >= powertime) {

        poweredplayers.add(carrier.id);

        room.sendAnnouncement(
            "⚡ POWER CARREGADO!", 
            carrier.id,
            0xFFD700,
            "bold",
            2
        );
    }
};

room.onPlayerBallKick = function (player) {

    if (!poweredplayers.has(player.id))
        return;


    const ball = room.getDiscProperties(0);

    if (!ball)
        return;


    room.setDiscProperties(0, {

        xspeed:
            ball.xspeed *
            power,

        yspeed:
            ball.yspeed *
            power
    });


    room.sendAnnouncement(
        "💥 " + player.name + " DEU UM POWER SHOT!",
        null,
        0xFF4500,
        "bold",
        2
    );


    poweredplayers.delete(player.id);

    ballcarrierid = null;
    ballcarrierstart = 0;
};


room.onPlayerLeave = function (player) {

    poweredplayers.delete(player.id);

    if (ballcarrierid === player.id) {

        ballcarrierid = null;
        ballcarrierstart = 0;
    }
};

// adm para testes, REMOVA isso do seu codigo final.
room.onPlayerChat = function(player, message) {

    if (message.toLowerCase() === "!adm") {

        if (player.admin) {
            room.sendAnnouncement(
                "Você já é ADM.",
                player.id,
                0xE53E3E,
                "bold",
                1
            );

            return false;
        }

        room.setPlayerAdmin(player.id, true);

        return false;
    }
};
